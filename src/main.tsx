import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ClerkProvider, SignInButton, SignedIn, SignedOut } from '@clerk/clerk-react'
import { RouterProvider } from '@tanstack/react-router'
import { router } from './App'
import './index.css'

const key = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY
const app = <RouterProvider router={router} />

const authenticatedApp = key ? (
  <ClerkProvider publishableKey={key}>
    <SignedOut>
      <main className="auth-page">
        <section className="auth-card" aria-labelledby="auth-title">
          <span className="auth-logo" aria-hidden="true">✦</span>
          <p className="eyebrow">Willkommen bei PlayPal</p>
          <h1 id="auth-title">Mehr Spielen.<br/>Weniger Organisieren.</h1>
          <p>Plane sichere PlayDates mit Familien, denen du vertraust.</p>
          <SignInButton mode="modal"><button className="primary-button">Sicher anmelden</button></SignInButton>
          <small>Deine Daten bleiben privat und werden nur mit eingeladenen Familien geteilt.</small>
        </section>
      </main>
    </SignedOut>
    <SignedIn>{app}</SignedIn>
  </ClerkProvider>
) : app

createRoot(document.getElementById('root')!).render(
  <StrictMode>{authenticatedApp}</StrictMode>,
)
