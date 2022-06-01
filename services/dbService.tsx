import { db } from '../firebase/firebase.config';
import { collection, addDoc, getDocs, QuerySnapshot, DocumentData } from "firebase/firestore"; 
import { GeoPoint } from 'firebase/firestore';
import Event from '../models/event';


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
        console.log(event);
        const docRef = await addDoc(collection(db, "events"), {
        id: event.id,
        name: event.name,
        type: event.type,
        description: event.description,
        startDate: event.startDate,
        endDate: event.endDate,
        photo: event.photo,
        address: event.address,
        location: event.location,
        postTime: event.postTime,
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