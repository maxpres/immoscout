// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDvR7D5offhH_QZ59Ny57v--coTkcQuZLE',
  authDomain: 'house-marketplace-a186f.firebaseapp.com',
  projectId: 'house-marketplace-a186f',
  storageBucket: 'house-marketplace-a186f.appspot.com',
  messagingSenderId: '784340800916',
  appId: '1:784340800916:web:e91830198161406ebb6b81',
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore();
