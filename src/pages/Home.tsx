import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useData } from '../contexts/DataContext'

const formatPrice = (n: number) => n.toLocaleString('ko-KR') + '원'
const formatDate = (iso: string | null) =>
  iso ? new Date(iso).toLocaleDateString('ko-KR', { month: 'long', day: 'numeric' }) : 'TBA'

const NOTICES = [
  { tag: '학사', title: '2026-2학기 수강신청 안내 (06.10 ~ 06.20)', href: '#' },
  { tag: '모집', title: 'AI 비즈니스 전략 마스터클래스 12기 모집 시작', href: '#' },
  { tag: '안내', title: '강의평가 진행 안내 (수강생 대상)', href: '#' },
]
const SCHEDULE = [
  { date: '06.01', title: '모집 공고' },
  { date: '06.10 ~ 06.20', title: '수강신청 기간' },
  { date: '07.05', title: '개강' },
]
const EVENTS = [
  { tag: '특강', title: '[Executive] 글로벌 AI 전략 오프라인 세미나 (05.16)' },
  { tag: '워크숍', title: '[Data] BI 대시보드 핸즈온 실습 4차' },
  { tag: '네트워킹', title: '[Brand Studio] 디렉터 라운지 — 동문 네트워크' },
]
const STATS = [
  { num: '1,240', unit: '명', label: '누적 수료생' },
  { num: '24', unit: '+', label: '큐레이션 강의' },
  { num: '98', unit: '%', label: '평균 만족도' },
  { num: '48', unit: '명', label: '전문 강사' },
]

export function Home() {
  const { courses } = useData()
  const approved = courses.filter((c) => c.status === 'approved')
  const featured = approved[0]
  const others = approved.slice(1, 3)
  const [statIndex, setStatIndex] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setStatIndex((i) => (i + 1) % STATS.length), 3200)
    return () => clearInterval(t)
  }, [])

  const stat = STATS[statIndex]

  return (
    <section
      className="home-hero"
      style={{
        position: 'relative',
        minHeight: '100vh',
        width: '100%',
        color: '#fff',
        overflow: 'hidden',
      }}
    >
      {/* Background */}
      <div
        aria-hidden
        style={{
          position: 'fixed',
          inset: 0,
          background: `
            radial-gradient(900px 600px at 70% 15%, rgba(37,99,235,0.55), transparent 60%),
            radial-gradient(700px 600px at 15% 85%, rgba(139,92,246,0.4), transparent 60%),
            linear-gradient(135deg, #0b1220 0%, #0f1e3a 50%, #08152b 100%)
          `,
          zIndex: -2,
        }}
      />
      <div
        aria-hidden
        style={{
          position: 'fixed',
          inset: 0,
          backgroundImage:
            'radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
          backgroundPosition: '0 0',
          opacity: 0.5,
          zIndex: -1,
        }}
      />

      <div
        className="bento-wrap"
        style={{
          paddingTop: 96,
          paddingLeft: 96,
          paddingRight: 32,
          paddingBottom: 56,
          minHeight: '100vh',
        }}
      >
        {/* Top: Brand & Stats */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 14,
            color: 'rgba(255,255,255,0.9)',
          }}
        >
          <span style={{ fontSize: 13, letterSpacing: '0.18em', fontWeight: 700 }}>
            SCROLL
            <span
              style={{
                display: 'inline-block',
                marginLeft: 10,
                width: 32,
                height: 18,
                border: '1.5px solid #fff',
                borderRadius: 12,
                position: 'relative',
                verticalAlign: 'middle',
              }}
            >
              <span
                style={{
                  position: 'absolute',
                  top: 4,
                  left: '50%',
                  marginLeft: -2,
                  width: 4,
                  height: 4,
                  borderRadius: '50%',
                  background: '#fff',
                  animation: 'dotDown 1.4s var(--ease) infinite',
                }}
              />
            </span>
          </span>
          <span style={{ fontSize: 12, letterSpacing: '0.2em', color: 'rgba(255,255,255,0.6)' }}>
            DREAMIT · SEMINAR PLATFORM
          </span>
        </div>

        <div className="bento-grid">
          {/* ============ Card A : Slogan (large dark) ============ */}
          <Card span="a" tone="dark">
            <div style={{ padding: 36, height: '100%', display: 'flex', flexDirection: 'column' }}>
              <div style={{ fontSize: 11, letterSpacing: '0.24em', color: '#fcd34d', fontWeight: 800, marginBottom: 14 }}>
                DREAMIT · 2026 PROGRAM
              </div>
              <h2
                style={{
                  fontSize: 'clamp(1.7rem, 2.6vw, 2.4rem)',
                  lineHeight: 1.25,
                  fontWeight: 800,
                  color: '#fff',
                  margin: 0,
                  flex: 1,
                }}
              >
                엄선된 강의로,
                <br />
                <span style={{ color: '#fcd34d' }}>다음 챕터</span>를 준비하세요
              </h2>
              <div style={{ marginTop: 20, display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                <Link to="/courses" className="btn-on-dark btn-on-dark-primary">
                  모집강의 보기
                </Link>
                <Link to="/apply" className="btn-on-dark">
                  신청서 작성
                </Link>
              </div>
            </div>
          </Card>

          {/* ============ Card B : Featured Course (with image / cover gradient) ============ */}
          <Card span="b" tone="image">
            {featured ? (
              <Link
                to={`/courses/${featured.id}`}
                style={{ display: 'block', height: '100%', textDecoration: 'none', color: '#fff', padding: 28 }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                  <div>
                    <div style={{ fontSize: 11, letterSpacing: '0.18em', color: '#fcd34d', fontWeight: 800 }}>
                      FEATURED
                    </div>
                    <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)', marginTop: 8 }}>{featured.category}</div>
                  </div>
                  <ArrowMore />
                </div>
                <h3 style={{ marginTop: 28, fontSize: '1.45rem', lineHeight: 1.3, fontWeight: 800, color: '#fff' }}>
                  {featured.title}
                </h3>
                <div style={{ marginTop: 14, color: 'rgba(255,255,255,0.8)', fontSize: 14 }}>{featured.subtitle}</div>
                <div
                  style={{
                    marginTop: 24,
                    display: 'flex',
                    gap: 18,
                    fontSize: 12,
                    color: 'rgba(255,255,255,0.7)',
                    flexWrap: 'wrap',
                  }}
                >
                  <span>📅 {formatDate(featured.start_date)} 개강</span>
                  <span>👥 {featured.capacity}명</span>
                  <span>💎 {formatPrice(featured.price)}</span>
                </div>
              </Link>
            ) : (
              <EmptyCard label="featured" />
            )}
          </Card>

          {/* ============ Card C : 공지사항 (white frost) ============ */}
          <Card span="c" tone="white">
            <div style={{ padding: 24, height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardTitle label="공지사항" more="/about#news" />
              <ul style={{ listStyle: 'none', padding: 0, margin: '16px 0 0', flex: 1, display: 'flex', flexDirection: 'column', gap: 10 }}>
                {NOTICES.map((n, i) => (
                  <li key={i}>
                    <a
                      href={n.href}
                      style={{
                        display: 'flex',
                        alignItems: 'baseline',
                        gap: 10,
                        color: '#111827',
                        fontSize: 14,
                        textDecoration: 'none',
                      }}
                    >
                      <span
                        style={{
                          fontSize: 11,
                          fontWeight: 800,
                          color: 'var(--accent-700)',
                          minWidth: 36,
                        }}
                      >
                        {n.tag}
                      </span>
                      <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {n.title}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </Card>

          {/* ============ Card D : Quick Links (mustard) ============ */}
          <Card span="d" tone="mustard">
            <div style={{ padding: 24, height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardTitle label="빠른 메뉴" theme="dark" />
              <div
                style={{
                  marginTop: 16,
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: 8,
                  flex: 1,
                }}
              >
                {[
                  { l: '신청', to: '/apply' },
                  { l: '강의', to: '/courses' },
                  { l: '일정', to: '/about' },
                  { l: '자료실', to: '/about' },
                  { l: '문의', to: '/about' },
                  { l: '내정보', to: '/mypage' },
                ].map((q) => (
                  <Link
                    key={q.l}
                    to={q.to}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: '14px 6px',
                      background: 'rgba(255,255,255,0.18)',
                      borderRadius: 8,
                      color: '#fff',
                      fontSize: 13,
                      fontWeight: 800,
                      textDecoration: 'none',
                      transition: 'background 0.15s var(--ease)',
                    }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.background = 'rgba(255,255,255,0.3)')}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.background = 'rgba(255,255,255,0.18)')}
                  >
                    {q.l}
                  </Link>
                ))}
              </div>
            </div>
          </Card>

          {/* ============ Card E : Stats Auto-rotating (fuchsia) ============ */}
          <Card span="e" tone="fuchsia">
            <div style={{ padding: 24, height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardTitle label="DreamIT 자랑" theme="dark" />
              <div style={{ marginTop: 'auto' }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, color: '#fff' }}>
                  <span style={{ fontSize: 48, fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1 }}>
                    {stat.num}
                  </span>
                  <span style={{ fontSize: 16, fontWeight: 700 }}>{stat.unit}</span>
                </div>
                <div style={{ marginTop: 8, color: 'rgba(255,255,255,0.85)', fontSize: 14, fontWeight: 600 }}>
                  {stat.label}
                </div>
                <div style={{ marginTop: 14, display: 'flex', gap: 6 }}>
                  {STATS.map((_, i) => (
                    <span
                      key={i}
                      style={{
                        width: 6,
                        height: 6,
                        borderRadius: '50%',
                        background: i === statIndex ? '#fff' : 'rgba(255,255,255,0.4)',
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </Card>

          {/* ============ Card F : 학사일정 (white frost) ============ */}
          <Card span="f" tone="white">
            <div style={{ padding: 24, height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardTitle label="이달의 학사일정" more="/about" />
              <ul style={{ listStyle: 'none', padding: 0, margin: '16px 0 0', flex: 1, display: 'flex', flexDirection: 'column', gap: 12 }}>
                {SCHEDULE.map((s, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}>
                    <span
                      style={{
                        fontSize: 13,
                        fontWeight: 800,
                        color: 'var(--accent-700)',
                        minWidth: 110,
                      }}
                    >
                      {s.date}
                    </span>
                    <span style={{ color: '#111827', fontSize: 14 }}>{s.title}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Card>

          {/* ============ Card G : Events (white) ============ */}
          <Card span="g" tone="white">
            <div style={{ padding: 24, height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardTitle label="세미나 · 워크숍" more="/courses" />
              <ul style={{ listStyle: 'none', padding: 0, margin: '16px 0 0', flex: 1, display: 'flex', flexDirection: 'column', gap: 10 }}>
                {EVENTS.map((e, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'baseline', gap: 10, fontSize: 14, color: '#111827' }}>
                    <span style={{ fontWeight: 800, minWidth: 60, color: 'var(--accent-700)', fontSize: 11 }}>{e.tag}</span>
                    <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {e.title}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Card>

          {/* ============ Card H : Other Course #1 ============ */}
          <Card span="h" tone="purple">
            {others[0] ? <CourseTile course={others[0]} /> : <EmptyCard label="course" />}
          </Card>

          {/* ============ Card I : Other Course #2 ============ */}
          <Card span="i" tone="pink">
            {others[1] ? <CourseTile course={others[1]} /> : <EmptyCard label="course" />}
          </Card>

          {/* ============ Card J : CTA About / Contact (white) ============ */}
          <Card span="j" tone="white">
            <Link to="/about" style={{ display: 'block', height: '100%', textDecoration: 'none', color: '#111827', padding: 24 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                <div>
                  <div style={{ fontSize: 11, letterSpacing: '0.18em', fontWeight: 800, color: 'var(--accent-700)' }}>
                    ABOUT
                  </div>
                  <h3 style={{ marginTop: 12, fontSize: '1.15rem', fontWeight: 800 }}>
                    DreamIT의<br />큐레이션 기준
                  </h3>
                </div>
                <ArrowMore color="#111827" />
              </div>
            </Link>
          </Card>
        </div>
      </div>

      <style>{`
        @keyframes dotDown {
          0%, 100% { transform: translateY(0); opacity: 1; }
          50% { transform: translateY(6px); opacity: 0.4; }
        }

        .bento-grid {
          display: grid;
          grid-template-columns: repeat(12, 1fr);
          grid-auto-rows: 168px;
          gap: 14px;
          grid-template-areas:
            "a a a a b b b b c c c c"
            "a a a a b b b b c c c c"
            "d d d e e e f f f g g g"
            "h h h h i i i i j j j j";
        }
        .bento-grid > .bento-item-a { grid-area: a; }
        .bento-grid > .bento-item-b { grid-area: b; }
        .bento-grid > .bento-item-c { grid-area: c; }
        .bento-grid > .bento-item-d { grid-area: d; }
        .bento-grid > .bento-item-e { grid-area: e; }
        .bento-grid > .bento-item-f { grid-area: f; }
        .bento-grid > .bento-item-g { grid-area: g; }
        .bento-grid > .bento-item-h { grid-area: h; }
        .bento-grid > .bento-item-i { grid-area: i; }
        .bento-grid > .bento-item-j { grid-area: j; }

        @media (max-width: 1280px) {
          .bento-grid {
            grid-template-columns: repeat(6, 1fr);
            grid-template-areas:
              "a a a b b b"
              "a a a b b b"
              "c c d d e e"
              "f f f g g g"
              "h h h i i i"
              "j j j j j j";
          }
        }
        @media (max-width: 880px) {
          .bento-wrap { padding-left: 20px !important; padding-right: 20px !important; }
          .bento-grid {
            grid-template-columns: 1fr;
            grid-auto-rows: minmax(160px, auto);
            grid-template-areas:
              "a"
              "b"
              "c"
              "d"
              "e"
              "f"
              "g"
              "h"
              "i"
              "j";
          }
        }

        .btn-on-dark {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 11px 18px;
          background: rgba(255,255,255,0.1);
          color: #fff;
          border: 1px solid rgba(255,255,255,0.4);
          border-radius: 8px;
          font-size: 0.86rem;
          font-weight: 700;
          text-decoration: none;
          transition: all 0.18s var(--ease);
        }
        .btn-on-dark:hover { background: rgba(255,255,255,0.2); color: #fff; }
        .btn-on-dark-primary {
          background: #fcd34d;
          color: #1f2937;
          border-color: #fcd34d;
        }
        .btn-on-dark-primary:hover {
          background: #fde68a;
          color: #1f2937;
        }
      `}</style>
    </section>
  )
}

// ============================================================
function Card({
  span,
  tone,
  children,
}: {
  span: 'a' | 'b' | 'c' | 'd' | 'e' | 'f' | 'g' | 'h' | 'i' | 'j'
  tone: 'dark' | 'white' | 'mustard' | 'fuchsia' | 'purple' | 'pink' | 'image'
  children: React.ReactNode
}) {
  const styles: Record<typeof tone, React.CSSProperties> = {
    dark: { background: 'rgba(15, 23, 42, 0.78)', color: '#fff' },
    image: {
      background:
        'linear-gradient(135deg, rgba(15,23,42,0.92), rgba(30,58,138,0.85)), radial-gradient(400px 240px at 80% 30%, rgba(96,165,250,0.4), transparent 60%)',
      color: '#fff',
    },
    white: { background: 'rgba(255,255,255,0.92)', color: '#111827' },
    mustard: { background: 'rgba(180, 132, 26, 0.82)', color: '#fff' },
    fuchsia: { background: 'rgba(157, 23, 77, 0.82)', color: '#fff' },
    purple: { background: 'rgba(91, 33, 182, 0.8)', color: '#fff' },
    pink: { background: 'rgba(131, 24, 67, 0.82)', color: '#fff' },
  }
  return (
    <div
      className={`bento-item-${span}`}
      style={{
        ...styles[tone],
        borderRadius: 14,
        overflow: 'hidden',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        border: tone === 'white' ? '1px solid rgba(15,23,42,0.06)' : '1px solid rgba(255,255,255,0.08)',
        boxShadow: '0 8px 24px rgba(0,0,0,0.18)',
        position: 'relative',
      }}
    >
      {children}
    </div>
  )
}

function CardTitle({ label, more, theme = 'light' }: { label: string; more?: string; theme?: 'light' | 'dark' }) {
  const titleColor = theme === 'light' ? '#111827' : '#fff'
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <h4 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 800, color: titleColor, letterSpacing: '-0.01em' }}>
        {label}
      </h4>
      {more && (
        <Link
          to={more}
          aria-label="더보기"
          style={{
            color: theme === 'light' ? 'var(--accent-700)' : '#fff',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 26,
            height: 26,
            borderRadius: '50%',
            border: `1px solid ${theme === 'light' ? 'rgba(0,0,0,0.15)' : 'rgba(255,255,255,0.35)'}`,
            opacity: 0.9,
            fontSize: 14,
          }}
        >
          +
        </Link>
      )}
    </div>
  )
}

function CourseTile({ course }: { course: ReturnType<typeof useData>['courses'][number] }) {
  return (
    <Link to={`/courses/${course.id}`} style={{ display: 'block', height: '100%', textDecoration: 'none', color: '#fff', padding: 24 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
        <div>
          <div style={{ fontSize: 11, letterSpacing: '0.16em', color: 'rgba(255,255,255,0.85)', fontWeight: 800 }}>
            {course.category}
          </div>
          <h3 style={{ marginTop: 8, fontSize: '1.15rem', fontWeight: 800, lineHeight: 1.35 }}>{course.title}</h3>
        </div>
        <ArrowMore />
      </div>
      <div style={{ marginTop: 18, color: 'rgba(255,255,255,0.85)', fontSize: 13 }}>{course.subtitle}</div>
      <div
        style={{
          marginTop: 'auto',
          display: 'flex',
          gap: 14,
          fontSize: 12,
          color: 'rgba(255,255,255,0.85)',
        }}
      >
        <span>📅 {formatDate(course.start_date)}</span>
        <span>👥 {course.capacity}명</span>
      </div>
    </Link>
  )
}

function EmptyCard({ label }: { label: string }) {
  return (
    <div style={{ padding: 24, color: 'rgba(255,255,255,0.7)', fontSize: 13 }}>
      개설 예정 {label}이 곧 공개됩니다.
    </div>
  )
}

function ArrowMore({ color = '#fff' }: { color?: string }) {
  return (
    <span
      aria-hidden
      style={{
        width: 30,
        height: 30,
        borderRadius: '50%',
        border: `1px solid ${color === '#fff' ? 'rgba(255,255,255,0.35)' : 'rgba(0,0,0,0.15)'}`,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        color,
      }}
    >
      <svg width="11" height="11" viewBox="0 0 16 16" fill="none" aria-hidden>
        <path d="M3 8h10M9 3l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    </span>
  )
}
