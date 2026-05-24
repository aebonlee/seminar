import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'

// Restore SPA path after GitHub Pages 404 fallback redirect
const stashed = sessionStorage.getItem('redirect')
if (stashed && stashed !== window.location.pathname) {
  sessionStorage.removeItem('redirect')
  window.history.replaceState(null, '', stashed)
}
import App from './App.tsx'
import { AuthProvider } from './contexts/AuthContext'
import { DataProvider } from './contexts/DataContext'
import { ToastProvider } from './contexts/ToastContext'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ToastProvider>
        <AuthProvider>
          <DataProvider>
            <App />
          </DataProvider>
        </AuthProvider>
      </ToastProvider>
    </BrowserRouter>
  </StrictMode>,
)
