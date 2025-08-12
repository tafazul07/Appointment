import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter as Router } from "react-router-dom";
import { ServiceProvider } from "./context/ServiceContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Router>
      <ServiceProvider>
        <App />
      </ServiceProvider>
    </Router>
  </StrictMode>
);
