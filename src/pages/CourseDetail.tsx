import { Link, useNavigate, useParams } from 'react-router-dom'
import { useData } from '../contexts/DataContext'

const formatPrice = (n: number) => n.toLocaleString('ko-KR') + '원'
const formatDate = (iso: string | null) =>
  iso ? new Date(iso).toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' }) : 'TBA'

export function CourseDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { courses } = useData()
  const course = courses.find((c) => c.id === id)

  if (!course) {
    return (
      <section className="section">
        <div className="container-narrow text-center">
          <h2>강의를 찾을 수 없습니다.</h2>
          <Link to="/courses" className="btn btn-outline mt-3">강의 목록으로</Link>
        </div>
      </section>
    )
  }

  if (course.status !== 'approved') {
    return (
      <section className="section">
        <div className="container-narrow text-center">
          <span className="badge badge-pending">관리자 승인 대기 중</span>
          <h2 style={{ marginTop: 24 }}>{course.title}</h2>
          <p style={{ color: 'var(--text-2)' }}>
            현재 이 강의는 관리자 검토 단계에 있어 일반에 공개되지 않습니다.
          </p>
        </div>
      </section>
    )
  }

  return (
    <>
      {/* HERO */}
      <section style={{ position: 'relative', padding: '80px 0 60px' }}>
        <div className="container">
          <Link to="/courses" style={{ fontSize: '0.82rem', letterSpacing: '0.14em', textTransform: 'uppercase' }}>
            ← Courses
          </Link>

          <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 60, marginTop: 32, alignItems: 'start' }} className="course-grid">
            <div>
              <span className="badge badge-gold">{course.category}</span>
              <h1 style={{ marginTop: 16 }}>{course.title}</h1>
              {course.subtitle && (
                <p style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', color: 'var(--text-1)', fontSize: '1.3rem' }}>
                  {course.subtitle}
                </p>
              )}
              <p style={{ color: 'var(--text-1)', marginTop: 20, lineHeight: 1.85 }}>{course.description}</p>

              {course.highlights.length > 0 && (
                <div style={{ marginTop: 32 }}>
                  <h3 style={{ fontSize: '1.1rem', color: 'var(--gold-200)', letterSpacing: '0.05em' }}>프로그램 하이라이트</h3>
                  <ul style={{ listStyle: 'none', padding: 0, margin: '16px 0 0', display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {course.highlights.map((h, i) => (
                      <li key={i} style={{ display: 'flex', gap: 14, alignItems: 'start' }}>
                        <span style={{ color: 'var(--gold-300)', marginTop: 4 }}>◆</span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {course.curriculum.length > 0 && (
                <div style={{ marginTop: 48 }}>
                  <h3 style={{ fontSize: '1.1rem', color: 'var(--gold-200)', letterSpacing: '0.05em' }}>커리큘럼</h3>
                  <div style={{ marginTop: 20, display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {course.curriculum.map((w) => (
                      <div
                        key={w.week}
                        className="card"
                        style={{ padding: 22, display: 'flex', gap: 24, alignItems: 'start' }}
                      >
                        <div
                          style={{
                            fontFamily: 'var(--font-display)',
                            fontSize: '2rem',
                            color: 'var(--gold-300)',
                            lineHeight: 1,
                            minWidth: 64,
                          }}
                        >
                          {String(w.week).padStart(2, '0')}
                        </div>
                        <div style={{ flex: 1 }}>
                          <div style={{ color: 'var(--text-0)', fontWeight: 600 }}>{w.title}</div>
                          <div style={{ color: 'var(--text-2)', fontSize: '0.88rem', marginTop: 6 }}>
                            {w.topics.join(' · ')}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <aside
              className="card"
              style={{
                padding: 32,
                position: 'sticky',
                top: 104,
                borderColor: 'var(--line-1)',
                background:
                  'linear-gradient(180deg, rgba(212,175,55,0.04) 0%, var(--bg-2) 100%)',
              }}
            >
              <div style={{ fontSize: '0.72rem', letterSpacing: '0.18em', color: 'var(--gold-300)', textTransform: 'uppercase' }}>
                Tuition
              </div>
              <div className="gold-text" style={{ fontFamily: 'var(--font-display)', fontSize: '2.6rem', fontWeight: 600, marginTop: 4 }}>
                {formatPrice(course.price)}
              </div>

              <div style={{ marginTop: 28, display: 'flex', flexDirection: 'column', gap: 16, paddingTop: 24, borderTop: '1px solid var(--line-2)' }}>
                <Detail k="기간" v={`${course.duration_weeks}주 · 총 ${course.sessions}회`} />
                <Detail k="개강" v={formatDate(course.start_date)} />
                <Detail k="종강" v={formatDate(course.end_date)} />
                <Detail k="정원" v={`${course.capacity}명`} />
                <Detail k="강사" v={course.instructor} />
                {course.instructor_bio && (
                  <div style={{ color: 'var(--text-2)', fontSize: '0.82rem', fontStyle: 'italic' }}>
                    {course.instructor_bio}
                  </div>
                )}
              </div>

              <button
                className="btn btn-primary"
                style={{ width: '100%', marginTop: 28 }}
                onClick={() => navigate(`/apply?course=${course.id}`)}
              >
                수강 신청하기
              </button>
              <p className="form-help" style={{ marginTop: 12, textAlign: 'center' }}>
                관리자 검토 후 개강 확정 시 이메일로 안내됩니다.
              </p>
            </aside>
          </div>
        </div>

        <style>{`
          @media (max-width: 880px) {
            .course-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </section>
    </>
  )
}

function Detail({ k, v }: { k: string; v: string }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <span style={{ color: 'var(--text-3)', fontSize: '0.74rem', textTransform: 'uppercase', letterSpacing: '0.14em' }}>{k}</span>
      <span style={{ color: 'var(--text-0)', fontWeight: 500, fontSize: '0.92rem' }}>{v}</span>
    </div>
  )
}
