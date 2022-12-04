// import firebase from 'firebase/compat/app';
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDTARIjEb6CCXrWlEl451xzzUKf1lNVxjU",
  authDomain: "whattsapp-clone-6f71d.firebaseapp.com",
  projectId: "whattsapp-clone-6f71d",
  storageBucket: "whattsapp-clone-6f71d.appspot.com",
  messagingSenderId: "849194334876",
  appId: "1:849194334876:web:65bfe0a5b50306ec744b59",
  measurementId: "G-8M6FDLFDR7"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig)
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);
// const provider = new firebase.auth.GoogleAuthProvider();

export { auth }
export default db;