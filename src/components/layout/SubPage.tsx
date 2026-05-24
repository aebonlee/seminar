import { Link } from 'react-router-dom'
import type { ReactNode } from 'react'

export interface Crumb {
  label: string
  to?: string
}

interface Props {
  title: string
  description?: string
  breadcrumb?: Crumb[]
  children: ReactNode
  /** 상단 영역 우측 액션 (옵션) */
  actions?: ReactNode
}

/**
 * HYCU 서브페이지 패턴
 * - 풀스크린 fixed 배경 이미지 + 다크 오버레이
 * - 상단 hero 영역: 큰 화이트 제목 (가운데 정렬)
 * - 브레드크럼 바 (액센트 컬러 반투명, max-width 컨테이너)
 * - 콘텐츠 컨테이너 (max-width 1290px, 가운데)
 */
export function SubPage({ title, description, breadcrumb, children, actions }: Props) {
  return (
    <div style={{ position: 'relative', minHeight: '100vh', color: '#0f172a' }}>
      {/* 풀스크린 배경 — fixed로 parallax 효과 */}
      <div
        aria-hidden
        style={{
          position: 'fixed',
          inset: 0,
          backgroundImage: 'url(/hero-bg.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          zIndex: -2,
        }}
      />
      {/* 다크 오버레이 (가독성 + 헤더와의 자연스러운 연결) */}
      <div
        aria-hidden
        style={{
          position: 'fixed',
          inset: 0,
          background:
            'linear-gradient(180deg, rgba(5,10,24,0.55) 0%, rgba(5,10,24,0.45) 30%, rgba(5,10,24,0.7) 100%)',
          zIndex: -1,
        }}
      />

      {/* Hero — title + breadcrumb */}
      <section
        style={{
          paddingTop: 'calc(var(--nav-h) + 80px)',
          paddingLeft: 96,
          paddingRight: 32,
          paddingBottom: 0,
        }}
        className="subpage-hero"
      >
        <div style={{ maxWidth: 1290, margin: '0 auto', textAlign: 'center', color: '#fff' }}>
          <h1
            style={{
              fontSize: 'clamp(2rem, 4vw, 3.5rem)',
              fontWeight: 800,
              letterSpacing: '-0.02em',
              margin: 0,
              lineHeight: 1.2,
              color: '#fff',
            }}
          >
            {title}
          </h1>
          {description && (
            <p
              style={{
                marginTop: 16,
                fontSize: '1.05rem',
                color: 'rgba(255,255,255,0.82)',
                maxWidth: 760,
                marginInline: 'auto',
                lineHeight: 1.75,
              }}
            >
              {description}
            </p>
          )}
        </div>

        {/* Breadcrumb bar */}
        {(breadcrumb || actions) && (
          <div
            style={{
              maxWidth: 1290,
              margin: '40px auto 0',
              background: 'var(--accent-800)',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 0,
              minHeight: 56,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              color: '#fff',
              fontSize: '0.95rem',
              fontWeight: 600,
              overflow: 'hidden',
              boxShadow: '0 4px 12px rgba(0,0,0,0.18)',
            }}
          >
            {breadcrumb && (
              <ol
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  listStyle: 'none',
                  padding: 0,
                  margin: 0,
                  flex: 1,
                }}
              >
                <li>
                  <Link
                    to="/"
                    aria-label="홈"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 56,
                      height: 56,
                      borderRight: '1px solid rgba(255,255,255,0.15)',
                      color: '#fff',
                      textDecoration: 'none',
                    }}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                      <path d="M3 12 L12 3 L21 12" />
                      <path d="M5 10 V21 H19 V10" />
                    </svg>
                  </Link>
                </li>
                {breadcrumb.map((c, i) => (
                  <li
                    key={i}
                    style={{
                      position: 'relative',
                      borderRight: '1px solid rgba(255,255,255,0.15)',
                    }}
                  >
                    {c.to ? (
                      <Link
                        to={c.to}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          padding: '0 20px',
                          height: 56,
                          color: '#fff',
                          textDecoration: 'none',
                        }}
                      >
                        {c.label}
                      </Link>
                    ) : (
                      <span style={{ display: 'inline-flex', alignItems: 'center', padding: '0 20px', height: 56 }}>
                        {c.label}
                      </span>
                    )}
                  </li>
                ))}
              </ol>
            )}
            {actions && (
              <div style={{ padding: '0 20px', display: 'flex', gap: 10 }}>
                {actions}
              </div>
            )}
          </div>
        )}
      </section>

      {/* Content container */}
      <section
        className="subpage-content"
        style={{
          paddingTop: 48,
          paddingBottom: 80,
          paddingLeft: 96,
          paddingRight: 32,
        }}
      >
        <div style={{ maxWidth: 1290, margin: '0 auto' }}>{children}</div>
      </section>

      <style>{`
        @media (max-width: 880px) {
          .subpage-hero    { padding-left: 20px !important; padding-right: 20px !important; padding-top: calc(var(--nav-h) + 40px) !important; }
          .subpage-content { padding-left: 20px !important; padding-right: 20px !important; }
        }
      `}</style>
    </div>
  )
}

/**
 * 콘텐츠 영역에서 쓰는 화이트 패널.
 * HYCU의 'bg-zinc-100' 박스 톤.
 */
export function SubPanel({
  children,
  padded = true,
  topImage,
}: {
  children: ReactNode
  padded?: boolean
  /** 패널 상단에 들어갈 이미지 또는 그라데이션 배너 (옵션) */
  topImage?: ReactNode
}) {
  return (
    <div
      style={{
        background: '#f4f4f5',
        borderRadius: 0,
        overflow: 'hidden',
        boxShadow: '0 12px 32px rgba(5,10,24,0.18)',
        color: '#0f172a',
      }}
    >
      {topImage}
      <div style={{ padding: padded ? 'clamp(28px, 4vw, 48px)' : 0 }}>{children}</div>
    </div>
  )
}

/**
 * SubPanel 상단에 들어갈 그라데이션 배너 (이미지 대용)
 */
export function PanelHeroBanner({ children }: { children?: ReactNode }) {
  return (
    <div
      style={{
        height: 240,
        background:
          'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 60%, #60a5fa 100%)',
        position: 'relative',
        display: 'flex',
        alignItems: 'flex-end',
        padding: '32px 40px',
        color: '#fff',
        overflow: 'hidden',
      }}
    >
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(600px 320px at 80% 30%, rgba(255,255,255,0.18), transparent 60%)',
        }}
      />
      <div style={{ position: 'relative', zIndex: 1, width: '100%' }}>{children}</div>
    </div>
  )
}
