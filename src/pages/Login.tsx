import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth, type OAuthProvider } from '../contexts/AuthContext'
import { useToast } from '../contexts/ToastContext'

export function Login() {
  const { signIn, signInWithOAuth, backendReady, mockLoginAs } = useAuth()
  const toast = useToast()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await signIn(email, password)
      toast.show('환영합니다.', 'success')
      navigate('/mypage')
    } catch (err) {
      toast.show((err as Error).message ?? '로그인 실패', 'error')
    } finally {
      setLoading(false)
    }
  }

  const oauth = async (p: OAuthProvider) => {
    try {
      await signInWithOAuth(p)
    } catch (err) {
      toast.show((err as Error).message ?? 'OAuth 로그인 실패', 'error')
    }
  }

  return (
    <section className="section" style={{ paddingTop: 'calc(var(--nav-h) + 56px)' }}>
      <div style={{ maxWidth: 440, margin: '0 auto', padding: '0 20px' }}>
        <div className="text-center" style={{ marginBottom: 32 }}>
          <div className="eyebrow" style={{ justifyContent: 'center' }}>로그인</div>
          <h1 style={{ fontSize: '2rem', margin: '4px 0 8px' }}>다시 만나서 반갑습니다</h1>
          <p style={{ color: 'var(--text-3)', margin: 0 }}>이메일 또는 소셜 계정으로 로그인하세요.</p>
        </div>

        {/* OAuth */}
        <div className="card" style={{ padding: 24, marginBottom: 16 }}>
          <button
            type="button"
            className="btn btn-oauth btn-google"
            onClick={() => oauth('google')}
            style={{ width: '100%', marginBottom: 10 }}
            disabled={!backendReady}
          >
            <GoogleIcon /> Google로 계속하기
          </button>
          <button
            type="button"
            className="btn btn-oauth btn-kakao"
            onClick={() => oauth('kakao')}
            style={{ width: '100%' }}
            disabled={!backendReady}
          >
            <KakaoIcon /> 카카오로 계속하기
          </button>
          {!backendReady && (
            <p className="form-help text-center" style={{ marginTop: 10 }}>
              소셜 로그인은 Supabase 연결 후 사용 가능합니다.
            </p>
          )}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10, margin: '16px 0' }}>
          <span style={{ flex: 1, height: 1, background: 'var(--border)' }} />
          <span style={{ color: 'var(--text-3)', fontSize: '0.78rem', fontWeight: 700 }}>또는</span>
          <span style={{ flex: 1, height: 1, background: 'var(--border)' }} />
        </div>

        <form onSubmit={submit} className="card" style={{ padding: 28 }}>
          <div className="form-group">
            <label className="form-label" htmlFor="email">이메일</label>
            <input
              id="email"
              type="email"
              className="form-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="you@example.com"
            />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="password">비밀번호</label>
            <input
              id="password"
              type="password"
              className="form-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required={backendReady}
              placeholder={backendReady ? '' : '데모 모드 — 아무 값이나'}
            />
          </div>
          <button className="btn btn-primary" type="submit" disabled={loading} style={{ width: '100%', marginTop: 8 }}>
            {loading ? '로그인 중...' : '이메일로 로그인'}
          </button>
          <p className="text-center mt-3" style={{ color: 'var(--text-3)', fontSize: '0.88rem' }}>
            계정이 없으신가요? <Link to="/signup">회원가입</Link>
          </p>
        </form>

        {!backendReady && (
          <div className="card mt-4" style={{ padding: 20 }}>
            <div style={{ fontSize: '0.74rem', color: 'var(--accent-600)', fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 10 }}>
              데모 모드
            </div>
            <p style={{ color: 'var(--text-3)', fontSize: '0.88rem', marginBottom: 12 }}>
              Supabase 키 미설정 — 로컬 데모로 동작합니다.
            </p>
            <div style={{ display: 'flex', gap: 8 }}>
              <button className="btn btn-ghost btn-sm" onClick={() => { mockLoginAs('user'); navigate('/mypage') }}>
                일반 사용자
              </button>
              <button className="btn btn-outline btn-sm" onClick={() => { mockLoginAs('admin'); navigate('/admin') }}>
                관리자
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden>
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.99.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
      <path fill="#FBBC05" d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.83z"/>
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38z"/>
    </svg>
  )
}

function KakaoIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden>
      <path fill="#181600" d="M12 3C6.477 3 2 6.54 2 10.9c0 2.83 1.88 5.32 4.7 6.71l-1.2 4.39c-.1.36.3.65.62.45l5.27-3.48c.2.01.4.02.61.02 5.52 0 10-3.54 10-7.9C22 6.54 17.52 3 12 3z"/>
    </svg>
  )
}
