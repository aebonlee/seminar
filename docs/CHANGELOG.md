# Changelog

본 프로젝트의 모든 의미 있는 변경 사항을 PR 단위로 기록합니다.

형식: [Keep a Changelog](https://keepachangelog.com/ko/1.1.0/), 버전: [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Fixed
- **서브페이지 브레드크럼 바의 다크 와인 잔재 제거** — `rgba(76,5,25,0.78)` → `var(--accent-800)` (선택된 스킴 동기화)
- mockCourses `c-002` 학습 사이트 이름 sed 사고 복구 (`DB · SQL 학습`)

### Added
- **`Course.format: 'online' | 'offline' | 'hybrid'`** + `venue` 필드 — 일반 온라인/오프라인/혼합 강좌 운영
- 모든 강의 카드(Home / Courses / CourseDetail / Premier)에 **format 배지** 노출
- Courses 페이지에 **진행 형태 필터** (🖥 온라인 / 🏛 오프라인 / ⚡ 혼합)
- NewCourse 폼에 진행 형태 + 장소 필드
- Home 12장 벤토에 **`FormatGuideCard`** (세 가지 진행 형태 안내) 추가
- `supabase/schema.sql`: `seminar_courses.format` (check 제약) + `venue` 컬럼

### Changed (Home 정리)
- **18장 → 12장으로 정리** — 학교적 요소(우수논문/동아리/어워드/VR/학교자랑/뉴스슬라이더) 제거
- 세미나 본 목적(온·오프 강좌 모집)에 집중한 카드 구성:
  슬로건 / 공지 / 빠른신청 / 마이페이지 / Featured / 모집일정 / 강의×2 / 세미나·워크숍 / 운영통계 / FormatGuide / 카카오 문의

### Changed (정책)
- **카드 컬러 일관성 통일** — fuchsia / mustard / purple 등 무작위 톤을 폐기하고
  현재 선택된 accent 스킴 기반의 5단계 톤(`hero`/`strong`/`mid`/`soft`/`light`/`neutral`/`dark`)으로 변경.
  컬러 피커로 스킴을 바꾸면 모든 카드가 동일 톤 패밀리로 동기화됨
- **학습 사이트 URL 무차별 공개 폐기** — 100여 개 사이트를 푸터/네트워크에 다 뿌리는
  방식 제거. 강의별로 큐레이션된 학습 사이트만 **신청 승인된 사용자의 마이페이지**에서 노출.
  CourseDetail은 사이트 이름만 미리보기, URL은 노출 안 함

### Added
- `Course.learning_sites: LearningSite[]` 타입/필드 — 강의별 큐레이션 매핑
- 관리자 강의 등록 폼에 **학습 사이트 매핑 UI** (카테고리 pill + 체크박스 그리드)
- MyPage 상단 **'내 학습 사이트' 섹션** — 승인된 강의의 매핑 사이트만 노출
- CourseDetail에 **제공 학습 사이트 미리보기** (자물쇠 아이콘 + 이름만)
- `supabase/schema.sql` 에 `seminar_courses.learning_sites jsonb` 컬럼 추가

### Changed (Network 페이지)
- `/network` 를 '운영 학습 분야' 페이지로 재정의 — 카테고리/개수만 노출, URL 미공개
- 안내 패널 + "강의 신청으로 접근 가능" CTA → `/courses` · `/apply`

### Changed (Home/Footer)
- Home 벤토 하단 'DreamIT Network' → 'LEARNING FIELDS' — 카테고리 박스 + 사이트 수만
- 푸터의 'FAMILY SITES' 박스 제거. 본사이트(`www.dreamitbiz.com`) 단순 링크만 유지

### Added (docs)
- README 전면 개편 — 현재 상태 반영 (벤토 홈, 서브페이지, 95 패밀리, 회사 정보)
- `docs/ARCHITECTURE.md` 갱신 — 접두어 규약, OAuth, 알림, 테마 시스템, 라우팅
- `docs/DESIGN.md` 갱신 — v2 디자인 시스템 (Nanum + 5색 + 라이트/다크, 벤토/서브페이지 패턴, 카드 톤 정책)
- `docs/SITES.md` 신규 — DreamIT 패밀리 네트워크 안내 + **공개 정책**
- `docs/CHANGELOG.md` 신규 — 본 문서
- `docs/CONTRIBUTING.md` 갱신 — 새 페이지/사이트/카테고리/학습 사이트 매핑 가이드

---

## [0.3.0] — PR #3 (2026-05-24)

> **HYCU 서브페이지 패턴 + DreamIT 패밀리 사이트 네트워크 통합**

### Added
- **`<SubPage>` 컴포넌트**: 풀스크린 fixed 배경(`/hero-bg.jpg`) + 다크 오버레이 + 중앙 화이트 타이틀 + 액센트 반투명 브레드크럼 바 + max-1290px 컨테이너
- **`<SubPanel>` / `<PanelHeroBanner>`**: 화이트 콘텐츠 박스 + 상단 그라데이션 배너
- **배경 이미지 자동 생성**: `scripts/generate-hero-bg.mjs` (sharp 기반 1920×1080)
- **`/network` 페이지**: 95개 패밀리 사이트 — 카테고리 pill 필터 + 키워드 검색 + 그룹 뷰
- **`src/data/familySites.ts`**: 14 카테고리 + 95 사이트 + `COMPANY` 상수 (templete_2 SoT)
- **Home 벤토 하단 DreamIT Network 섹션**: 14 카테고리 카드 그리드 + 대표 사이트 미리보기
- **Header 메뉴 'DreamIT 사이트'** 항목 추가

### Changed
- **모든 서브 페이지를 `<SubPage>` 패턴으로 통일**: Courses, CourseDetail, Apply, About, Login, Signup, MyPage, NotFound, AdminLayout
- **Footer 전면 리뉴얼**: 실제 회사 정보(이애본 대표, 010-3700-0629), 카카오톡 상담 CTA, FAMILY SITES 링크

### Build
- `dist/` JS 562KB (gz 159KB), CSS 10.6KB (gz 3.1KB)
- `public/hero-bg.jpg` 36KB

---

## [0.2.0] — PR #2 (2026-05-24)

> **디자인 시스템 v2 + HYCU 벤토 + Supabase 접두어 / OAuth / OG 인프라**

### Added
- **디자인 시스템 v2** — Nanum Gothic 통일 + Deep Blue 기본 + **5색 컬러 스킴** (blue · emerald · violet · rose · amber) + **light / dark / auto 모드** (OS 동기화)
- **`<ThemeProvider>`, `<ThemeToggle>`, `<ColorPicker>`**: localStorage 영속, `data-theme` / `data-scheme` HTML 속성 적용
- **`<LeftRail>` 좌측 유틸리티 사이드바**: 64px 다크 글래스, 모드/컬러/로그인/SNS (HYCU 패턴)
- **AuthContext OAuth**: `signInWithOAuth('google' | 'kakao')`, Login 페이지에 OAuth 버튼
- **OG 메타 + 자동 생성**: `index.html` OG/Twitter 메타, `scripts/generate-og-image.mjs` (sharp 1200×630), `public/og-image.png`
- **`src/utils/notifications.ts`**: `sendEmail` / `sendSMS` / `sendBoth` / `buildEmailHtml` — Supabase Edge Functions(`send-email` Resend / `send-sms` icode TCP) 호출
- **Home 벤토 그리드**: 6열 dense flow, 18장 카드 (2x2 슬로건, 2x1 와이드, 1x1 아이콘), 5종 자동 회전 슬라이더 (slogan / news / paper / club / pride)
- **PageHeader 컴포넌트**: fixed nav 높이 보정

### Changed
- **Supabase 접두어 일괄 적용**: `profiles` → `seminar_profiles`, `courses` → `seminar_courses`, `applications` → `seminar_applications`, `is_admin()` → `seminar_is_admin()`
- **헤더**: 투명 → 스크롤시 dark blur, 우측 "지금 신청" 보더 버튼 (HYCU 입학지원 톤)
- **Footer**: HYCU 풍 다크 그레이 멀티컬럼
- **FOUC 방지**: index.html inline 스크립트로 첫 페인트 전 테마/스킴 적용

### Build
- `dist/` JS 524KB (gz 148KB), CSS 10.6KB (gz 3.1KB)

---

## [0.1.0] — PR #1 (2026-05-24)

> **다크 럭셔리 세미나 플랫폼 초기 구축**

### Added
- **React 19 + Vite 7 + TypeScript 5 + react-router v7 + @supabase/supabase-js v2** 스택 (templete_2 표준)
- **공개 페이지**: Home(히어로·통계·피처드·CTA), Courses(필터), CourseDetail(커리큘럼·강사·신청 사이드바), Apply(신청서), About, 404
- **인증**: Login, Signup, MyPage (Supabase Auth + role: user/admin)
- **관리자 콘솔**: AdminLayout, Dashboard, ApplicationsAdmin(승인/거절/메모), CoursesAdmin(개강 승인/종료), NewCourse(강의 등록)
- **`supabase/schema.sql`**: profiles/courses/applications 테이블 + RLS + `is_admin()` 헬퍼
- **데모 모드**: Supabase 키 없이도 localStorage로 전체 흐름 시연 (Login 화면에 빠른 로그인)
- **`.github/workflows/deploy.yml`**: main push 시 GitHub Pages 자동 배포 (Secrets 주입)
- **`public/CNAME`**: `seminar.dreamitbiz.com`
- **`public/404.html`**: SPA 폴백 (BrowserRouter)
- **개발 문서**: README, `docs/ARCHITECTURE.md`, `docs/DESIGN.md`, `docs/CONTRIBUTING.md`

### Initial Design (이후 v2에서 교체됨)
- Obsidian + Champagne Gold 컬러 팔레트 (다크 럭셔리)
- Cormorant Garamond + Inter + Noto Serif KR 타이포그래피

### Build
- `dist/` 528KB (JS 497KB gz 140KB, CSS 7KB gz 2.3KB)

---

## 운영 노트

- **배포 트리거**: `main` 브랜치 push → GitHub Actions(`.github/workflows/deploy.yml`)
- **머지 전략**: PR squash merge (커밋 히스토리 간결화)
- **브랜치 정리**: PR 머지 후 feature 브랜치 삭제
- **Supabase 마이그레이션**: 접두어 변경 시 `supabase/schema.sql` 의 SQL 을 SQL Editor 에서 실행
- **이미지 자산**: 새 컬러/문구 적용 시 `scripts/generate-{og-image,hero-bg}.mjs` CONFIG 수정 → `npm run {og-image,hero-bg}` → 커밋
