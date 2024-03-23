import React, { useState, useEffect } from "react";
import { Container, Typography, Button, Grid } from "@mui/material";
import useStyles from "./styles";
import CartItem from "./CartItem/CartItem";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  getCartRoute,
  getUpdateCartRoute,
  getUpdateFromCartRoute,
  getEmptyCartRoute,
  getcart,
} from "../../utils/APIRoutes";
import { CssTwoTone } from "@mui/icons-material";

// const getCartRoute = "http://localhost:4000/cart";
// const getUpdateCartRoute = "http://localhost:4000/cart/update";
// const getUpdateFromCartRoute = "http://localhost:4000/cart/delete";
// const getEmptyCartRoute = "http://localhost:4000/cart/empty";

const Cart = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState("");

  const setCurrUser = async () => {
    const ck = document.cookie.split("=");
    const curruser = ck[1];
    return curruser;
  };

  const fetchCart = async () => {
    const user = await setCurrUser();
    const cartList = await axios.get(`${getcart}/${user}`);
    // console.log(cartList.data);
    setCart(cartList.data);
  };

  const handleUpdateCart = async (productId, quantity) => {
    const user = await setCurrUser();
    console.log(productId,user,quantity);
    const itemUpdate = await axios.put(
      `${getUpdateCartRoute}/${user}/${productId}/${quantity}`
    );
    console.log(itemUpdate, typeof itemUpdate);
    setCart(itemUpdate.data);
    fetchCart();
  };

  const handleDeleteCart = async (productId) => {
    await axios.delete(`${getUpdateFromCartRoute}/${productId}`);
    fetchCart();
  };

  const handleEmptyCart = async () => {
    await axios.delete(getEmptyCartRoute);
    fetchCart();
  };
  useEffect(() => {
    const helper = async () => {
      try {
        const ck = document.cookie.split("=");
        if (ck[0] === "LoggedUser") {
          navigate("/cart");
        } else {
          console.log("no user cookie");
          navigate("/");
        }
        setUser(ck[1]);
      } catch (e) {
        console.log(e);
      }
    };
    helper();
    const fillCart = async () => {
      await fetchCart();
    };
    fillCart();
  }, [cart.length]);
  const EmptyCart = () => {
    return (
      <Typography variant="h5">
        You have no item in the shopping cart,
        <Link to="/products" className={classes.link}>
          start adding items to you cart
        </Link>
      </Typography>
    );
  };
  const FilledCart = () => {
    console.log(cart);
    let subtotal = cart.reduce((a, b) => {
      return a + b.quantity * b.product.price;
    }, 0);
    return (
      <div>
        <Grid container spacing={3}>
          {cart.map((item) => (
            <Grid item xs={12} sm={4} key={item.product.id}>
              <CartItem
                item={item}
                onUpdateCart={handleUpdateCart}
                onDeleteCart={handleDeleteCart}
              />
            </Grid>
          ))}
        </Grid>
        <div className={classes.cardDetails}>
          <Typography variant="h4">Subtotal:- Rs.{subtotal}</Typography>
          <div>
            <Button
              className={classes.emptyButton}
              size="large"
              type="button"
              variant="contained"
              color="secondary"
              onClick={() => handleEmptyCart()}
            >
              Empty Cart
            </Button>
            <Button
              className={classes.checkoutButton}
              size="large"
              type="button"
              variant="contained"
              color="primary"
              component={Link}
              to="/checkout"
            >
              Checkout
            </Button>
          </div>
        </div>
      </div>
    );
  };
  return (
    <Container>
      <div className={classes.toolbar} />
      <Typography className={classes.title} variant="h3" gutterBottom>
        Your Shopping cart
      </Typography>
      {cart.length ? <FilledCart /> : <EmptyCart />}
    </Container>
  );
};
export default Cart;
