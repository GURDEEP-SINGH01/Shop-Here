const getdata = require("../Products/Products");
const getcountry = require("../config/ListCountries");
const express = require("express");
const routes = express.Router();
routes.get("/allProducts", getdata.allproducts);
routes.get("/addProducts", getdata.addproducts);
routes.get("/addtocart/:id/:quantity", getdata.addtoCart);
routes.get("/getfromcart", getdata.getfromCart);
routes.put("/updatefromcart/:id/:quantity", getdata.updatefromCart);
routes.delete("/updatefromcart/:id", getdata.deletefromCart);
routes.delete("/emptyCart", getdata.emptyCart);
routes.get("/getCountries", (req, res) =>
  res.send(getcountry.countriesWithMajorStates)
);
routes.get("/Users", getdata.Users);
routes.post("/User", getdata.UserCookie);
routes.get("/currentUser", getdata.currentUser);
routes.get("/logoutcurrentUser", getdata.logout);
module.exports = routes;
