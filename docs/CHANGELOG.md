# Changelog

본 프로젝트의 모든 의미 있는 변경 사항을 PR 단위로 기록합니다.

형식: [Keep a Changelog](https://keepachangelog.com/ko/1.1.0/), 버전: [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [0.5.0] — 2026-05-24 (배포·안정성 강화)

### Changed (CI / 배포)
- **GitHub Pages 배포를 `gh-pages` 브랜치 방식으로 전환**
  - 이전: `actions/deploy-pages` (Pages Source = "GitHub Actions" 필수)
  - 이후: `peaceiris/actions-gh-pages` 가 `dist/`를 **`gh-pages`** 브랜치에 force_orphan push
  - 이유: Pages Source가 "Deploy from a branch: main /root"로 설정된 경우 빌드 결과물이 아닌 소스 `index.html`이 서빙되어 `src/main.tsx` 로드 시도 → MIME 오류 → 빈 페이지 발생
  - 해결: Source를 `gh-pages` 브랜치로만 한 번 지정하면 영구 동작
- 워크플로우 추가 옵션: `force_orphan: true` (옛 파일 비움), `cname` 자동 보장, `404.html`을 `index.html` 복제로 자동 생성 (SPA 딥링크 fallback)

### Fixed (안정성)
- **흰 배경 컨테이너의 텍스트 가독성** (`0e7dcbd`)
  - `.on-light` / `.on-dark` 컨텍스트 클래스 도입 — `var(--text-*)` 가 컨테이너 표면색에 맞춰 강제 매핑
  - SubPanel + Home BentoCard(`neutral`/`light` tone)에 자동 적용
  - 다크 모드 사용자가 흰 박스 안의 sub-text를 못 보던 문제 해결
- **`main.tsx` 부트스트랩 정리** (`f8d258a`)
  - 이전 시도의 `setTimeout` 1.5초 fallback이 false positive로 React 렌더를 덮어쓸 위험 → 제거
  - `index.html` no-cache 메타도 제거 (asset hash가 캐시 buster 역할)
  - ErrorBoundary는 그대로 유지

---

## [0.4.0] — 2026-05-24 (가독성·안정성 핫픽스)

### Fixed
- **다크모드 admin 페이지 텍스트 가독성** (PR #7, `66dbc52`)
  - admin/*  파일의 `var(--text-*)` 를 명시적 slate 컬러(`#0f172a`/`#334155`/`#475569`/`#64748b`)로 일괄 치환
  - 다크 모드에서 `--text`가 흰색이 되어 명시적 흰 배경 컨테이너에서 안 보이던 문제
  - v1 잔재 `var(--gold-200|300)` → `var(--accent-700)` 동시 정리
- **빈 페이지 회복** (PR #6, `596a873`)
  - localStorage 캐시 마이그레이션: LS 키 `seminar:mock-courses` → `seminar:mock-courses:v2`
  - `normalizeCourse()` 안전 가드 — `learning_sites`/`format`/`venue` 누락 시 기본값
  - **`<ErrorBoundary>`** 신규 — 런타임 에러 시 빈 페이지 대신 안내 + "캐시 초기화" 버튼

---

## [0.3.1] — 2026-05-24 (모델·UI 정리)

### Fixed (PR #5, `c3dd5c0`)
- SubPage 브레드크럼 바의 다크 와인 잔재 제거 — `rgba(76,5,25,0.78)` → `var(--accent-800)` (선택 스킴 동기화)
- mockCourses `c-002` 학습 사이트 이름 sed 사고 복구 (`DB · SQL 학습`)

### Added (강좌 진행 형태)
- `Course.format: 'online' | 'offline' | 'hybrid'` + `venue` 필드
- 모든 강의 카드(Home / Courses / CourseDetail / Premier)에 **format 배지**
- Courses 페이지에 진행 형태 필터 (🖥 / 🏛 / ⚡)
- NewCourse 폼에 진행 형태 + 장소
- Home **FormatGuideCard** (세 가지 진행 형태 안내)
- `supabase/schema.sql`: `seminar_courses.format` (check) + `venue` 컬럼

### Changed (Home 정리)
- **18장 → 12장으로 정리** — 학교/대학 컨셉 잔재(우수논문/동아리/어워드/VR/학교자랑/뉴스슬라이더/BrandBadge) 제거
- 세미나 본 목적(온·오프 강좌 모집)에 집중한 카드 구성

---

## [0.3.0] — 2026-05-24 (PR #4, `956261a`)

> **카드 컬러 통일 + 학습 사이트 강의 매핑 정책 + 전체 문서화**

### Changed (정책)
- **카드 컬러 일관성 통일** — fuchsia/mustard/purple 등 무작위 톤 폐기, 현재 accent 스킴 기반 variants 로
  - tones: `hero` / `strong` / `mid` / `soft` / `light` / `neutral` / `dark` (7종)
  - CSS `--tone-*` 변수 (accent-900 → accent-50 파생)
  - 컬러 피커 전환 시 모든 카드 동일 톤 패밀리로 동기화
- **학습 사이트 URL 무차별 공개 폐기** — 강의별 큐레이션 + 신청 승인 시에만 마이페이지에서 URL 공개
  - `Course.learning_sites: LearningSite[]` 추가
  - NewCourse (admin): 카테고리 pill + 체크박스 그리드 매핑 UI
  - CourseDetail: 사이트 이름 미리보기 (URL 잠금)
  - MyPage: 승인된 강의의 학습 사이트만 URL 노출
  - `/network` → '운영 학습 분야' 페이지로 재정의 (카테고리/개수만)
  - Footer FAMILY SITES 박스 제거

### Added (docs)
- README 전면 개편 / `docs/ARCHITECTURE` / `docs/DESIGN` / `docs/SITES` / `docs/CHANGELOG` / `docs/CONTRIBUTING`

---

## [0.2.0] — 2026-05-24 (PR #3, `0f55378`)

> **HYCU 서브페이지 패턴 + DreamIT 패밀리 사이트 네트워크 (95개)**

### Added
- **`<SubPage>` 컴포넌트** — 풀스크린 fixed 배경(`/hero-bg.jpg`) + 다크 오버레이 + 중앙 화이트 타이틀 + 액센트 반투명 브레드크럼 + max-1290px 컨테이너
- `<SubPanel>` / `<PanelHeroBanner>` — 화이트 콘텐츠 박스 + 상단 그라데이션 배너
- `scripts/generate-hero-bg.mjs` (sharp 기반 1920×1080) → `public/hero-bg.jpg`
- `/network` 페이지 + `src/data/familySites.ts` — 95개 사이트 / 14 카테고리
- Home 벤토 하단 'LEARNING FIELDS' 섹션
- Header 메뉴에 'DreamIT 사이트'

### Changed
- 모든 서브 페이지를 `<SubPage>` 패턴으로 통일 (Courses/CourseDetail/Apply/About/Login/Signup/MyPage/NotFound/AdminLayout)
- Footer 전면 리뉴얼 — 회사 정보(templete_2 SoT) + 카카오 상담 CTA

---

## [0.1.0] — 2026-05-24 (PR #2, `02820e1`)

> **디자인 시스템 v2 + HYCU 벤토 + Supabase 접두어/OAuth/OG**

### Added
- 디자인 시스템 v2 — **Nanum Gothic** + **Deep Blue** + **5색 컬러** (blue/emerald/violet/rose/amber) + **light/dark/auto** 모드 (OS 동기화)
- `<ThemeProvider>` / `<ThemeToggle>` / `<ColorPicker>` (localStorage 영속)
- `<LeftRail>` — 64px 좌측 다크 글래스 사이드바 (모드/컬러/로그인/SNS)
- AuthContext OAuth — `signInWithOAuth('google' | 'kakao')`
- OG 메타 + `scripts/generate-og-image.mjs` (sharp 1200×630) → `public/og-image.png`
- `src/utils/notifications.ts` — `sendEmail/sendSMS/sendBoth/buildEmailHtml` (Supabase Edge Functions 호출)
- Home 벤토 그리드 (6열 dense, 18장 카드, 5종 자동 회전 슬라이더)

### Changed
- **Supabase 접두어 일괄 적용** — `seminar_profiles` / `seminar_courses` / `seminar_applications` + `seminar_is_admin()`
- 헤더 — 투명 → 스크롤시 dark blur
- Footer — HYCU 풍 다크 그레이 멀티컬럼
- FOUC 방지 — index.html inline 스크립트로 첫 페인트 전 테마 적용

---

## [0.0.1] — 2026-05-24 (PR #1, `e2fe55b`)

> **다크 럭셔리 세미나 플랫폼 초기 구축**

### Added (초기)
- React 19 + Vite 7 + TypeScript 5 + react-router v7 + @supabase/supabase-js v2
- 공개 페이지: Home / Courses(필터) / CourseDetail / Apply / About / 404
- 인증: Login / Signup / MyPage
- 관리자 콘솔: Dashboard / ApplicationsAdmin(승인·거절·메모) / CoursesAdmin / NewCourse
- `supabase/schema.sql` — profiles/courses/applications + RLS + `is_admin()`
- 데모 모드 — Supabase 키 없이 localStorage로 전체 시연
- `.github/workflows/deploy.yml` 자동 배포 (initial: GitHub Actions Pages, v0.5에서 gh-pages 브랜치로 전환)
- 개발 문서: README / docs/ARCHITECTURE / docs/DESIGN / docs/CONTRIBUTING

### Initial Design (v2에서 교체됨)
- Obsidian Black + Champagne Gold 팔레트
- Cormorant Garamond + Inter + Noto Serif KR

---

## 운영 노트

- **배포 트리거**: `main` push → GitHub Actions(`.github/workflows/deploy.yml`) → `dist/` → `gh-pages` 브랜치 force_orphan push → Pages 가 gh-pages 서빙
- **Pages 설정 (1회)**: Settings → Pages → Source: `Deploy from a branch` / Branch: `gh-pages` / `(root)`
- **머지 전략**: PR squash merge
- **브랜치 정리**: PR 머지 후 feature 브랜치 삭제, main만 유지
- **Supabase 마이그레이션**: 접두어 변경 시 `supabase/schema.sql` 의 SQL 을 SQL Editor 에서 실행
- **이미지 자산**: `scripts/generate-{og-image,hero-bg}.mjs` CONFIG 수정 → `npm run {og-image,hero-bg}` → 커밋
