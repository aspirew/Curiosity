import { where } from "firebase/firestore";
import { useEffect, useState } from "react";
import EventListWithFilterComponent from "../components/eventListWithFilterComponent";
import { getLoggedInUserUID } from "../services/authService";

export default function LikedViewEventsScreen() {
  const [user, setUser] = useState<string>("");

  useEffect(() => {
    const filter = new Filter();
    const passedFilter: Filter = props.navigation.state.params.filter;
    filter.distance = passedFilter.distance
    filter.isActive = passedFilter.isActive
    filter.likes = passedFilter.likes
    filter.onlyLikedByMe = passedFilter.onlyLikedByMe
    filter.onlyMyEvents = passedFilter.onlyMyEvents
    setFilter(filter)
    getEvents(filter).then(eventDocs => {
      eventDocs?.forEach(doc => {
        events.push(doc)
        })
    }).then(() => {
      setHasLoaded(true)
    })
  }, [])

  async function handleFilter(newFilter: Filter) {
    newFilter.onlyLikedByMe = filter.onlyLikedByMe
    newFilter.onlyMyEvents = filter.onlyMyEvents
    setFilter(newFilter)
    const eventDocs = await getEvents(newFilter);
    const newEvents: Event[] = []
    eventDocs?.forEach(doc => {
      newEvents.push(doc)
    })
    setEvents(newEvents)
  } 

  if(hasLoaded)
    return (
      <View style = {{height: "100%"}}>
        <FilterComponent handleFilter={handleFilter}/>
        <EventListComponent events={events}></EventListComponent>
      </View>
    );

  <EventListWithFilterComponent {...query}> </EventListWithFilterComponent>
}
