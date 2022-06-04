import { Timestamp } from "firebase/firestore";
import {EventType} from "./eventType";
import Photo from "./photo";

export default interface Event {
    id: string
    name: string
    type: EventType
    description: string
    address: string
    startDate: Timestamp
    endDate: Timestamp
    photo: Photo
    postTime: Timestamp
    stars: number
    votes: number
    location: any
    latitude: number
    longitude: number

}
