import { ParamListBase } from '@react-navigation/native';
import { Button } from '@ui-kitten/components';
import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { NavigationParams, NavigationScreenProp, withNavigation } from 'react-navigation';

type locationsComponentProps = {
  navigation: NavigationScreenProp<ParamListBase, NavigationParams>,
  coordinates: {
    latitude: number,
    longitude: number
  }
}

function SelectedLocationComponent({coordinates, navigation}: locationsComponentProps) {

  function nav(){
    navigation.navigate("EventCreationScreen")
  }

  return (
      <View style={styles.container}>
        <Text style={styles.text}>Current latitude {coordinates.latitude}</Text>
        <Text style={styles.text}>Current longitude {coordinates.longitude}</Text>
        <Button style={styles.button} onPress={nav}>Add event</Button>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    minWidth: '80%',
    margin: 10,
    padding: 10
  },
  text: {
    margin: 5
  },
  button: {
    margin: 5
  }
});

export default withNavigation(SelectedLocationComponent)
