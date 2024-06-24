import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import StripeProvider from "./stripe/StripeProvider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <StripeProvider>
      <App />
    </StripeProvider>
  </React.StrictMode>
);
