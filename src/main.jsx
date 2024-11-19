import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ThemeProvider } from "next-themes";
import { CoinsDataProvider } from "./context/CoinDataContext.jsx";
import MyLayout from "./customLayout.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider attribute="class">
      <CoinsDataProvider>
        <MyLayout>
          <App />
        </MyLayout>
      </CoinsDataProvider>
    </ThemeProvider>
  </StrictMode>
);
