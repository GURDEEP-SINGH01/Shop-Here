import React, { useEffect } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  IconButton,
} from "@mui/material";
import { AddShoppingCart, Cookie } from "@mui/icons-material";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import makeStyles from "./styles";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Product = ({ product, onAddToCart }) => {
  const classes = makeStyles();
  const navigate = useNavigate();
  useEffect(() => {
    // axios
    //   .get("http://localhost:4000/currentUser")
    //   .then((response) => {
    //     console.log(response.data);
    //     console.log(typeof response.data);

    //     if (response.data === "Welcome, Gurdeep123!") {
    //       console.log("here");
    //       navigate("/products");
    //     } else {
    //       console.log("Go to login");
    //       navigate("/");
    //     }
    //   })
    //   .catch((e) => {
    //     console.log(e);
    //   });

    const ck = document.cookie.split("=");
    console.log(ck[0]);
    if (ck[0] === "LoggedUser") {
      navigate("/products");
    } else {
      console.log("no user cookie");
      navigate("/");
    }
  }, []);
  return (
    <Card className={classes.root}>
      <CardMedia
        className={classes.media}
        image={product.image}
        title={product.name}
      />
      <CardContent>
        <div className={classes.cardContent}>
          <Typography variant="h4" gutterBottom>
            {product.name}
          </Typography>
          <Typography variant="h6">Rs.{product.price}</Typography>
        </div>
        <Typography variant="body1">{product.description}</Typography>
      </CardContent>
      <CardActions className={classes.cardActions} disableSpacing>
        <IconButton
          aria-label="Add to Cart"
          onClick={() => {
            onAddToCart(product.id, 1);
          }}
        >
          <AddShoppingCart />
        </IconButton>
      </CardActions>
    </Card>
  );
};
export default Product;
