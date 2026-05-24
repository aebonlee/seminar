import { Link } from 'react-router-dom'
import { Logo } from './Logo'

export function Footer() {
  return (
    <footer
      style={{
        borderTop: '1px solid var(--line-2)',
        background: 'var(--bg-0)',
        marginTop: 80,
        paddingTop: 64,
        paddingBottom: 32,
      }}
    >
      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: 48,
            paddingBottom: 48,
            borderBottom: '1px solid var(--line-2)',
          }}
        >
          <div>
            <Logo />
            <p
              style={{
                color: 'var(--text-2)',
                fontSize: '0.88rem',
                marginTop: 20,
                maxWidth: 280,
              }}
            >
              엄선된 분야의 전문가와 함께하는 프리미엄 세미나 플랫폼.
              조직과 개인의 다음 단계를 설계합니다.
            </p>
          </div>

          <div>
            <h4 style={{ fontSize: '0.78rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold-300)' }}>
              EXPLORE
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
              <li><Link to="/courses">개설 강의</Link></li>
              <li><Link to="/apply">수강 신청</Link></li>
              <li><Link to="/about">소개</Link></li>
            </ul>
          </div>

          <div>
            <h4 style={{ fontSize: '0.78rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold-300)' }}>
              ACCOUNT
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
              <li><Link to="/login">로그인</Link></li>
              <li><Link to="/signup">회원가입</Link></li>
              <li><Link to="/mypage">내 신청 현황</Link></li>
            </ul>
          </div>

          <div>
            <h4 style={{ fontSize: '0.78rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold-300)' }}>
              CONTACT
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10, color: 'var(--text-2)', fontSize: '0.88rem' }}>
              <li>서울특별시 강남구</li>
              <li>contact@dreamitbiz.com</li>
              <li>02-0000-0000</li>
            </ul>
          </div>
        </div>

        <div
          style={{
            paddingTop: 28,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            color: 'var(--text-3)',
            fontSize: '0.8rem',
            flexWrap: 'wrap',
            gap: 12,
          }}
        >
          <span>© {new Date().getFullYear()} DreamIT Biz. All rights reserved.</span>
          <span style={{ letterSpacing: '0.2em', textTransform: 'uppercase' }}>
            Crafted with <span style={{ color: 'var(--gold-300)' }}>·</span> Obsidian &amp; Gold
          </span>
        </div>
      </div>
    </footer>
  )
}
