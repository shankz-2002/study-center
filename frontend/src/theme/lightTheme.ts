
import { createTheme } from "@mui/material/styles";

const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#2563eb",
    },
    secondary: {
      main: "#7c3aed",
    },
    background: {
      default: "#f8fafc",
      paper: "#ffffff",
    },
    text: {
      primary: "#1e293b",
      secondary: "#64748b",
    },
  },
  shape: {
    borderRadius: 10,
  },
});

export default lightTheme;
