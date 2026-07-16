import { createContext } from "react";

// Hier steht nur der gemeinsame Vertrag. Provider und Hook können ihn so beide benutzen.
export type Theme = "light" | "dark" | "system";

export type ThemeContextValue = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  resolvedTheme: "light" | "dark";
};

export const themeContext = createContext<ThemeContextValue | null>(null);
