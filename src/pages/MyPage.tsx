import { Link, Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useData } from '../contexts/DataContext'
import type { ApplicationStatus } from '../types'

const statusLabel: Record<ApplicationStatus, string> = {
  pending: '검토 중',
  approved: '승인됨',
  rejected: '거절',
}
const statusBadge: Record<ApplicationStatus, string> = {
  pending: 'badge-pending',
  approved: 'badge-approved',
  rejected: 'badge-rejected',
}

export function MyPage() {
  const { user } = useAuth()
  const { applications, courses } = useData()

  if (!user) return <Navigate to="/login" replace />

  const mine = applications.filter((a) => a.user_id === user.id || a.email === user.email)

  return (
    <section className="section">
      <div className="container">
        <div style={{ marginBottom: 48 }}>
          <div className="eyebrow">My Account</div>
          <h1 style={{ marginBottom: 4 }}>{user.full_name || user.email}</h1>
          <p style={{ color: 'var(--text-2)' }}>{user.email}</p>
        </div>

        <div style={{ marginBottom: 32, display: 'flex', justifyContent: 'space-between', alignItems: 'end', flexWrap: 'wrap', gap: 12 }}>
          <h2 style={{ fontSize: '1.6rem', margin: 0 }}>내 신청 현황</h2>
          <Link to="/apply" className="btn btn-outline btn-sm">새 신청서 작성</Link>
        </div>

        {mine.length === 0 ? (
          <div className="card" style={{ padding: 80, textAlign: 'center' }}>
            <p style={{ color: 'var(--text-2)', marginBottom: 24 }}>아직 신청한 강의가 없습니다.</p>
            <Link to="/courses" className="btn btn-primary">강의 둘러보기</Link>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {mine.map((a) => {
              const c = a.course ?? courses.find((c) => c.id === a.course_id)
              return (
                <div
                  key={a.id}
                  className="card"
                  style={{ padding: 28, display: 'grid', gridTemplateColumns: '1fr auto', gap: 16, alignItems: 'center' }}
                >
                  <div>
                    <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 8 }}>
                      <span className={`badge ${statusBadge[a.status]}`}>{statusLabel[a.status]}</span>
                      <span style={{ color: 'var(--text-3)', fontSize: '0.78rem' }}>
                        {new Date(a.created_at).toLocaleDateString('ko-KR')} 신청
                      </span>
                    </div>
                    <h3 style={{ margin: 0, fontSize: '1.25rem' }}>{c?.title ?? a.course_id}</h3>
                    {a.admin_note && (
                      <p style={{ color: 'var(--text-2)', fontSize: '0.88rem', marginTop: 10, marginBottom: 0 }}>
                        <span style={{ color: 'var(--gold-300)' }}>관리자 메모: </span>{a.admin_note}
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
        )}
      </div>
    </section>
  )
}
