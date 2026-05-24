import { Link } from 'react-router-dom'
import { useData } from '../../contexts/DataContext'

export function Dashboard() {
  const { courses, applications } = useData()

  const stats = [
    { k: applications.filter((a) => a.status === 'pending').length, l: '검토 대기 신청', to: '/admin/applications' },
    { k: courses.filter((c) => c.status === 'pending').length, l: '승인 대기 강의', to: '/admin/courses' },
    { k: courses.filter((c) => c.status === 'approved').length, l: '개강 중 강의', to: '/admin/courses' },
    { k: applications.length, l: '누적 신청서', to: '/admin/applications' },
  ]

  const recent = [...applications]
    .sort((a, b) => +new Date(b.created_at) - +new Date(a.created_at))
    .slice(0, 5)

  return (
    <>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 18, marginBottom: 36 }}>
        {stats.map((s) => (
          <Link
            key={s.l}
            to={s.to}
            className="card"
            style={{ padding: 24, textDecoration: 'none' }}
          >
            <div className="gold-text" style={{ fontFamily: 'var(--font-display)', fontSize: '2.6rem', lineHeight: 1, fontWeight: 600 }}>
              {s.k}
            </div>
            <div style={{ marginTop: 10, fontSize: '0.82rem', color: '#475569', letterSpacing: '0.06em' }}>{s.l}</div>
          </Link>
        ))}
      </div>

      <div className="card" style={{ padding: 28 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
          <h3 style={{ margin: 0, fontSize: '1.2rem' }}>최근 신청서</h3>
          <Link to="/admin/applications" style={{ fontSize: '0.82rem' }}>전체 보기 →</Link>
        </div>
        {recent.length === 0 ? (
          <p style={{ color: '#475569', margin: 0 }}>아직 신청서가 없습니다.</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {recent.map((a) => (
              <div
                key={a.id}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr auto auto',
                  gap: 16,
                  alignItems: 'center',
                  padding: '14px 0',
                  borderTop: '1px solid var(--line-2)',
                }}
              >
                <div>
                  <div style={{ color: '#0f172a', fontWeight: 500 }}>{a.name}</div>
                  <div style={{ color: '#475569', fontSize: '0.82rem' }}>{a.email}</div>
                </div>
                <div style={{ color: '#334155', fontSize: '0.86rem' }}>{a.course?.title ?? a.course_id}</div>
                <span className={`badge badge-${a.status === 'pending' ? 'pending' : a.status === 'approved' ? 'approved' : 'rejected'}`}>
                  {a.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  )
}
