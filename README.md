# DreamIT Seminar

> 엄선된 강의만 노출되는 **프리미엄 세미나 플랫폼**.
> HYCU 대학원 스타일의 벤토 그리드 홈 + 풀스크린 배경 서브페이지 디자인.
> 관리자 승인 워크플로우와 Supabase 백엔드. 100여 개 DreamIT 패밀리 사이트와 연계.

🌐 **Live**: [seminar.dreamitbiz.com](https://seminar.dreamitbiz.com)
🏢 **Headquarter**: [www.dreamitbiz.com](https://www.dreamitbiz.com)
🌍 **DreamIT Sites Portal (95개)**: [site.dreamitbiz.com](https://site.dreamitbiz.com)

---

## ✨ 핵심 기능

- **세미나 모집 홍보** — HYCU 톤 벤토 그리드 홈 (16+ 카드, 5종 자동 회전 슬라이더)
- **수강 신청** — 강의 선택·신청자 정보·동기, 클라이언트 검증
- **관리자 콘솔** — Dashboard / 신청 검토(승인·거절·메모) / 강의 등록·승인 / 종료 처리
- **인증** — Supabase Auth(이메일·비밀번호) + Google · Kakao OAuth, role 분리(user/admin)
- **알림** — Supabase Edge Functions `send-email`(Resend) / `send-sms`(icode TCP)
- **5색 컬러 테마 + 라이트/다크/auto** — Nanum Gothic 통일, OS 동기화
- **DreamIT 패밀리 네트워크** — 95개 사이트 14 카테고리 통합 (`/network`)
- **Demo 모드** — Supabase 키 없이도 localStorage로 전체 흐름 시연

## 🎨 디자인 시스템 (v2)

| | |
|---|---|
| **폰트** | Nanum Gothic |
| **기본 컬러** | Deep Blue (`#2563eb` ~ `#1e3a8a`) |
| **5색 테마** | Blue · Emerald · Violet · Rose · Amber |
| **모드** | Light · Dark · Auto |
| **레이아웃** | HYCU 톤 — 벤토 그리드 홈 + 풀스크린 fixed 배경 서브페이지 |

전체 토큰은 [`src/index.css`](./src/index.css), 상세는 [`docs/DESIGN.md`](./docs/DESIGN.md) 참조.

## 🧱 기술 스택

- **React 19 + Vite 7 + TypeScript 5**
- **react-router-dom v7** (BrowserRouter)
- **@supabase/supabase-js v2** — Auth + PostgreSQL + RLS + Edge Functions
- **sharp** (devDependency) — OG / 배경 이미지 생성 스크립트
- **GitHub Pages** 정적 배포 (Actions 자동 빌드)

## 📁 폴더 구조

```
src/
├── components/
│   ├── layout/       Header, Footer, PublicLayout, Logo, LeftRail,
│   │                 SubPage, PageHeader, ThemeToggle
│   └── ui/           CourseCard
├── contexts/         AuthContext, DataContext, ThemeContext, ToastContext
├── data/             mockCourses, familySites (95개 사이트 + 14 카테고리 + COMPANY)
├── lib/              supabase client (env 기반, 미설정 시 null)
├── pages/
│   ├── Home          벤토 그리드 (16+ 카드) + DreamIT Network 섹션
│   ├── Courses       서브페이지 필터/카드
│   ├── CourseDetail  서브페이지 + sticky 신청 사이드바
│   ├── Apply         신청서 폼
│   ├── About         서브페이지 + 검수 5단계
│   ├── Network       95개 패밀리 사이트 카테고리/검색
│   ├── Login, Signup  OAuth(Google/Kakao) + 이메일
│   ├── MyPage        신청 현황
│   ├── NotFound
│   └── admin/        AdminLayout, Dashboard, ApplicationsAdmin,
│                     CoursesAdmin, NewCourse
├── styles/
├── types/            Course, Application, Profile, OAuthProvider 등
├── utils/            notifications (sendEmail/sendSMS/sendBoth/buildEmailHtml)
└── App.tsx, main.tsx

public/
├── hero-bg.jpg       서브페이지 배경 (sharp 생성)
├── og-image.png      OG 미리보기 이미지
├── favicon.svg
├── CNAME             seminar.dreamitbiz.com
└── 404.html          SPA 폴백

scripts/
├── generate-og-image.mjs    (npm run og-image)
└── generate-hero-bg.mjs     (npm run hero-bg)

supabase/
└── schema.sql        seminar_profiles / seminar_courses /
                      seminar_applications + RLS + seminar_is_admin()
```

## 🚀 빠른 시작

```bash
# 1. 의존성
npm install

# 2. 환경변수 (선택 — 없으면 데모 모드)
cp .env.example .env
# Supabase URL/Anon key 등 입력

# 3. 개발 서버
npm run dev          # http://localhost:5173

# 4. 빌드 / 미리보기
npm run build        # dist/ 생성
npm run preview

# 5. 이미지 자산 재생성 (옵션)
npm run og-image     # public/og-image.png
npm run hero-bg      # public/hero-bg.jpg
```

## 🗄️ Supabase 백엔드

1. [Supabase Studio](https://supabase.com)에서 새 프로젝트 생성
2. **SQL Editor** 에 [`supabase/schema.sql`](./supabase/schema.sql) 전체 실행
   - 테이블: `seminar_profiles`, `seminar_courses`, `seminar_applications`
   - RLS + `seminar_is_admin()` 헬퍼
3. 회원가입 → Studio Table Editor에서 본인 `seminar_profiles.role` → `'admin'`
4. **Project Settings → API** → URL/anon key → `.env`
5. **Authentication → Providers** → Google · Kakao 활성화 (선택)
6. **Edge Functions** → `send-email`, `send-sms` 배포 (공용 인프라 사용 시 생략)

### 환경변수

| 변수 | 용도 |
|---|---|
| `VITE_SUPABASE_URL` | Supabase 프로젝트 URL |
| `VITE_SUPABASE_ANON_KEY` | Supabase Anon Key |
| `VITE_PORTONE_STORE_ID` | PortOne 결제 (옵션) |
| `VITE_PORTONE_CHANNEL_KEY` | PortOne 채널 키 (옵션) |
| `VITE_GOOGLE_CLIENT_ID` | Google OAuth (옵션) |
| `VITE_KAKAO_CLIENT_ID` | Kakao OAuth (옵션) |
| `VITE_SITE_URL` | 배포 도메인 (OAuth redirect, OG에 사용) |
| `VITE_ADMIN_EMAILS` | 관리자 이메일 (콤마 구분) — UI 식별용 |

> ⚠️ 권한 강제는 Supabase **RLS + `seminar_is_admin()`** 으로 처리. `VITE_ADMIN_EMAILS`는 클라이언트 UI 노출용일 뿐 보안 경계가 아닙니다.
> ⚠️ Resend API 키 등 비밀 키는 **Edge Function 환경변수**에만 저장하고 클라이언트(`VITE_*`)에 노출하지 마세요.

## 🛂 관리자 승인 워크플로우

```
┌─ 사용자 ─────────────┐    ┌─ 관리자 ─────────────────┐
│ 1. 강의 신청 폼 작성   │ →  │ 2. /admin/applications  │
│   (status: pending)  │    │   검토 → 승인/거절 + 메모  │
└──────────────────────┘    └─────────────────────────┘

┌─ 관리자 ─────────────┐    ┌─ 사용자 ─────────────────┐
│ 강의 등록 (pending)   │ →  │ 승인 후 /courses 노출    │
│ → 개강 승인 (approved)│    │ (RLS: status='approved') │
└──────────────────────┘    └─────────────────────────┘
```

상세: [`docs/ARCHITECTURE.md`](./docs/ARCHITECTURE.md)

## 🚢 배포

`main` 브랜치 push → [`.github/workflows/deploy.yml`](./.github/workflows/deploy.yml)이 자동 빌드/배포.

GitHub **Settings → Secrets and variables → Actions** 등록:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
- `VITE_SITE_URL`
- `VITE_ADMIN_EMAILS`

**Settings → Pages → Source: GitHub Actions** 로 설정.

## 📚 문서

| 문서 | 내용 |
|---|---|
| [docs/ARCHITECTURE.md](./docs/ARCHITECTURE.md) | 도메인 모델, 데이터 흐름, RLS, OAuth, 알림, 라우팅 |
| [docs/DESIGN.md](./docs/DESIGN.md) | 디자인 시스템 v2 — Nanum + 5색 + 라이트/다크, 벤토 / 서브페이지 패턴 |
| [docs/SITES.md](./docs/SITES.md) | DreamIT 패밀리 사이트 95개 / 14 카테고리 통합 안내 |
| [docs/CHANGELOG.md](./docs/CHANGELOG.md) | 버전별 변경 이력 (PR #1 / #2 / #3 / docs) |
| [docs/CONTRIBUTING.md](./docs/CONTRIBUTING.md) | 개발 컨벤션 + 새 페이지/도메인 추가 가이드 |
| [supabase/schema.sql](./supabase/schema.sql) | DB 스키마 + RLS |

## 🏢 운영사

```
드림아이티비즈 (DreamIT Biz)
대표: 이애본
주소: 경기도 수원시 팔달구 매산로 45, 419호
TEL: 010-3700-0629  |  Email: aebon@dreamitbiz.com
등록: 601-45-20154  |  통판: 제2024-수원팔달-0584호
출판: 제2026-000026호
```

## 📜 라이선스

© DreamIT Biz. All rights reserved.
