import { createContext, useContext, useState } from "react";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "light"
  );

  const toggleTheme = () => {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    localStorage.setItem("theme", next);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === "light" ? "light" : "dark"}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
