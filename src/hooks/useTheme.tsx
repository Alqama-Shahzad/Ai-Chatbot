
import { useState, useEffect } from "react";
import { useLocalStorage } from "./useLocalStorage";

export function useTheme() {
  const [isDarkTheme, setIsDarkTheme] = useLocalStorage("theme", 
    // Default value based on system preference
    window.matchMedia("(prefers-color-scheme: dark)").matches
  );

  useEffect(() => {
    // Apply theme to document element
    if (isDarkTheme) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkTheme]);

  const toggleTheme = () => {
    setIsDarkTheme(prev => !prev);
  };

  return { isDarkTheme, toggleTheme };
}
