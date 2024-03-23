// CartContext.js
import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import {
  getAddtoCartRoute,
  getCartRoute,
  getcart,
} from "../../utils/APIRoutes";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const setCurrUser = async () => {
    const ck = document.cookie.split("=");
    const curruser = ck[1];
    return curruser;
  };
  const fetchCart = async () => {
    const curruser = await setCurrUser();
    // console.log(curruser);
    if (curruser) {
      const cartList = await axios.get(`${getcart}/${curruser}`);
      // console.log(cartList.data);
      setCart(cartList.data);
    }
  };

  useEffect(() => {
    const fetchingProducts = async () => {
      await fetchCart();
    };
    fetchingProducts();
  }, [cart.length]);

  return (
    <CartContext.Provider value={{ cart, fetchCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
