const { initializeApp } = require("firebase/app");
const { getAnalytics } = require("firebase/analytics");
const { getFirestore, doc, getDoc, setDoc } = require("firebase/firestore");

const firebaseConfig = {
  apiKey: "AIzaSyBQVTklUFdePGw3psGWun5ezk2tjN47SrA",
  authDomain: "e-commerce-d14bb.firebaseapp.com",
  projectId: "e-commerce-d14bb",
  storageBucket: "e-commerce-d14bb.appspot.com",
  messagingSenderId: "103189248041",
  appId: "1:103189248041:web:24357ed56374f960d64438",
  measurementId: "G-1TKG333X8J",
};
let app;
let firebasedb;
// Initialize Firebase
const initializeFirebaseApp = () => {
  try {
    app = initializeApp(firebaseConfig);
    firebasedb = getFirestore();
    return app;
  } catch (err) {
    console.log("Error in intilizing Firebase :-" + err);
  }
};

// const uploadData = async () => {
//   try {
//     const document = doc(firebasedb, "Testing", "new-unique-id");
//     let dataUpload = await setDoc(document, { key: "test", value: 2 });
//     return dataUpload;
//   } catch (err) {
//     console.log("Error in uploadData :-" + err);
//   }
// };
const getFirebaseApp = () => app;
const getFirebaseDB = () => firebasedb;
module.exports = {
  initializeFirebaseApp,
  getFirebaseApp,
  getFirebaseDB,
};
