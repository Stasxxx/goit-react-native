
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBrBY1wRsxhRuJrGpzScDIx0BALLsf2Xgg",
  authDomain: "rn-social-8b01a.firebaseapp.com",
  projectId: "rn-social-8b01a",
  storageBucket: "rn-social-8b01a.appspot.com",
  messagingSenderId: "511091417058",
  appId: "1:511091417058:web:5f50569482bcbc780f23bb",
  measurementId: "G-EBJ0NEKNKM"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);