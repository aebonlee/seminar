import { NavLink, Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { useData } from '../../contexts/DataContext'
import { SubPage } from '../../components/layout/SubPage'

export function AdminLayout() {
  const { user, isAdmin, loading } = useAuth()
  const { applications, courses } = useData()
  const { pathname } = useLocation()

  if (loading) return null
  if (!user) return <Navigate to="/login" replace />
  if (!isAdmin) return <Navigate to="/" replace />

  const pendingApps = applications.filter((a) => a.status === 'pending').length
  const pendingCourses = courses.filter((c) => c.status === 'pending').length

  const navStyle = ({ isActive }: { isActive: boolean }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px 16px',
    color: isActive ? 'var(--accent-700)' : '#475569',
    background: isActive ? '#eff6ff' : '#fff',
    borderLeft: isActive ? '3px solid var(--accent-600)' : '3px solid transparent',
    fontSize: 14,
    fontWeight: 700,
    textDecoration: 'none',
    transition: 'all 0.15s var(--ease)',
  })

  const countPill = (n: number) => (
    <span
      style={{
        fontSize: 11,
        padding: '2px 8px',
        borderRadius: 999,
        background: n > 0 ? 'var(--accent-50)' : '#f1f5f9',
        color: n > 0 ? 'var(--accent-700)' : '#94a3b8',
        fontWeight: 800,
      }}
    >
      {n}
    </span>
  )

  // breadcrumb based on pathname
  const crumb = pathname.includes('/applications')
    ? [{ label: '관리자', to: '/admin' }, { label: '신청 관리' }]
    : pathname.includes('/courses/new')
    ? [{ label: '관리자', to: '/admin' }, { label: '강의 등록' }]
    : pathname.includes('/courses')
    ? [{ label: '관리자', to: '/admin' }, { label: '강의 관리' }]
    : [{ label: '관리자', to: '/admin' }, { label: '대시보드' }]

  return (
    <SubPage
      title="관리자 콘솔"
      description={`${user.full_name || user.email} · 관리자 권한으로 접속 중`}
      breadcrumb={crumb}
    >
      <div
        className="admin-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: '240px 1fr',
          gap: 18,
          alignItems: 'start',
        }}
      >
        <aside
          style={{
            background: '#fff',
            padding: '12px 0',
            boxShadow: '0 8px 24px rgba(5,10,24,0.16)',
            position: 'sticky',
            top: 88,
          }}
        >
          <NavLink to="/admin" end style={navStyle}>대시보드</NavLink>
          <NavLink to="/admin/applications" style={navStyle}>
            <span>신청 관리</span>
            {countPill(pendingApps)}
          </NavLink>
          <NavLink to="/admin/courses" style={navStyle}>
            <span>강의 관리</span>
            {countPill(pendingCourses)}
          </NavLink>
          <NavLink to="/admin/courses/new" style={navStyle}>강의 등록</NavLink>
        </aside>

        <div
          style={{
            background: '#fff',
            padding: 24,
            boxShadow: '0 8px 24px rgba(5,10,24,0.16)',
            color: '#0f172a',
          }}
        >
          <Outlet />
        </div>
      </div>

      <style>{`
        @media (max-width: 880px) {
          .admin-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </SubPage>
  )
}
