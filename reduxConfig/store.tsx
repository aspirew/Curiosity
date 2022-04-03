import { AsyncStorage } from 'react-native';
import { createStore } from 'redux'
import { persistReducer, persistStore } from 'redux-persist';
import loginReducer from './loginReducer';

const persistConfig = {
    key: 'root',
    storage: AsyncStorage
}

const persistedReducer = persistReducer(persistConfig, loginReducer)

export default() => {
    const store = createStore(persistedReducer)
    const persistor = persistStore(store)
    return { store, persistor }
}