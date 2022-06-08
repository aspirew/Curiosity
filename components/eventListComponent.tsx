import { StyleSheet, SafeAreaView, StatusBar, Text, View  } from 'react-native';
import Event from '../models/event';
import EventComponent from '../components/eventComponent';
import { ScrollView } from 'react-native-gesture-handler';

export default function EventListComponent(events: Array<Event>) {

  const items = events.map((val) => {
      return <EventComponent {...val} />
  });

    return (
      <SafeAreaView style={styles.container}>
        <ScrollView>
          {items}
        </ScrollView>
      </SafeAreaView>
    );
}
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: StatusBar.currentHeight || 0,
    },
  });
