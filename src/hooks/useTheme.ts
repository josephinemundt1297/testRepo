import { useContext } from "react";
import { themeContext } from "../context/themeContextDefinition";

// Der Hook ist der kurze Weg zum aktuellen Theme und hält die Komponenten schön lesbar.
export function useTheme() {
  const value = useContext(themeContext);
  if (!value) {
    throw new Error(
      "useTheme muss innerhalb des ThemeProvider verwendet werden",
    );
  }
  return value;
}
