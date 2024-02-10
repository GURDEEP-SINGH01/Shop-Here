const {
  doc,
  getDoc,
  setDoc,
  collection,
  updateDoc,
  getDocs,
  deleteDoc,
} = require("firebase/firestore");
const { getFirebaseDB } = require("../config/Firebase");
const Product = require("./Product");
const { response, request } = require("express");
const axios = require("axios");
// const { param } = require("../Routes/Routes");

let firebasedb;
let constarr = [];

const initializeFirebaseDB = () => {
  firebasedb = getFirebaseDB();
};
const allproducts = async (req, res) => {
  initializeFirebaseDB();

  try {
    const collectionRef = collection(firebasedb, "AllProducts");
    let dataUpload = await getDocs(collectionRef);
    let arr = [];

    dataUpload.forEach((doc) => {
      arr.push(doc.data());
    });
    constarr = [...arr];
    res.send(arr);
  } catch (err) {
    console.log("Error in getdata :-" + err);
  }
};
const addproducts = async (req, res) => {
  initializeFirebaseDB();

  try {
    for (const product of Product) {
      let documentRef = doc(firebasedb, "AllProducts", `${product.id}`);
      await setDoc(documentRef, product);
    }
    res.send("Objects added");
    console.log("All Objects added");
  } catch (err) {
    console.log("Error in uploadData :-" + err);
  }
};
const addtoCart = async (req, res) => {
  initializeFirebaseDB();
  const id = req.params.id;
  const quantity = req.params.quantity;
  try {
    let response;
    const collectionRef = doc(firebasedb, "CartItems", `${id}`);
    for (const item of constarr) {
      if (item.id == id) {
        item.quantity = Number(quantity);
        response = await setDoc(collectionRef, item);
      }
    }
    console.log("Item added to cart");
    res.send(response);
  } catch (err) {
    console.log("Error occured while adding to cart :-" + err);
  }
};
const getfromCart = async (req, res) => {
  initializeFirebaseDB();
  try {
    const collectionRef = collection(firebasedb, "CartItems");
    let dataUpload = await getDocs(collectionRef);
    let arr = [];

    dataUpload.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
      arr.push(doc.data());
    });
    res.send(arr);
  } catch (err) {
    console.log("Error occured while getting items from cart :- ", err);
  }
};
const updatefromCart = async (req, res) => {
  initializeFirebaseDB();
  const id = req.params.id;
  const quantity = req.params.quantity;
  let response;
  try {
    const collectionRef = doc(firebasedb, "CartItems", `${id}`);
    const snapshot = await getDoc(collectionRef);
    if (snapshot.exists()) {
      const item = snapshot.data();
      console.log("Item ", item);
      if (item.quantity > 0) {
        item.quantity = Number(quantity);
        response = await setDoc(collectionRef, item);
        console.log("The response from updateCart", response);
      } else {
        response = await deleteDoc(doc(firebasedb, "CartItems", id));
      }

      res.send(response);
    } else {
      res.status(404).send("Item not found in cart");
    }
  } catch (err) {
    console.log("Error while updating the cart items :-", err);
  }
};
const deletefromCart = async (req, res) => {
  initializeFirebaseDB();
  const id = req.params.id;
  let response;
  try {
    const documentRef = await deleteDoc(doc(firebasedb, "CartItems", id));
    res.send(documentRef);
  } catch (err) {
    console.log("Error in deleting from cart", err);
  }
};
const emptyCart = async (req, res) => {
  initializeFirebaseDB();
  try {
    const querySnapshot = await getDocs(collection(firebasedb, "CartItems"));
    querySnapshot.forEach(async (doc) => {
      await deleteDoc(doc.ref);
      console.log(`Document with ID ${doc.id} deleted`);
    });
    res.send("All Items deleted");
  } catch (err) {
    console.log("Error in emptyCart :-" + err);
  }
};
const Users = async (req, res) => {
  initializeFirebaseDB();
  try {
    const querySnapshot = await getDocs(collection(firebasedb, "Users"));
    let arr = [];
    querySnapshot.forEach((user) => {
      arr.push(user.data());
    });
    res.send(arr);
  } catch (err) {
    console.log("Error in getting Users :-" + err);
  }
};
const UserCookie = async (req, res) => {
  const { name, password } = req.body;
  req.session.user = name + password;
  res.cookie("LoggedUser", req.session.user, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // Adjust as needed
  });

  res.send({ user: req.session.user });
};
const currentUser = async (req, res) => {
  const user = req.session.user;
  console.log("Session Data:", req.session);
  if (user) {
    console.log("The user logged in is ", user);
    res.send(`Welcome, ${user}!`);
  } else {
    res.send("Please log in.");
  }
};
const logout = (req, res) => {
  res.clearCookie("LoggedUser");
  res.send("Logged out successfully");
};
module.exports = {
  allproducts,
  addproducts,
  addtoCart,
  getfromCart,
  updatefromCart,
  deletefromCart,
  emptyCart,
  Users,
  UserCookie,
  currentUser,
  logout,
};
