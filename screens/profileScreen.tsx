import React, { useEffect, useState } from 'react';
import { DefaultScreenProps } from '../common/DefaultScreenProps';
import { firebaseLogout, getLoggedInUserUID } from '../services/authService';
import { LogBox, SafeAreaView, Text } from 'react-native';
import { Button, Card, Layout } from '@ui-kitten/components';
import { getUser } from '../services/dbService';
import User from '../models/user';
import { useFocusEffect } from '@react-navigation/native';

export default function ProfileScreen({ navigation }: DefaultScreenProps) {

  const [user, setUser] = useState<User>()
  const [date, setDate] = useState<string>(`${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`)

  function logOut(){
    firebaseLogout()
    navigation.navigate("LoginScreen")
  }

  function goToEventsScreen(){
    navigation.navigate("LoginScreen")
  }

  function getCurrentUser(){
    getLoggedInUserUID().then((uid) => {
      if(uid)
        getUser(uid).then(usr => {
          setUser(usr)
          if(usr?.createdAt)
            setDate(timestampToDate(usr.createdAt))
        })
      })
    }
  
  function timestampToDate(timestamp: number){
    return `${new Date(timestamp).toLocaleDateString()} ${new Date(timestamp).toLocaleTimeString()}`
  }

  useFocusEffect(() => {
    //https://stackoverflow.com/questions/44603362/setting-a-timer-for-a-long-period-of-time-i-e-multiple-minutes
    LogBox.ignoreLogs(['Setting a timer']);
    getCurrentUser()
  })

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Card style={{width: '80%' }}>
            <Text style={{margin: 10}}>Mail: { user?.mail }</Text>
            <Text style={{margin: 10}}>Nick: { user?.nick }</Text>
            <Text style={{margin: 10}}>Created on: { date }</Text>
            <Button onPress={goToEventsScreen} size="small" style={{margin: 10}} appearance="outline">Browse events</Button>
            <Button onPress={logOut} size="small" style={{margin: 10}} color-danger-100>Logout</Button>
        </Card>
      </Layout>
    </SafeAreaView>
  );
}
