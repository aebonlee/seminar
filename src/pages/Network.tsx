import { Link } from 'react-router-dom'
import { SubPage } from '../components/layout/SubPage'
import { familySites, siteCategories } from '../data/familySites'

/**
 * 운영 학습 분야 페이지.
 *
 * 정책 — 100여 개 학습 사이트 URL을 일반 사용자에게 직접 공개하지 않습니다.
 * 사용자는 본 사이트에서 강의를 신청하고 관리자 승인을 받아야 해당 강의에
 * 큐레이션된 학습 사이트(MyPage에서 제공) 에 접근할 수 있습니다.
 *
 * 본 페이지에서는 운영 중인 분야와 분야별 사이트 개수만 노출합니다.
 */
export function Network() {
  const total = familySites.length
  return (
    <SubPage
      title="운영 학습 분야"
      description={`DreamIT은 ${siteCategories.length}개 분야 · 총 ${total}개 학습 플랫폼을 운영합니다. 강의 신청 후 승인되면, 강의별로 큐레이션된 학습 사이트가 마이페이지에서 함께 제공됩니다.`}
      breadcrumb={[{ label: '소개', to: '/about' }, { label: '운영 분야' }]}
    >
      {/* 안내 패널 */}
      <div
        style={{
          background: 'var(--accent-50)',
          border: '1px solid var(--accent-200)',
          padding: 20,
          marginBottom: 20,
          display: 'flex',
          gap: 14,
          alignItems: 'flex-start',
          color: 'var(--accent-900)',
        }}
      >
        <span aria-hidden style={{ fontSize: 20 }}>ⓘ</span>
        <div style={{ fontSize: 14, lineHeight: 1.7 }}>
          학습 사이트의 직접 URL은 보안·운영 정책상 공개하지 않습니다. <br />
          관심 분야의 강의를 신청하면, 승인 시 강의에 매핑된 학습 사이트들을
          <strong style={{ marginInline: 4 }}>마이페이지</strong>에서 안내드립니다.
        </div>
      </div>

      {/* 카테고리 그리드 */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: 14,
        }}
      >
        {siteCategories.map((c) => (
          <div
            key={c.id}
            style={{
              background: '#fff',
              padding: 22,
              boxShadow: '0 8px 20px rgba(5,10,24,0.14)',
              border: '1px solid rgba(15,23,42,0.06)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
              <span style={{ fontSize: 22 }} aria-hidden>{c.icon}</span>
              <h4 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 800, color: '#0f172a' }}>
                {c.nameKo}
              </h4>
              <span style={{ marginLeft: 'auto', fontSize: 12, fontWeight: 800, color: 'var(--accent-700)' }}>
                {c.count}개
              </span>
            </div>
            <div style={{ marginTop: 4, fontSize: 12, color: '#94a3b8' }}>{c.name}</div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div
        style={{
          marginTop: 32,
          padding: 28,
          background: 'linear-gradient(135deg, var(--accent-800) 0%, var(--accent-600) 100%)',
          color: '#fff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 16,
          boxShadow: '0 12px 32px rgba(5,10,24,0.22)',
        }}
      >
        <div>
          <div style={{ fontSize: 12, letterSpacing: '0.16em', color: 'var(--accent-200)', fontWeight: 800 }}>NEXT STEP</div>
          <h3 style={{ margin: '6px 0 0', fontSize: '1.3rem', fontWeight: 800 }}>
            관심 분야의 강의를 둘러보고 신청하세요
          </h3>
          <p style={{ marginTop: 6, marginBottom: 0, color: 'rgba(255,255,255,0.85)', fontSize: 13 }}>
            승인 후 마이페이지에서 강의에 매핑된 학습 사이트에 접근할 수 있습니다.
          </p>
        </div>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <Link
            to="/courses"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '12px 20px',
              background: '#fff',
              color: 'var(--accent-700)',
              textDecoration: 'none',
              fontWeight: 800,
            }}
          >
            모집 강의 보기
            <svg width="11" height="11" viewBox="0 0 16 16" fill="none" aria-hidden>
              <path d="M3 8h10M8 3l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </Link>
          <Link
            to="/apply"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '12px 20px',
              background: 'transparent',
              color: '#fff',
              textDecoration: 'none',
              fontWeight: 800,
              border: '1px solid rgba(255,255,255,0.5)',
            }}
          >
            신청서 작성
          </Link>
        </div>
      </div>
    </SubPage>
  )
}
