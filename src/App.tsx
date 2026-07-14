import { RouterProvider } from '@tanstack/react-router'
import { AuthGate } from './components/templates/AuthGate'
import { router } from './router'

export default function App(){return <AuthGate><RouterProvider router={router}/></AuthGate>}
