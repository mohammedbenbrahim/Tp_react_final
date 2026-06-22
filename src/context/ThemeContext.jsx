import React, { createContext, useContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

// Create context
const ThemeContext = createContext();

/**
 * Theme Provider
 */
export function ThemeProvider({ children }) {
  // ======================
  // PERSIST THEME
  // ======================
  const [theme, setTheme] = useLocalStorage("theme", "light");

  // ======================
  // TOGGLE FUNCTION
  // ======================
  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  // ======================
  // CONTEXT VALUE
  // ======================
  const value = {
    theme,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      <div className={theme}>{children}</div>
    </ThemeContext.Provider>
  );
}

/**
 * Hook to use theme context
 */
export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used inside ThemeProvider");
  }

  return context;
}

export default ThemeContext;