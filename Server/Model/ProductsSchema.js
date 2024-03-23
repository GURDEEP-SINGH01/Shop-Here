const mongoose = require("mongoose");
const products = new mongoose.Schema(
  {
    id: { type: Number },
    name: { type: String },
    description: {
      type: String,
    },
    image: {
      type: String,
    },
    price: {
      type: String,
    },
  },
);
const Productsmodel = mongoose.model("Products", products);
module.exports = Productsmodel;
