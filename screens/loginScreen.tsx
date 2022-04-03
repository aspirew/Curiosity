import React, { useEffect } from 'react';
import { useState } from 'react';
import { View, Text, Button } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { DefaultScreenProps } from '../common/DefaultScreenProps';
import { globalStyles } from '../styles/global';
import { firebaseLogin, firebaseRegister, getLocalToken } from '../services/authService';

function LoginScreen({ navigation }: DefaultScreenProps) {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  function signIn(){
    firebaseLogin(email, password).then(async () => {
      const token = await getLocalToken()
      if(token)
        navigation.navigate("MapScreen")
    })
  }

  function register(){
    firebaseRegister(email, password).then(async () => {
      const token = await getLocalToken()
      if(token)
        navigation.navigate("MapScreen")
    })
  }

  useEffect(() => {
    getLocalToken().then((token) => {
    if(token)
      navigation.navigate("MapScreen")
  })}, [])

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

export default LoginScreen