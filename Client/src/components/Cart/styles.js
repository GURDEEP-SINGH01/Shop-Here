import { makeStyles } from "@mui/styles";
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  mixins: {
    toolbar: {
      minHeight: "4.5em", // Define your desired toolbar height
    },
  },
});
export default makeStyles(() => ({
  toolbar: theme.mixins.toolbar,
  title: {
    marginTop: "6%",
  },
  emptyButton: {
    minWidth: "150px",
    [theme.breakpoints.down("xs")]: {
      marginBottom: "5px",
    },
    [theme.breakpoints.up("xs")]: {
      marginRight: "20px",
    },
  },
  checkoutButton: {
    minWidth: "150px",
    [theme.breakpoints.down('sm')]: { width: "81%" },
    
  },
  link: {
    textDecoration: "none",
  },
  cardDetails: {
    display: "flex",
    marginTop: "10%",
    width: "100%",
    justifyContent: "space-between",
  },
}));
