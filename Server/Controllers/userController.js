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
const Product = require("../store/Product");
const { response, request } = require("express");
const axios = require("axios");

let firebasedb;
let constarr = [];

const initializeFirebaseDB = () => {
  firebasedb = getFirebaseDB();
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

  res.send({ user: name, password: password });
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
  Users,
  UserCookie,
  currentUser,
  logout,
};
