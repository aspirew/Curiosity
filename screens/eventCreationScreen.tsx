import React, { useState } from 'react';
import { DefaultScreenProps } from '../common/DefaultScreenProps';
import { SafeAreaView } from 'react-native';
import { Button, Card, Input, Layout } from '@ui-kitten/components';
import { addEvent } from '../services/dbService';


export default function EventCreationScreen({ navigation }: DefaultScreenProps) {

  const [name, setName] = useState("")
  //const [creator, setCreator] = useState("")
  const [descripton, setDescrition] = useState("")
  //const [lattitude, setLattitude] = useState("")
  //const [longitude, setLoggitude] = useState("")
  //const [rating, setRating] = useState("")


  function Submit(){
    addEvent(name, descripton).then(async () => {
      navigation.navigate("mapScreen")
    })
  }


  return (
    <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
    <Card style={{width: '80%' }}>
        <Input
            placeholder='Name'
            value={name}
            onChangeText={(txt: string) => setName(txt)}
            style={{margin: 10}}
        />
        <Input
            placeholder='Description'
            secureTextEntry={true}
            value={descripton}
            onChangeText={(txt: string) => setDescrition(txt)}
            style={{margin: 10}}
        />

        <Button
            style={{marginTop: 10, marginLeft: 'auto', marginRight: 'auto', width: '50%'}}
            onPress={Submit}
        >
            Submit
        </Button>
    </Card>
</Layout>
  );
}