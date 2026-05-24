import { NavLink, useNavigate } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import { SCHEMES, useTheme } from '../../contexts/ThemeContext'
import { useAuth } from '../../contexts/AuthContext'

export function LeftRail() {
  const { user, signOut, isAdmin } = useAuth()
  const { resolvedMode, toggleMode, scheme, setScheme } = useTheme()
  const [pickerOpen, setPickerOpen] = useState(false)
  const pickerRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (pickerRef.current && !pickerRef.current.contains(e.target as Node)) setPickerOpen(false)
    }
    document.addEventListener('mousedown', onClick)
    return () => document.removeEventListener('mousedown', onClick)
  }, [])

  return (
    <aside
      className="left-rail"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        bottom: 0,
        width: 64,
        zIndex: 60,
        background: 'rgba(0,0,0,0.32)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: 96,
        paddingBottom: 18,
        color: '#fff',
        borderRight: '1px solid rgba(255,255,255,0.08)',
      }}
    >
      <button
        type="button"
        aria-label={resolvedMode === 'dark' ? '라이트 모드' : '다크 모드'}
        onClick={toggleMode}
        title={resolvedMode === 'dark' ? '라이트' : '다크'}
        style={railBtnStyle}
      >
        {resolvedMode === 'dark' ? <SunIcon /> : <MoonIcon />}
      </button>

      <div ref={pickerRef} style={{ position: 'relative', marginTop: 10 }}>
        <button
          type="button"
          aria-label="컬러 테마"
          onClick={() => setPickerOpen((v) => !v)}
          style={{
            ...railBtnStyle,
            padding: 0,
            position: 'relative',
          }}
        >
          <span
            style={{
              width: 16,
              height: 16,
              borderRadius: '50%',
              background: SCHEMES.find((s) => s.id === scheme)?.swatch,
              border: '2px solid rgba(255,255,255,0.6)',
              display: 'inline-block',
            }}
          />
        </button>
        {pickerOpen && (
          <div
            style={{
              position: 'absolute',
              left: 'calc(100% + 8px)',
              top: 0,
              background: '#1f2937',
              border: '1px solid rgba(255,255,255,0.12)',
              borderRadius: 10,
              padding: 8,
              boxShadow: '0 12px 32px rgba(0,0,0,0.5)',
              minWidth: 160,
            }}
          >
            <div
              style={{
                fontSize: '0.7rem',
                color: '#D1D5DB',
                padding: '4px 8px 8px',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                fontWeight: 700,
              }}
            >
              컬러 테마
            </div>
            {SCHEMES.map((s) => (
              <button
                key={s.id}
                onClick={() => {
                  setScheme(s.id)
                  setPickerOpen(false)
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  padding: '8px 10px',
                  background: scheme === s.id ? 'rgba(255,255,255,0.08)' : 'transparent',
                  border: 0,
                  borderRadius: 6,
                  color: '#f3f4f6',
                  fontSize: '0.84rem',
                  cursor: 'pointer',
                  width: '100%',
                  textAlign: 'left',
                  fontWeight: scheme === s.id ? 700 : 500,
                }}
              >
                <span style={{ width: 12, height: 12, borderRadius: '50%', background: s.swatch }} />
                {s.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {!user ? (
        <NavLink
          to="/login"
          aria-label="로그인"
          style={{
            ...railBtnStyle,
            marginTop: 10,
            textDecoration: 'none',
            color: '#fff',
            flexDirection: 'column',
            fontSize: 11,
            fontWeight: 700,
            paddingTop: 8,
            paddingBottom: 6,
            height: 'auto',
          }}
        >
          <LoginIcon />
          <span style={{ marginTop: 2 }}>로그인</span>
        </NavLink>
      ) : (
        <>
          <NavLink
            to="/mypage"
            aria-label="내 페이지"
            style={{
              ...railBtnStyle,
              marginTop: 10,
              textDecoration: 'none',
              color: '#fff',
              flexDirection: 'column',
              fontSize: 11,
              fontWeight: 700,
              paddingTop: 8,
              paddingBottom: 6,
              height: 'auto',
            }}
          >
            <UserIcon />
            <span style={{ marginTop: 2 }}>내정보</span>
          </NavLink>
          {isAdmin && (
            <NavLink
              to="/admin"
              aria-label="관리자"
              style={{
                ...railBtnStyle,
                marginTop: 6,
                textDecoration: 'none',
                color: '#fff',
                fontSize: 11,
                fontWeight: 700,
              }}
            >
              ADM
            </NavLink>
          )}
          <button
            onClick={async () => {
              await signOut()
              navigate('/')
            }}
            aria-label="로그아웃"
            style={{ ...railBtnStyle, marginTop: 6 }}
          >
            <LogoutIcon />
          </button>
        </>
      )}

      <div style={{ flex: 1 }} />

      <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 6 }}>
        <li>
          <a href="https://github.com/aebonlee/seminar" target="_blank" rel="noopener noreferrer" aria-label="GitHub" style={railBtnStyle}>
            <GitHubIcon />
          </a>
        </li>
      </ul>

      <style>{`
        @media (max-width: 880px) {
          .left-rail { display: none !important; }
        }
      `}</style>
    </aside>
  )
}

const railBtnStyle: React.CSSProperties = {
  width: 40,
  height: 40,
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'transparent',
  border: '1px solid rgba(255,255,255,0.2)',
  borderRadius: 10,
  color: '#D1D5DB',
  cursor: 'pointer',
  transition: 'all 0.18s var(--ease)',
}

function SunIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </svg>
  )
}
function MoonIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  )
}
function LoginIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
      <polyline points="10 17 15 12 10 7" />
      <line x1="15" y1="12" x2="3" y2="12" />
    </svg>
  )
}
function UserIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21c0-4 4-6 8-6s8 2 8 6" />
    </svg>
  )
}
function LogoutIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" y1="12" x2="9" y2="12" />
    </svg>
  )
}
function GitHubIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 .5C5.7.5.5 5.7.5 12c0 5.1 3.3 9.4 7.8 10.9.6.1.8-.2.8-.6v-2.2c-3.2.7-3.9-1.4-3.9-1.4-.5-1.3-1.3-1.7-1.3-1.7-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.7 1.3 3.4 1 .1-.8.4-1.3.7-1.6-2.5-.3-5.2-1.3-5.2-5.7 0-1.3.4-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.2 1.2.9-.3 1.9-.4 2.9-.4s2 .1 2.9.4c2.2-1.5 3.2-1.2 3.2-1.2.6 1.6.2 2.8.1 3.1.7.8 1.2 1.8 1.2 3.1 0 4.4-2.7 5.4-5.2 5.7.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6 4.5-1.5 7.8-5.8 7.8-10.9C23.5 5.7 18.3.5 12 .5z" />
    </svg>
  )
}
