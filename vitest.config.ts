import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

// Kleine Browser-Nachbildung für React-Tests. So brauchen wir keinen echten Browser zu starten.
export default defineConfig({
  plugins: [react()],
  test: { environment: 'jsdom', setupFiles: './src/test/setupTests.ts', globals: true, clearMocks: true },
})
