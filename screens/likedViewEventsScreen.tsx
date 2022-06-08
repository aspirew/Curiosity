import { where } from "firebase/firestore";
import { useEffect, useState } from "react";
import EventListWithFilterComponent from "../components/eventListWithFilterComponent";
import { getLoggedInUserUID } from "../services/authService";

export default function LikedViewEventsScreen() {
  const [user, setUser] = useState<string>("");

  useEffect(() => {
    getLoggedInUserUID().then(uid => {
      if(uid)
        setUser(uid)
    })
  }, [])

  const query = where("votes", "array-contains", user);

  <EventListWithFilterComponent {...query}> </EventListWithFilterComponent>
}
