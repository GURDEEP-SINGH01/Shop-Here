const {
  doc,
  getDoc,
  setDoc,
  collection,
  getDocs,
  deleteDoc,
} = require("firebase/firestore");
const { getFirebaseDB } = require("../config/Firebase");
const Product = require("../store/Product");
const Productsmodel = require("../Model/ProductsSchema");
const Usermodel = require("../Model/UserSchema");

let firebasedb;
let constarr = [];

// const initializeFirebaseDB = () => {
//   firebasedb = getFirebaseDB();
// };

const allproducts = async (req, res) => {
  Productsmodel.find()
    .select({ _id: 0, __v: 0 })
    .then((response) => res.send(response))
    .catch((err) => res.send("Error: ", err));
};
const setallproducts = async (req, res) => {
  try {
    const data = req.body;
    const product = new Productsmodel({
      id: data.id,
      name: data.name,
      description: data.description,
      price: data.price,
      image: data.image,
    });
    product.save();
    res.send("Product added");
  } catch (err) {
    res.send("Error: " + err);
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
  try {
    const id = req.params.id;
    const quantity = req.params.quantity;
    const username = req.params.name;
    console.log("Hello");
    const product = await Productsmodel.findOne({ id: id });
    const user = await Usermodel.findOne({ name: username });
    console.log("Product", product);
    console.log("USER", user);
    // product.quantity(quantity);
    user.cart.push({
      product: product,
      quantity: user.cart.quantity ? user.cart.quantity + 1 : 1,
    });
    await user.save();
    console.log("Item added to cart");
    res.send(user);
  } catch (err) {
    console.log("Error occured while adding to cart :-" + err);
  }
};
const getfromCart = async (req, res) => {
  try {
    const username = req.params.name;
    console.log(username);
    const user = await Usermodel.findOne({ name: username });
    console.log("getFromcart", user);
    console.log(user.cart);
    res.send(user.cart);
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

module.exports = {
  allproducts,
  addproducts,
  addtoCart,
  getfromCart,
  updatefromCart,
  deletefromCart,
  emptyCart,
  setallproducts,
};
