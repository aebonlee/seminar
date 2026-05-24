import { useEffect, useMemo, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useData } from '../contexts/DataContext'
import { useAuth } from '../contexts/AuthContext'
import { useToast } from '../contexts/ToastContext'

export function Apply() {
  const [params] = useSearchParams()
  const navigate = useNavigate()
  const { courses, applyToCourse } = useData()
  const { user } = useAuth()
  const toast = useToast()

  const approved = useMemo(() => courses.filter((c) => c.status === 'approved'), [courses])

  const [courseId, setCourseId] = useState<string>(params.get('course') ?? approved[0]?.id ?? '')
  const [name, setName] = useState(user?.full_name ?? '')
  const [email, setEmail] = useState(user?.email ?? '')
  const [phone, setPhone] = useState('')
  const [organization, setOrganization] = useState('')
  const [motivation, setMotivation] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    if (!courseId && approved[0]) setCourseId(approved[0].id)
  }, [approved, courseId])

  const selected = approved.find((c) => c.id === courseId)

  const validate = () => {
    const e: Record<string, string> = {}
    if (!courseId) e.courseId = '강의를 선택해주세요.'
    if (!name.trim()) e.name = '이름을 입력해주세요.'
    if (!email.trim()) e.email = '이메일을 입력해주세요.'
    else if (!/^\S+@\S+\.\S+$/.test(email)) e.email = '올바른 이메일 형식이 아닙니다.'
    if (!phone.trim()) e.phone = '연락처를 입력해주세요.'
    if (motivation.trim().length < 20) e.motivation = '20자 이상 작성해주세요.'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    if (!selected) return
    setSubmitting(true)
    try {
      await applyToCourse(selected, { name, email, phone, organization, motivation })
      toast.show('신청이 접수되었습니다. 관리자 검토 후 안내드릴게요.', 'success')
      navigate('/mypage')
    } catch (err) {
      toast.show((err as Error).message ?? '신청 중 오류가 발생했습니다.', 'error')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section className="section">
      <div className="container-narrow">
        <div className="text-center" style={{ marginBottom: 56 }}>
          <div className="eyebrow" style={{ justifyContent: 'center' }}>Application</div>
          <h1>수강 신청</h1>
          <div className="divider-gold" />
          <p style={{ color: 'var(--text-2)' }}>
            제출하신 신청서는 관리자 검토를 거쳐 승인 시 이메일로 안내됩니다.
          </p>
        </div>

        <form onSubmit={onSubmit} noValidate>
          <div className="card" style={{ padding: 'clamp(28px, 4vw, 48px)' }}>
            <div className="form-group">
              <label className="form-label" htmlFor="course">강의 선택</label>
              <select
                id="course"
                className="form-select"
                value={courseId}
                onChange={(e) => setCourseId(e.target.value)}
              >
                <option value="">강의를 선택해주세요</option>
                {approved.map((c) => (
                  <option key={c.id} value={c.id}>
                    [{c.category}] {c.title}
                  </option>
                ))}
              </select>
              {errors.courseId && <div className="form-error">{errors.courseId}</div>}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }} className="grid-2">
              <div className="form-group">
                <label className="form-label" htmlFor="name">이름</label>
                <input
                  id="name"
                  className="form-input"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="홍길동"
                />
                {errors.name && <div className="form-error">{errors.name}</div>}
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="email">이메일</label>
                <input
                  id="email"
                  type="email"
                  className="form-input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                />
                {errors.email && <div className="form-error">{errors.email}</div>}
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="phone">연락처</label>
                <input
                  id="phone"
                  className="form-input"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="010-0000-0000"
                />
                {errors.phone && <div className="form-error">{errors.phone}</div>}
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="org">소속 (선택)</label>
                <input
                  id="org"
                  className="form-input"
                  value={organization}
                  onChange={(e) => setOrganization(e.target.value)}
                  placeholder="회사 / 학교"
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="motivation">신청 동기 / 학습 목표</label>
              <textarea
                id="motivation"
                className="form-textarea"
                value={motivation}
                onChange={(e) => setMotivation(e.target.value)}
                placeholder="강의를 통해 달성하고자 하는 목표를 자유롭게 작성해주세요. (최소 20자)"
              />
              {errors.motivation && <div className="form-error">{errors.motivation}</div>}
              <div className="form-help">{motivation.length} / 1000자</div>
            </div>

            <div style={{ marginTop: 24, paddingTop: 24, borderTop: '1px solid var(--line-2)' }}>
              <button type="submit" className="btn btn-primary btn-lg" disabled={submitting} style={{ width: '100%' }}>
                {submitting ? '제출 중...' : '신청서 제출'}
              </button>
              <p className="form-help text-center mt-2">
                제출 시 개인정보 처리방침에 동의한 것으로 간주됩니다.
              </p>
            </div>
          </div>
        </form>

        <style>{`
          @media (max-width: 640px) {
            .grid-2 { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </div>
    </section>
  )
}
