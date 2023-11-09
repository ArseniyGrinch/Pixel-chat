import { createContext } from 'react';
import { createRoot } from 'react-dom/client';
// css
import './styles/main.scss';
// components
import App from './App';
// firebase
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
};

const app = firebase.initializeApp(firebaseConfig)

export const Context = createContext(null)

const auth = firebase.auth()
const firestore = firebase.firestore()

createRoot(document.getElementById('root')).render(
  <Context.Provider value={{
    firebase,
    auth,
    firestore
  }}>
    <App />
  </Context.Provider>
);