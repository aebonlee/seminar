import { Link } from 'react-router-dom'

export function Logo({ size = 20 }: { size?: number }) {
  return (
    <Link
      to="/"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 10,
        textDecoration: 'none',
        color: 'inherit',
      }}
      aria-label="DreamIT Seminar 홈"
    >
      <svg
        width={size + 12}
        height={size + 12}
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        <rect x="2" y="2" width="28" height="28" rx="7" fill="var(--accent-600)" />
        <path
          d="M10 9 L10 23 L17 23 C21.4 23 24 20.1 24 16 C24 11.9 21.4 9 17 9 Z"
          fill="#ffffff"
        />
      </svg>
      <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.05 }}>
        <span
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: size,
            color: 'var(--text)',
            letterSpacing: '-0.01em',
            fontWeight: 800,
          }}
        >
          DreamIT
        </span>
        <span
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: size * 0.42,
            color: 'var(--accent-600)',
            letterSpacing: '0.24em',
            textTransform: 'uppercase',
            marginTop: 4,
            fontWeight: 800,
          }}
        >
          Seminar
        </span>
      </div>
    </Link>
  )
}
