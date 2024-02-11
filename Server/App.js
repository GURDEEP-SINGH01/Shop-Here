require("dotenv").config();
const { initializeFirebaseApp, uploadData } = require("./config/Firebase");
const cors = require("cors");
const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const UserRoutes = require("./Routes/userRoutes");
const productRoutes = require("./Routes/productRoutes");

initializeFirebaseApp();

const app = express();
app.use(
  cors({
    origin: "http://localhost:3000",
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

app.listen(process.env.PORT, () => {
  console.log(`server running on port ${process.env.PORT || 4000}`);
});
