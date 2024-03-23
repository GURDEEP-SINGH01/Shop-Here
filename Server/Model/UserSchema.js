const mongoose = require("mongoose");
const cartItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Products",
    required: true,
  },
  quantity: { type: Number, default: 1 },
});
const user = new mongoose.Schema({
  name: { type: String },
  password: {
    type: String,
  },
  cart: [cartItemSchema],
});
const Usermodel = mongoose.model("User", user);
module.exports = Usermodel;
