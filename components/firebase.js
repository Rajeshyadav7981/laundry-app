
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyDTV7gNhZTVX8Vu4SuzmCmhbgAQqQlfDXQ",
  authDomain: "laundry-app-ae088.firebaseapp.com",
  projectId: "laundry-app-ae088",
  storageBucket: "laundry-app-ae088.appspot.com",
  messagingSenderId: "983168928426",
  appId: "1:983168928426:web:a03f420590afb4702d1ed3"
};
const app = initializeApp(firebaseConfig);
export const auth=getAuth(app);
export const db=getFirestore(app);
export const storage=getStorage(app);
export  default app;