import { useCallback, useState } from 'react';
import { DefaultScreenProps } from '../common/DefaultScreenProps';
import { firebaseLogin, firebaseLogout, getLoggedInUserUID } from '../services/authService';
import {Button, Card, Layout} from '@ui-kitten/components';
import { Input } from '@ui-kitten/components';
import { useFocusEffect } from '@react-navigation/native';

function LoginScreen({ navigation }: DefaultScreenProps) {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  function signIn(){

  firebaseLogin(email, password).then(async res => {
    if(res)
      navigation.navigate("MapScreen")
    })
  }

  function toRegister(){
    navigation.navigate("RegisterScreen")
  }

  // https://github.com/react-navigation/react-navigation/issues/8512
  useFocusEffect(
    useCallback(() => {
      getLoggedInUserUID().then(uid => {
        firebaseLogout()
      })
      return () => {};
    }, [])
  );

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
                  onPress={toRegister}
                  appearance="outline"
              >
                  Register
              </Button>
          </Card>
      </Layout>
  );
}

export default LoginScreen
