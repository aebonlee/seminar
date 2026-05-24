import { Link } from 'react-router-dom'

export function NotFound() {
  return (
    <section className="section">
      <div className="container-narrow text-center">
        <div className="gold-text" style={{ fontFamily: 'var(--font-display)', fontSize: '8rem', lineHeight: 1, fontWeight: 600 }}>
          404
        </div>
        <h2>페이지를 찾을 수 없습니다</h2>
        <div className="divider-gold" />
        <p style={{ color: 'var(--text-2)' }}>요청하신 페이지가 이동되었거나 존재하지 않습니다.</p>
        <Link to="/" className="btn btn-outline mt-3">홈으로</Link>
      </div>
    </section>
  )
}
