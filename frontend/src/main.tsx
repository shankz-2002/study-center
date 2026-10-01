import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider.tsx";
import { CssBaseline } from "@mui/material";

createRoot(document.getElementById("root")!).render(
  <AuthProvider>
    <BrowserRouter>
      <CssBaseline />
      <App />
    </BrowserRouter>
  </AuthProvider>,
);
