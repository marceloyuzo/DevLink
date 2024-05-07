import { initializeApp } from "firebase/app"
import { getFirestore } from 'firebase/firestore'
import { getAuth } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyBplicfi3y8SIDIoFt1UMREVBBmRjB7cSg",
  authDomain: "reactlinks-5cdc0.firebaseapp.com",
  projectId: "reactlinks-5cdc0",
  storageBucket: "reactlinks-5cdc0.appspot.com",
  messagingSenderId: "560661486366",
  appId: "1:560661486366:web:67240dd272067423a2870f"
};


const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore(app)

export { auth, db }