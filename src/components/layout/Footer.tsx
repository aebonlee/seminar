import { Link } from 'react-router-dom'
import { COMPANY, siteCategories } from '../../data/familySites'

export function Footer() {
  return (
    <footer
      style={{
        background: '#1f2937',
        color: '#9ca3af',
        paddingTop: 64,
        paddingBottom: 36,
        paddingLeft: 16,
        paddingRight: 16,
      }}
    >
      <div
        style={{
          maxWidth: 1440,
          margin: '0 auto',
          paddingLeft: 90,
          paddingRight: 24,
          display: 'grid',
          gridTemplateColumns: '1.2fr 1.5fr 1.3fr',
          gap: 48,
          paddingBottom: 36,
          borderBottom: '1px solid rgba(255,255,255,0.08)',
        }}
        className="footer-top"
      >
        {/* Sitemap */}
        <div>
          <ul
            style={{
              listStyle: 'none',
              padding: 0,
              margin: 0,
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 14,
            }}
          >
            {[
              { l: '오시는 길', to: '/about' },
              { l: '개인정보처리방침', to: '/about', highlight: true },
              { l: '이메일 무단수집 거부', to: '/about' },
              { l: '이용약관', to: '/about' },
              { l: '사이트맵', to: '/about' },
              { l: '강사 지원', to: '/about' },
            ].map((s) => (
              <li key={s.l}>
                <Link
                  to={s.to}
                  style={{
                    color: s.highlight ? '#fcd34d' : '#d1d5db',
                    fontSize: '0.95rem',
                    fontWeight: 700,
                    textDecoration: 'none',
                  }}
                >
                  {s.l}
                </Link>
              </li>
            ))}
          </ul>

          {/* Family Site dropdown-style link */}
          <div style={{ marginTop: 24 }}>
            <div style={{ fontSize: 11, color: '#9ca3af', letterSpacing: '0.16em', fontWeight: 800, marginBottom: 10 }}>
              FAMILY SITES
            </div>
            <a
              href={COMPANY.portalSite.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                padding: '10px 16px',
                border: '1px solid rgba(255,255,255,0.2)',
                color: '#fff',
                textDecoration: 'none',
                fontSize: 13,
                fontWeight: 700,
              }}
            >
              {COMPANY.portalSite.name} · 전체 {siteCategories.reduce((a, c) => a + c.count, 0)}개 사이트
              <svg width="11" height="11" viewBox="0 0 16 16" fill="none" aria-hidden>
                <path d="M3 8h10M8 3l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </a>
          </div>
        </div>

        {/* Contact */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 24,
            borderLeft: '1px solid rgba(255,255,255,0.08)',
            paddingLeft: 36,
          }}
        >
          <div>
            <div style={{ fontSize: 13, color: '#9ca3af', marginBottom: 6 }}>수강 · 입학 관련 문의</div>
            <div style={{ color: '#fff', fontSize: '1.55rem', fontWeight: 800 }}>
              <a href={`tel:${COMPANY.phone}`} style={{ color: '#fff', textDecoration: 'none' }}>{COMPANY.phone}</a>
            </div>
            <p style={{ marginTop: 8, fontSize: 12, lineHeight: 1.6 }}>{COMPANY.businessHours}</p>
            <p style={{ marginTop: 6, fontSize: 12 }}>카카오톡 ID: <span style={{ color: '#fff', fontWeight: 700 }}>{COMPANY.kakao}</span></p>
          </div>
          <div>
            <div style={{ fontSize: 13, color: '#9ca3af', marginBottom: 6 }}>이메일</div>
            <div style={{ color: '#fff', fontSize: '1.15rem', fontWeight: 800 }}>
              <a href={`mailto:${COMPANY.email}`} style={{ color: '#fff', textDecoration: 'none' }}>{COMPANY.email}</a>
            </div>
            <a
              href={COMPANY.parentSite.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-block',
                marginTop: 18,
                fontSize: 13,
                color: '#fcd34d',
                fontWeight: 700,
                textDecoration: 'none',
              }}
            >
              ↗ {COMPANY.parentSite.name} 본사이트
            </a>
          </div>
        </div>

        {/* Support / quick action */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <a
            href={`mailto:${COMPANY.email}?subject=강의%20문의`}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              padding: '14px 20px',
              background: 'var(--accent-700)',
              color: '#fff',
              fontWeight: 800,
              fontSize: '0.92rem',
              textDecoration: 'none',
            }}
          >
            메일로 문의하기
            <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden>
              <path d="M3 8h10M8 3l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </a>
          <a
            href={`https://qr.kakao.com/talk/${COMPANY.kakao}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              padding: '14px 20px',
              background: '#FEE500',
              color: '#181600',
              fontWeight: 800,
              fontSize: '0.92rem',
              textDecoration: 'none',
            }}
          >
            카카오톡 상담
          </a>
        </div>
      </div>

      <div
        style={{
          maxWidth: 1440,
          margin: '0 auto',
          paddingLeft: 90,
          paddingRight: 24,
          paddingTop: 28,
          display: 'flex',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 20,
          color: '#9ca3af',
          fontSize: 12,
          lineHeight: 1.85,
        }}
        className="footer-bottom"
      >
        <div style={{ display: 'flex', alignItems: 'start', gap: 18 }}>
          <svg width="36" height="36" viewBox="0 0 32 32" aria-hidden>
            <rect x="2" y="2" width="28" height="28" rx="7" fill="#fff" />
            <path d="M10 9 L10 23 L17 23 C21.4 23 24 20.1 24 16 C24 11.9 21.4 9 17 9 Z" fill="var(--accent-700)" />
          </svg>
          <div>
            {COMPANY.address} · {COMPANY.name} · 대표 : {COMPANY.ceo}<br />
            등록번호 : {COMPANY.bizNumber} · 통신판매업신고번호 : {COMPANY.salesNumber}<br />
            출판신고번호 : {COMPANY.publisherNumber} · TEL : {COMPANY.phone} · E-mail : {COMPANY.email}
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <span style={{ fontSize: 11, padding: '6px 10px', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', fontWeight: 700 }}>
            DREAMIT BIZ
          </span>
          <span style={{ fontSize: 11, padding: '6px 10px', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', fontWeight: 700 }}>
            ISO 27001
          </span>
          <span style={{ fontSize: 11, padding: '6px 10px', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', fontWeight: 700 }}>
            웹접근성
          </span>
        </div>
      </div>

      <div
        style={{
          maxWidth: 1440,
          margin: '24px auto 0',
          paddingLeft: 90,
          paddingRight: 24,
          fontSize: 11,
          color: '#6b7280',
        }}
      >
        © {new Date().getFullYear()} {COMPANY.name}. All rights reserved.
      </div>

      <style>{`
        @media (max-width: 1100px) {
          .footer-top { grid-template-columns: 1fr 1fr !important; padding-left: 24px !important; }
          .footer-bottom { padding-left: 24px !important; }
        }
        @media (max-width: 720px) {
          .footer-top { grid-template-columns: 1fr !important; padding-left: 24px !important; }
        }
      `}</style>
    </footer>
  )
}
