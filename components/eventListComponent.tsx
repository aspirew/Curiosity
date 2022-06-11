import {  SafeAreaView } from 'react-native';
import Event from '../models/event';
import EventComponent from '../components/eventComponent';
import { ScrollView } from 'react-native-gesture-handler';

export default function EventListComponent(props: {events: Event[]}) {

  const items = props.events.map((val) => {
      return <EventComponent {...val} />
  });

    return (
      <SafeAreaView>
        <ScrollView>
          {items}
        </ScrollView>
      </SafeAreaView>
    );
}
