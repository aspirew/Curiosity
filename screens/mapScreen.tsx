import React from 'react';
import { View, Text } from 'react-native';
import { DefaultScreenProps } from '../common/DefaultScreenProps';
import { globalStyles } from '../styles/global';
import MapView from 'react-native-maps';

export default function MapScreen({ navigation }: DefaultScreenProps) {
  return (
    <View style={globalStyles.container}>
        <MapView
            style={{height: "100%", width: "100%"}}
            showsUserLocation={true}
        />
    </View>
  );
}
