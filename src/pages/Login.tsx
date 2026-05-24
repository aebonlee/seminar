import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useToast } from '../contexts/ToastContext'

export function Login() {
  const { signIn, backendReady, mockLoginAs } = useAuth()
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

  return (
    <section className="section">
      <div style={{ maxWidth: 460, margin: '0 auto', padding: '0 24px' }}>
        <div className="text-center" style={{ marginBottom: 40 }}>
          <div className="eyebrow" style={{ justifyContent: 'center' }}>Sign in</div>
          <h1 style={{ fontSize: '2.6rem' }}>다시 만나서 반갑습니다</h1>
          <div className="divider-gold" />
        </div>

        <form onSubmit={submit} className="card" style={{ padding: 36 }}>
          <div className="form-group">
            <label className="form-label" htmlFor="email">이메일</label>
            <input
              id="email"
              type="email"
              className="form-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
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
          <button className="btn btn-primary" type="submit" disabled={loading} style={{ width: '100%', marginTop: 12 }}>
            {loading ? '로그인 중...' : '로그인'}
          </button>
          <p className="text-center mt-3" style={{ color: 'var(--text-2)', fontSize: '0.9rem' }}>
            계정이 없으신가요? <Link to="/signup">회원가입</Link>
          </p>
        </form>

        {!backendReady && (
          <div className="card mt-4" style={{ padding: 24, borderColor: 'var(--line-1)' }}>
            <div style={{ fontSize: '0.78rem', color: 'var(--gold-300)', textTransform: 'uppercase', letterSpacing: '0.16em', marginBottom: 12 }}>
              Demo Mode
            </div>
            <p style={{ color: 'var(--text-2)', fontSize: '0.9rem', marginBottom: 16 }}>
              Supabase 키가 설정되지 않아 로컬 데모 모드로 동작합니다.
              아래 버튼으로 빠르게 로그인할 수 있습니다.
            </p>
            <div style={{ display: 'flex', gap: 10 }}>
              <button
                className="btn btn-ghost btn-sm"
                onClick={() => {
                  mockLoginAs('user')
                  navigate('/mypage')
                }}
              >
                사용자로 로그인
              </button>
              <button
                className="btn btn-outline btn-sm"
                onClick={() => {
                  mockLoginAs('admin')
                  navigate('/admin')
                }}
              >
                관리자로 로그인
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
