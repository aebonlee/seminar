import { Link, useNavigate, useParams } from 'react-router-dom'
import { useData } from '../contexts/DataContext'
import { SubPage, SubPanel, PanelHeroBanner } from '../components/layout/SubPage'

const fmtPrice = (n: number) => n.toLocaleString('ko-KR') + '원'
const fmtDate = (iso: string | null) =>
  iso ? new Date(iso).toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' }) : 'TBA'

export function CourseDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { courses } = useData()
  const course = courses.find((c) => c.id === id)

  if (!course) {
    return (
      <SubPage title="강의를 찾을 수 없습니다" breadcrumb={[{ label: '모집 강의', to: '/courses' }, { label: '없음' }]}>
        <SubPanel>
          <p style={{ textAlign: 'center', color: '#64748b' }}>요청하신 강의를 찾을 수 없습니다.</p>
          <div style={{ textAlign: 'center', marginTop: 16 }}>
            <Link to="/courses" className="btn btn-primary">강의 목록</Link>
          </div>
        </SubPanel>
      </SubPage>
    )
  }

  if (course.status !== 'approved') {
    return (
      <SubPage title={course.title} breadcrumb={[{ label: '모집 강의', to: '/courses' }, { label: '검토 중' }]}>
        <SubPanel>
          <div style={{ textAlign: 'center', color: '#64748b' }}>
            <span className="badge badge-pending" style={{ background: '#fef3c7', color: '#92400e', border: '1px solid #fcd34d' }}>관리자 검토 중</span>
            <p style={{ marginTop: 16 }}>현재 이 강의는 관리자 검토 단계로 일반에 공개되지 않습니다.</p>
          </div>
        </SubPanel>
      </SubPage>
    )
  }

  return (
    <SubPage
      title={course.title}
      breadcrumb={[
        { label: '모집 강의', to: '/courses' },
        { label: course.category },
      ]}
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.55fr) minmax(0, 1fr)', gap: 24 }} className="detail-grid">
        {/* Left: detail */}
        <SubPanel
          topImage={
            <PanelHeroBanner>
              <div style={{ fontSize: 12, fontWeight: 800, letterSpacing: '0.18em', color: '#fcd34d' }}>
                {course.category}
              </div>
              <h2 style={{ marginTop: 8, fontSize: '1.55rem', lineHeight: 1.3, fontWeight: 800 }}>
                {course.subtitle || course.title}
              </h2>
            </PanelHeroBanner>
          }
        >
          <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 800, color: 'var(--accent-700)' }}>강의 소개</h3>
          <p style={{ marginTop: 12, lineHeight: 1.85, color: '#334155' }}>{course.description}</p>

          {course.highlights.length > 0 && (
            <>
              <h3 style={{ marginTop: 36, marginBottom: 0, fontSize: '1.1rem', fontWeight: 800, color: 'var(--accent-700)' }}>
                프로그램 하이라이트
              </h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: '14px 0 0', display: 'flex', flexDirection: 'column', gap: 10 }}>
                {course.highlights.map((h, i) => (
                  <li
                    key={i}
                    style={{
                      display: 'flex',
                      gap: 12,
                      padding: '14px 16px',
                      background: '#fff',
                      borderLeft: '3px solid var(--accent-500)',
                      color: '#0f172a',
                    }}
                  >
                    <span style={{ color: 'var(--accent-600)', fontWeight: 800 }}>◆</span>
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </>
          )}

          {course.curriculum.length > 0 && (
            <>
              <h3 style={{ marginTop: 36, marginBottom: 0, fontSize: '1.1rem', fontWeight: 800, color: 'var(--accent-700)' }}>
                커리큘럼
              </h3>
              <ol style={{ listStyle: 'none', padding: 0, margin: '14px 0 0', display: 'flex', flexDirection: 'column', gap: 0 }}>
                {course.curriculum.map((w) => (
                  <li
                    key={w.week}
                    style={{
                      display: 'flex',
                      gap: 24,
                      padding: '18px 16px',
                      borderBottom: '1px solid #e2e8f0',
                      background: '#fff',
                    }}
                  >
                    <div
                      style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: '1.4rem',
                        fontWeight: 800,
                        color: 'var(--accent-600)',
                        minWidth: 60,
                        lineHeight: 1,
                      }}
                    >
                      WK {String(w.week).padStart(2, '0')}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 800, color: '#0f172a' }}>{w.title}</div>
                      <div style={{ marginTop: 4, color: '#64748b', fontSize: 14 }}>{w.topics.join(' · ')}</div>
                    </div>
                  </li>
                ))}
              </ol>
            </>
          )}

          {course.learning_sites.length > 0 && (
            <>
              <h3 style={{ marginTop: 36, marginBottom: 0, fontSize: '1.1rem', fontWeight: 800, color: 'var(--accent-700)' }}>
                제공 학습 사이트 ({course.learning_sites.length}개)
              </h3>
              <p style={{ marginTop: 10, marginBottom: 14, color: '#64748b', fontSize: 13 }}>
                수강 신청이 승인되면 마이페이지에서 아래 학습 사이트에 접근할 수 있습니다.
                URL은 보안·운영 정책상 신청 승인 전에는 공개되지 않습니다.
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {course.learning_sites.map((s) => (
                  <li
                    key={s.id}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 8,
                      padding: '8px 14px',
                      background: 'var(--accent-50)',
                      border: '1px solid var(--accent-200)',
                      color: 'var(--accent-900)',
                      fontSize: 13,
                      fontWeight: 700,
                    }}
                    title={s.description}
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                      <rect x="3" y="11" width="18" height="11" rx="2" />
                      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                    {s.name}
                  </li>
                ))}
              </ul>
            </>
          )}
        </SubPanel>

        {/* Right: sidebar */}
        <SubPanel padded={false}>
          <div style={{ padding: 28, background: '#fff' }}>
            <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.16em', color: 'var(--accent-600)' }}>
              수강료
            </div>
            <div style={{ marginTop: 4, fontSize: '2rem', fontWeight: 800, color: 'var(--accent-700)', letterSpacing: '-0.01em' }}>
              {fmtPrice(course.price)}
            </div>

            <div
              style={{
                marginTop: 20,
                paddingTop: 18,
                borderTop: '1px solid #e2e8f0',
                display: 'flex',
                flexDirection: 'column',
                gap: 12,
              }}
            >
              <KV k="기간" v={`${course.duration_weeks}주 · 총 ${course.sessions}회`} />
              <KV k="개강" v={fmtDate(course.start_date)} />
              <KV k="종강" v={fmtDate(course.end_date)} />
              <KV k="정원" v={`${course.capacity}명`} />
              <KV k="강사" v={course.instructor} />
              {course.instructor_bio && (
                <div style={{ color: '#64748b', fontSize: 13, fontStyle: 'italic', marginTop: 4 }}>
                  {course.instructor_bio}
                </div>
              )}
            </div>

            <button
              className="btn btn-primary"
              style={{ width: '100%', marginTop: 24 }}
              onClick={() => navigate(`/apply?course=${course.id}`)}
            >
              수강 신청하기
            </button>
            <p style={{ marginTop: 12, textAlign: 'center', fontSize: 12, color: '#64748b' }}>
              관리자 검토 후 개강 확정 시 이메일로 안내됩니다.
            </p>
          </div>
        </SubPanel>
      </div>

      <style>{`
        @media (max-width: 960px) {
          .detail-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </SubPage>
  )
}

function KV({ k, v }: { k: string; v: string }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
      <span style={{ fontSize: 11, fontWeight: 700, color: '#94a3b8', letterSpacing: '0.1em' }}>{k}</span>
      <span style={{ fontSize: 14, fontWeight: 700, color: '#0f172a' }}>{v}</span>
    </div>
  )
}
