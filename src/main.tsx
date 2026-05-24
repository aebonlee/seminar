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

function showFatal(message: string) {
  const root = document.getElementById('root')
  if (!root) return
  root.innerHTML = `
    <div style="min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px;background:#0b1220;color:#f1f5f9;font-family:'Nanum Gothic','Apple SD Gothic Neo',sans-serif;">
      <div style="max-width:520px;text-align:center">
        <div style="font-size:48px;margin-bottom:14px">⚠️</div>
        <h1 style="font-size:22px;font-weight:800;margin:0 0 10px">앱을 시작할 수 없습니다</h1>
        <p style="color:#94a3b8;margin-bottom:18px;font-size:14px;line-height:1.7">
          캐시 충돌일 수 있습니다. 아래 버튼으로 로컬 데이터를 비우고 새로 로드하세요.
        </p>
        <pre style="text-align:left;background:#131f33;padding:12px;border-radius:8px;border:1px solid #1f2c44;font-size:12px;color:#cbd5e1;overflow:auto;max-height:160px;margin-bottom:18px">${message}</pre>
        <button id="__reset" style="padding:12px 24px;background:#2563eb;color:#fff;border:0;border-radius:8px;font-size:14px;font-weight:800;cursor:pointer">캐시 초기화 후 다시 시도</button>
      </div>
    </div>`
  document.getElementById('__reset')?.addEventListener('click', () => {
    try {
      Object.keys(localStorage)
        .filter((k) => k.startsWith('seminar:'))
        .forEach((k) => localStorage.removeItem(k))
      sessionStorage.clear()
    } catch {
      /* ignore */
    }
    window.location.href = '/'
  })
}

try {
  const container = document.getElementById('root')
  if (!container) throw new Error('#root element not found')
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
} catch (err) {
  console.error('[bootstrap]', err)
  showFatal((err as Error)?.message ?? String(err))
}

// 1.5초 후에도 #root 가 비어있다면 무언가 잘못된 상태 — fallback UI 노출
setTimeout(() => {
  const r = document.getElementById('root')
  if (r && r.innerHTML.trim() === '') {
    showFatal('렌더링이 완료되지 않았습니다. 캐시 충돌일 가능성이 있습니다.')
  }
}, 1500)
