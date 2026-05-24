import { useMemo, useState } from 'react'
import { useData } from '../../contexts/DataContext'
import { useToast } from '../../contexts/ToastContext'
import type { CourseStatus } from '../../types'

const tabs: { k: CourseStatus | 'all'; l: string }[] = [
  { k: 'pending', l: '승인 대기' },
  { k: 'approved', l: '개강 중' },
  { k: 'rejected', l: '거절' },
  { k: 'archived', l: '종료' },
  { k: 'all', l: '전체' },
]

export function CoursesAdmin() {
  const { courses, setCourseStatus } = useData()
  const toast = useToast()
  const [tab, setTab] = useState<(typeof tabs)[number]['k']>('pending')

  const filtered = useMemo(
    () => (tab === 'all' ? courses : courses.filter((c) => c.status === tab)),
    [courses, tab],
  )

  const change = async (id: string, status: CourseStatus) => {
    try {
      await setCourseStatus(id, status)
      toast.show('강의 상태가 업데이트되었습니다.', 'success')
    } catch (e) {
      toast.show((e as Error).message ?? '업데이트 실패', 'error')
    }
  }

  return (
    <>
      <div style={{ display: 'flex', gap: 8, marginBottom: 24, flexWrap: 'wrap' }}>
        {tabs.map((t) => {
          const active = tab === t.k
          const count = t.k === 'all' ? courses.length : courses.filter((c) => c.status === t.k).length
          return (
            <button
              key={t.k}
              onClick={() => setTab(t.k)}
              style={{
                padding: '10px 18px',
                background: active ? 'rgba(212,175,55,0.12)' : 'transparent',
                border: `1px solid ${active ? 'var(--accent-700)' : 'var(--line-2)'}`,
                color: active ? 'var(--accent-700)' : '#334155',
                borderRadius: 999,
                cursor: 'pointer',
                fontSize: '0.86rem',
              }}
            >
              {t.l} <span style={{ color: '#64748b', marginLeft: 6 }}>({count})</span>
            </button>
          )
        })}
      </div>

      {filtered.length === 0 ? (
        <div className="card" style={{ padding: 60, textAlign: 'center' }}>
          <p style={{ color: '#475569', margin: 0 }}>해당 상태의 강의가 없습니다.</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {filtered.map((c) => (
            <div key={c.id} className="card" style={{ padding: 24 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', gap: 16, flexWrap: 'wrap' }}>
                <div style={{ flex: 1, minWidth: 240 }}>
                  <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 6 }}>
                    <span className="badge badge-gold">{c.category}</span>
                    <span
                      className={`badge badge-${
                        c.status === 'pending'
                          ? 'pending'
                          : c.status === 'approved'
                          ? 'approved'
                          : c.status === 'rejected'
                          ? 'rejected'
                          : 'gold'
                      }`}
                    >
                      {c.status}
                    </span>
                  </div>
                  <h3 style={{ margin: '4px 0', fontSize: '1.2rem' }}>{c.title}</h3>
                  <div style={{ color: '#475569', fontSize: '0.86rem' }}>
                    {c.instructor} · {c.duration_weeks}주 · 정원 {c.capacity}명
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {c.status !== 'approved' && (
                    <button className="btn btn-success btn-sm" onClick={() => change(c.id, 'approved')}>
                      개강 승인
                    </button>
                  )}
                  {c.status === 'pending' && (
                    <button className="btn btn-danger btn-sm" onClick={() => change(c.id, 'rejected')}>
                      거절
                    </button>
                  )}
                  {c.status === 'approved' && (
                    <button className="btn btn-ghost btn-sm" onClick={() => change(c.id, 'archived')}>
                      종료 처리
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  )
}
