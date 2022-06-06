import {db} from '../firebase/firebase.config';
import {addDoc, collection, doc, DocumentData, getDoc, getDocs, query, where, updateDoc, arrayUnion, arrayRemove, setDoc} from "firebase/firestore";
import Event from '../models/event';
import User from '../models/user';

export async function addEvent(event: Event) {
    try {
        console.log(event);
        const docRef = await addDoc(collection(db, "events"), {
            id: event.id,
            name: event.name,
            type: event.type,
            description: event.description,
            startDate: event.startDate,
            endDate: event.endDate,
            photo: event.photo,
            postTime: event.postTime,
            stars: event.stars,
            votes: event.votes
        });
        console.log("Document written with ID: ", docRef.id);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}


export async function getEvents(): Promise<Event[]> {
    const events = await getDocs(collection(db, "events"));
    let arr: Event[] = [];
    if (events.size > 0) {
        events.forEach(doc => {
            const event: Event =  {
                id: doc.id,
                name: doc.data().name,
                photo: doc.data().photo,
                description: doc.data().description,
                location: doc.data().location,
                latitude: doc.data().latitude,
                longitude: doc.data().longitude,
                type: doc.data().type,
                address: doc.data().address,
                startDate: doc.data().startDate,
                endDate: doc.data().endDate,
                postTime: doc.data().postTime,
                stars: doc.data().stars,
                votes: doc.data().votes
            }
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
        address: eventData?.address
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
    const userDoc = doc(db, "users", voterId)
    await updateDoc(userDoc, {votes: arrayUnion(eventId)})
}

export async function removeVote(voterId: string, eventId: string) {
    const eventDoc = doc(db, "events", eventId)
    await updateDoc(eventDoc, {votes: arrayRemove(voterId)})
    const userDoc = doc(db, "users", voterId)
    await updateDoc(userDoc, {votes: arrayRemove(eventId)})
}
