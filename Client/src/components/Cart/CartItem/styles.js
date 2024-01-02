import { makeStyles } from "@mui/styles";

export default makeStyles(() => ({
  media: {
    height: 260,
    backgroundImage: "cover",
  },
  cardContent: {
    display: "flex",
    justifyContent: "space-between",
  },
  cartActions: {
    justifyContent: "space-between",
  },
  buttons: {
    display: "flex",
    alignItems: "center",
  },
}));
