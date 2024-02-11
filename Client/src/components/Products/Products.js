import React, { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import Product from "./Product/Product";
import makeStyles from "./styles";

import axios from "axios";
import { getAddtoCartRoute, getAllProductsRoute } from "../../utils/APIRoutes";

const Products = () => {
  const [products, setProducts] = useState([]);
  // const [cart, setCart] = useState([]);

  const fetchProducts = async () => {
    const productList = await axios.get(getAllProductsRoute);
    setProducts(productList.data);
  };

  // const fetchCart = async () => {
  //   const cartList = await axios.get(getCartRoute);
  //   setCart(cartList.data);
  // };

  const handleAddtoCart = async (productId, quantity) => {
    await axios.get(`${getAddtoCartRoute}/${productId}/${quantity}`);
    // setCart(item.data);
    // fetchCart();
  };

  useEffect(() => {
    const fetchingProducts = async () => {
      await fetchProducts();
    };
    fetchingProducts();
  }, []);

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
