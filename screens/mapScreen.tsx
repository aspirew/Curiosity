import React from 'react';
import { DefaultScreenProps } from '../common/DefaultScreenProps';
import MapView from 'react-native-maps';

export default function MapScreen() {
  return (
        <MapView
            style={{height: "100%", width: "100%"}}
            showsUserLocation={true}
        />
  );
}
