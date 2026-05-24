import { NavLink } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Logo } from './Logo'

const links = [
  { to: '/about', label: '소개' },
  { to: '/courses', label: '모집강의' },
  { to: '/network', label: 'DreamIT 사이트' },
  { to: '/mypage', label: '학습안내' },
  { to: '/about#news', label: '공지사항' },
]

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        height: 64,
        color: '#fff',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(12px)' : 'none',
        background: scrolled ? 'rgba(0,0,0,0.45)' : 'transparent',
        transition: 'background 0.25s var(--ease)',
      }}
    >
      <div
        style={{
          height: '100%',
          paddingLeft: 90,
          paddingRight: 24,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 24,
        }}
      >
        <div style={{ color: '#fff' }}>
          <NavLink
            to="/"
            aria-label="홈"
            style={{ color: '#fff', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 10 }}
          >
            <svg width="28" height="28" viewBox="0 0 32 32" aria-hidden>
              <rect x="2" y="2" width="28" height="28" rx="7" fill="#fff" />
              <path d="M10 9 L10 23 L17 23 C21.4 23 24 20.1 24 16 C24 11.9 21.4 9 17 9 Z" fill="var(--accent-700)" />
            </svg>
            <span style={{ fontWeight: 800, letterSpacing: '-0.01em', fontSize: '1.05rem' }}>DreamIT Seminar</span>
          </NavLink>
        </div>

        <nav aria-label="primary" className="primary-nav" style={{ display: 'flex', alignItems: 'center', gap: 36 }}>
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              style={({ isActive }) => ({
                color: isActive ? '#fff' : 'rgba(255,255,255,0.85)',
                fontSize: '1rem',
                fontWeight: 700,
                textDecoration: 'none',
                position: 'relative',
                padding: '6px 0',
              })}
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <NavLink
            to="/apply"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '10px 18px',
              border: '1px solid rgba(255,255,255,0.7)',
              color: '#fff',
              textDecoration: 'none',
              fontWeight: 700,
              fontSize: '0.92rem',
              transition: 'all 0.18s var(--ease)',
            }}
            onMouseEnter={(e) => {
              ;(e.currentTarget as HTMLAnchorElement).style.background = '#fff'
              ;(e.currentTarget as HTMLAnchorElement).style.color = 'var(--accent-700)'
            }}
            onMouseLeave={(e) => {
              ;(e.currentTarget as HTMLAnchorElement).style.background = 'transparent'
              ;(e.currentTarget as HTMLAnchorElement).style.color = '#fff'
            }}
          >
            지금 신청
            <svg width="10" height="10" viewBox="0 0 16 16" fill="none" aria-hidden>
              <path d="M3 8h10M8 3l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </NavLink>

          <button
            className="hamburger"
            aria-label="메뉴 열기"
            onClick={() => setOpen((v) => !v)}
            style={{
              display: 'none',
              width: 40,
              height: 40,
              alignItems: 'center',
              justifyContent: 'center',
              background: 'transparent',
              border: '1px solid rgba(255,255,255,0.4)',
              color: '#fff',
              borderRadius: 8,
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
          style={{
            background: 'rgba(0,0,0,0.92)',
            backdropFilter: 'blur(20px)',
            padding: '18px 24px',
          }}
        >
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              style={{
                display: 'block',
                padding: '12px 0',
                color: '#fff',
                fontWeight: 700,
                borderBottom: '1px solid rgba(255,255,255,0.1)',
                textDecoration: 'none',
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

// Logo is intentionally re-implemented inline above to use white-on-image colors
// The shared Logo() component is kept for other pages.
export { Logo }
