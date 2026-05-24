import { NavLink, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Logo } from './Logo'
import { useAuth } from '../../contexts/AuthContext'

const links = [
  { to: '/', label: 'Home' },
  { to: '/courses', label: 'Courses' },
  { to: '/about', label: 'About' },
  { to: '/apply', label: 'Apply' },
]

export function Header() {
  const { user, signOut, isAdmin } = useAuth()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
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
        background: scrolled ? 'rgba(7, 7, 10, 0.85)' : 'rgba(7, 7, 10, 0.45)',
        borderBottom: scrolled ? '1px solid var(--line-1)' : '1px solid transparent',
        transition: 'all 0.3s var(--ease)',
      }}
    >
      <div
        className="container"
        style={{
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Logo />

        <nav
          aria-label="primary"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 36,
          }}
          className="primary-nav"
        >
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === '/'}
              style={({ isActive }) => ({
                color: isActive ? 'var(--gold-200)' : 'var(--text-1)',
                fontSize: '0.85rem',
                fontWeight: 500,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                position: 'relative',
                padding: '6px 0',
              })}
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          {user ? (
            <>
              {isAdmin && (
                <NavLink to="/admin" className="btn btn-ghost btn-sm">
                  Admin
                </NavLink>
              )}
              <NavLink to="/mypage" className="btn btn-ghost btn-sm">
                {user.full_name || '내 페이지'}
              </NavLink>
              <button className="btn btn-outline btn-sm" onClick={handleSignOut}>
                Sign out
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
              background: 'transparent',
              border: '1px solid var(--line-1)',
              color: 'var(--text-0)',
              padding: 10,
              borderRadius: 'var(--r-md)',
            }}
          >
            ☰
          </button>
        </div>
      </div>

      {open && (
        <div
          className="mobile-menu"
          style={{
            background: 'var(--bg-2)',
            borderBottom: '1px solid var(--line-1)',
            padding: '20px 24px',
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
                color: 'var(--text-0)',
                borderBottom: '1px solid var(--line-2)',
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
          .hamburger { display: inline-flex !important; }
        }
      `}</style>
    </header>
  )
}
