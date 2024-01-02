import react, { useState } from "react";
import {
  Paper,
  Stepper,
  Step,
  StepLabel,
  Typography,
  CircularProgress,
  Divider,
  Button,
  CssBaseline,
} from "@mui/material";
import useStyles from "./styles";
import AddressForm from "../AddressForm";
import PaymentForm from "../PaymentForm";
import { Link } from "react-router-dom";
const steps = ["Shipping address", "Payment details"];

const Checkout = ({ cart, handleEmptyCart }) => {
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
          to="/"
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
      <CssBaseline/>
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
