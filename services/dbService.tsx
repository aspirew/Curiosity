import { db } from '../firebase/firebase.config';
import { collection, addDoc, getDocs, QuerySnapshot, DocumentData } from "firebase/firestore"; 
import { GeoPoint } from 'firebase/firestore';


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

export async function addEvent(name : string, description: string){
    try {
        const docRef = await addDoc(collection(db, "events"), {
        name: name,
       // creator: creator,
        description: description,
       // location: location,
       // rating: rating
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