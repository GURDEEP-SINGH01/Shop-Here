import React, { useEffect, useState } from "react";
import Products from "./components/Products/Products";
import Product from "./components/Products/Product/Product";
import Navbar from "./components/Navbar/Navbar";
import axios from "axios";
import { ThemeProvider, createTheme } from "@mui/material";
import Cart from "./components/Cart/Cart";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Checkout from "./components/CheckoutForm/Checkout/Checkout";
import Login from "./components/Home/login";
const theme = createTheme();
const App = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [users, setUsers] = useState([]);

  const fetchProducts = async () => {
    const productList = await axios.get("http://localhost:4000/allProducts");
    setProducts(productList.data);
  };
  const fetchCart = async () => {
    const cartList = await axios.get("http://localhost:4000/getfromCart");
    setCart(cartList.data);
  };
  const handleAddtoCart = async (productId, quantity) => {
    console.log(quantity);
    const item = await axios.get(
      `http://localhost:4000/addtocart/${productId}/${quantity}`
    );
    setCart(item.data);
    fetchCart();
  };
  const handleUpdateCart = async (productId, quantity) => {
    const itemUpdate = await axios.put(
      `http://localhost:4000/updatefromcart/${productId}/${quantity}`
    );
    setCart(itemUpdate.data);
    fetchCart();
  };
  const handleDeleteCart = async (productId) => {
    const deleteItem = await axios.delete(
      `http://localhost:4000/updatefromcart/${productId}`
    );
    console.log(deleteItem);
    fetchCart();
  };
  const handleEmptyCart = async () => {
    const emptycart = await axios.delete("http://localhost:4000/emptyCart");
    fetchCart();
  };
  const getUsers = async () => {
    const users = await axios.get("http://localhost:4000/Users");
    console.log(users.data);
    setUsers(users.data);
  };
  useEffect(() => {
    fetchProducts();
    fetchCart();
    getUsers();
  }, []);
  // setInterval(()=>{window.location.reload()},60000);
  console.log(cart);
  console.log(cart.length);
  return (
    <Router>
      <div>
        <ThemeProvider theme={theme}>
          <Navbar totalItems={cart.length} />
        </ThemeProvider>

        <Routes>
          <Route
            exact
            path="/"
            element={<Login users={users}  />}
          ></Route>

          <Route
            exact
            path="/products"
            element={
              <Products products={products} onAddToCart={handleAddtoCart} />
            }
          ></Route>
          <Route
            exact
            path="/cart"
            element={
              <Cart
                cart={cart}
                handleUpdateCart={handleUpdateCart}
                handleDeleteCart={handleDeleteCart}
                handleEmptyCart={handleEmptyCart}
              />
            }
          ></Route>
          <Route
            exact
            path="/checkout"
            element={<Checkout cart={cart} handleEmptyCart={handleEmptyCart} />}
          ></Route>
        </Routes>
      </div>
    </Router>
  );
};
export default App;
