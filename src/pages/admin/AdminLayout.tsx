import { NavLink, Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { useData } from '../../contexts/DataContext'

export function AdminLayout() {
  const { user, isAdmin, loading } = useAuth()
  const { applications, courses } = useData()

  if (loading) return null
  if (!user) return <Navigate to="/login" replace />
  if (!isAdmin) return <Navigate to="/" replace />

  const pendingApps = applications.filter((a) => a.status === 'pending').length
  const pendingCourses = courses.filter((c) => c.status === 'pending').length

  const navStyle = ({ isActive }: { isActive: boolean }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '14px 18px',
    borderRadius: 'var(--r-md)',
    color: isActive ? 'var(--gold-200)' : 'var(--text-1)',
    background: isActive ? 'rgba(212,175,55,0.08)' : 'transparent',
    border: `1px solid ${isActive ? 'var(--line-1)' : 'transparent'}`,
    fontSize: '0.9rem',
    fontWeight: 500,
  })

  const countPill = (n: number) => (
    <span
      style={{
        fontSize: '0.72rem',
        padding: '2px 8px',
        borderRadius: 999,
        background: 'var(--bg-3)',
        color: n > 0 ? 'var(--gold-200)' : 'var(--text-3)',
        border: '1px solid var(--line-2)',
      }}
    >
      {n}
    </span>
  )

  return (
    <section style={{ padding: '40px 0 80px' }}>
      <div className="container">
        <div style={{ marginBottom: 32, display: 'flex', justifyContent: 'space-between', alignItems: 'end', flexWrap: 'wrap', gap: 12 }}>
          <div>
            <div className="eyebrow">Admin Console</div>
            <h1 style={{ margin: 0 }}>관리자 콘솔</h1>
          </div>
          <div style={{ color: 'var(--text-2)', fontSize: '0.86rem' }}>
            {user.full_name || user.email} · <span style={{ color: 'var(--gold-300)' }}>ADMIN</span>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: 32 }} className="admin-grid">
          <aside
            className="card"
            style={{ padding: 18, display: 'flex', flexDirection: 'column', gap: 6, alignSelf: 'start', position: 'sticky', top: 104 }}
          >
            <NavLink to="/admin" end style={navStyle}>
              <span>대시보드</span>
            </NavLink>
            <NavLink to="/admin/applications" style={navStyle}>
              <span>신청 관리</span>
              {countPill(pendingApps)}
            </NavLink>
            <NavLink to="/admin/courses" style={navStyle}>
              <span>강의 관리</span>
              {countPill(pendingCourses)}
            </NavLink>
            <NavLink to="/admin/courses/new" style={navStyle}>
              <span>새 강의 등록</span>
            </NavLink>
          </aside>

          <div>
            <Outlet />
          </div>
        </div>

        <style>{`
          @media (max-width: 880px) {
            .admin-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </div>
    </section>
  )
}
