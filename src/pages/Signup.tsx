import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useToast } from '../contexts/ToastContext'

export function Signup() {
  const { signUp } = useAuth()
  const toast = useToast()
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await signUp(email, password, name)
      toast.show('가입이 완료되었습니다.', 'success')
      navigate('/mypage')
    } catch (err) {
      toast.show((err as Error).message ?? '가입 실패', 'error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="section">
      <div style={{ maxWidth: 460, margin: '0 auto', padding: '0 24px' }}>
        <div className="text-center" style={{ marginBottom: 40 }}>
          <div className="eyebrow" style={{ justifyContent: 'center' }}>Create account</div>
          <h1 style={{ fontSize: '2.6rem' }}>회원가입</h1>
          <div className="divider-gold" />
        </div>

        <form onSubmit={submit} className="card" style={{ padding: 36 }}>
          <div className="form-group">
            <label className="form-label" htmlFor="name">이름</label>
            <input id="name" className="form-input" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="email">이메일</label>
            <input id="email" type="email" className="form-input" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="password">비밀번호</label>
            <input
              id="password"
              type="password"
              className="form-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              minLength={6}
              required
            />
          </div>
          <button className="btn btn-primary" type="submit" disabled={loading} style={{ width: '100%', marginTop: 12 }}>
            {loading ? '가입 중...' : '가입하기'}
          </button>
          <p className="text-center mt-3" style={{ color: 'var(--text-2)', fontSize: '0.9rem' }}>
            이미 계정이 있나요? <Link to="/login">로그인</Link>
          </p>
        </form>
      </div>
    </section>
  )
}
