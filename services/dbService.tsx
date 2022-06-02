import { db } from '../firebase/firebase.config';
import { collection, addDoc, getDocs, QuerySnapshot, DocumentData, where, query } from "firebase/firestore"; 
import { GeoPoint } from 'firebase/firestore';
import Event from '../models/event';
import User from '../models/user';


export class EventDoc {
    id: string
    name: string
    description: string

    constructor(id: string, name: string, description: string) {
      this.id = id;
      this.name = name;
      this.description = description;
  }
}

export async function addEvent(event: Event){
    try {
        const docRef = await addDoc(collection(db, "events"), {
        id: event.id,
        name: event.name,
        type: event.type,
        description: event.description,
        startDate: event.startDate,
        endDate: event.endDate,
        photo: event.photo,
        postTime: event.postTime ,
        stars: event.stars,
        votes: event.votes
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }


export async function getEvents() : Promise<EventDoc[]> {
    const events = await getDocs(collection(db, "events"));
    let arr: EventDoc[] = [];
    if (events.size > 0) {
      events.forEach(doc => {
        arr.push(new EventDoc(doc.id, doc.data().name, doc.data().description))
      })
    }
    else {
      // decide what you want to do if no results
    }
  return arr;
      
  }

export async function addUser(user: User){
  try {
      const docRef = await addDoc(collection(db, "users"), {
      uid: user.uid,
      mail: user.mail,
      nick: user.nick,
      createdAt: user.createdAt
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

export async function getUser(uid: string) : Promise<User | undefined> {
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