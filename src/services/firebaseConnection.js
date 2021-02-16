import firebase from 'firebase';
import 'firebase/auth';
import 'firebase/database';

let firebaseConfig = {
  apiKey: "AIzaSyCAvlLBvLvgfjl5V0YEz3c20yV2rxG4GD8",
  authDomain: "financasapp-fee05.firebaseapp.com",
  projectId: "financasapp-fee05",
  storageBucket: "financasapp-fee05.appspot.com",
  messagingSenderId: "895037007157",
  appId: "1:895037007157:web:55171923fdebe2e701187c",
  measurementId: "G-ZC352QBY9V"
};

if(!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;
