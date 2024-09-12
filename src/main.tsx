import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { worker } from "./mocks/browser.js";
import { App } from "./App";

worker.start().then(() =>
  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <App />
    </StrictMode>
  )
);
