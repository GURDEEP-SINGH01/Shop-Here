import React, { useState } from "react";
import {
  Paper,
  Stepper,
  Step,
  StepLabel,
  Typography,
  Button,
  CssBaseline,
} from "@mui/material";
import useStyles from "./styles";
import AddressForm from "../AddressForm";
import PaymentForm from "../PaymentForm";
import { Link, defer, useLoaderData } from "react-router-dom";
import axios from "axios";
import { getCartRoute, getEmptyCartRoute } from "../../../utils/APIRoutes";
const steps = ["Shipping address", "Payment details"];

const Checkout = () => {
  const { cart, handleEmptyCart } = useLoaderData();  
  const [activeStep, setActiveStep] = useState(0);
  const classes = useStyles();

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const nextStep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1);
  const backStep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);
  let tempcart = [...cart];
  const nextdata = (data) => {
    setFirstname(data.firstName);
    setLastname(data.lastName);
    nextStep();
  };
  const next = () => {
    nextStep();
  };
  let Confirmation = () => {
    console.log(tempcart);
    return (
      <>
        <div>
          <Typography>
            Thankyou for your purchase,{firstname} {lastname}
          </Typography>
          {tempcart.map((product) => (
            <>
              <br />
              <Typography variant="body2" key={product.id}>
                {product.name}
              </Typography>
              <Typography variant="body2" key={product.description}>
                {product.description}
              </Typography>
            </>
          ))}
        </div>
        <br />
        <Button
          component={Link}
          to="/products"
          variant="outlined"
          type="button"
          onClick={() => handleEmptyCart()}
        >
          Back to Home
        </Button>
      </>
    );
  };
  const Form = () =>
    activeStep === 0 ? (
      <AddressForm nextdata={nextdata} />
    ) : (
      <PaymentForm
        cart={cart}
        backStep={backStep}
        next={next}
        handleEmptyCart={handleEmptyCart}
      />
    );
  return (
    <>
      <CssBaseline />
      <div className={classes.toolbar} />
      <main className={classes.layout}>
        <Paper>
          <Typography variant="h4" align="center">
            Checkout
          </Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((step) => (
              <Step key={step}>
                <StepLabel>{step}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? <Confirmation /> : <Form />}
        </Paper>
      </main>
    </>
  );
};
export default Checkout;

export const CheckoutLoader = async () => {
  const cartList = await axios.get(getCartRoute);
  console.log(cartList.data);

  const handleEmptyCart = async () => {
    await axios.delete(getEmptyCartRoute);
  };

  return defer({
    cart: cartList.data,
    handleEmptyCart,
  });
};
