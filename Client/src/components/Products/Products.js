import React, { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import Product from "./Product/Product";
import makeStyles from "./styles";

import axios from "axios";
import {
  getAddtoCartRoute,
  getAllProductsRoute,
  getCartRoute,
} from "../../utils/APIRoutes";
import { RouterProvider, useNavigate } from "react-router-dom";
import { useCart } from "../Store/context";
import { set } from "mongoose";

const Products = () => {
  const [products, setProducts] = useState([]);
  const { cart, fetchCart } = useCart();
  const [user, setUser] = useState("");
  const navigate = useNavigate();
  const fetchProducts = async () => {
    const productList = await axios.get(getAllProductsRoute);
    console.log(productList.data);
    setProducts(productList.data);
  };

  const handleAddtoCart = async (productId, quantity) => {
    // console.log(user, productId);
    const item = await axios.get(
      `${getAddtoCartRoute}/${productId}/${quantity}/${user}`
    );
    // setCart(item.data);
    fetchCart();
  };

  useEffect(() => {
    const fetchingProducts = async () => {
      await fetchProducts();
    };
    fetchingProducts();
    const ck = document.cookie.split("=");
    // console.log(ck[1]);
    if (ck[0] === "LoggedUser") {
      navigate("/products");
    } else {
      console.log("no user cookie");
      navigate("/");
    }
    setUser(ck[1]);
  }, []);
  useEffect(() => {
    fetchCart();
  }, [cart.length]);

  const classes = makeStyles();
  return (
    <main className={classes.content}>
      <div className={classes.toolbar}></div>
      <Grid
        container
        justifyContent={"center"}
        alignItems={"center"}
        spacing={4}
      >
        {products.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
            <Product product={product} onAddToCart={handleAddtoCart} />
          </Grid>
        ))}
      </Grid>
    </main>
  );
};
export default Products;
