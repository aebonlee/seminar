export function About() {
  return (
    <>
      <section className="section">
        <div className="container-narrow">
          <div className="text-center">
            <div className="eyebrow" style={{ justifyContent: 'center' }}>About DreamIT Seminar</div>
            <h1>
              <span className="gold-text">엄선된 학습</span>의 기준
            </h1>
            <div className="divider-gold" />
            <p style={{ color: 'var(--text-1)', fontSize: '1.05rem', lineHeight: 1.85 }}>
              DreamIT Seminar는 100여 개 이상의 비즈니스 프로젝트를 함께해온
              <br />
              DreamIT Biz가 운영하는 프리미엄 세미나 플랫폼입니다.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: 28,
              marginTop: 80,
            }}
          >
            {[
              { k: '01', t: '큐레이션', d: '관리자 승인 단계를 통과한 강의만 노출합니다.' },
              { k: '02', t: '소수정예', d: '강의별 정원을 제한해 깊이 있는 상호작용을 보장합니다.' },
              { k: '03', t: '실전 중심', d: '이론보다 사례·실습 비중을 우선합니다.' },
              { k: '04', t: '지속 연결', d: '수료 이후의 멘토십과 동문 커뮤니티를 운영합니다.' },
            ].map((v) => (
              <div key={v.k} className="card" style={{ padding: 32 }}>
                <div
                  className="gold-text"
                  style={{ fontFamily: 'var(--font-display)', fontSize: '2.4rem', fontWeight: 600 }}
                >
                  {v.k}
                </div>
                <h3 style={{ marginTop: 14, fontSize: '1.2rem' }}>{v.t}</h3>
                <p style={{ color: 'var(--text-2)', margin: 0, fontSize: '0.92rem' }}>{v.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--bg-0)', borderTop: '1px solid var(--line-2)', borderBottom: '1px solid var(--line-2)' }}>
        <div className="container-narrow text-center">
          <div className="eyebrow" style={{ justifyContent: 'center' }}>Our Approach</div>
          <h2>한 줄도 허투루 두지 않습니다</h2>
          <div className="divider-gold" />
          <p style={{ color: 'var(--text-2)', maxWidth: 640, margin: '0 auto', lineHeight: 1.9 }}>
            모든 강의는 5단계 검수 — 강사 검증, 커리큘럼 리뷰, 시범 강의,
            관리자 최종 승인, 개강 안내 — 를 거쳐 정식 모집됩니다.
            이 과정은 학습자의 시간을 지키기 위한 최소한의 약속입니다.
          </p>
        </div>
      </section>
    </>
  )
}
