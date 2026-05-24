import { useMemo, useState } from 'react'
import { CourseCard } from '../components/ui/CourseCard'
import { useData } from '../contexts/DataContext'

export function Courses() {
  const { courses, loading } = useData()
  const [category, setCategory] = useState<string>('all')
  const [level, setLevel] = useState<string>('all')

  const approved = useMemo(() => courses.filter((c) => c.status === 'approved'), [courses])

  const categories = useMemo(() => {
    const set = new Set(approved.map((c) => c.category))
    return ['all', ...Array.from(set)]
  }, [approved])

  const filtered = useMemo(() => {
    return approved.filter((c) => {
      const matchCat = category === 'all' || c.category === category
      const matchLevel = level === 'all' || c.level === level
      return matchCat && matchLevel
    })
  }, [approved, category, level])

  return (
    <section className="section">
      <div className="container">
        <div style={{ textAlign: 'center', maxWidth: 720, margin: '0 auto 56px' }}>
          <div className="eyebrow" style={{ justifyContent: 'center' }}>Open Enrollment</div>
          <h1 style={{ marginBottom: 16 }}>
            현재 모집 중인 <span className="gold-text">세미나</span>
          </h1>
          <div className="divider-gold" />
          <p style={{ color: 'var(--text-2)' }}>
            관리자 검토를 통과한 강의만 노출됩니다. 관심 있는 강의를 선택해 신청해주세요.
          </p>
        </div>

        <div
          style={{
            display: 'flex',
            gap: 32,
            justifyContent: 'center',
            flexWrap: 'wrap',
            marginBottom: 48,
            paddingBottom: 32,
            borderBottom: '1px solid var(--line-2)',
          }}
        >
          <FilterGroup
            label="Category"
            options={categories}
            value={category}
            onChange={setCategory}
            labelFor={(v) => (v === 'all' ? '전체' : v)}
          />
          <FilterGroup
            label="Level"
            options={['all', 'beginner', 'intermediate', 'advanced']}
            value={level}
            onChange={setLevel}
            labelFor={(v) =>
              ({ all: '전체', beginner: '입문', intermediate: '중급', advanced: '고급' }[v] ?? v)
            }
          />
        </div>

        {loading ? (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: 28,
            }}
          >
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="skeleton" style={{ height: 360 }} />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="card" style={{ padding: 80, textAlign: 'center' }}>
            <p style={{ color: 'var(--text-2)', margin: 0 }}>
              조건에 맞는 강의가 없습니다. 다른 카테고리를 선택해주세요.
            </p>
          </div>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: 28,
            }}
          >
            {filtered.map((c) => (
              <CourseCard key={c.id} course={c} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

function FilterGroup({
  label,
  options,
  value,
  onChange,
  labelFor,
}: {
  label: string
  options: string[]
  value: string
  onChange: (v: string) => void
  labelFor: (v: string) => string
}) {
  return (
    <div>
      <div
        style={{
          fontSize: '0.7rem',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: 'var(--gold-300)',
          marginBottom: 12,
          textAlign: 'center',
        }}
      >
        {label}
      </div>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center' }}>
        {options.map((opt) => {
          const active = value === opt
          return (
            <button
              key={opt}
              onClick={() => onChange(opt)}
              style={{
                padding: '8px 16px',
                fontSize: '0.82rem',
                background: active ? 'rgba(212,175,55,0.12)' : 'transparent',
                border: `1px solid ${active ? 'var(--gold-300)' : 'var(--line-2)'}`,
                color: active ? 'var(--gold-200)' : 'var(--text-1)',
                borderRadius: 999,
                cursor: 'pointer',
                transition: 'all 0.2s var(--ease)',
                letterSpacing: '0.04em',
              }}
            >
              {labelFor(opt)}
            </button>
          )
        })}
      </div>
    </div>
  )
}
