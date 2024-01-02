import react from "react";
import { Container, Typography, Button, Grid } from "@mui/material";
import useStyles from "./styles";
import CartItem from "./CartItem/CartItem";
import { Link } from "react-router-dom";
const Cart = ({
  cart,
  handleUpdateCart,
  handleDeleteCart,
  handleEmptyCart,
}) => {
  const classes = useStyles();
  //   if (!cart.length) return "Loading...";

  const EmptyCart = () => {
    return (
      <Typography variant="h5">
        You have no item in the shopping cart,
        <Link to="/" className={classes.link}>
          start adding items to you cart
        </Link>
      </Typography>
    );
  };
  const FilledCart = () => {
    let subtotal = cart.reduce((a, b) => {
      return a + b.quantity * b.price;
    }, 0);

    return (
      <div>
        <Grid container spacing={3}>
          {cart.map((item) => (
            <Grid item xs={12} sm={4} key={item.id}>
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
