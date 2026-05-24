import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useData } from '../../contexts/DataContext'
import { useToast } from '../../contexts/ToastContext'
import { familySites, siteCategories } from '../../data/familySites'
import type { Course } from '../../types'

export function NewCourse() {
  const { createCourse } = useData()
  const toast = useToast()
  const navigate = useNavigate()
  const [submitting, setSubmitting] = useState(false)

  const [form, setForm] = useState({
    title: '',
    subtitle: '',
    description: '',
    category: '',
    instructor: '',
    instructor_bio: '',
    duration_weeks: 6,
    sessions: 12,
    level: 'intermediate' as Course['level'],
    price: 0,
    capacity: 20,
    start_date: '',
    end_date: '',
    highlights: '',
  })

  /** 강의에 매핑할 학습 사이트 id 셋 */
  const [siteIds, setSiteIds] = useState<Set<string>>(new Set())
  const [siteCat, setSiteCat] = useState<string>('all')
  const sitesForCat = useMemo(
    () => (siteCat === 'all' ? familySites : familySites.filter((s) => s.category === siteCat)),
    [siteCat],
  )

  const toggleSite = (id: string) => {
    setSiteIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const set = <K extends keyof typeof form>(key: K, value: (typeof form)[K]) =>
    setForm((f) => ({ ...f, [key]: value }))

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      await createCourse({
        title: form.title,
        subtitle: form.subtitle || null,
        description: form.description,
        category: form.category,
        instructor: form.instructor,
        instructor_bio: form.instructor_bio || null,
        cover_url: null,
        duration_weeks: Number(form.duration_weeks),
        sessions: Number(form.sessions),
        level: form.level,
        price: Number(form.price),
        capacity: Number(form.capacity),
        start_date: form.start_date ? new Date(form.start_date).toISOString() : null,
        end_date: form.end_date ? new Date(form.end_date).toISOString() : null,
        highlights: form.highlights
          .split('\n')
          .map((s) => s.trim())
          .filter(Boolean),
        curriculum: [],
        learning_sites: familySites
          .filter((s) => siteIds.has(s.id))
          .map((s) => ({ id: s.id, name: s.nameKo, url: s.url, description: s.description })),
      })
      toast.show('강의가 등록되었습니다. 승인 처리하면 공개됩니다.', 'success')
      navigate('/admin/courses')
    } catch (err) {
      toast.show((err as Error).message ?? '등록 실패', 'error')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={submit} className="card" style={{ padding: 32 }}>
      <h3 style={{ marginTop: 0 }}>새 강의 등록</h3>
      <p style={{ color: 'var(--text-2)', fontSize: '0.88rem' }}>
        등록 즉시 <strong>승인 대기(pending)</strong> 상태가 됩니다. 강의 관리 탭에서 개강 승인하세요.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18 }} className="grid-2">
        <Field label="제목" required value={form.title} onChange={(v) => set('title', v)} />
        <Field label="부제 (선택)" value={form.subtitle} onChange={(v) => set('subtitle', v)} />

        <Field label="카테고리" required value={form.category} onChange={(v) => set('category', v)} placeholder="예: Executive, Data, Design" />
        <SelectField
          label="레벨"
          value={form.level}
          onChange={(v) => set('level', v as Course['level'])}
          options={[
            { v: 'beginner', l: '입문' },
            { v: 'intermediate', l: '중급' },
            { v: 'advanced', l: '고급' },
          ]}
        />

        <Field label="강사" required value={form.instructor} onChange={(v) => set('instructor', v)} />
        <Field label="강사 소개 (선택)" value={form.instructor_bio} onChange={(v) => set('instructor_bio', v)} />

        <Field type="number" label="기간 (주)" value={String(form.duration_weeks)} onChange={(v) => set('duration_weeks', Number(v))} />
        <Field type="number" label="총 회차" value={String(form.sessions)} onChange={(v) => set('sessions', Number(v))} />

        <Field type="number" label="수강료 (원)" value={String(form.price)} onChange={(v) => set('price', Number(v))} />
        <Field type="number" label="정원" value={String(form.capacity)} onChange={(v) => set('capacity', Number(v))} />

        <Field type="date" label="개강일" value={form.start_date} onChange={(v) => set('start_date', v)} />
        <Field type="date" label="종강일" value={form.end_date} onChange={(v) => set('end_date', v)} />
      </div>

      <div className="form-group" style={{ marginTop: 8 }}>
        <label className="form-label">소개</label>
        <textarea
          className="form-textarea"
          value={form.description}
          onChange={(e) => set('description', e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label className="form-label">하이라이트 (줄 단위)</label>
        <textarea
          className="form-textarea"
          value={form.highlights}
          onChange={(e) => set('highlights', e.target.value)}
          placeholder="실전 케이스 스터디&#10;1:1 멘토링 포함&#10;수료증 발급"
        />
      </div>

      {/* 학습 사이트 매핑 */}
      <div className="form-group" style={{ marginTop: 24, paddingTop: 24, borderTop: '1px solid var(--border)' }}>
        <label className="form-label">
          학습 사이트 매핑 ({siteIds.size}개 선택됨)
        </label>
        <p className="form-help" style={{ marginTop: 0, marginBottom: 12 }}>
          이 강의 신청이 승인된 사용자에게만 마이페이지에서 공개됩니다. 강의 주제에 맞는 사이트를 큐레이션해주세요.
        </p>

        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 10 }}>
          <Pill active={siteCat === 'all'} onClick={() => setSiteCat('all')}>전체</Pill>
          {siteCategories.map((c) => (
            <Pill key={c.id} active={siteCat === c.id} onClick={() => setSiteCat(c.id)}>
              {c.icon} {c.nameKo}
            </Pill>
          ))}
        </div>

        <div
          style={{
            maxHeight: 280,
            overflowY: 'auto',
            border: '1px solid var(--border)',
            borderRadius: 'var(--r-md)',
            padding: 10,
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
            gap: 6,
            background: 'var(--bg-soft)',
          }}
        >
          {sitesForCat.map((s) => {
            const checked = siteIds.has(s.id)
            return (
              <label
                key={s.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '8px 10px',
                  background: checked ? 'var(--accent-50)' : 'var(--surface)',
                  border: `1px solid ${checked ? 'var(--accent-300)' : 'var(--border)'}`,
                  borderRadius: 6,
                  cursor: 'pointer',
                  fontSize: 13,
                  color: 'var(--text)',
                  transition: 'all 0.12s var(--ease)',
                }}
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => toggleSite(s.id)}
                  style={{ accentColor: 'var(--accent-600)' }}
                />
                <span style={{ fontWeight: checked ? 700 : 500 }}>{s.nameKo}</span>
              </label>
            )
          })}
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, marginTop: 16 }}>
        <button type="button" className="btn btn-ghost" onClick={() => navigate('/admin/courses')}>
          취소
        </button>
        <button type="submit" className="btn btn-primary" disabled={submitting}>
          {submitting ? '등록 중...' : '강의 등록'}
        </button>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .grid-2 { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </form>
  )
}

function Field({
  label,
  value,
  onChange,
  type = 'text',
  required,
  placeholder,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  type?: string
  required?: boolean
  placeholder?: string
}) {
  return (
    <div className="form-group" style={{ margin: 0 }}>
      <label className="form-label">{label}</label>
      <input
        type={type}
        className="form-input"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        placeholder={placeholder}
      />
    </div>
  )
}

function SelectField({
  label,
  value,
  onChange,
  options,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  options: { v: string; l: string }[]
}) {
  return (
    <div className="form-group" style={{ margin: 0 }}>
      <label className="form-label">{label}</label>
      <select className="form-select" value={value} onChange={(e) => onChange(e.target.value)}>
        {options.map((o) => (
          <option key={o.v} value={o.v}>
            {o.l}
          </option>
        ))}
      </select>
    </div>
  )
}

function Pill({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        padding: '6px 12px',
        fontSize: 12,
        fontWeight: 700,
        background: active ? 'var(--accent-600)' : 'transparent',
        color: active ? '#fff' : 'var(--text-2)',
        border: `1px solid ${active ? 'var(--accent-600)' : 'var(--border)'}`,
        borderRadius: 999,
        cursor: 'pointer',
      }}
    >
      {children}
    </button>
  )
}
