import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import FIREBASE_CONFIG from "../config/firebaseConfig";

export const firebaseConfig = firebase.initializeApp(FIREBASE_CONFIG);
const baseDb = firebaseConfig.firestore();
export const db = baseDb;
