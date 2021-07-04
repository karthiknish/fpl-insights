import React from "react";

export const ThemeContext = React.createContext({
  theme: "light",
  toggleTheme: () => {
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
  },
});
