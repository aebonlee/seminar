import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useToast } from '../contexts/ToastContext'
import { SubPage, SubPanel } from '../components/layout/SubPage'

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
    <SubPage title="회원가입" description="간단한 정보로 가입 후 강의를 신청해주세요." breadcrumb={[{ label: 'Account' }, { label: '회원가입' }]}>
      <div style={{ maxWidth: 460, margin: '0 auto' }}>
        <SubPanel>
          <form onSubmit={submit}>
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
              <input id="password" type="password" className="form-input" value={password} onChange={(e) => setPassword(e.target.value)} minLength={6} required />
            </div>
            <button className="btn btn-primary" type="submit" disabled={loading} style={{ width: '100%' }}>
              {loading ? '가입 중...' : '가입하기'}
            </button>
            <p style={{ marginTop: 20, textAlign: 'center', color: '#64748b', fontSize: 14 }}>
              이미 계정이 있나요? <Link to="/login" style={{ color: 'var(--accent-700)', fontWeight: 700 }}>로그인</Link>
            </p>
          </form>
        </SubPanel>
      </div>
    </SubPage>
  )
}
