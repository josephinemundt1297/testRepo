import { RouterProvider } from "@tanstack/react-router";
import { AuthGate } from "./components/templates/authGate";
import { router } from "./router";

// Die App bleibt absichtlich winzig: Erst Login prüfen, dann den Router anzeigen.
export default function App() {
  return (
    <AuthGate>
      <RouterProvider router={router} />
    </AuthGate>
  );
}
