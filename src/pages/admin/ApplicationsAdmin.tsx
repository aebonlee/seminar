import { useMemo, useState } from 'react'
import { useData } from '../../contexts/DataContext'
import { useToast } from '../../contexts/ToastContext'
import type { ApplicationStatus } from '../../types'

const tabs: { k: ApplicationStatus | 'all'; l: string }[] = [
  { k: 'pending', l: '검토 대기' },
  { k: 'approved', l: '승인' },
  { k: 'rejected', l: '거절' },
  { k: 'all', l: '전체' },
]

export function ApplicationsAdmin() {
  const { applications, updateApplicationStatus, courses } = useData()
  const toast = useToast()
  const [tab, setTab] = useState<(typeof tabs)[number]['k']>('pending')
  const [openId, setOpenId] = useState<string | null>(null)
  const [note, setNote] = useState('')

  const filtered = useMemo(
    () => (tab === 'all' ? applications : applications.filter((a) => a.status === tab)),
    [applications, tab],
  )

  const decide = async (id: string, status: ApplicationStatus) => {
    try {
      await updateApplicationStatus(id, status, note)
      toast.show(`신청이 ${status === 'approved' ? '승인' : '거절'}되었습니다.`, 'success')
      setOpenId(null)
      setNote('')
    } catch (e) {
      toast.show((e as Error).message ?? '처리 실패', 'error')
    }
  }

  return (
    <>
      <div style={{ display: 'flex', gap: 8, marginBottom: 24, flexWrap: 'wrap' }}>
        {tabs.map((t) => {
          const active = tab === t.k
          const count = t.k === 'all' ? applications.length : applications.filter((a) => a.status === t.k).length
          return (
            <button
              key={t.k}
              onClick={() => setTab(t.k)}
              style={{
                padding: '10px 18px',
                background: active ? 'rgba(212,175,55,0.12)' : 'transparent',
                border: `1px solid ${active ? 'var(--gold-300)' : 'var(--line-2)'}`,
                color: active ? 'var(--gold-200)' : 'var(--text-1)',
                borderRadius: 999,
                cursor: 'pointer',
                fontSize: '0.86rem',
              }}
            >
              {t.l} <span style={{ color: 'var(--text-3)', marginLeft: 6 }}>({count})</span>
            </button>
          )
        })}
      </div>

      {filtered.length === 0 ? (
        <div className="card" style={{ padding: 60, textAlign: 'center' }}>
          <p style={{ color: 'var(--text-2)', margin: 0 }}>해당 상태의 신청서가 없습니다.</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {filtered.map((a) => {
            const course = a.course ?? courses.find((c) => c.id === a.course_id)
            const expanded = openId === a.id
            return (
              <div key={a.id} className="card" style={{ padding: 24 }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 16, alignItems: 'start' }}>
                  <div>
                    <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 6 }}>
                      <span className={`badge badge-${a.status === 'pending' ? 'pending' : a.status === 'approved' ? 'approved' : 'rejected'}`}>
                        {a.status}
                      </span>
                      <span style={{ color: 'var(--text-3)', fontSize: '0.78rem' }}>
                        {new Date(a.created_at).toLocaleString('ko-KR')}
                      </span>
                    </div>
                    <h3 style={{ margin: '4px 0', fontSize: '1.15rem' }}>
                      {a.name} <span style={{ color: 'var(--text-3)', fontSize: '0.85rem', fontWeight: 400 }}>· {a.email}</span>
                    </h3>
                    <div style={{ color: 'var(--text-2)', fontSize: '0.88rem' }}>
                      {course?.title ?? a.course_id} · {a.phone}
                      {a.organization ? ` · ${a.organization}` : ''}
                    </div>
                  </div>
                  <button
                    className="btn btn-ghost btn-sm"
                    onClick={() => {
                      setOpenId(expanded ? null : a.id)
                      setNote(a.admin_note ?? '')
                    }}
                  >
                    {expanded ? '닫기' : '상세'}
                  </button>
                </div>

                {expanded && (
                  <div style={{ marginTop: 18, paddingTop: 18, borderTop: '1px solid var(--line-2)' }}>
                    <div className="form-group">
                      <label className="form-label">신청 동기</label>
                      <div style={{ color: 'var(--text-1)', whiteSpace: 'pre-wrap', lineHeight: 1.75 }}>
                        {a.motivation}
                      </div>
                    </div>
                    {a.status === 'pending' && (
                      <>
                        <div className="form-group">
                          <label className="form-label" htmlFor={`note-${a.id}`}>관리자 메모 (신청자에게 공개)</label>
                          <textarea
                            id={`note-${a.id}`}
                            className="form-textarea"
                            value={note}
                            onChange={(e) => setNote(e.target.value)}
                            placeholder="개강일, 안내사항 등을 작성해주세요."
                          />
                        </div>
                        <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
                          <button className="btn btn-danger btn-sm" onClick={() => decide(a.id, 'rejected')}>
                            거절
                          </button>
                          <button className="btn btn-success btn-sm" onClick={() => decide(a.id, 'approved')}>
                            승인
                          </button>
                        </div>
                      </>
                    )}
                    {a.status !== 'pending' && a.admin_note && (
                      <div className="form-group">
                        <label className="form-label">관리자 메모</label>
                        <div style={{ color: 'var(--text-1)' }}>{a.admin_note}</div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}
    </>
  )
}
