import { createUserWithEmailAndPassword, signInWithEmailAndPassword  } from 'firebase/auth';
import React from 'react';
import { useState } from 'react';
import { View, Text, Button } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { DefaultScreenProps } from '../common/DefaultScreenProps';
import { auth } from '../firebase/firebase.config';
import { globalStyles } from '../styles/global';

export default function LoginScreen({ navigation }: DefaultScreenProps) {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  function signIn(){
    signInWithEmailAndPassword(auth, email, password)
    .then((res) => {
      console.log(res.user.getIdToken)
      navigation.navigate("RegisterScreen")
    })
    .catch((err) => {
      
    })
  }

  function register(){
    createUserWithEmailAndPassword(auth, email, password)
    .then((res) => {
      navigation.navigate("MapScreen")
    })
    .catch((err) => { 
      console.error(err)
    })
  }

  return (
    <View style={globalStyles.container}>
      <Text>Sign in</Text>
      <TextInput placeholder="Email" value={email} onChangeText={(txt: string) => setEmail(txt)}/>
      <TextInput placeholder="Password" 
        value={password} 
        secureTextEntry={true}
        onChangeText={(txt: string) => setPassword(txt)}
      />
        <Button title = "Sign in" onPress={signIn}/>
        <Button title = "Register" onPress={register}/>
    </View>
  );
}