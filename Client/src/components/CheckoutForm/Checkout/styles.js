import { makeStyles } from "@mui/styles";
import { createTheme } from "@mui/material/styles";
const theme = createTheme({
  mixins: {
    toolbar: {
      minHeight: "2.4em", // Define your desired toolbar height
    },
  },
});
export default makeStyles(() => ({
  appBar: {
    position: "relative",
  },
  toolbar: theme.mixins.toolbar,
  layout: {
    marginTop: "2%",
    width: "50%",
    margin: "0 auto",
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      // marginLeft: "auto",
      // marginRight: "auto",
    },
    [theme.breakpoints.down("md")]: {
      // width: 600,
      marginTop: "6%",
      width: "90%",
      padding: "2em",
      // marginRight: "auto",
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.down("xs")]: {
      width: "100%",
      marginTop: 60,
    },
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end",
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
  divider: {
    margin: "20px 0",
  },
  spinner: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));
