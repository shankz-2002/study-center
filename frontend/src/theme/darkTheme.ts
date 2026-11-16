
import { createTheme } from "@mui/material/styles";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#60a5fa",
    },
    secondary: {
      main: "#a78bfa",
    },
    background: {
      default: "#0f172a",
      paper: "#1e293b",
    },
    text: {
      primary: "#f1f5f9",
      secondary: "#94a3b8",
    },
  },
  shape: {
    borderRadius: 10,
  },
});

export default darkTheme;
