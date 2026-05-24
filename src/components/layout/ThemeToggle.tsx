import { useEffect, useRef, useState } from 'react'
import { SCHEMES, useTheme } from '../../contexts/ThemeContext'

export function ThemeToggle() {
  const { resolvedMode, toggleMode } = useTheme()
  return (
    <button
      type="button"
      aria-label={resolvedMode === 'dark' ? '라이트 모드로 전환' : '다크 모드로 전환'}
      title={resolvedMode === 'dark' ? '라이트 모드' : '다크 모드'}
      onClick={toggleMode}
      style={{
        width: 38,
        height: 38,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'transparent',
        border: '1px solid var(--border)',
        borderRadius: 'var(--r-md)',
        color: 'var(--text-2)',
        cursor: 'pointer',
        transition: 'all 0.18s var(--ease)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'var(--accent-500)'
        e.currentTarget.style.color = 'var(--accent-500)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'var(--border)'
        e.currentTarget.style.color = 'var(--text-2)'
      }}
    >
      {resolvedMode === 'dark' ? (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
        </svg>
      ) : (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      )}
    </button>
  )
}

export function ColorPicker() {
  const { scheme, setScheme } = useTheme()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', onClick)
    return () => document.removeEventListener('mousedown', onClick)
  }, [])

  const current = SCHEMES.find((s) => s.id === scheme) ?? SCHEMES[0]

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <button
        type="button"
        aria-label="컬러 테마 선택"
        title="컬러 테마"
        onClick={() => setOpen((v) => !v)}
        style={{
          width: 38,
          height: 38,
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'transparent',
          border: '1px solid var(--border)',
          borderRadius: 'var(--r-md)',
          cursor: 'pointer',
          transition: 'all 0.18s var(--ease)',
        }}
      >
        <span
          style={{
            width: 16,
            height: 16,
            borderRadius: '50%',
            background: current.swatch,
            boxShadow: '0 0 0 2px var(--surface), 0 0 0 3px var(--border)',
          }}
        />
      </button>

      {open && (
        <div
          role="menu"
          style={{
            position: 'absolute',
            top: 'calc(100% + 8px)',
            right: 0,
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--r-md)',
            boxShadow: 'var(--shadow-lg)',
            padding: 10,
            display: 'flex',
            flexDirection: 'column',
            gap: 4,
            zIndex: 60,
            minWidth: 168,
          }}
        >
          <div
            style={{
              fontSize: '0.72rem',
              fontWeight: 700,
              color: 'var(--text-3)',
              padding: '4px 8px 6px',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
            }}
          >
            컬러 테마
          </div>
          {SCHEMES.map((s) => {
            const active = s.id === scheme
            return (
              <button
                key={s.id}
                onClick={() => {
                  setScheme(s.id)
                  setOpen(false)
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  padding: '8px 10px',
                  background: active ? 'var(--hover)' : 'transparent',
                  border: 0,
                  borderRadius: 'var(--r-sm)',
                  color: 'var(--text)',
                  fontSize: '0.85rem',
                  textAlign: 'left',
                  cursor: 'pointer',
                  fontWeight: active ? 700 : 500,
                }}
              >
                <span
                  style={{
                    width: 14,
                    height: 14,
                    borderRadius: '50%',
                    background: s.swatch,
                    flexShrink: 0,
                  }}
                />
                <span style={{ flex: 1 }}>{s.label}</span>
                {active && (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                )}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
