import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider.tsx";
import { CssBaseline } from "@mui/material";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { ThemeProvider } from "./theme/ThemeProvider";
createRoot(document.getElementById("root")!).render(
  <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
    <ThemeProvider>
      <CssBaseline />
      <BrowserRouter>
        <AuthProvider>
          <App />
        </AuthProvider>
      </BrowserRouter>
    </ThemeProvider>
  </GoogleOAuthProvider>,
);
