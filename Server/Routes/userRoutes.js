const express = require("express");
const routes = express.Router();
const UserController = require("../Controllers/userController");

routes.get("/getAllUsers", UserController.Users);
routes.post("/getUser", UserController.UserCookie);
routes.get("/currentUser", UserController.currentUser);
routes.get("/logoutcurrentUser", UserController.logout);
routes.get("/getFromCart/:name", UserController.getcart);
routes.put("/updateCart/:name/:productId/:quantity", UserController.updatecart);

module.exports = routes;
