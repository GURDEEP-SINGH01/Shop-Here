require("dotenv").config();
const { initializeFirebaseApp, uploadData } = require("./config/Firebase");
const cors = require("cors");
const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const UserRoutes = require("./Routes/userRoutes");
const productRoutes = require("./Routes/productRoutes");
const app = express();

initializeFirebaseApp();
const mongoose = require("mongoose");
const Usermodel = require("./Model/UserSchema");
const Productsmodel = require("./Model/ProductsSchema");
mongoose.connect("mongodb+srv://gurdeep:mongodb@cluster0.d9xlx6g.mongodb.net/");

const db = mongoose.connection;
db.on("error", (err) => {
  console.log("Error occured while connecting " + err);
});
db.once("open", () => {
  console.log("Connection made with Db");
});

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.use(
  session({
    secret: "secret", // Change this to a secure key
    resave: false,
    saveUninitialized: true,
    cookie: { httpOnly: true, secure: false }, // Set to true if using HTTPS
  })
);

app.use("/user", UserRoutes);
app.use("/products", productRoutes);
app.get("/user/get/:id", async (req, res) => {
  try {
    const username = req.params.id;
    console.log(username);
    const user =await Productsmodel.find({id:username});
    console.log(user);
    res.send(user);
  } catch (err) {
    res.send("Error" + err);
  }
});

app.listen(process.env.PORT || 4000, () => {
  console.log(`server running on port ${process.env.PORT || 4000}`);
});
