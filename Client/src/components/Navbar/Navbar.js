import react from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Badge,
  MenuItem,
  Menu,
  Typography,
} from "@mui/material";
import { AddShoppingCart, ShoppingCart } from "@mui/icons-material";
import logo from "../../assets/commerce.png";
import makeStyles from "./styles";
import { Link, useLocation } from "react-router-dom";

const Navbar = ({ totalItems }) => {
  const classes = makeStyles();
  const location = useLocation();
  return (
    <>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography
            component={Link}
            to="/products"
            className={classes.title}
            variant="h6"
            color="inherit"
          >
            <img src={logo} height="25px" className={classes.image} />
            E-Store
          </Typography>
          <div className={classes.grow} />
          {location.pathname == "/products" && (
            <div className={classes.button}>
              <IconButton
                component={Link}
                to="/cart"
                aria-label="Show cart item"
                color="inherit"
              >
                <Badge badgeContent={totalItems} color="secondary">
                  <ShoppingCart></ShoppingCart>
                </Badge>
              </IconButton>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
};
export default Navbar;
