import React from "react";
import { Typography, List, ListItem, ListItemText } from "@mui/material";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
const Review = ({ cart }) => {
  let subtotal = cart.reduce((a, b) => {
    return a + b.quantity * b.price;
  }, 0);
  console.log(cart);
  return (
    <>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <List disablePadding>
        {cart.map((product) => (
          <ListItem style={{ padding: "10px 0" }} key={product.name}>
            <ListItemText
              primary={
                <div>
                  <span>{product.name}:- </span>
                  <span>{product.description}</span>
                </div>
              }
              secondary={`Quantity: ${product.quantity}`}
            ></ListItemText>
            <Typography variant="body2">
              <CurrencyRupeeIcon sx={{ fontSize: "1em" }} />
              {product.price}
            </Typography>
          </ListItem>
        ))}
        <ListItem style={{ padding: "10px 0" }}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" style={{ fontWeight: "700" }}>
            <CurrencyRupeeIcon sx={{ fontSize: "1em" }} />
            {subtotal}
          </Typography>
        </ListItem>
      </List>
    </>
  );
};
export default Review;
