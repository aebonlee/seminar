import { SubPage, SubPanel, PanelHeroBanner } from '../components/layout/SubPage'

export function About() {
  return (
    <SubPage
      title="DreamIT Seminar 소개"
      description="100여 개 비즈니스 프로젝트의 경험을 모은 프리미엄 세미나 플랫폼 — 큐레이션된 학습 경험을 제공합니다."
      breadcrumb={[{ label: '소개', to: '/about' }, { label: 'About' }]}
    >
      <SubPanel
        topImage={
          <PanelHeroBanner>
            <div style={{ fontSize: 12, fontWeight: 800, letterSpacing: '0.18em', color: '#fcd34d' }}>OUR STORY</div>
            <h2 style={{ marginTop: 8, fontSize: '1.8rem', lineHeight: 1.3, fontWeight: 800 }}>
              엄선된 학습의 기준
            </h2>
          </PanelHeroBanner>
        }
      >
        <p style={{ color: '#334155', lineHeight: 1.9, fontSize: '1.02rem' }}>
          DreamIT Seminar는 100여 개 이상의 비즈니스 프로젝트를 함께해온 <strong>DreamIT Biz</strong>가 운영하는
          프리미엄 세미나 플랫폼입니다. 학습자의 시간을 가장 귀한 자원으로 다루기 위해, 모든 강의는 관리자 검수 단계를
          통과한 뒤에만 모집을 시작합니다.
        </p>

        <div
          style={{
            marginTop: 28,
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: 16,
          }}
        >
          {[
            { k: '01', t: '큐레이션', d: '관리자 승인을 거친 강의만 공개합니다.' },
            { k: '02', t: '소수정예', d: '강의별 정원을 제한해 깊이 있는 상호작용을 보장합니다.' },
            { k: '03', t: '실전 중심', d: '이론보다 사례·실습 비중을 우선합니다.' },
            { k: '04', t: '지속 연결', d: '수료 이후의 멘토십과 동문 커뮤니티를 운영합니다.' },
          ].map((v) => (
            <div
              key={v.k}
              style={{
                background: '#fff',
                padding: 24,
                borderLeft: '3px solid var(--accent-500)',
              }}
            >
              <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--accent-600)', letterSpacing: '-0.02em' }}>
                {v.k}
              </div>
              <h3 style={{ marginTop: 8, marginBottom: 8, fontSize: '1.05rem', fontWeight: 800, color: '#0f172a' }}>
                {v.t}
              </h3>
              <p style={{ margin: 0, color: '#64748b', fontSize: 14, lineHeight: 1.7 }}>{v.d}</p>
            </div>
          ))}
        </div>
      </SubPanel>

      <div style={{ height: 24 }} />

      <SubPanel>
        <h3 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 800, color: 'var(--accent-700)' }}>
          5단계 검수 프로세스
        </h3>
        <p style={{ marginTop: 10, color: '#475569', fontSize: 14, lineHeight: 1.8 }}>
          모든 강의는 다음 단계를 거쳐 정식 모집됩니다. 이 과정은 학습자의 시간을 지키기 위한 약속입니다.
        </p>
        <ol
          style={{
            listStyle: 'none',
            padding: 0,
            margin: '20px 0 0',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: 0,
            borderTop: '1px solid #e2e8f0',
          }}
        >
          {['강사 검증', '커리큘럼 리뷰', '시범 강의', '관리자 최종 승인', '개강 안내 발송'].map((step, i) => (
            <li
              key={i}
              style={{
                padding: '20px 16px',
                background: '#fff',
                borderRight: i < 4 ? '1px solid #e2e8f0' : 'none',
                borderBottom: '1px solid #e2e8f0',
              }}
            >
              <div style={{ fontSize: 11, fontWeight: 800, color: 'var(--accent-600)', letterSpacing: '0.08em' }}>
                STEP {i + 1}
              </div>
              <div style={{ marginTop: 6, fontWeight: 800, color: '#0f172a' }}>{step}</div>
            </li>
          ))}
        </ol>
      </SubPanel>
    </SubPage>
  )
}
