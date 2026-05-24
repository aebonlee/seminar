import { Link } from 'react-router-dom'
import { useData } from '../contexts/DataContext'
import { CourseCard } from '../components/ui/CourseCard'

export function Home() {
  const { courses } = useData()
  const approved = courses.filter((c) => c.status === 'approved').slice(0, 3)

  return (
    <>
      {/* ---------- HERO ---------- */}
      <section
        style={{
          position: 'relative',
          minHeight: '92vh',
          display: 'flex',
          alignItems: 'center',
          overflow: 'hidden',
        }}
      >
        <div
          aria-hidden
          style={{
            position: 'absolute',
            inset: 0,
            background: `
              radial-gradient(800px 500px at 70% 30%, rgba(212,175,55,0.10), transparent 60%),
              radial-gradient(900px 600px at 20% 80%, rgba(212,175,55,0.06), transparent 60%)
            `,
            zIndex: 0,
          }}
        />
        <div
          aria-hidden
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: '52%',
            height: '100%',
            background:
              'linear-gradient(135deg, rgba(212,175,55,0.04) 0%, transparent 100%)',
            borderLeft: '1px solid var(--line-2)',
            zIndex: 0,
          }}
        />

        <div className="container" style={{ position: 'relative', zIndex: 1, paddingTop: 40, paddingBottom: 60 }}>
          <div style={{ maxWidth: 820 }}>
            <div className="eyebrow fade-up">DreamIT · Premium Seminar Series</div>

            <h1
              className="fade-up"
              style={{
                fontSize: 'clamp(2.8rem, 6.5vw, 5.6rem)',
                lineHeight: 1.05,
                marginBottom: 28,
                animationDelay: '0.05s',
              }}
            >
              깊이 있는 통찰,
              <br />
              <span className="gold-text">엄선된 세미나</span>
            </h1>

            <p
              className="fade-up"
              style={{
                fontSize: '1.15rem',
                color: 'var(--text-1)',
                maxWidth: 620,
                lineHeight: 1.75,
                marginBottom: 40,
                animationDelay: '0.1s',
              }}
            >
              경영자, 실무 전문가, 크리에이터를 위한 프리미엄 학습 경험.
              <br />
              관리자 큐레이션을 통과한 정제된 강의만 개설됩니다.
            </p>

            <div
              className="fade-up"
              style={{ display: 'flex', gap: 14, flexWrap: 'wrap', animationDelay: '0.15s' }}
            >
              <Link to="/courses" className="btn btn-primary btn-lg">
                개설 강의 둘러보기
              </Link>
              <Link to="/apply" className="btn btn-ghost btn-lg">
                수강 신청
              </Link>
            </div>

            <div
              className="fade-up"
              style={{
                marginTop: 80,
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
                gap: 28,
                maxWidth: 620,
                animationDelay: '0.25s',
              }}
            >
              {[
                { k: '24+', l: '큐레이션 세미나' },
                { k: '98%', l: '만족도' },
                { k: '1,200+', l: '수료생' },
                { k: '48', l: '전문 강사' },
              ].map((s) => (
                <div key={s.l}>
                  <div className="gold-text" style={{ fontFamily: 'var(--font-display)', fontSize: '2.2rem', fontWeight: 600 }}>
                    {s.k}
                  </div>
                  <div style={{ color: 'var(--text-2)', fontSize: '0.78rem', letterSpacing: '0.16em', textTransform: 'uppercase' }}>
                    {s.l}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---------- FEATURED COURSES ---------- */}
      <section className="section">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', marginBottom: 56, flexWrap: 'wrap', gap: 16 }}>
            <div>
              <div className="eyebrow">Featured Programs</div>
              <h2 style={{ margin: 0 }}>
                지금 모집 중인 <span className="gold-text">프리미엄 강의</span>
              </h2>
            </div>
            <Link to="/courses" className="btn btn-ghost btn-sm">
              전체 보기
            </Link>
          </div>

          {approved.length === 0 ? (
            <div className="card" style={{ padding: 60, textAlign: 'center' }}>
              <p style={{ color: 'var(--text-2)' }}>관리자 승인을 기다리는 강의가 곧 공개됩니다.</p>
            </div>
          ) : (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                gap: 28,
              }}
            >
              {approved.map((c) => (
                <CourseCard key={c.id} course={c} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ---------- VALUES ---------- */}
      <section className="section" style={{ background: 'var(--bg-0)', borderTop: '1px solid var(--line-2)', borderBottom: '1px solid var(--line-2)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: 720, margin: '0 auto 64px' }}>
            <div className="eyebrow" style={{ justifyContent: 'center' }}>Why DreamIT Seminar</div>
            <h2>
              차별화된 <span className="gold-text">학습 경험</span>
            </h2>
            <div className="divider-gold" />
            <p style={{ color: 'var(--text-2)' }}>
              모든 강의는 관리자 검증 단계를 통과한 후에만 개설됩니다.
              엄선된 강사진과 정제된 커리큘럼으로 시간의 가치를 지킵니다.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: 32,
            }}
          >
            {[
              {
                t: '큐레이션 우선',
                d: '관리자 승인을 거친 강의만 공개됩니다. 학습자의 시간을 가장 귀한 자원으로 다룹니다.',
                icon: '◆',
              },
              {
                t: '소수 정예',
                d: '강의별 정원을 제한해 강사와의 실질적인 상호작용을 보장합니다.',
                icon: '◇',
              },
              {
                t: '전문가 네트워크',
                d: '수료 후에도 동문 네트워크와 멘토십을 이어갈 수 있는 커뮤니티를 제공합니다.',
                icon: '✦',
              },
            ].map((v) => (
              <div key={v.t} className="card" style={{ padding: 36 }}>
                <div
                  className="gold-text"
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '2.4rem',
                    marginBottom: 16,
                  }}
                >
                  {v.icon}
                </div>
                <h3 style={{ marginBottom: 12 }}>{v.t}</h3>
                <p style={{ color: 'var(--text-2)', margin: 0, fontSize: '0.95rem' }}>{v.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- CTA ---------- */}
      <section className="section">
        <div className="container-narrow">
          <div
            className="card"
            style={{
              padding: 'clamp(40px, 6vw, 80px)',
              textAlign: 'center',
              borderColor: 'var(--line-1)',
              background:
                'linear-gradient(180deg, rgba(212,175,55,0.05) 0%, var(--bg-2) 100%)',
            }}
          >
            <div className="eyebrow" style={{ justifyContent: 'center' }}>Ready to begin</div>
            <h2 style={{ marginBottom: 16 }}>
              당신의 다음 챕터, <span className="gold-text">여기에서</span>.
            </h2>
            <p style={{ color: 'var(--text-2)', maxWidth: 520, margin: '0 auto 32px' }}>
              관심 있는 강의에 신청하시면 관리자가 검토 후 개강 안내를 보내드립니다.
            </p>
            <Link to="/apply" className="btn btn-primary btn-lg">
              지금 신청하기
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
