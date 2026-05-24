import { Link } from 'react-router-dom'
import type { Course } from '../../types'

const formatPrice = (n: number) => n.toLocaleString('ko-KR') + '원'
const formatDate = (iso: string | null) =>
  iso
    ? new Date(iso).toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' })
    : 'TBA'

const levelLabel: Record<Course['level'], string> = {
  beginner: '입문',
  intermediate: '중급',
  advanced: '고급',
}

export function CourseCard({ course }: { course: Course }) {
  return (
    <Link
      to={`/courses/${course.id}`}
      className="card fade-up"
      style={{
        display: 'flex',
        flexDirection: 'column',
        textDecoration: 'none',
        color: 'inherit',
        padding: 28,
        height: '100%',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 18,
        }}
      >
        <span className="badge badge-gold">{course.category}</span>
        <span
          style={{
            fontSize: '0.72rem',
            color: 'var(--text-2)',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
          }}
        >
          {levelLabel[course.level]}
        </span>
      </div>

      <h3 style={{ marginBottom: 6, fontSize: '1.55rem' }}>{course.title}</h3>
      {course.subtitle && (
        <p
          style={{
            color: 'var(--text-2)',
            fontSize: '0.92rem',
            marginBottom: 22,
            fontStyle: 'italic',
            fontFamily: 'var(--font-display)',
          }}
        >
          {course.subtitle}
        </p>
      )}

      <p style={{ color: 'var(--text-1)', fontSize: '0.92rem', lineHeight: 1.7, flex: 1 }}>
        {course.description}
      </p>

      <div
        style={{
          marginTop: 24,
          paddingTop: 20,
          borderTop: '1px solid var(--line-2)',
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 12,
          fontSize: '0.78rem',
        }}
      >
        <div>
          <div style={{ color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 4 }}>
            기간
          </div>
          <div style={{ color: 'var(--text-0)', fontWeight: 500 }}>{course.duration_weeks}주</div>
        </div>
        <div>
          <div style={{ color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 4 }}>
            정원
          </div>
          <div style={{ color: 'var(--text-0)', fontWeight: 500 }}>{course.capacity}명</div>
        </div>
        <div>
          <div style={{ color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 4 }}>
            개강
          </div>
          <div style={{ color: 'var(--text-0)', fontWeight: 500 }}>{formatDate(course.start_date)}</div>
        </div>
      </div>

      <div
        style={{
          marginTop: 22,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div>
          <div style={{ fontSize: '0.7rem', color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.14em' }}>
            Tuition
          </div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem' }} className="gold-text">
            {formatPrice(course.price)}
          </div>
        </div>
        <div
          style={{
            color: 'var(--gold-300)',
            fontSize: '0.75rem',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            fontWeight: 600,
          }}
        >
          자세히 →
        </div>
      </div>
    </Link>
  )
}
