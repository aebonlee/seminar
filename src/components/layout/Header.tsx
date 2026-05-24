import { NavLink, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Logo } from './Logo'
import { ThemeToggle, ColorPicker } from './ThemeToggle'
import { useAuth } from '../../contexts/AuthContext'

const links = [
  { to: '/', label: '홈' },
  { to: '/courses', label: '모집 강의' },
  { to: '/about', label: '소개' },
  { to: '/apply', label: '신청' },
]

export function Header() {
  const { user, signOut, isAdmin } = useAuth()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleSignOut = async () => {
    await signOut()
    navigate('/')
  }

  return (
    <header
      style={{
        position: 'fixed',
        inset: '0 0 auto 0',
        zIndex: 50,
        height: 'var(--nav-h)',
        backdropFilter: 'blur(14px)',
        WebkitBackdropFilter: 'blur(14px)',
        background: scrolled ? 'var(--header-bg)' : 'transparent',
        borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
        transition: 'background 0.25s var(--ease), border-color 0.25s var(--ease)',
      }}
    >
      <div
        className="container"
        style={{
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 20,
        }}
      >
        <Logo />

        <nav
          aria-label="primary"
          className="primary-nav"
          style={{ display: 'flex', alignItems: 'center', gap: 32 }}
        >
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === '/'}
              style={({ isActive }) => ({
                color: isActive ? 'var(--accent-600)' : 'var(--text-2)',
                fontSize: '0.92rem',
                fontWeight: 700,
                padding: '6px 0',
                position: 'relative',
                transition: 'color 0.18s var(--ease)',
              })}
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <ThemeToggle />
          <ColorPicker />

          <div style={{ width: 1, height: 24, background: 'var(--border)', margin: '0 4px' }} />

          {user ? (
            <>
              {isAdmin && (
                <NavLink to="/admin" className="btn btn-ghost btn-sm">
                  관리자
                </NavLink>
              )}
              <NavLink to="/mypage" className="btn btn-ghost btn-sm">
                {user.full_name || '내 정보'}
              </NavLink>
              <button className="btn btn-outline btn-sm" onClick={handleSignOut}>
                로그아웃
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login" className="btn btn-ghost btn-sm">
                로그인
              </NavLink>
              <NavLink to="/apply" className="btn btn-primary btn-sm">
                지금 신청
              </NavLink>
            </>
          )}

          <button
            className="hamburger"
            aria-label="메뉴 열기"
            onClick={() => setOpen((v) => !v)}
            style={{
              display: 'none',
              width: 38,
              height: 38,
              alignItems: 'center',
              justifyContent: 'center',
              background: 'transparent',
              border: '1px solid var(--border)',
              color: 'var(--text)',
              borderRadius: 'var(--r-md)',
              cursor: 'pointer',
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <div
          className="mobile-menu"
          style={{
            background: 'var(--surface)',
            borderBottom: '1px solid var(--border)',
            padding: '18px 20px',
          }}
        >
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === '/'}
              onClick={() => setOpen(false)}
              style={{
                display: 'block',
                padding: '12px 0',
                color: 'var(--text)',
                fontWeight: 600,
                borderBottom: '1px solid var(--border-2)',
              }}
            >
              {l.label}
            </NavLink>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 880px) {
          .primary-nav { display: none !important; }
          .hamburger   { display: inline-flex !important; }
        }
      `}</style>
    </header>
  )
}
