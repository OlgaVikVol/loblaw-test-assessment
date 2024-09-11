import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { worker } from "./mocks/browser.js";

worker.start().then(() =>
  createRoot(document.getElementById("root")).render(
    <StrictMode>
      <App />
    </StrictMode>
  )
);
