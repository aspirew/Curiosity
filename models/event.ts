import { Timestamp } from "firebase/firestore";
import {EventType} from "./eventType";
import Photo from "./photo";

export default class Event {
    id: string
    name: string
    type: EventType
    description: string
    startDate: Date
    endDate: Date
    photo: Photo
    postTime: Timestamp 
    stars: number
    votes: number
}
