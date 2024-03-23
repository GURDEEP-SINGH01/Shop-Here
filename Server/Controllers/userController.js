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
const Usermodel = require("../Model/UserSchema");

let firebasedb;
let constarr = [];

const Users = async (req, res) => {
  try {
    Usermodel.find({})
      .select({ _id: 0, __v: 0 })
      .then((response) => res.send(response))
      .catch((err) => {
        res.send(`Error: ${err}`);
      });
  } catch (err) {
    console.log("Error in getting Users :-" + err);
  }
};
const getcart = async (req, res) => {
  const name = req.params.name;
  try {
    const user = await Usermodel.findOne({ name: name }).populate(
      "cart.product",
      "-_id -__v"
    );

    if (!user) {
      res.status(404).send("User not found");
      return;
    }

    res.send(user.cart);
  } catch (err) {
    console.error("Error in getcart:", err);
    res.status(500).send(`Error: ${err}`);
  }
};
const updatecart = async (req, res) => {
  const name = req.params.name;
  const productId = req.params.productId;
  const quantity = req.params.quantity;
  console.log(name, productId, quantity);
  try {
    const user = await Usermodel.findOne({ name: name });
    user.quantity = quantity;
    user.save();
    console.log(user);
    res.send(user);
  } catch (err) {
    (err) => res.send(err);
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
  getcart,
  updatecart,
};
