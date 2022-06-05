import React, { useEffect, useState } from 'react';
import { DefaultScreenProps } from '../common/DefaultScreenProps';
import { firebaseLogout, getLoggedInUserUID } from '../services/authService';
import { LogBox, SafeAreaView, Text, View } from 'react-native';
import { Button, Card, Layout, Spinner } from '@ui-kitten/components';
import { getUser } from '../services/dbService';
import User from '../models/user';

export default function ProfileScreen({ navigation }: DefaultScreenProps) {

  const [user, setUser] = useState<User>()
  const [date, setDate] = useState<string>(`${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`)

  function goToEventsScreen(){
    navigation.navigate("EventViewScreen")
  }

  async function getCurrentUser(){
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

  useEffect(() => {
    LogBox.ignoreLogs(['Setting a timer']);
    getCurrentUser().then(() => {
      setInterval(() => {
        getCurrentUser()
      }, 5000)
    })
  }, [])

  if(user && user.nick)
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Card style={{width: '80%' }}>
              <Text style={{margin: 10}}>Mail: { user?.mail }</Text>
              <Text style={{margin: 10}}>Nick: { user?.nick }</Text>
              <Text style={{margin: 10}}>Created on: { date }</Text>
              <Button onPress={goToEventsScreen} size="small" style={{margin: 10}} appearance="outline">Browse events</Button>
          </Card>
        </Layout>
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
