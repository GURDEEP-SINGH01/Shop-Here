import React from "react";
import { ThemeProvider, createTheme } from "@mui/material";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Products from "./components/Products/Products";
import Navbar from "./components/Navbar/Navbar";
import Checkout from "./components/CheckoutForm/Checkout/Checkout";
import Cart from "./components/Cart/Cart";
import Login from "./components/Home/login";
import { CheckoutLoader } from "./components/CheckoutForm/Checkout/Checkout";
import { CartProvider } from "./components/Store/context";
// import {CheckoutLoader} from './components/CheckoutForm/Checkout/CheckoutLoader';

const theme = createTheme();

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ThemeProvider theme={theme}>
          <Navbar />
      </ThemeProvider>
    ),
    id: "root",
    children: [
      {
        index: true,
        element: <Login />,
      },
      {
        path: "products",
        element: <Products />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "checkout",
        element: <Checkout />,
        loader: CheckoutLoader,
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
