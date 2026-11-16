import { createContext, useContext } from "react";

export type ThemeMode = "light" | "dark";

interface ThemeContextType {
  mode: ThemeMode;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined
);

export const useThemeMode = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useThemeMode must be used inside ThemeProvider");
  }

  return context;
};