import React, { useEffect, useState } from 'react';
import { StyleSheet, SafeAreaView, StatusBar, Text, View  } from 'react-native';
import { getEvents } from '../services/dbService';
import Event from '../models/event';
import EventComponent from '../components/eventComponent';
import { ScrollView } from 'react-native-gesture-handler';
import { Spinner } from '@ui-kitten/components';

export default function EventViewScreen() {
  const [events, setEvents] = useState<Event[]>([]);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    getEvents().then(eventDocs => {
      eventDocs.forEach(doc => {
        events.push(doc)
        })
      setEvents(events);
    }).then(() => {
      setHasLoaded(true)
    })
  }, [events])

  const items = events.map((val) => {
      return <EventComponent {...val} />
  });

  if(hasLoaded)
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView>
          {items}
        </ScrollView>
      </SafeAreaView>
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
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: StatusBar.currentHeight || 0,
    },
    item: {
      backgroundColor: '#f9c2ff',
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
    },
    title: {
      fontSize: 32,
    },
  });
