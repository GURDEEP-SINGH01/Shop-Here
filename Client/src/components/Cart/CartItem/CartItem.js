import React from "react";
import {
  Typography,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
} from "@mui/material";
import useStyles from "./styles";
const CartItem = ({ item, onUpdateCart, onDeleteCart }) => {
  const classes = useStyles();
  return (
    <Card>
      <CardMedia image={item.image} alt={item.name} className={classes.media} />
      <CardContent className={classes.cardContent}>
        <Typography variant="h5">{item.name}</Typography>
        <Typography variant="h5">Rs.{item.price}</Typography>
      </CardContent>
      <CardActions className={classes.cartActions}>
        <div className={classes.buttons}>
          <Button
            type="Button"
            size="small"
            onClick={() => onUpdateCart(item.id, item.quantity - 1)}
          >
            -
          </Button>
          <Typography>{item.quantity}</Typography>
          <Button
            type="Button"
            size="small"
            onClick={() => onUpdateCart(item.id, item.quantity + 1)}
          >
            +
          </Button>
        </div>
        <Button
          variant="contained"
          type="Button"
          color="secondary"
          onClick={()=>onDeleteCart(item.id)}
        >
          Remove
        </Button>
      </CardActions>
    </Card>
  );
};
export default CartItem;
