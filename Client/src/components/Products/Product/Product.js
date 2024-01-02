import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  IconButton,
} from "@mui/material";
import { AddShoppingCart } from "@mui/icons-material";
import makeStyles from "./styles";

const Product = ({ product, onAddToCart }) => {
  const classes = makeStyles();
  let add = 1;
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
          <Typography variant="h6">{product.price}</Typography>
        </div>
        <Typography variant="body1">{product.description}</Typography>
      </CardContent>
      <CardActions className={classes.cardActions} disableSpacing>
        <IconButton
          aria-label="Add to Cart"
          onClick={() => {
            onAddToCart(product.id,  1);
          }}
        >
          <AddShoppingCart />
        </IconButton>
      </CardActions>
    </Card>
  );
};
export default Product;
