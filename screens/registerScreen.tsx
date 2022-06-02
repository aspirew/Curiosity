import { useState } from 'react';
import { DefaultScreenProps } from '../common/DefaultScreenProps';
import { firebaseRegister, getLoggedInUserUID } from '../services/authService';
import {Button, Card, Layout} from '@ui-kitten/components';
import { Input } from '@ui-kitten/components';

function RegisterScreen({ navigation }: DefaultScreenProps) {

  const [email, setEmail] = useState("")
  const [nick, setNick] = useState("")
  const [password, setPassword] = useState("")

  function register(){
    firebaseRegister(email, password, nick).then(async () => {
      const uid = await getLoggedInUserUID()
      if(uid)
        navigation.navigate("MapScreen")
    })
  }

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
                  placeholder='Nick'
                  value={nick}
                  onChangeText={(nick: string) => setNick(nick)}
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
                  onPress={register}
              >
                  Register
              </Button>
          </Card>
      </Layout>
  );
}

export default RegisterScreen
