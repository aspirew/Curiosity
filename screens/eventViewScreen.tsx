import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, View, Text, StyleSheet, ListRenderItem  } from 'react-native';
import { getEvents, EventDoc } from '../services/dbService';
import { DocumentSnapshot } from 'firebase/firestore';

function Users() {
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState([]);

  useEffect(() => {

    const eventQuery =  await getEvents()

    eventQuery.forEach(eventSnapshot => {
        events.push();
      });

      setEvents(events);
      setLoading(false);
  
    return () => {
        eventQuery
    }
  }, [])

  const styles = StyleSheet.create({
    container: {
     flex: 1,
     
     
    },
    item: {
      padding: 10,
      fontSize: 18,
      height: 44,
    },
  });
  

  if (loading) {

    return <ActivityIndicator />
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={[events}
        renderItem={({item}) => <Text style={styles.item}>{item.key}</Text>}
      />
    </View>
  );
    }