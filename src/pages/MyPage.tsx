import { Link, Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useData } from '../contexts/DataContext'
import { SubPage, SubPanel } from '../components/layout/SubPage'
import type { Application, ApplicationStatus, Course, LearningSite } from '../types'

const statusLabel: Record<ApplicationStatus, string> = {
  pending: '검토 중',
  approved: '승인됨',
  rejected: '거절',
}
const statusColors: Record<ApplicationStatus, { bg: string; fg: string; bd: string }> = {
  pending: { bg: '#fef3c7', fg: '#92400e', bd: '#fcd34d' },
  approved: { bg: '#dcfce7', fg: '#166534', bd: '#86efac' },
  rejected: { bg: '#fee2e2', fg: '#991b1b', bd: '#fca5a5' },
}

export function MyPage() {
  const { user } = useAuth()
  const { applications, courses } = useData()
  if (!user) return <Navigate to="/login" replace />

  const mine = applications.filter((a) => a.user_id === user.id || a.email === user.email)

  // 승인된 신청의 강의에 매핑된 학습 사이트들 (중복 제거)
  const approvedApps = mine.filter((a) => a.status === 'approved')
  const sitesByApp: { app: Application; course: Course | undefined; sites: LearningSite[] }[] = approvedApps
    .map((a) => {
      const c = a.course ?? courses.find((x) => x.id === a.course_id)
      return { app: a, course: c, sites: c?.learning_sites ?? [] }
    })
    .filter((x) => x.sites.length > 0)

  return (
    <SubPage
      title={user.full_name || '내 페이지'}
      description={user.email}
      breadcrumb={[{ label: 'Account' }, { label: '내 신청 현황' }]}
      actions={<Link to="/apply" className="btn btn-primary btn-sm" style={{ background: '#fff', color: 'var(--accent-700)', borderColor: '#fff' }}>새 신청서</Link>}
    >
      {/* 1) 학습 사이트 접근 — 승인된 강의에 매핑된 사이트 */}
      {sitesByApp.length > 0 && (
        <div style={{ marginBottom: 18 }}>
          <SubPanel padded={false}>
            <div style={{ padding: '20px 24px 8px' }}>
              <h2 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 800, color: 'var(--accent-700)' }}>
                내 학습 사이트
              </h2>
              <p style={{ margin: '6px 0 0', color: '#64748b', fontSize: 13 }}>
                승인된 강의에 매핑된 학습 사이트입니다. 강의별로 큐레이션된 자료를 활용하세요.
              </p>
            </div>
            {sitesByApp.map(({ app, course, sites }) => (
              <div
                key={app.id}
                style={{
                  padding: '20px 24px',
                  borderTop: '1px solid #e2e8f0',
                  background: '#fff',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
                  <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 800, color: '#0f172a' }}>
                    {course?.title ?? app.course_id}
                  </h3>
                  <span style={{ fontSize: 11, color: 'var(--accent-700)', fontWeight: 800, letterSpacing: '0.06em' }}>
                    {sites.length}개 사이트 제공
                  </span>
                </div>
                <div
                  style={{
                    marginTop: 12,
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
                    gap: 8,
                  }}
                >
                  {sites.map((s) => (
                    <a
                      key={s.id}
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        padding: 14,
                        background: 'var(--accent-50)',
                        border: '1px solid var(--accent-200)',
                        color: 'var(--accent-900)',
                        textDecoration: 'none',
                        transition: 'all 0.15s var(--ease)',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'var(--accent-100)'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'var(--accent-50)'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <span style={{ fontSize: '0.95rem', fontWeight: 800 }}>{s.name}</span>
                        <svg width="11" height="11" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
                          <path d="M3 13L13 3M6 3h7v7" />
                        </svg>
                      </div>
                      {s.description && (
                        <span style={{ marginTop: 4, fontSize: 12, color: 'var(--accent-700)' }}>{s.description}</span>
                      )}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </SubPanel>
        </div>
      )}

      {/* 2) 내 신청 내역 */}
      {mine.length === 0 ? (
        <SubPanel>
          <div style={{ textAlign: 'center', padding: 40, color: '#64748b' }}>
            <p style={{ marginBottom: 16 }}>아직 신청한 강의가 없습니다.</p>
            <Link to="/courses" className="btn btn-primary">강의 둘러보기</Link>
          </div>
        </SubPanel>
      ) : (
        <SubPanel padded={false}>
          <div style={{ padding: '20px 24px 8px' }}>
            <h2 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 800, color: 'var(--accent-700)' }}>
              내 신청 내역
            </h2>
          </div>
          {mine.map((a, idx) => {
            const c = a.course ?? courses.find((x) => x.id === a.course_id)
            const sc = statusColors[a.status]
            return (
              <div
                key={a.id}
                style={{
                  padding: '20px 24px',
                  background: '#fff',
                  display: 'grid',
                  gridTemplateColumns: '1fr auto',
                  alignItems: 'center',
                  gap: 16,
                  borderTop: idx === 0 ? '1px solid #e2e8f0' : 'none',
                  borderBottom: idx < mine.length - 1 ? '1px solid #e2e8f0' : 'none',
                }}
              >
                <div>
                  <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 6 }}>
                    <span
                      style={{
                        fontSize: 11,
                        fontWeight: 800,
                        padding: '3px 10px',
                        borderRadius: 999,
                        color: sc.fg,
                        background: sc.bg,
                        border: `1px solid ${sc.bd}`,
                      }}
                    >
                      {statusLabel[a.status]}
                    </span>
                    <span style={{ fontSize: 12, color: '#94a3b8' }}>
                      {new Date(a.created_at).toLocaleDateString('ko-KR')} 신청
                    </span>
                    {a.status === 'approved' && c && c.learning_sites.length > 0 && (
                      <span style={{ fontSize: 11, color: 'var(--accent-700)', fontWeight: 800 }}>
                        · 학습 사이트 {c.learning_sites.length}개 이용 가능 ↑
                      </span>
                    )}
                  </div>
                  <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 800, color: '#0f172a' }}>
                    {c?.title ?? a.course_id}
                  </h3>
                  {a.admin_note && (
                    <p style={{ marginTop: 8, marginBottom: 0, color: '#475569', fontSize: 13 }}>
                      <span style={{ color: 'var(--accent-700)', fontWeight: 700 }}>관리자 메모: </span>
                      {a.admin_note}
                    </p>
                  )}
                </div>
                {c && (
                  <Link to={`/courses/${c.id}`} className="btn btn-ghost btn-sm">
                    강의 보기
                  </Link>
                )}
              </div>
            )
          })}
        </SubPanel>
      )}
    </SubPage>
  )
}
