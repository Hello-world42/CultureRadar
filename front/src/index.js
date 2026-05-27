import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/index.css";

// Restore deep-link path after static-host 404 fallback redirect.
const queryParams = new URLSearchParams(window.location.search);
const redirectedPath = queryParams.get("__redirect");
if (redirectedPath) {
  const cleanPath = redirectedPath.startsWith("/") ? redirectedPath : `/${redirectedPath}`;
  window.history.replaceState(null, "", cleanPath);
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
