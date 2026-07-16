import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ClerkProvider } from "@clerk/clerk-react";
import { ThemeProvider } from "./context/themeContext";
import { MissingConfiguration } from "./components/templates/missingConfiguration";
import App from "./app";
import "./index.css";
import "./app.css";

const clerkKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

// Hier stecken wir die großen Bausteine einmal zusammen: Clerk, Theme und unsere App.
const content = clerkKey ? (
  <ClerkProvider publishableKey={clerkKey}>
    <App />
  </ClerkProvider>
) : (
  <MissingConfiguration />
);
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>{content}</ThemeProvider>
  </StrictMode>,
);

// Der Service Worker macht PlayDate installierbar und hält wichtige Dateien offline bereit.
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () =>
    navigator.serviceWorker.register("/sw.js"),
  );
}
