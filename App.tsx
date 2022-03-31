import React, { useState } from 'react'
import Home from './screens/home'
import Navigator from './routes/homeStack'

export default function App() {
    return (
      <Navigator 
        navigationOptions={{
          headerShown: false
        }}
      />
    );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
