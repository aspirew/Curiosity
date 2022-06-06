import { Timestamp, GeoPoint } from "firebase/firestore";
import {EventType} from "./eventType";
import Photo from "./photo";

export default interface Event {
    id: string
    name: string
    type: EventType
    description: string
    creatorId: string
    startDate: Date
    endDate: Date
    address: string
    location: GeoPoint
    photo: Photo
    postTime: Timestamp
    stars: number
    votes: number
    latitude: number
    longitude: number

}
