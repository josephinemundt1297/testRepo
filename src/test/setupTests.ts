import '@testing-library/jest-dom/vitest'
import { afterEach } from 'vitest'

// Sauberer Tisch nach jedem Test: Gespeicherte Testdaten sollen nicht in den nächsten Test rutschen.
afterEach(() => localStorage.clear())
