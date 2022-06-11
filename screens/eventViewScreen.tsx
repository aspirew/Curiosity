import { useEffect, useState } from 'react';
import { View  } from 'react-native';
import { getEvents } from '../services/dbService';
import Event from '../models/event';
import { Spinner } from '@ui-kitten/components';
import EventListComponent from '../components/eventListComponent';
import Filter from '../models/filter';
import FilterComponent from '../components/filterComponent';

export default function EventListWithFilterComponent(props) {
  const [events, setEvents] = useState<Array<Event>>([]);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [filter, setFilter] = useState<Filter>( new Filter());

  useEffect(() => {
    const filter = new Filter();
    const passedFilter: Filter = props.navigation.state.params.filter;
    filter.distance = passedFilter.distance
    filter.isActive = passedFilter.isActive
    filter.likes = passedFilter.likes
    filter.onlyLikedByMe = passedFilter.onlyLikedByMe
    filter.onlyMyEvents = passedFilter.onlyMyEvents

    getEvents(filter).then(eventDocs => {
      eventDocs?.forEach(doc => {
        events.push(doc)
        })
    }).then(() => {
      setHasLoaded(true)
    })
  }, [events])

  async function handleFilter(newFilter: Filter) {
    newFilter.onlyLikedByMe = filter.onlyLikedByMe
    newFilter.onlyMyEvents = filter.onlyMyEvents
    setFilter(newFilter)
    const eventDocs = await getEvents(newFilter);
    setEvents([])
    eventDocs?.forEach(doc => {
        events.push(doc)
    })
    setEvents(events)

  } 

  if(hasLoaded)
    return (
      <View>
        <FilterComponent handleFilter={handleFilter}/>
        <EventListComponent events={events}></EventListComponent>
      </View>
    );

  return (
    <View style={{
      flex: 1, 
      alignItems: 'center',
      justifyContent: 'center', 
    }}>
      <Spinner></Spinner>
    </View>
  );
}
