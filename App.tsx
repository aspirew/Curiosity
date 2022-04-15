import 'react-native-gesture-handler';
import React from 'react'
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import reduxStore from './reduxConfig/store';
import Navigator from './routes/drawer'
import * as eva from '@eva-design/eva'
;
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { RootSiblingParent } from 'react-native-root-siblings';



export default function App() {

    const {store, persistor} = reduxStore()

    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <RootSiblingParent>
                <IconRegistry icons={EvaIconsPack}/>
                <ApplicationProvider {...eva} theme={eva.light}>
                <Navigator />
                </ApplicationProvider>
            </RootSiblingParent>
        </PersistGate>
      </Provider>
    );

}
