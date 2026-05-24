import { Link } from 'react-router-dom'

export function Logo({ size = 22 }: { size?: number }) {
  return (
    <Link
      to="/"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 12,
        textDecoration: 'none',
      }}
      aria-label="DreamIT Seminar 홈"
    >
      <svg
        width={size + 8}
        height={size + 8}
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="goldLogo" x1="0" y1="0" x2="32" y2="32">
            <stop offset="0%" stopColor="#f6e7b8" />
            <stop offset="60%" stopColor="#d4af37" />
            <stop offset="100%" stopColor="#b9942a" />
          </linearGradient>
        </defs>
        <path
          d="M16 2 L29 9 L29 23 L16 30 L3 23 L3 9 Z"
          stroke="url(#goldLogo)"
          strokeWidth="1.4"
          fill="none"
        />
        <path
          d="M11 11 L11 21 L16 21 C19.5 21 21.5 18.8 21.5 16 C21.5 13.2 19.5 11 16 11 Z"
          fill="url(#goldLogo)"
        />
      </svg>
      <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
        <span
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: size,
            color: 'var(--text-0)',
            letterSpacing: '0.02em',
            fontWeight: 600,
          }}
        >
          DreamIT
        </span>
        <span
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: size * 0.45,
            color: 'var(--gold-300)',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            marginTop: 4,
            fontWeight: 600,
          }}
        >
          Seminar
        </span>
      </div>
    </Link>
  )
}
