import React from 'react';
import { DefaultScreenProps } from '../common/DefaultScreenProps';
import { firebaseLogout } from '../services/authService';
import { SafeAreaView } from 'react-native';
import { Button, Layout } from '@ui-kitten/components';

export default function EventCreationScreen({ navigation }: DefaultScreenProps) {


  function logOut(){
    firebaseLogout()
  }

  return (

    <SafeAreaView style={{ flex: 1 }}>
        <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Button style={{ margin: 20 }}onPress={logOut}>log out</Button>
        </Layout>
    </SafeAreaView>
  );
}