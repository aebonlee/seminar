import { Link, Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useData } from '../contexts/DataContext'
import { SubPage, SubPanel } from '../components/layout/SubPage'
import type { ApplicationStatus } from '../types'

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

  return (
    <SubPage
      title={user.full_name || '내 페이지'}
      description={user.email}
      breadcrumb={[{ label: 'Account' }, { label: '내 신청 현황' }]}
      actions={<Link to="/apply" className="btn btn-primary btn-sm" style={{ background: '#fff', color: 'var(--accent-700)', borderColor: '#fff' }}>새 신청서</Link>}
    >
      {mine.length === 0 ? (
        <SubPanel>
          <div style={{ textAlign: 'center', padding: 40, color: '#64748b' }}>
            <p style={{ marginBottom: 16 }}>아직 신청한 강의가 없습니다.</p>
            <Link to="/courses" className="btn btn-primary">강의 둘러보기</Link>
          </div>
        </SubPanel>
      ) : (
        <SubPanel padded={false}>
          <div>
            {mine.map((a, idx) => {
              const c = a.course ?? courses.find((x) => x.id === a.course_id)
              const sc = statusColors[a.status]
              return (
                <div
                  key={a.id}
                  style={{
                    padding: 24,
                    background: '#fff',
                    display: 'grid',
                    gridTemplateColumns: '1fr auto',
                    alignItems: 'center',
                    gap: 16,
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
          </div>
        </SubPanel>
      )}
    </SubPage>
  )
}
