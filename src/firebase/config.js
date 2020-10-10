import * as firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBY6fhpvRq2nnVc6D3ORbAa3IBi3Axo2h4",
  authDomain: "react-firestore-992bf.firebaseapp.com",
  databaseURL: "https://react-firestore-992bf.firebaseio.com",
  projectId: "react-firestore-992bf",
  storageBucket: "react-firestore-992bf.appspot.com",
  messagingSenderId: "92936728098",
  appId: "1:92936728098:web:80500122cb98adaea3a47b"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const projectFirestore = firebase.firestore();

