import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useData } from '../../contexts/DataContext'
import { useToast } from '../../contexts/ToastContext'
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
