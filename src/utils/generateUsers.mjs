import { faker } from "@faker-js/faker";
import { doc, setDoc, collection } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

function generateUser() {
    return {
      _userId: faker.datatype.uuid(),
      name: faker.name.fullName(),
      avatar: faker.image.avatar(),
      phone: faker.phone.number(),
      about: faker.lorem.sentence(4)
    };
}

// import firebase from 'firebase/compat/app';


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


const range = [...Array(15).keys()]

range.forEach(async(i) => {
    const user = generateUser()
    const newUserRef = doc(collection(db, "contacts"));
 await setDoc(newUserRef, user);
    console.log(`Generated the user - ${user.name}...`)
})

 const user = {
  _userId: faker.datatype.uuid(),
  name: "Lauren Saina",
  avatar: faker.image.avatar(),
  phone: "254702345678",
  about: "The Marathon continues",
 }
    const newUserRef = doc(collection(db, "contacts"));
 await setDoc(newUserRef, user);
