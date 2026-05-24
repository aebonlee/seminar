import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import { ErrorBoundary } from './components/ErrorBoundary'
import { AuthProvider } from './contexts/AuthContext'
import { DataProvider } from './contexts/DataContext'
import { ToastProvider } from './contexts/ToastContext'
import { ThemeProvider } from './contexts/ThemeContext'
import './index.css'

// SPA fallback: GitHub Pages 404.html 가 path 를 sessionStorage 에 저장하고
// /로 리다이렉트한 경우, 원래 path 로 복원
try {
  const stashed = sessionStorage.getItem('redirect')
  if (stashed && stashed !== window.location.pathname) {
    sessionStorage.removeItem('redirect')
    window.history.replaceState(null, '', stashed)
  }
} catch {
  /* ignore */
}

const container = document.getElementById('root')
if (container) {
  createRoot(container).render(
    <StrictMode>
      <ErrorBoundary>
        <BrowserRouter>
          <ThemeProvider>
            <ToastProvider>
              <AuthProvider>
                <DataProvider>
                  <App />
                </DataProvider>
              </AuthProvider>
            </ToastProvider>
          </ThemeProvider>
        </BrowserRouter>
      </ErrorBoundary>
    </StrictMode>,
  )
}
