import ReactDOM from "react-dom/client";
import App from "./App";
import { CartProvider } from "./components/Store/context";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <CartProvider>
  <App />
  </CartProvider>
);
