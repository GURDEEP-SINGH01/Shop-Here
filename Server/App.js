const { initializeFirebaseApp, uploadData } = require("./config/Firebase");
const routes = require("./Routes/Routes");
const cors = require("cors");
const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");
var app = express();
initializeFirebaseApp();
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["POST", "GET","PUT","DELETE"],
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
app.use("/", routes);
app.listen(4000, () => {
  console.log("server running on port 4000");
});

