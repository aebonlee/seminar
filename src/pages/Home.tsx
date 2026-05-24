import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useData } from '../contexts/DataContext'
import { familySites, siteCategories } from '../data/familySites' // familySites는 total count 표시용
import type { Course } from '../types'

const fmtPrice = (n: number) => n.toLocaleString('ko-KR') + '원'
const fmtDate = (iso: string | null) =>
  iso ? new Date(iso).toLocaleDateString('ko-KR', { month: 'long', day: 'numeric' }) : 'TBA'

const NOTICES_ACA = [
  { tag: '학사', title: '2026-2학기 수강신청 안내 (06.10 ~ 06.20)' },
  { tag: '학사', title: '강의평가 진행 안내 (수강생 대상)' },
  { tag: '학사', title: '수료증 발급 신청 방법 변경 안내' },
]
const NOTICES_GEN = [
  { tag: '일반', title: 'DreamIT 동문 네트워크 라운지 5월 일정' },
  { tag: '일반', title: '여름 인텐시브 캠프 사전등록 시작' },
  { tag: '일반', title: '뉴스레터 5월호 발행' },
]
const SCHEDULE = [
  { date: '06.01', title: '2026 하반기 모집 공고' },
  { date: '06.10 ~ 06.20', title: '수강신청 기간' },
  { date: '07.05', title: '개강' },
]
const EVENTS = [
  { tag: '학과 특강', title: '[Executive] 글로벌 AI 전략 오프라인 세미나 (05.16)' },
  { tag: '학과 특강', title: '[Data] BI 대시보드 핸즈온 실습 4차' },
  { tag: '학교 행사', title: '[Brand Studio] 디렉터 라운지 — 동문 네트워크' },
]
const PAPERS = [
  { dept: '데이터분석', author: '심성회', title: '액션러닝을 활용한 국제개발협력 교육 프로그램 성과 분석' },
  { dept: '광고미디어 MBA', author: '김지아', title: '데이터 홈쇼핑 소비자의 구매의도 형성 탐구' },
  { dept: '디자인', author: '김솔', title: '창의성 발달을 위한 학습 공간 디자인 연구' },
]
const NEWS = [
  { src: 'DreamIT News', title: '온라인으로 석·박사 학위 — 2026 후기 모집' },
  { src: 'DreamIT News', title: '교직원 대상 AI 업무 활용 역량 강화 프로그램' },
  { src: 'DreamIT News', title: '생명의전화와 MOU 체결 — 정신건강 안전망 구축' },
]
const PRIDE = [
  { num: '1,240', unit: '명', label: '누적 수료생' },
  { num: '25', unit: '%', label: '재수강 비율' },
  { num: '24', unit: '개', label: '큐레이션 강의' },
  { num: '98', unit: '%', label: '평균 만족도' },
  { num: '48', unit: '명', label: '전문 강사' },
]

export function Home() {
  const { courses } = useData()
  const approved = courses.filter((c) => c.status === 'approved')
  const featured = approved[0]
  const otherCourses = approved.slice(1, 3)

  return (
    <section style={{ position: 'relative', minHeight: '100vh', color: '#fff', overflow: 'hidden' }}>
      {/* Background — dark blue with glow + grid pattern */}
      <div
        aria-hidden
        style={{
          position: 'fixed',
          inset: 0,
          background: `
            radial-gradient(900px 700px at 75% 12%, rgba(96,165,250,0.22), transparent 60%),
            radial-gradient(700px 600px at 15% 92%, rgba(139,92,246,0.22), transparent 60%),
            linear-gradient(135deg, #060b18 0%, #0b1730 40%, #0c1f3e 100%)
          `,
          zIndex: -2,
        }}
      />
      <div
        aria-hidden
        style={{
          position: 'fixed',
          inset: 0,
          backgroundImage: 'radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
          opacity: 0.6,
          zIndex: -1,
        }}
      />

      {/* SCROLL indicator (HYCU style) */}
      <div
        style={{
          position: 'fixed',
          left: 92,
          bottom: 28,
          zIndex: 30,
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          color: 'rgba(255,255,255,0.85)',
          fontSize: 12,
          letterSpacing: '0.22em',
          fontWeight: 700,
        }}
        className="scroll-ind"
      >
        SCROLL
        <span
          style={{
            display: 'inline-block',
            width: 30,
            height: 18,
            border: '1.5px solid rgba(255,255,255,0.85)',
            borderRadius: 12,
            position: 'relative',
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
              animation: 'dotDown 1.4s ease-in-out infinite',
            }}
          />
        </span>
      </div>

      <div
        className="bento-wrap"
        style={{
          paddingTop: 96,
          paddingLeft: 96,
          paddingRight: 32,
          paddingBottom: 56,
        }}
      >
        <div className="bento">
          {/* 1. Slogan / featured slider (2x2) */}
          <BentoCard tone="hero" size="2x2">
            <SloganSlider courses={approved.slice(0, 4)} />
          </BentoCard>

          {/* 2. 공지사항 (2x1) */}
          <BentoCard tone="neutral" size="2x1">
            <NoticeCard />
          </BentoCard>

          {/* 3. 학사안내 (1x1 icon) */}
          <BentoCard tone="strong" size="1x1">
            <IconCard
              eyebrow="학사안내"
              title="강의 안내"
              icon="📘"
              to="/about"
            />
          </BentoCard>

          {/* 4. 증명서 (1x1 icon) */}
          <BentoCard tone="mid" size="1x1">
            <IconCard
              eyebrow="수료증 발급"
              title="24h 발급센터"
              icon="🎓"
              to="/mypage"
            />
          </BentoCard>

          {/* 5. Featured premier program (2x1) — like 최고경영자과정 */}
          <BentoCard tone="dark" size="2x1">
            {featured ? <PremierCard course={featured} /> : <Empty />}
          </BentoCard>

          {/* 6. 일반 강의 카드 (1x1) */}
          <BentoCard tone="mid" size="1x1">
            <IconCard eyebrow="개설 강의" title="Executive" icon="🏛" to="/courses?cat=Executive" />
          </BentoCard>

          {/* 7. 비즈 강의 카드 (1x1) */}
          <BentoCard tone="soft" size="1x1">
            <IconCard eyebrow="개설 강의" title="Data Studio" icon="📊" to="/courses?cat=Data" />
          </BentoCard>

          {/* 8. 학교/학과/전공 행사 (2x1) */}
          <BentoCard tone="neutral" size="2x1">
            <ListCard title="세미나 · 워크숍" items={EVENTS} more="/courses" />
          </BentoCard>

          {/* 9. DreamIT News slider (2x1) */}
          <BentoCard tone="soft" size="2x1">
            <NewsSlider />
          </BentoCard>

          {/* 10. 이달의 학사일정 (2x1) */}
          <BentoCard tone="neutral" size="2x1">
            <ListCard
              title="이달의 학사일정"
              items={SCHEDULE.map((s) => ({ tag: s.date, title: s.title }))}
              more="/about"
              tagWidth={108}
            />
          </BentoCard>

          {/* 11. 우수 논문/후기 (2x1) — left/right text+thumb */}
          <BentoCard tone="dark" size="2x1">
            <PaperSlider />
          </BentoCard>

          {/* 12. 동아리/멘토링 (2x1) */}
          <BentoCard tone="mid" size="2x1">
            <ClubSlider />
          </BentoCard>

          {/* 13. 학교자랑 / Pride stats (2x1) */}
          <BentoCard tone="dark" size="2x1">
            <PrideStats />
          </BentoCard>

          {/* 14. 어워드 (1x1) */}
          <BentoCard tone="neutral" size="1x1">
            <IconCard eyebrow="" title="믿을 수 있는 어워드 수상이력" icon="🏆" to="/about" theme="light" />
          </BentoCard>

          {/* 15. 학생복지 (1x1) */}
          <BentoCard tone="strong" size="1x1">
            <IconCard eyebrow="학생 지원" title="멘토십 · 네트워크" icon="🤝" to="/about" />
          </BentoCard>

          {/* 16. Brand 20th / 캠퍼스 (1x1) */}
          <BentoCard tone="dark" size="1x1">
            <BrandBadge />
          </BentoCard>

          {/* 17. YouTube (1x1) */}
          <BentoCard tone="soft" size="1x1">
            <IconCard eyebrow="" title="DreamIT TUBE" icon="▶" to="https://youtube.com" theme="dark" external />
          </BentoCard>

          {/* 18. VR/Virtual 캠퍼스 (1x1) */}
          <BentoCard tone="neutral" size="1x1">
            <IconCard eyebrow="" title="VR 캠퍼스" icon="🥽" to="/about" theme="light" />
          </BentoCard>

          {/* Tail courses */}
          {otherCourses[0] && (
            <BentoCard tone="soft" size="2x1">
              <CourseTile course={otherCourses[0]} />
            </BentoCard>
          )}
          {otherCourses[1] && (
            <BentoCard tone="dark" size="2x1">
              <CourseTile course={otherCourses[1]} />
            </BentoCard>
          )}
        </div>

        {/* ============ DreamIT Network — Family Sites ============ */}
        <FamilyNetwork />
      </div>

      <style>{`
        @keyframes dotDown {
          0%, 100% { transform: translateY(0); opacity: 1; }
          50%      { transform: translateY(6px); opacity: 0.35; }
        }
        @keyframes fadeSlide {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .bento {
          display: grid;
          grid-template-columns: repeat(6, minmax(0, 1fr));
          grid-auto-rows: 240px;
          grid-auto-flow: dense;
          gap: 14px;
        }
        .bento-2x2 { grid-column: span 2; grid-row: span 2; }
        .bento-2x1 { grid-column: span 2; grid-row: span 1; }
        .bento-1x2 { grid-column: span 1; grid-row: span 2; }
        .bento-1x1 { grid-column: span 1; grid-row: span 1; }

        @media (max-width: 1280px) {
          .bento { grid-template-columns: repeat(4, minmax(0, 1fr)); }
        }
        @media (max-width: 880px) {
          .bento-wrap { padding-left: 20px !important; padding-right: 20px !important; }
          .bento {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            grid-auto-rows: 220px;
          }
          .bento-2x2 { grid-column: span 2; grid-row: span 2; }
          .bento-2x1 { grid-column: span 2; grid-row: span 1; }
          .scroll-ind { display: none; }
        }
        @media (max-width: 520px) {
          .bento {
            grid-template-columns: 1fr;
            grid-auto-rows: 200px;
          }
          .bento-2x2 { grid-column: span 1; grid-row: span 2; }
          .bento-2x1 { grid-column: span 1; grid-row: span 1; }
          .bento-1x2 { grid-column: span 1; grid-row: span 1; }
        }
      `}</style>
    </section>
  )
}

// ================== 학습 분야 (Fields) Section ==================
// 정책: 100여 개 사이트를 무차별 공개하지 않습니다.
// 운영 중인 학습 분야(카테고리) + 개수만 노출하고,
// 실제 학습 사이트 URL은 강의 신청·승인 후 MyPage 에서 제공됩니다.
function FamilyNetwork() {
  const total = familySites.length
  return (
    <section style={{ marginTop: 56, color: '#fff' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', marginBottom: 22, flexWrap: 'wrap', gap: 12 }}>
        <div>
          <div style={{ fontSize: 11, letterSpacing: '0.24em', color: 'var(--accent-300)', fontWeight: 800 }}>
            LEARNING FIELDS
          </div>
          <h2 style={{ margin: '8px 0 0', fontSize: 'clamp(1.5rem, 2.6vw, 2rem)', fontWeight: 800, color: '#fff' }}>
            DreamIT 운영 학습 분야
          </h2>
          <p style={{ marginTop: 6, color: 'rgba(255,255,255,0.78)', fontSize: 14, maxWidth: 720 }}>
            {siteCategories.length}개 분야 · 총 {total}개 학습 플랫폼을 운영합니다.
            관심 분야의 강의를 신청해 승인되면, 해당 강의에 큐레이션된 학습 사이트가
            마이페이지에서 함께 제공됩니다.
          </p>
        </div>
        <Link
          to="/courses"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            padding: '11px 18px',
            background: 'var(--accent-600)',
            color: '#fff',
            textDecoration: 'none',
            fontWeight: 800,
            fontSize: 14,
            border: '1px solid var(--accent-600)',
          }}
        >
          모집 강의 보러가기
          <svg width="11" height="11" viewBox="0 0 16 16" fill="none" aria-hidden>
            <path d="M3 8h10M8 3l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </Link>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
          gap: 10,
        }}
      >
        {siteCategories.map((c) => (
          <div
            key={c.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              padding: '16px 18px',
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
              color: '#fff',
              backdropFilter: 'blur(6px)',
              WebkitBackdropFilter: 'blur(6px)',
              borderRadius: 10,
            }}
          >
            <span style={{ fontSize: 22 }} aria-hidden>{c.icon}</span>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: '0.92rem', fontWeight: 800, color: '#fff' }}>{c.nameKo}</div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.6)', marginTop: 2 }}>{c.name}</div>
            </div>
            <div
              style={{
                fontSize: 13,
                fontWeight: 800,
                color: 'var(--accent-300)',
                background: 'rgba(255,255,255,0.05)',
                padding: '4px 10px',
                borderRadius: 999,
                border: '1px solid rgba(255,255,255,0.12)',
              }}
            >
              {c.count}
            </div>
          </div>
        ))}
      </div>

      <p
        style={{
          marginTop: 18,
          fontSize: 12,
          color: 'rgba(255,255,255,0.55)',
          textAlign: 'center',
        }}
      >
        ⓘ 학습 사이트 접근 권한은 수강 승인 시 부여됩니다. 사이트 목록은 강의별로 다릅니다.
      </p>
    </section>
  )
}

// ================== Card shell ==================
function BentoCard({
  tone,
  size,
  children,
}: {
  /**
   * 모든 톤이 현재 선택된 accent 컬러 스킴을 따릅니다.
   *  - hero     : accent-900 (가장 진한 영웅 카드)
   *  - strong   : accent-800
   *  - mid      : accent-700
   *  - soft     : accent-600
   *  - light    : accent-50 라이트 톤 (라이트 모드) / accent-200 톤 (다크 모드)
   *  - neutral  : 화이트 frost / 다크 표면
   *  - dark     : 슬레이트 다크 (스킴 무관)
   */
  tone: 'hero' | 'strong' | 'mid' | 'soft' | 'light' | 'neutral' | 'dark'
  size: '2x2' | '2x1' | '1x2' | '1x1'
  children: React.ReactNode
}) {
  const tones: Record<typeof tone, React.CSSProperties> = {
    hero:    { background: 'linear-gradient(135deg, var(--accent-900) 0%, var(--accent-800) 100%)', color: '#fff' },
    strong:  { background: 'var(--accent-800)', color: '#fff' },
    mid:     { background: 'var(--accent-700)', color: '#fff' },
    soft:    { background: 'var(--accent-600)', color: '#fff' },
    light:   { background: 'var(--tone-light)', color: 'var(--tone-light-fg)' },
    neutral: { background: 'rgba(255,255,255,0.92)', color: '#0f172a' },
    dark:    { background: 'rgba(15, 23, 42, 0.82)', color: '#fff' },
  }
  return (
    <div
      className={`bento-${size}`}
      style={{
        ...tones[tone],
        borderRadius: 14,
        overflow: 'hidden',
        position: 'relative',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        border: tone === 'neutral' ? '1px solid rgba(15,23,42,0.06)' : '1px solid rgba(255,255,255,0.08)',
        boxShadow: '0 10px 28px rgba(0,0,0,0.22)',
        animation: 'fadeSlide 0.5s var(--ease) both',
      }}
    >
      {children}
    </div>
  )
}

// ================== Slogan slider (2x2) ==================
function SloganSlider({ courses }: { courses: Course[] }) {
  const items = courses.length
    ? courses
    : [
        { id: '0', title: '엄선된 강의로 다음 챕터를 준비하세요', subtitle: 'DreamIT 2026 프로그램', category: 'Featured' } as Course,
      ]
  const [i, setI] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setI((x) => (x + 1) % items.length), 4500)
    return () => clearInterval(t)
  }, [items.length])
  const c = items[i]
  return (
    <div style={{ padding: 36, height: '100%', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      <div style={{ fontSize: 11, letterSpacing: '0.26em', color: '#fcd34d', fontWeight: 800, marginBottom: 14 }}>
        DREAMIT · 2026 SEMINAR
      </div>

      <h2
        style={{
          fontSize: 'clamp(1.7rem, 2.7vw, 2.6rem)',
          lineHeight: 1.25,
          fontWeight: 800,
          color: '#fff',
          margin: 0,
          flex: 1,
        }}
        key={c.id}
      >
        엄선된 강의로,
        <br />
        <span style={{ color: '#fcd34d' }}>다음 챕터</span>를 준비하세요
      </h2>

      <div style={{ marginTop: 20 }}>
        <div style={{ color: '#fcd34d', fontSize: 11, letterSpacing: '0.16em', fontWeight: 800 }}>
          {c.category} · 추천
        </div>
        <div style={{ marginTop: 8, fontSize: '1rem', fontWeight: 700, color: '#fff' }}>{c.title}</div>
        {c.subtitle && (
          <div style={{ marginTop: 4, fontSize: 13, color: 'rgba(255,255,255,0.7)' }}>{c.subtitle}</div>
        )}
      </div>

      <div style={{ marginTop: 24, display: 'flex', gap: 10, flexWrap: 'wrap' }}>
        <Link to="/courses" className="btn-on-dark btn-on-dark-primary">
          모집강의 보기
        </Link>
        <Link to="/apply" className="btn-on-dark">
          신청서 작성
        </Link>
      </div>

      {/* dots */}
      <div style={{ marginTop: 22, display: 'flex', gap: 6 }}>
        {items.map((_, idx) => (
          <button
            key={idx}
            aria-label={`${idx + 1}번 슬라이드`}
            onClick={() => setI(idx)}
            style={{
              width: idx === i ? 22 : 8,
              height: 6,
              borderRadius: 3,
              border: 0,
              padding: 0,
              cursor: 'pointer',
              background: idx === i ? '#fcd34d' : 'rgba(255,255,255,0.3)',
              transition: 'all 0.25s var(--ease)',
            }}
          />
        ))}
      </div>

      <style>{`
        .btn-on-dark {
          display: inline-flex; align-items: center; gap: 6px;
          padding: 11px 18px; background: rgba(255,255,255,0.1);
          color: #fff; border: 1px solid rgba(255,255,255,0.4);
          border-radius: 8px; font-size: .86rem; font-weight: 700;
          text-decoration: none; transition: all .18s var(--ease);
        }
        .btn-on-dark:hover { background: rgba(255,255,255,0.2); color: #fff; }
        .btn-on-dark-primary {
          background: #fcd34d; color: #1f2937; border-color: #fcd34d;
        }
        .btn-on-dark-primary:hover { background: #fde68a; color: #1f2937; }
      `}</style>
    </div>
  )
}

// ================== 공지사항 (2x1, tabs) ==================
function NoticeCard() {
  const [tab, setTab] = useState<'aca' | 'gen'>('aca')
  const items = tab === 'aca' ? NOTICES_ACA : NOTICES_GEN
  return (
    <div style={{ padding: 24, height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h4 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 800, letterSpacing: '-0.01em' }}>공지사항</h4>
        <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
          <button
            onClick={() => setTab('aca')}
            style={{
              background: 'transparent', border: 0, padding: 0, cursor: 'pointer',
              fontSize: '0.95rem', fontWeight: 800,
              color: tab === 'aca' ? 'var(--accent-700)' : '#94a3b8',
            }}
          >
            학사
          </button>
          <span style={{ color: '#cbd5e1' }}>·</span>
          <button
            onClick={() => setTab('gen')}
            style={{
              background: 'transparent', border: 0, padding: 0, cursor: 'pointer',
              fontSize: '0.95rem', fontWeight: 800,
              color: tab === 'gen' ? 'var(--accent-700)' : '#94a3b8',
            }}
          >
            일반
          </button>
          <MoreIcon to="/about" />
        </div>
      </div>
      <ul style={{ listStyle: 'none', padding: 0, margin: '16px 0 0', flex: 1, display: 'flex', flexDirection: 'column', gap: 10 }}>
        {items.map((n, i) => (
          <li key={i} style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
            <span style={{ fontSize: 11, fontWeight: 800, color: 'var(--accent-700)', minWidth: 30 }}>{n.tag}</span>
            <span
              style={{
                flex: 1,
                color: '#0f172a',
                fontSize: 14,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {n.title}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

// ================== Featured premier (2x1, image) ==================
function PremierCard({ course }: { course: Course }) {
  return (
    <Link
      to={`/courses/${course.id}`}
      style={{
        display: 'block',
        height: '100%',
        textDecoration: 'none',
        color: '#fff',
        padding: 28,
        position: 'relative',
      }}
    >
      <div style={{ position: 'relative', zIndex: 2, maxWidth: '60%' }}>
        <div style={{ fontSize: 11, letterSpacing: '0.18em', color: '#fcd34d', fontWeight: 800 }}>FEATURED</div>
        <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.85)', marginTop: 6, fontWeight: 700 }}>
          {course.category}
        </div>
        <h3 style={{ marginTop: 12, fontSize: '1.25rem', lineHeight: 1.3, fontWeight: 800, color: '#fff' }}>
          {course.title}
        </h3>
        <div style={{ marginTop: 8, color: 'rgba(255,255,255,0.85)', fontSize: 13 }}>{course.subtitle}</div>
        <div style={{ marginTop: 14, display: 'flex', gap: 14, fontSize: 12, color: 'rgba(255,255,255,0.85)' }}>
          <span>📅 {fmtDate(course.start_date)}</span>
          <span>💎 {fmtPrice(course.price)}</span>
        </div>
      </div>
      {/* decorative icon */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          right: 24,
          bottom: 24,
          fontSize: 80,
          opacity: 0.18,
          lineHeight: 1,
        }}
      >
        ◆
      </div>
      <div style={{ position: 'absolute', right: 22, top: 22 }}>
        <MoreArrow color="#fff" />
      </div>
    </Link>
  )
}

// ================== List card (2x1, generic) ==================
function ListCard({
  title,
  items,
  more,
  tagWidth = 60,
}: {
  title: string
  items: { tag: string; title: string }[]
  more?: string
  tagWidth?: number
}) {
  return (
    <div style={{ padding: 24, height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h4 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 800 }}>{title}</h4>
        {more && <MoreIcon to={more} />}
      </div>
      <ul style={{ listStyle: 'none', padding: 0, margin: '16px 0 0', flex: 1, display: 'flex', flexDirection: 'column', gap: 10 }}>
        {items.map((it, i) => (
          <li key={i} style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
            <span style={{ fontSize: 11, fontWeight: 800, color: 'var(--accent-700)', minWidth: tagWidth }}>{it.tag}</span>
            <span style={{ flex: 1, color: '#0f172a', fontSize: 14, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {it.title}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

// ================== News slider (2x1) ==================
function NewsSlider() {
  const [i, setI] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setI((x) => (x + 1) % NEWS.length), 3600)
    return () => clearInterval(t)
  }, [])
  const n = NEWS[i]
  return (
    <div style={{ padding: 24, height: '100%', position: 'relative' }}>
      <div style={{ fontSize: 11, color: '#fde68a', letterSpacing: '0.16em', fontWeight: 800 }}>{n.src}</div>
      <h3 style={{ marginTop: 10, fontSize: '1.15rem', lineHeight: 1.45, fontWeight: 800 }}>{n.title}</h3>
      <div style={{ position: 'absolute', bottom: 22, left: 24, display: 'flex', gap: 6 }}>
        {NEWS.map((_, idx) => (
          <span
            key={idx}
            style={{
              width: idx === i ? 18 : 6,
              height: 6,
              borderRadius: 3,
              background: idx === i ? '#fff' : 'rgba(255,255,255,0.4)',
              transition: 'all 0.25s var(--ease)',
            }}
          />
        ))}
      </div>
      <div style={{ position: 'absolute', top: 22, right: 22 }}>
        <MoreArrow color="#fff" />
      </div>
    </div>
  )
}

// ================== Paper slider (2x1) ==================
function PaperSlider() {
  const [i, setI] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setI((x) => (x + 1) % PAPERS.length), 4000)
    return () => clearInterval(t)
  }, [])
  const p = PAPERS[i]
  return (
    <div style={{ padding: 24, height: '100%', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      <div style={{ fontSize: 11, color: '#fde68a', letterSpacing: '0.16em', fontWeight: 800 }}>우수 수료 후기</div>
      <h3 style={{ marginTop: 10, fontSize: '1.05rem', lineHeight: 1.45, fontWeight: 800, flex: 1 }}>{p.title}</h3>
      <div style={{ marginTop: 8, fontSize: 13, color: 'rgba(255,255,255,0.85)' }}>
        {p.dept}
        <span style={{ display: 'inline-block', width: 1, height: 10, background: 'rgba(255,255,255,0.5)', margin: '0 8px', verticalAlign: 'middle' }} />
        {p.author}
      </div>
      <div style={{ marginTop: 14, display: 'flex', gap: 6 }}>
        {PAPERS.map((_, idx) => (
          <span
            key={idx}
            style={{
              width: idx === i ? 18 : 6,
              height: 6,
              borderRadius: 3,
              background: idx === i ? '#fff' : 'rgba(255,255,255,0.4)',
              transition: 'all 0.25s var(--ease)',
            }}
          />
        ))}
      </div>
    </div>
  )
}

// ================== Club / Mentoring slider (2x1) ==================
function ClubSlider() {
  const CLUBS = [
    { title: 'AI 스터디 그룹', desc: '주 1회 온라인 미트업' },
    { title: 'PM 커리어 멘토링', desc: '시니어 PM 1:1 코칭' },
    { title: '디자인 라운지', desc: '리뷰 · 포트폴리오 네트워킹' },
  ]
  const [i, setI] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setI((x) => (x + 1) % CLUBS.length), 3800)
    return () => clearInterval(t)
  }, [])
  const c = CLUBS[i]
  return (
    <div style={{ padding: 24, height: '100%', position: 'relative' }}>
      <div style={{ fontSize: 11, letterSpacing: '0.18em', color: '#fde68a', fontWeight: 800 }}>커뮤니티</div>
      <h3 style={{ marginTop: 10, fontSize: '1.2rem', fontWeight: 800 }}>{c.title}</h3>
      <p style={{ marginTop: 6, fontSize: 13, color: 'rgba(255,255,255,0.85)' }}>{c.desc}</p>
      <div style={{ position: 'absolute', bottom: 22, left: 24, display: 'flex', gap: 6 }}>
        {CLUBS.map((_, idx) => (
          <span
            key={idx}
            style={{
              width: idx === i ? 18 : 6,
              height: 6,
              borderRadius: 3,
              background: idx === i ? '#fff' : 'rgba(255,255,255,0.4)',
              transition: 'all 0.25s var(--ease)',
            }}
          />
        ))}
      </div>
      <div
        aria-hidden
        style={{ position: 'absolute', right: 26, bottom: 18, fontSize: 64, lineHeight: 1, opacity: 0.18 }}
      >
        ✦
      </div>
    </div>
  )
}

// ================== Pride stats (2x1) ==================
function PrideStats() {
  const [i, setI] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setI((x) => (x + 1) % PRIDE.length), 3000)
    return () => clearInterval(t)
  }, [])
  const s = PRIDE[i]
  return (
    <div style={{ padding: 24, height: '100%', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      <h4 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 800 }}>DreamIT 자랑</h4>
      <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'baseline', gap: 6 }}>
        <span style={{ fontSize: 54, fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1, color: '#fff' }}>
          {s.num}
        </span>
        <span style={{ fontSize: 18, fontWeight: 700, color: 'rgba(255,255,255,0.85)' }}>{s.unit}</span>
      </div>
      <div style={{ marginTop: 6, color: 'rgba(255,255,255,0.85)', fontSize: 13, fontWeight: 700 }}>{s.label}</div>
      <div style={{ marginTop: 14, display: 'flex', gap: 6 }}>
        {PRIDE.map((_, idx) => (
          <span
            key={idx}
            style={{
              width: idx === i ? 18 : 6,
              height: 6,
              borderRadius: 3,
              background: idx === i ? '#fff' : 'rgba(255,255,255,0.4)',
              transition: 'all 0.25s var(--ease)',
            }}
          />
        ))}
      </div>
    </div>
  )
}

// ================== Icon card (1x1) ==================
function IconCard({
  eyebrow,
  title,
  icon,
  to,
  theme = 'dark',
  external = false,
}: {
  eyebrow?: string
  title: string
  icon: string
  to: string
  theme?: 'light' | 'dark'
  external?: boolean
}) {
  const textColor = theme === 'light' ? '#0f172a' : '#fff'
  const sub = theme === 'light' ? '#64748b' : 'rgba(255,255,255,0.85)'
  const Tag = external ? 'a' : Link
  const props: Record<string, unknown> = external
    ? { href: to, target: '_blank', rel: 'noopener noreferrer' }
    : { to }
  return (
    <Tag
      {...(props as { to: string })}
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100%',
        padding: 18,
        textDecoration: 'none',
        color: textColor,
      }}
    >
      <div>
        {eyebrow && <div style={{ fontSize: 11, color: sub, fontWeight: 700, letterSpacing: '0.04em' }}>{eyebrow}</div>}
        <h4 style={{ marginTop: 8, fontSize: '1.05rem', fontWeight: 800, lineHeight: 1.3 }}>{title}</h4>
      </div>
      <div aria-hidden style={{ fontSize: 38, alignSelf: 'flex-end', opacity: 0.85, lineHeight: 1 }}>
        {icon}
      </div>
    </Tag>
  )
}

function BrandBadge() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        textAlign: 'center',
        padding: 18,
      }}
    >
      <svg width="48" height="48" viewBox="0 0 48 48" aria-hidden>
        <circle cx="24" cy="24" r="22" fill="none" stroke="#fcd34d" strokeWidth="2" />
        <text x="24" y="30" textAnchor="middle" fontSize="16" fontWeight="800" fill="#fcd34d">5th</text>
      </svg>
      <h4 style={{ marginTop: 10, fontSize: '0.95rem', fontWeight: 800, color: '#fff' }}>
        DreamIT<br />Seminar 5주년
      </h4>
    </div>
  )
}

// ================== Course tile (2x1 reusable) ==================
function CourseTile({ course }: { course: Course }) {
  return (
    <Link
      to={`/courses/${course.id}`}
      style={{
        display: 'block',
        height: '100%',
        padding: 24,
        textDecoration: 'none',
        color: '#fff',
        position: 'relative',
      }}
    >
      <div style={{ fontSize: 11, letterSpacing: '0.16em', fontWeight: 800, color: '#fde68a' }}>{course.category}</div>
      <h3 style={{ marginTop: 10, fontSize: '1.15rem', fontWeight: 800, lineHeight: 1.35 }}>{course.title}</h3>
      <div style={{ marginTop: 8, fontSize: 13, color: 'rgba(255,255,255,0.85)' }}>{course.subtitle}</div>
      <div style={{ position: 'absolute', right: 22, top: 22 }}>
        <MoreArrow color="#fff" />
      </div>
      <div style={{ position: 'absolute', left: 24, bottom: 22, display: 'flex', gap: 14, fontSize: 12, color: 'rgba(255,255,255,0.85)' }}>
        <span>📅 {fmtDate(course.start_date)}</span>
        <span>👥 {course.capacity}명</span>
      </div>
    </Link>
  )
}

function Empty() {
  return (
    <div style={{ padding: 24, color: 'rgba(255,255,255,0.7)', fontSize: 13 }}>
      개설 예정 강의가 곧 공개됩니다.
    </div>
  )
}

function MoreIcon({ to }: { to: string }) {
  return (
    <Link
      to={to}
      aria-label="더보기"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 26,
        height: 26,
        borderRadius: '50%',
        border: '1px solid rgba(15,23,42,0.18)',
        color: 'var(--accent-700)',
        fontSize: 14,
        textDecoration: 'none',
      }}
    >
      +
    </Link>
  )
}

function MoreArrow({ color = '#fff' }: { color?: string }) {
  return (
    <span
      aria-hidden
      style={{
        width: 30,
        height: 30,
        borderRadius: '50%',
        border: `1px solid ${color === '#fff' ? 'rgba(255,255,255,0.35)' : 'rgba(15,23,42,0.15)'}`,
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
