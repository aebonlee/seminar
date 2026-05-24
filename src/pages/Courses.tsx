import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useData } from '../contexts/DataContext'
import { SubPage } from '../components/layout/SubPage'
import type { Course } from '../types'

const fmtPrice = (n: number) => n.toLocaleString('ko-KR') + '원'
const fmtDate = (iso: string | null) =>
  iso ? new Date(iso).toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' }) : 'TBA'
const levelLabel: Record<Course['level'], string> = {
  beginner: '입문',
  intermediate: '중급',
  advanced: '고급',
}

export function Courses() {
  const { courses, loading } = useData()
  const [category, setCategory] = useState<string>('all')
  const [level, setLevel] = useState<string>('all')

  const approved = useMemo(() => courses.filter((c) => c.status === 'approved'), [courses])
  const categories = useMemo(() => ['all', ...Array.from(new Set(approved.map((c) => c.category)))], [approved])
  const filtered = useMemo(
    () =>
      approved.filter(
        (c) =>
          (category === 'all' || c.category === category) && (level === 'all' || c.level === level),
      ),
    [approved, category, level],
  )

  return (
    <SubPage
      title="모집 강의"
      description="관리자 큐레이션을 통과한 강의만 노출됩니다. 관심 있는 강의를 선택해 신청해주세요."
      breadcrumb={[{ label: '강의 안내', to: '/courses' }, { label: '모집 강의' }]}
    >
      {/* 필터 바 */}
      <div
        style={{
          background: 'rgba(255,255,255,0.95)',
          padding: '22px 24px',
          borderRadius: 0,
          marginBottom: 24,
          display: 'flex',
          gap: 32,
          flexWrap: 'wrap',
          alignItems: 'center',
          boxShadow: '0 8px 24px rgba(5,10,24,0.16)',
        }}
      >
        <FilterGroup
          label="카테고리"
          options={categories}
          value={category}
          onChange={setCategory}
          render={(v) => (v === 'all' ? '전체' : v)}
        />
        <FilterGroup
          label="레벨"
          options={['all', 'beginner', 'intermediate', 'advanced']}
          value={level}
          onChange={setLevel}
          render={(v) => ({ all: '전체', beginner: '입문', intermediate: '중급', advanced: '고급' }[v] ?? v)}
        />
        <div style={{ marginLeft: 'auto', color: '#64748b', fontSize: 14, fontWeight: 600 }}>
          {filtered.length}개 강의
        </div>
      </div>

      {/* 강의 그리드 */}
      {loading ? (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: 18,
          }}
        >
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} style={{ height: 320, background: 'rgba(255,255,255,0.4)', borderRadius: 0 }} className="skeleton" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div
          style={{
            background: 'rgba(255,255,255,0.95)',
            padding: 80,
            textAlign: 'center',
            color: '#64748b',
          }}
        >
          조건에 맞는 강의가 없습니다.
        </div>
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: 18,
          }}
        >
          {filtered.map((c) => (
            <CourseCardWhite key={c.id} course={c} />
          ))}
        </div>
      )}
    </SubPage>
  )
}

function FilterGroup({
  label,
  options,
  value,
  onChange,
  render,
}: {
  label: string
  options: string[]
  value: string
  onChange: (v: string) => void
  render: (v: string) => string
}) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <span style={{ fontSize: 12, fontWeight: 800, color: '#475569', letterSpacing: '0.08em' }}>{label}</span>
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
        {options.map((opt) => {
          const active = value === opt
          return (
            <button
              key={opt}
              onClick={() => onChange(opt)}
              style={{
                padding: '7px 14px',
                background: active ? 'var(--accent-600)' : 'transparent',
                color: active ? '#fff' : '#475569',
                border: `1px solid ${active ? 'var(--accent-600)' : '#cbd5e1'}`,
                borderRadius: 999,
                fontSize: 13,
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.15s var(--ease)',
              }}
            >
              {render(opt)}
            </button>
          )
        })}
      </div>
    </div>
  )
}

function CourseCardWhite({ course }: { course: Course }) {
  return (
    <Link
      to={`/courses/${course.id}`}
      style={{
        display: 'flex',
        flexDirection: 'column',
        background: '#fff',
        color: '#0f172a',
        textDecoration: 'none',
        borderRadius: 0,
        overflow: 'hidden',
        boxShadow: '0 8px 24px rgba(5,10,24,0.16)',
        transition: 'transform 0.2s var(--ease), box-shadow 0.2s var(--ease)',
        border: '1px solid rgba(15,23,42,0.06)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-3px)'
        e.currentTarget.style.boxShadow = '0 16px 32px rgba(5,10,24,0.24)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)'
        e.currentTarget.style.boxShadow = '0 8px 24px rgba(5,10,24,0.16)'
      }}
    >
      {/* Top image-like band */}
      <div
        style={{
          height: 140,
          background: `linear-gradient(135deg, var(--accent-700) 0%, var(--accent-500) 100%)`,
          position: 'relative',
          padding: 18,
          display: 'flex',
          alignItems: 'flex-end',
          color: '#fff',
        }}
      >
        <div
          aria-hidden
          style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(400px 200px at 80% 0%, rgba(255,255,255,0.2), transparent 60%)',
          }}
        />
        <div style={{ position: 'relative', zIndex: 1, display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'flex-end' }}>
          <span
            style={{
              fontSize: 11,
              fontWeight: 800,
              letterSpacing: '0.1em',
              padding: '4px 10px',
              background: 'rgba(255,255,255,0.18)',
              backdropFilter: 'blur(4px)',
            }}
          >
            {course.category}
          </span>
          <span style={{ fontSize: 11, opacity: 0.85 }}>{levelLabel[course.level]}</span>
        </div>
      </div>

      <div style={{ padding: 20, display: 'flex', flexDirection: 'column', flex: 1 }}>
        <h3 style={{ margin: 0, fontSize: '1.1rem', lineHeight: 1.35, fontWeight: 800 }}>{course.title}</h3>
        {course.subtitle && (
          <div style={{ marginTop: 6, fontSize: 13, color: '#64748b' }}>{course.subtitle}</div>
        )}
        <p style={{ marginTop: 12, fontSize: 13, color: '#475569', lineHeight: 1.6, flex: 1 }}>
          {course.description.slice(0, 80)}...
        </p>

        <div style={{ marginTop: 16, paddingTop: 14, borderTop: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div>
            <div style={{ fontSize: 11, color: '#94a3b8', fontWeight: 700 }}>수강료</div>
            <div style={{ marginTop: 2, fontSize: '1.15rem', fontWeight: 800, color: 'var(--accent-700)' }}>
              {fmtPrice(course.price)}
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: 11, color: '#94a3b8', fontWeight: 700 }}>개강</div>
            <div style={{ marginTop: 2, fontSize: 13, fontWeight: 700, color: '#0f172a' }}>{fmtDate(course.start_date)}</div>
          </div>
        </div>
      </div>
    </Link>
  )
}
