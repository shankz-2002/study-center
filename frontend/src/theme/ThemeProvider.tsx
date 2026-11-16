import { useMemo, useState, type ReactNode } from "react";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import lightTheme from "./lightTheme";
import darkTheme from "./darkTheme";
import { ThemeContext, type ThemeMode } from "./ThemeContextStore";

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [mode, setMode] = useState<ThemeMode>(() => {
    const savedMode = localStorage.getItem("theme");
    return savedMode === "dark" ? "dark" : "light";
  });

  const toggleTheme = () => {
    setMode((previousMode) => {
      const newMode = previousMode === "light" ? "dark" : "light";
      localStorage.setItem("theme", newMode);
      return newMode;
    });
  };

  const theme = useMemo(
    () => (mode === "light" ? lightTheme : darkTheme),
    [mode],
  );

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme }}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};
