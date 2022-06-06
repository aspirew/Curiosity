
import React, { useContext, useRef, useState, useEffect } from 'react';
import { DefaultScreenProps } from '../common/DefaultScreenProps';
import { Alert, Platform, SafeAreaView, ScrollView, TouchableOpacity, View , StyleSheet, ActivityIndicator, StatusBar, Image} from 'react-native';
import { Button, Calendar, Card, Datepicker, IndexPath, Input, Layout, Select, SelectGroup, SelectItem, Text, TextProps } from '@ui-kitten/components';
import { addEvent } from '../services/dbService';
import Event from '../models/event';
import { EventType } from '../models/eventType';
import { globalStyles } from '../styles/global';
import { ScreenContainer } from 'react-native-screens';
import * as ImagePicker from 'expo-image-picker';
import BottomSheet from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated';
import SelectedLocationComponent from '../components/selectedLocationComponent';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';

import uuid from 'react-native-uuid';
import MapView, { MapEvent, Marker } from 'react-native-maps';
import { GeoPoint } from 'firebase/firestore';
import { assertionError } from '@firebase/util';
/* @hide */
import * as Device from 'expo-device';
/* @end */
import * as Location from 'expo-location'
import { auth } from '../firebase/firebase.config';
import { RenderProp } from '@ui-kitten/components/devsupport';
import MapStack from '../routes/MapStack';
import { NavigationActions } from 'react-navigation';

export default function EventCreationScreen({navigation}: DefaultScreenProps) {


  type marker = {
    latitude: number,
    longitude: number
  }


  type region = {
        latitude: number,
        longitude: number,
        latitudeDelta: number,
        longitudeDelta: number,
  }

  //let currentUserUID = firebase.auth().currentUser.uid;
  const [name, setName] = useState("")
  //const [creator, setCreator] = useState("")
  const [descripton, setDescrition] = useState("")
  const [address, setAddress] = useState("")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [selectedIndex, setSelectedIndex] = React.useState(new IndexPath(0, 1));
  const mapRef = useRef(null);
  const [location, setLocation] = useState<marker | undefined>(undefined);
  const [initialRegion, setinitialRegion] = useState<region | undefined>(undefined);

  useEffect(() => {
    (async () => {
      /* @hide */
      if (Platform.OS === 'android' && !Device.isDevice) {
        Alert.alert(
          'Oops, this will not work on Snack in an Android Emulator. Try it on your device!'
        );
        return;
      }
      /* @end */
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission to access location was denied');
        return;
      }

      let location_corrds = await Location.getCurrentPositionAsync({});
      setLocation(location_corrds.coords);
      const reg: region = {
        latitude: location_corrds.coords.latitude,
        longitude: location_corrds.coords.longitude,
        latitudeDelta: 0.003,
        longitudeDelta: 0.003,
      }
      setinitialRegion(reg);
      console.log(location);
    })();
  }, []);


    function Cancel() {
        setName("");
      setDescrition("");
      setAddress("");
      setStartDate("");
      setEndDate("");
      setUploadedImageUrl("");
      setSelectedIndex(new IndexPath(0, 1));
      setLocation({latitude: initialRegion?.latitude, longitude: initialRegion?.longitude});
      navigation.navigate("MapScreen");

    }

    const [uploadedImageUrl, setUploadedImageUrl] = useState("");
    const [uploading, setUploading] = useState(false);

    const takePhotoFromCamera = async () => {
        // Ask the user for the permission to access the camera
        const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

        if (permissionResult.granted === false) {
            alert("You've refused to allow this appp to access your camera!");
            return;
        }

        await _takePhoto();

    }


    const choosePhotoFromLibrary = async () => {
        // Ask the user for the permission to access the media library
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (permissionResult.granted === false) {
            alert("You've refused to allow this appp to access your photos!");
            return;
        }

        await _pickImage()

    };

    const submit = async () => {


      try{
      //TODO: input validation
      if (location?.latitude == null || location?.latitude == null) throw assertionError("location is null");
      const imageUrl = await uploadImageAsync(uploadedImageUrl);
      const event = {
        id: uuid.v4(),
        creatorId: auth.currentUser?.uid,
        name: name,
        type: displayValue,
        description: descripton,
        startDate: startDate,
        endDate: endDate,
        photo: imageUrl,
        postTime: new Date(),
        address: address,
        location: new GeoPoint(location.latitude, location.longitude),
        stars: null,
        votes: null
      }
      
      console.log('Image Url: ', imageUrl);
      console.log('Event name: ', name);
      console.log('Event type: ', displayValue);
      console.log('Event descr: ', descripton);
      console.log('Event adress: ', address);
      console.log('Event st date: ', startDate);
      console.log('Event end date: ', endDate);
      
      //TODO: input validation
      
      await addEvent(event);
      setName("");
      setDescrition("");
      setAddress("");
      setStartDate("");
      setEndDate("");
      setUploadedImageUrl("");
      setSelectedIndex(new IndexPath(0, 1));
      setLocation(undefined);
      navigation.navigate("MapScreen");
      }
      //TODO: error handling
    catch(error: any) {
      return error.message
    }
    
    }
    
    function onMapPress(e: MapEvent) {
      setLocation(e.nativeEvent.coordinate)
    }

  


    const _maybeRenderUploadingOverlay = () => {
        if (uploading) {
            return (
                <View
                    style={[
                        StyleSheet.absoluteFill,
                        {
                            backgroundColor: "rgba(0,0,0,0.4)",
                            alignItems: "center",
                            justifyContent: "center",
                        },
                    ]}
                >
                    <ActivityIndicator color="#fff" animating size="large"/>
                </View>
            );
        }
    };

    const _maybeRenderImage = () => {
        if (!uploadedImageUrl) {
            return;
        }

        return (
            <View
                style={{
                    marginTop: 30,
                    width: 250,
                    borderRadius: 3,
                    elevation: 2,
                }}>
                <View
                    style={{
                        borderTopRightRadius: 3,
                        borderTopLeftRadius: 3,
                        shadowColor: 'rgba(0,0,0,1)',
                        shadowOpacity: 0.2,
                        shadowOffset: {width: 4, height: 4},
                        shadowRadius: 5,
                        overflow: 'hidden',
                    }}>
                    <Image source={{uri: uploadedImageUrl}} style={{width: 250, height: 250}}/>
                </View>
            </View>
        );
    };

    const _takePhoto = async () => {
        let pickerResult = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [4, 3],
        });

        _handleImagePicked(pickerResult);
    };

    const _pickImage = async () => {
        let pickerResult = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [4, 3],
        });

        console.log({pickerResult});

        _handleImagePicked(pickerResult);
    };

    const _handleImagePicked = async (pickerResult: ImagePicker.ImagePickerResult) => {
        try {
            setUploading(true);

            if (!pickerResult.cancelled) {
                const uploadUrl = await uploadImageAsync(pickerResult.uri);
                setUploadedImageUrl(uploadUrl);
            }
        } catch (e) {
            console.log(e);
            alert("Upload failed, sorry :(");
        } finally {
            setUploading(false);
        }
    };

    async function uploadImageAsync(uri: string) {
        // Why are we using XMLHttpRequest? See:
        // https://github.com/expo/expo/issues/2402#issuecomment-443726662
        const blob: Blob = await new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.onload = function () {
                resolve(xhr.response);
            };
            xhr.onerror = function (e) {
                console.log(e);
                reject(new TypeError("Network request failed"));
            };
            xhr.responseType = "blob";
            xhr.open("GET", uri, true);
            xhr.send(null);
        });

        const fileRef = ref(getStorage(), uuid.v4());
        const result = await uploadBytes(fileRef, blob);

        // We're done with the blob, close and release it
        blob.close();

        return await getDownloadURL(fileRef);
    }


    const renderOption = (title: React.ReactText | RenderProp<TextProps> | undefined) => (
      <SelectItem title={title}/>

    );

    const displayValue = Object.values(EventType)[selectedIndex.row];

    const renderHeader = () => (
        <View style={styles.header}>
            <View style={styles.panelHeader}>
                <View style={styles.panelHandle}/>
            </View>
        </View>
    );

    const bs = React.createRef();
    const fall = new Animated.Value(1);

    const renderInner = () => (
        <View style={styles.panel}>
            <View style={{alignItems: 'center'}}>
                <Text style={styles.panelTitle}>Upload Photo</Text>
                <Text style={styles.panelSubtitle}>Choose Event Picture</Text>
            </View>
            <TouchableOpacity
                style={styles.panelButton}
                onPress={takePhotoFromCamera}>
                <Text style={styles.panelButtonTitle}>Take Photo</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.panelButton}
                onPress={choosePhotoFromLibrary}>
                <Text style={styles.panelButtonTitle}>Choose From Library</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.panelButton}
                onPress={() => bs.current.snapTo(1)}>
                <Text style={styles.panelButtonTitle}>Cancel</Text>
            </TouchableOpacity>
        </View>
      );

      


  return (
      
    <Layout style={globalStyles.container}>
        <ScrollView style={globalStyles.container}>
        <BottomSheet
        ref={bs}
        snapPoints={[330, -5]}
        renderContent={renderInner}
        renderHeader={renderHeader}
        initialSnap={1}
        callbackNode={fall}
        enabledGestureInteraction={true}
      />
       <Animated.View
        style={{
          margin: 20,
          opacity: Animated.add(0.1, Animated.multiply(fall, 1.0)),
        }}></Animated.View>
        
        <Input
            style={globalStyles.input}
            label={evaProps => <Text {...evaProps}>Name</Text>}
            placeholder='Event name'
            value={name}
            onChangeText={(txt: string) => setName(txt)}
        />

        <Select
                style={globalStyles.input}
                label='Category'
                placeholder='Default'
                selectedIndex={selectedIndex}
                value={displayValue}
                onSelect={index => setSelectedIndex(index)}>
                {Object.values(EventType).map(renderOption)}
            </Select>

        <Input
            style={globalStyles.input}
            label={evaProps => <Text {...evaProps}>Description</Text>}
            placeholder='Description'
            value={descripton}
            onChangeText={(txt: string) => setDescrition(txt)}
            multiline={true}
            textStyle={{ minHeight: 64 }}
        />

        <Datepicker
            style={globalStyles.input}
            //controlStyle={{ ... }}
            label={evaProps => <Text {...evaProps}>Start date</Text>}
            size="medium"
            date={startDate}
            onSelect={setStartDate}
        />

        <Datepicker
            style={globalStyles.input}
            //controlStyle={{ ... }}
            label={evaProps => <Text {...evaProps}>End date</Text>}
            size="medium"
            date={endDate}
            onSelect={setEndDate}
        />

        <Input
            style={globalStyles.input}
            label={evaProps => <Text {...evaProps}>Adress</Text>}
            placeholder='Adress'
            value={address}
            onChangeText={(txt: string) => setAddress(txt)}
        />

      <View style={styles.container}>
      <Text appearance='hint' style={styles.label}>Mark spot on map</Text>
          <MapView
            ref={mapRef}
            style={styles.map}
            showsUserLocation={true}
            initialRegion={initialRegion}
            onPress={(e) => onMapPress(e)}
          >
          {
            location ?
            <Marker coordinate={location}></Marker>
            : null
          }
          </MapView>
        </View>

      <View 
        style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        {uploadedImageUrl ? null : (
          <Text
            style={{
              fontSize: 20,
              marginBottom: 20,
              textAlign: 'center',
              marginHorizontal: 15,
            }}>
            Image placeholder
          </Text>
        )}
        {_maybeRenderImage()}
        {_maybeRenderUploadingOverlay()}

        <StatusBar barStyle="default" />
      </View>
        

        <Button
            style={globalStyles.input}
            onPress={() => bs.current.snapTo(0)}
        >

            Add Photo
        </Button>
            
        <Button
            style={globalStyles.input}
            onPress={submit}
        >
            Submit
        </Button>

        <Button
            style={globalStyles.input}
            onPress={Cancel}
        >
            Cancel
        </Button>
        </ScrollView>
</Layout>
  );


  
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    commandButton: {
        padding: 15,
        borderRadius: 10,
        backgroundColor: '#FF6347',
        alignItems: 'center',
        marginTop: 10,
    },
    panel: {
        padding: 20,
        backgroundColor: '#FFFFFF',
        paddingTop: 20,
        width: '100%',
    },
    header: {
        backgroundColor: '#FFFFFF',
        shadowColor: '#333333',
        shadowOffset: {width: -1, height: -3},
        shadowRadius: 2,
        shadowOpacity: 0.4,
        paddingTop: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    panelHeader: {
        alignItems: 'center',
    },
    panelHandle: {
        width: 40,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#00000040',
        marginBottom: 10,
    },
    panelTitle: {
        fontSize: 27,
        height: 35,
    },
    panelSubtitle: {
        fontSize: 14,
        color: 'gray',
        height: 30,
        marginBottom: 10,
    },
    panelButton: {
        padding: 13,
        borderRadius: 10,
        backgroundColor: '#2e64e5',
        alignItems: 'center',
        marginVertical: 7,
    },
    panelButtonTitle: {
        fontSize: 17,
        fontWeight: 'bold',
        color: 'white',
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        marginBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5,
    },
    actionError: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#FF0000',
        paddingBottom: 5,
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#333333',
    },
    map: {
      padding: 15,
      borderRadius: 10,
      marginTop: 20,
      width: 320,
      height: 180,
    },
    label: {
      marginTop: 20,
    }
  });
