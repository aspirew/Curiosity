import React, { useState } from 'react';
import { DefaultScreenProps } from '../common/DefaultScreenProps';
import { SafeAreaView } from 'react-native';
import { Button, Calendar, Card, Datepicker, Input, Layout, Select, SelectItem, Text } from '@ui-kitten/components';
import { addEvent } from '../services/dbService';

export default function EventCreationScreen({ navigation }: DefaultScreenProps) {

  const [name, setName] = useState("")
  const [category, setCategory] = useState("")
  //const [creator, setCreator] = useState("")
  const [descripton, setDescrition] = useState("")
  //const [lattitude, setLattitude] = useState("")
  //const [longitude, setLoggitude] = useState("")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")


  function Submit(){
    addEvent(name, descripton).then(async () => {
      navigation.navigate("EventViewScreen")
    })
  }

  function ViewEvents(){
      navigation.navigate("EventViewScreen")
  }
    function Cancel(){
        navigation.goBack()
    }

    //TODO: this
    function AddPhoto(){
        throw new Error('Method not implemented.');
    }

  return (
    <Layout style={{flex: 1, justifyContent: 'space-evenly', alignItems: 'flex-start'}}>

        <Input
            style={{marginTop: 10, marginLeft: 'auto', marginRight: 'auto', width: '50%'}}
            label={evaProps => <Text {...evaProps}>Name</Text>}
            placeholder='Event name'
            value={name}
            onChangeText={(txt: string) => setName(txt)}
        />

        <Select
            label={evaProps => <Text {...evaProps}>Category</Text>}>
            <SelectItem title={evaProps => <Text {...evaProps}>Category 1</Text>} />
        </Select>


        <Input
            style={{paddingTop: 0,
                paddingBottom: 0,
                margin: 10,
                textAlignVertical: 'top'}}
            label={evaProps => <Text {...evaProps}>Description</Text>}
            placeholder='Description'
            value={descripton}
            onChangeText={(txt: string) => setDescrition(txt)}
            multiline={true}
            numberOfLines={7}
        />

        <Datepicker
            //controlStyle={{ ... }}
            label={evaProps => <Text {...evaProps}>Start date</Text>}
            size="medium"
            date={startDate}
            onSelect={setStartDate}
        />

        <Datepicker
            //controlStyle={{ ... }}
            label={evaProps => <Text {...evaProps}>End date</Text>}
            size="medium"
            date={endDate}
            onSelect={setEndDate}
        />

        <Button
            style={{marginTop: 10, marginLeft: 'auto', marginRight: 'auto', width: '50%'}}
            onPress={AddPhoto}
        >
            Add Photo
        </Button>
            
        <Button
            style={{marginTop: 10, marginLeft: 'auto', marginRight: 'auto', width: '50%'}}
            onPress={Submit}
        >
            Submit
        </Button>

        <Button
            style={{marginTop: 10, marginLeft: 'auto', marginRight: 'auto', width: '50%'}}
            onPress={Cancel}
        >
            Cancel
        </Button>

        <Button
            style={{marginTop: 10, marginLeft: 'auto', marginRight: 'auto', width: '50%'}}
            onPress={ViewEvents}
        >
            View Events
        </Button>
            
</Layout>
  );
}