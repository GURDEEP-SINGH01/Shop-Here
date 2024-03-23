import {
  AppBar,
  Toolbar,
  IconButton,
  Badge,
  Typography,
  Button,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import { ShoppingCart } from "@mui/icons-material";
import logo from "../../assets/commerce.png";
import makeStyles from "./styles";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useCart } from "../Store/context";
import { useEffect } from "react";

const theme = createTheme({
  palette: {
    primary: {
      main: "#ffffff",
    },
    secondary: {
      main: "#E0C2FF",
      light: "#F5EBFF",
      contrastText: "#47008F",
    },
  },
});
const Navbar = () => {
  const classes = makeStyles();
  const location = useLocation();
  const navigate = useNavigate();
  const { cart, fetchCart } = useCart();
  const logout = async () => {
    console.log(document.cookie);
    const ck = document.cookie.split("=");
    if (ck[0] === "LoggedUser") {
      document.cookie = `${ck[0]}=; expires=Thu, 01 Jan 1970 00:00:00 GMT;`;
      navigate("/");
    }
  };
  useEffect(() => {
    fetchCart();
  }, [cart.length]);
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
            <img
              src={logo}
              alt="logo"
              height="25px"
              className={classes.image}
            />
            E-Store
          </Typography>
          <div className={classes.grow} />
          {(location.pathname === "/products" ||
            location.pathname === "/cart" ||
            location.pathname === "/checkout") && (
            <div className={classes.button}>
              <IconButton
                component={Link}
                to="/cart"
                aria-label="Show cart item"
                color="inherit"
              >
                {location.pathname === "/products" && (
                  <Badge badgeContent={cart.length} color="secondary">
                    <ShoppingCart></ShoppingCart>
                  </Badge>
                )}
              </IconButton>
              <ThemeProvider theme={theme}>
                <Button
                  onClick={logout}
                  variant="contained"
                  size="medium"
                  style={{ fontWeight: "700", color: "#1976d2" }}
                >
                  Logout
                </Button>
              </ThemeProvider>
            </div>
          )}
        </Toolbar>
      </AppBar>
      <Outlet />
    </>
  );
};
export default Navbar;
