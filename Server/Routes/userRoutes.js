const express = require("express");
const routes = express.Router();
const UserController = require("../Controllers/userController");

routes.get("/getAllUsers", UserController.Users);
routes.post("/getUser", UserController.UserCookie);
routes.get("/currentUser", UserController.currentUser);
routes.get("/logoutcurrentUser", UserController.logout);

module.exports = routes;