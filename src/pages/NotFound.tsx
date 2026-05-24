import { Link } from 'react-router-dom'
import { SubPage, SubPanel } from '../components/layout/SubPage'

export function NotFound() {
  return (
    <SubPage title="페이지를 찾을 수 없습니다" breadcrumb={[{ label: '오류' }, { label: '404' }]}>
      <SubPanel>
        <div style={{ textAlign: 'center', padding: 40 }}>
          <div style={{ fontSize: '4.5rem', fontWeight: 800, color: 'var(--accent-700)', letterSpacing: '-0.04em', lineHeight: 1 }}>
            404
          </div>
          <p style={{ marginTop: 16, color: '#64748b' }}>요청하신 페이지가 이동되었거나 존재하지 않습니다.</p>
          <div style={{ marginTop: 20 }}>
            <Link to="/" className="btn btn-primary">홈으로</Link>
          </div>
        </div>
      </SubPanel>
    </SubPage>
  )
}
