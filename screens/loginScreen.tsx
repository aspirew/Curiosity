import React, { useEffect } from 'react';
import { useState } from 'react';
import { DefaultScreenProps } from '../common/DefaultScreenProps';
import { firebaseLogin, firebaseRegister, getLocalToken } from '../services/authService';
import {Button, Card, Layout} from '@ui-kitten/components';
import { Input } from '@ui-kitten/components';

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
      <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Card style={{width: '80%' }}>
              <Input
                  placeholder='Email'
                  value={email}
                  onChangeText={(txt: string) => setEmail(txt)}
                  style={{margin: 10}}
              />
              <Input
                  placeholder='Password'
                  secureTextEntry={true}
                  value={password}
                  onChangeText={(txt: string) => setPassword(txt)}
                  style={{margin: 10}}
              />

              <Button
                  style={{marginTop: 10, marginLeft: 'auto', marginRight: 'auto', width: '50%'}}
                  onPress={signIn}
              >
                  Sign in
              </Button>
              <Button
                  style={{marginTop: 10, marginLeft: 'auto', marginRight: 'auto', width: '50%'}}
                  onPress={register}
              >
                  Register
              </Button>
          </Card>
      </Layout>
  );
}

export default LoginScreen
