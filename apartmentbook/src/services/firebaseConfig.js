import firebase from 'firebase';
import "firebase/storage"

var firebaseConfig = {
    apiKey: "AIzaSyDeHvhX9cfpaThqf6Ef63wb8Qwwp9O1evk",
    authDomain: "apartmentbook-6fc13.firebaseapp.com",
    databaseURL: "https://apartmentbook-6fc13.firebaseio.com",
    projectId: "apartmentbook-6fc13",
    storageBucket: "apartmentbook-6fc13.appspot.com",
    messagingSenderId: "260377369421",
    appId: "1:260377369421:web:addc72404867fc8c493504",
    measurementId: "G-RGNLK53QJB"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  const Storage = firebase.storage();

  export {Storage, firebase as default}