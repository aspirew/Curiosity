import { initializeApp } from "firebase/app";
import { getFirestore} from 'firebase/firestore';

import {REACT_APP_FIREBASE_KEY, 
        REACT_APP_FIREBASE_DOMAIN, 
        REACT_APP_FIREBASE_DATABASE,
        REACT_APP_FIREBASE_PROJECT_ID,
        REACT_APP_FIREBASE_STORAGE_BUCKET,
        REACT_APP_FIREBASE_SENDER_ID,
        REACT_APP_FIREBASE_APP_ID,
        REACT_APP_FIREBASE_MEASUREMENT_ID } from '@env'
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: REACT_APP_FIREBASE_KEY,
  authDomain: REACT_APP_FIREBASE_DOMAIN,
  databaseURL: REACT_APP_FIREBASE_DATABASE,
  projectId: REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: REACT_APP_FIREBASE_SENDER_ID,
  appId: REACT_APP_FIREBASE_APP_ID,
  measurementId: REACT_APP_FIREBASE_MEASUREMENT_ID
};

const firebaseApp = initializeApp(firebaseConfig)

export const db = getFirestore(firebaseApp)
export const auth = getAuth(firebaseApp)

