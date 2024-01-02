import { createStyles, makeStyles } from "@mui/styles";

export default makeStyles(() => ({
  root: {
    maxWidth: "100%",
  },
  media: {
    height: "10em",
    paddingTop: "30.25%", // 16:9
  },
  cardActions: {
    display: "flex",
    justifyContent: "flex-end",
  },
  cardContent: {
    display: "flex",
    justifyContent: "space-between",
  },
}));
