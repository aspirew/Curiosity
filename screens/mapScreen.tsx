import React, { useRef, useState } from 'react';
import { DefaultScreenProps } from '../common/DefaultScreenProps';
import MapView, { MapEvent, Marker } from 'react-native-maps';
import { StyleSheet, View } from 'react-native';
import SelectedLocationComponent from '../components/selectedLocationComponent';


type marker = {
  latitude: number,
  longitude: number
}


export default function MapScreen({ navigation }: DefaultScreenProps) {
  const mapRef = useRef(null);
  const [marker, setMarker] = useState<marker | undefined>(undefined);

  function onMapPress(e: MapEvent) {
    setMarker(e.nativeEvent.coordinate)
  }


  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        onPress={(e) => onMapPress(e)}
      >
      {
        marker ?
        <Marker coordinate={marker}></Marker>
        : null
      }
      </MapView>
    {
      marker ?
      <SelectedLocationComponent coordinates={marker} navigation={navigation}/> 
      : null
    }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  }
});