import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, View, Text, StyleSheet, ListRenderItem, SafeAreaView, StatusBar  } from 'react-native';
import { getEvents } from '../services/dbService';
import Event from '../models/event';

export default function EventViewScreen() {
  const [events, setEvents] = useState<Event[]>([]);


  useEffect(() => {
    const fetchEvents = async () => {
      const eventDocs = await getEvents();
      eventDocs.forEach(doc => {
        console.log(doc)
        events.push(doc)
        })
      setEvents(events);
    }
    fetchEvents();
  }, [events])

  const Item = ({ name }: any) => (
    <View style={styles.item}>
      <Text style={styles.title}>{name}</Text>
    </View>
  );

    const renderItem = ({ item }: any) => (
      <Item name={item.name} />
    );

    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          data={events}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      </SafeAreaView>
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
