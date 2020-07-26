import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

// firebase init
const firebaseConfig = {
  apiKey: "AIzaSyAt-RxCnlSfDcksZFJdX1Fg0TEf_5YHw-U",
  authDomain: "",
  databaseURL: "https://covidata-c94f7.firebaseio.com",
  projectId: "covidata-c94f7",
  storageBucket: "",
  messagingSenderId: "",
  appId: "1:671114619038:web:37f06c5a2cf96a1af9738f",
};

firebase.initializeApp(firebaseConfig);

// utils
const db = firebase.firestore();
const auth = firebase.auth();
const authClass = firebase.auth;

// collection references
const usersCollection = db.collection("users");
const visitsCollection = db.collection("visits");
const venuesCollection = db.collection("venues");

// export utils/refs
export {
  db,
  auth,
  authClass,
  usersCollection,
  visitsCollection,
  venuesCollection,
};
