import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

// firebase init
// PRODUCTION
// const firebaseConfig = {
//   apiKey: "AIzaSyDJgOoCG3IKnf3vHmJIMHhPDf831RpliGU",
//   authDomain: "",
//   databaseURL: "https://covidata-live.firebaseio.com",
//   projectId: "covidata-live",
//   storageBucket: "",
//   messagingSenderId: "",
//   appId: "1:487734070426:web:7e435f98ab46b38fc8e323",
// };

// DEV
const firebaseConfig = {
  apiKey: "AIzaSyA8Yzea_TeCQa7s1Kp4B4WdcQm19KCP7X8",
  authDomain: "",
  databaseURL: "https://covidata-dev.firebaseio.com",
  projectId: "covidata-dev",
  storageBucket: "",
  messagingSenderId: "",
  appId: "1:1087548053713:web:7ee4986f6b2a7b15e70df0",
};

firebase.initializeApp(firebaseConfig);

// utils
const db = firebase.firestore();
const auth = firebase.auth();
const authClass = firebase.auth;

// collection references
const usersCollection = db.collection("users");
const venuesCollection = db.collection("venues");
const visitsCollection = db.collection("visits");

// export utils/refs
export {
  db,
  auth,
  authClass,
  usersCollection,
  venuesCollection,
  visitsCollection
};
