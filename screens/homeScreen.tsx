import React from 'react';
import { View, Text, Button } from 'react-native';
import { DefaultScreenProps } from '../common/DefaultScreenProps';
import { firebaseLogout } from '../services/authService';
import { globalStyles } from '../styles/global';


export default function HomeScreen({ navigation }: DefaultScreenProps) {

  function start() {
    navigation.navigate("LoginScreen")
  }

  function logOut(){
    firebaseLogout()
  }

  return (
    <View style={globalStyles.container}>
      <Text>Home Screen</Text>
      <Button title="start" onPress={start}/>
      <Button title="log out" onPress={logOut}/>
    </View>
  );
}