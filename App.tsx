import React from 'react'
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import reduxStore from './reduxConfig/store';
import Navigator from './routes/homeStack'

export default function App() {

    const {store, persistor} = reduxStore()

    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Navigator />
        </PersistGate>
      </Provider>  
    );

}