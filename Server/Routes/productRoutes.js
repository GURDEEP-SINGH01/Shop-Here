const ProductController = require("../controllers/productController");
const getcountry = require("../store/ListCountries");
const express = require("express");
const routes = express.Router();

routes.get("/allProducts", ProductController.allproducts);
routes.get("/addProducts", ProductController.addproducts);
routes.get("/addtocart/:id/:quantity", ProductController.addtoCart);
routes.get("/getfromcart", ProductController.getfromCart);
routes.put("/updatefromcart/:id/:quantity", ProductController.updatefromCart);
routes.delete("/updatefromcart/:id", ProductController.deletefromCart);
routes.delete("/emptyCart", ProductController.emptyCart);
routes.get("/getCountries", (req, res) =>
  res.send(getcountry.countriesWithMajorStates)
);

module.exports = routes;
