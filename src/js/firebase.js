import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA09pw5V6MQZCjL5Hap9IsRG2k4du89QBs",
  authDomain: "noteballs-3b405.firebaseapp.com",
  projectId: "noteballs-3b405",
  storageBucket: "noteballs-3b405.appspot.com",
  messagingSenderId: "653763469578",
  appId: "1:653763469578:web:47a49acfef64947b329af3"
};

const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

const auth = getAuth(app);

export { db, auth};
