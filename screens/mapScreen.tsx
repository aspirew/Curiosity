import React from 'react';
import { View, Text } from 'react-native';
import { DefaultScreenProps } from '../common/DefaultScreenProps';
import { globalStyles } from '../styles/global';

export default function MapScreen({ navigation }: DefaultScreenProps) {
  return (
    <View style={globalStyles.container}>
      <Text>Map Screen</Text>
    </View>
  );
}