import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyDJB937Lh1LO1FyDQ-y6YHB5IVtaUaxuV4',
  authDomain: 'crewingconnect.firebaseapp.com',
  projectId: 'crewingconnect',
  storageBucket: 'crewingconnect.appspot.com',
  messagingSenderId: '485753289740',
  appId: '1:485753289740:web:76dbfde3e32dd0fd7bc229',
  measurementId: 'G-DXJPBY5RQK',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const db = getFirestore(app);
export const storage = getStorage(app);
