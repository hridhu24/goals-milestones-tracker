import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import { BrowserRouter } from "react-router-dom";
import { GoalsContextProvider } from "./contexts/GoalsContext.jsx";
import { ThemeProvider } from "./contexts/ThemeContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <GoalsContextProvider>
          <App />
        </GoalsContextProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
