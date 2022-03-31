import React from 'react';
import { View, Text, Button } from 'react-native';
import { DefaultScreenProps } from '../common/DefaultScreenProps';
import { globalStyles } from '../styles/global';


export default function HomeScreen({ navigation }: DefaultScreenProps) {

  function pressHandler() {
    navigation.navigate("LoginScreen")
  }

  return (
    <View style={globalStyles.container}>
      <Text>Home Screen</Text>
      <Button title="start" onPress={pressHandler}/>
    </View>
  );
}