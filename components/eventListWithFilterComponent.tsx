import { useEffect, useState } from 'react';
import { View  } from 'react-native';
import { getEvents } from '../services/dbService';
import Event from '../models/event';
import { Spinner } from '@ui-kitten/components';
import EventListComponent from '../components/eventListComponent';
import { QueryConstraint } from 'firebase/firestore';

export default function EventListWithFilterComponent(filter: QueryConstraint) {
  const [events, setEvents] = useState<Event[]>([]);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    getEvents(filter).then(eventDocs => {
      eventDocs.forEach(doc => {
        events.push(doc)
        })
      setEvents(events);
    }).then(() => {
      setHasLoaded(true)
    })
  }, [events])

  if(hasLoaded)
    return (
      <EventListComponent {...events}></EventListComponent>
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
