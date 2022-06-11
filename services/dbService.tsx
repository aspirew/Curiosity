import {db} from '../firebase/firebase.config';
import {addDoc, collection, doc, DocumentData, getDoc, getDocs, query, where, updateDoc, arrayUnion, arrayRemove, setDoc, QueryConstraint, Query} from "firebase/firestore";
import Event from '../models/event';
import User from '../models/user';
import firebase from "firebase/compat";
import Filter from "../models/filter";
import Timestamp = firebase.firestore.Timestamp;
import * as Location from "expo-location";
import GeoPoint = firebase.firestore.GeoPoint;
import {Alert} from "react-native";
import {boundingBoxCoordinates} from "../utils/coordinateUtils"
import { getLoggedInUserUID } from './authService';

export async function addEvent(event: Event) {
    try {
        const loggedInUser = await getLoggedInUserUID()
        event.creatorId = loggedInUser!
        const docRef = await addDoc(collection(db, "events"), event);
        console.log("Document written with ID: ", docRef.id);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
    
}

export async function getEvents(filter: Filter): Promise<Event[] | undefined> {
    let events: Array<Event> = []
    let queryConstraints: Array<QueryConstraint> = []
    const usr = await getLoggedInUserUID()

    if(!!filter.distance && parseInt(filter.distance) > 0) {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Permission to access location was denied');
            return;
        }
        const distance = parseInt(filter.distance)
        let location_corrds = await Location.getCurrentPositionAsync({});
        const box = boundingBoxCoordinates(location_corrds.coords, distance);

        const lesserGeopoint = new GeoPoint(box.swCorner.latitude, box.swCorner.longitude);
        const greaterGeopoint = new GeoPoint(box.neCorner.latitude, box.neCorner.longitude);

        queryConstraints.concat([where("location", ">", lesserGeopoint), where("location", "<", greaterGeopoint)])
        events = await getDocs(query(collection(db, "events"), where("location", ">", lesserGeopoint), where("location", "<", greaterGeopoint)))
    }

    events = await getDocs(query(collection(db, "events")))
    // events = await getDocs(query(collection(db, "events"), where("location", ">", lesserGeopoint), where("location", "<", greaterGeopoint)))

    let arr: Event[] = [];
    if (events.size > 0) {
        events.forEach(doc => {
            let isValid = true
            const event: Event =  {
                id: doc.id,
                name: doc.data().name,
                photo: doc.data().photo,
                description: doc.data().description,
                location: doc.data().location,
                latitude: doc.data().latitude,
                longitude: doc.data().longitude,
                creatorId: doc.data().creatorID,
                type: doc.data().type,
                address: doc.data().address,
                startDate: doc.data().startDate,
                endDate: doc.data().endDate,
                postTime: doc.data().postTime,
                stars: doc.data().stars,
                votes: doc.data().votes
            }
            if(!!filter && filter.likes > 0 && event.votes.length < filter.likes)
                isValid = false
            if(filter.isActive && !!event.endDate && event.endDate.toMillis() < Timestamp.now().toMillis())
                isValid = false
            if(isValid)
                arr.push(event)
        })
    }
    return arr;
}


export async function getEvent(id: string) {
    const eventDoc = await getDoc(doc(db, "events", id));
    let eventData = eventDoc.data();

    const event: Event =  {
        id: eventDoc.id,
        name: eventData?.name,
        type: eventData?.type,
        description: eventData?.description,
        startDate: eventData?.startDate,
        endDate: eventData?.endDate,
        photo: eventData?.photo,
        postTime: eventData?.postTime,
        stars: eventData?.stars,
        votes: eventData?.votes,
        location: eventData?.location,
        latitude: eventData?.latitude,
        longitude: eventData?.longitude,
        address: eventData?.address,
        creatorId: eventData?.creatorId
    }

    return event
}
export async function addUser(user: User){
  try {
      const docRef = await setDoc(doc(db, "users", user.uid), {
      uid: user.uid,
      mail: user.mail,
      nick: user.nick,
      createdAt: user.createdAt
    });
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

export async function getUser(uid: string): Promise<User | undefined> {
    const user = await getDocs(query(collection(db, "users"), where("uid", "==", uid)));
    let fetchedUser: User | undefined
    if (user.size > 0) {
        user.forEach((doc: DocumentData) => {
            fetchedUser = {
                uid: doc.data().uid,
                mail: doc.data().mail,
                nick: doc.data().nick,
                createdAt: doc.data().createdAt,
            }
        })
    }
    return fetchedUser;
}


export async function addVote(voterId: string, eventId: string) {
    const eventDoc = doc(db, "events", eventId)
    await updateDoc(eventDoc, {votes: arrayUnion(voterId)})
    await updateDoc(eventDoc, {"likes": firebase.firestore.FieldValue.increment(1) })
    const userDoc = doc(db, "users", voterId)
    await updateDoc(userDoc, {votes: arrayUnion(eventId)})
}

export async function removeVote(voterId: string, eventId: string) {
    const eventDoc = doc(db, "events", eventId)
    await updateDoc(eventDoc, {votes: arrayRemove(voterId)})
    await updateDoc(eventDoc, {"likes": firebase.firestore.FieldValue.increment(-1) })

    const userDoc = doc(db, "users", voterId)
    await updateDoc(userDoc, {votes: arrayRemove(eventId)})
}
