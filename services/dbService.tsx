import { db } from '../firebase/firebase.config';
import { collection, addDoc, getDocs, QuerySnapshot, DocumentData } from "firebase/firestore"; 
import { GeoPoint } from 'firebase/firestore';


export interface EventDoc {
    id: string;
    name: string;
    description: string;
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


export async function getEvents() : Promise<QuerySnapshot<DocumentData>> {
    const querySnapshot = await getDocs(collection(db, "events"));
    querySnapshot.forEach((doc) => {
    console.log(`${doc.id} => ${doc.data()}`);
    
})
return querySnapshot;;
    
}