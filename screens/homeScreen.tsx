import React from 'react';
import { DefaultScreenProps } from '../common/DefaultScreenProps';
import { firebaseLogout } from '../services/authService';
import { SafeAreaView } from 'react-native';
import { Button, Layout } from '@ui-kitten/components';

export default function HomeScreen({ navigation }: DefaultScreenProps) {

  function start() {
    navigation.navigate("LoginScreen")
  }

  function logOut(){
    firebaseLogout()
  }

  return (

    <SafeAreaView style={{ flex: 1 }}>
        <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Button style={{ margin: 20 }}onPress={start}>start</Button>
            <Button onPress={logOut}>log out</Button>
        </Layout>
    </SafeAreaView>
  );
}
