const { initializeFirebaseApp, uploadData } = require("./config/Firebase");
const routes = require("./Routes/Routes");
const cors = require("cors");
const express = require("express");
var app = express();
initializeFirebaseApp();
app.use(cors());
app.use("/", routes);
app.listen(4000, () => {
  console.log("server running on port 4000");
});
// app.get("/get", async (req, res) => {
//   try {
//     await uploadData();
//     res.send("Hello");
//   } catch (err) {
//     console.log("Error her is :-" + err);
//   }
// });
