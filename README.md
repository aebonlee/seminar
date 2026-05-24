# DreamIT Seminar

> 엄선된 강의만 노출되는 **프리미엄 세미나 플랫폼**.
> 관리자 승인 워크플로우와 다크 럭셔리(Obsidian + Gold) 디자인 시스템.

🌐 **Live**: [seminar.dreamitbiz.com](https://seminar.dreamitbiz.com)

---

## ✨ 주요 기능

- **세미나 모집 홍보** — 큐레이션 카드, 카테고리/레벨 필터, 상세 페이지(커리큘럼·강사 정보·수강료)
- **수강 신청 폼** — 강의 선택·신청자 정보·동기 작성, 클라이언트 검증
- **관리자 콘솔** — 대시보드 / 신청서 검토(승인·거절·메모) / 강의 등록·승인 / 종료 처리
- **인증** — Supabase Auth 기반 이메일·비밀번호 로그인, 역할(`user` / `admin`) 분리
- **Demo 모드** — Supabase 키 없이도 localStorage로 전체 플로우 시연 가능

## 🎨 디자인 시스템

| 토큰 | 값 |
|---|---|
| Background | `#0c0c11` (Obsidian) |
| Accent | `#d4af37` (Champagne Gold) |
| Display Font | Cormorant Garamond + Noto Serif KR |
| Body Font | Inter + Noto Serif KR |

전체 토큰은 [`src/index.css`](./src/index.css) 의 `:root` 참고.

## 🧱 기술 스택

- **React 19 + Vite 7 + TypeScript 5**
- **react-router-dom v7** (BrowserRouter)
- **@supabase/supabase-js v2** — Auth + PostgreSQL + RLS
- **GitHub Pages** 정적 배포 (Actions 자동 빌드)

## 📁 폴더 구조

```
src/
├── components/
│   ├── layout/       Header, Footer, PublicLayout, Logo
│   └── ui/           CourseCard
├── contexts/         AuthContext, DataContext, ToastContext
├── data/             mockCourses (demo seed)
├── lib/              supabase client (env 기반, 미설정 시 null)
├── pages/
│   ├── Home, Courses, CourseDetail, Apply, About
│   ├── Login, Signup, MyPage, NotFound
│   └── admin/        AdminLayout, Dashboard, ApplicationsAdmin, CoursesAdmin, NewCourse
├── types/            Course, Application, Profile 등 TS 타입
└── App.tsx, main.tsx
```

## 🚀 빠른 시작

```bash
# 1. 의존성 설치
npm install

# 2. 환경변수 설정 (선택 — 없으면 데모 모드)
cp .env.example .env
# .env 파일에서 Supabase 값 채우기

# 3. 개발 서버
npm run dev          # http://localhost:5173

# 4. 프로덕션 빌드
npm run build        # dist/ 에 정적 산출물 생성
npm run preview      # 빌드 결과 미리보기
```

## 🗄️ Supabase 백엔드 설정

1. [Supabase Studio](https://supabase.com) 에서 새 프로젝트 생성
2. **SQL Editor** 열고 [`supabase/schema.sql`](./supabase/schema.sql) 전체 실행
3. 사이트에서 회원가입 → Studio Table Editor 에서 해당 `profiles.role` 을 `'admin'` 으로 변경
4. **Project Settings → API** 에서 URL과 anon key 복사 → `.env` 에 입력

### 환경변수 (`.env.example` 표준)

| 변수 | 용도 |
|---|---|
| `VITE_SUPABASE_URL` | Supabase 프로젝트 URL |
| `VITE_SUPABASE_ANON_KEY` | Supabase Anon Key |
| `VITE_PORTONE_STORE_ID` | PortOne 결제 (옵션) |
| `VITE_PORTONE_CHANNEL_KEY` | PortOne 채널 키 (옵션) |
| `VITE_GOOGLE_CLIENT_ID` | Google OAuth (옵션) |
| `VITE_KAKAO_CLIENT_ID` | Kakao OAuth (옵션) |
| `VITE_RESEND_API_KEY` | Resend 이메일 (옵션) |
| `VITE_SITE_URL` | 배포 도메인 |
| `VITE_ADMIN_EMAILS` | 관리자 이메일(콤마 구분) — 클라이언트 식별용 |

> ⚠️ 실제 권한 강제는 Supabase **RLS + `is_admin()`** 함수로 처리됩니다. `VITE_ADMIN_EMAILS` 는 UI 노출용일 뿐 보안 경계가 아닙니다.

## 🛂 관리자 승인 워크플로우

```
┌─ 사용자 ─────────────┐    ┌─ 관리자 ─────────────────┐
│ 1. 강의 신청 폼 작성   │ →  │ 2. /admin/applications  │
│   (status: pending)  │    │    검토 → 승인 / 거절 + 메모 │
└──────────────────────┘    └─────────────────────────┘

┌─ 관리자 ─────────────┐    ┌─ 사용자 ─────────────────┐
│ 강의 등록 (pending)   │ →  │ 승인 후 /courses 노출    │
│ → 개강 승인 (approved)│    │ (RLS: status='approved') │
└──────────────────────┘    └─────────────────────────┘
```

자세한 흐름은 [`docs/ARCHITECTURE.md`](./docs/ARCHITECTURE.md) 참조.

## 🚢 배포

`main` 브랜치 push → GitHub Actions(`.github/workflows/deploy.yml`) 가 자동 빌드·배포합니다.

GitHub 저장소 **Settings → Secrets and variables → Actions** 에 다음을 등록:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
- `VITE_SITE_URL`
- `VITE_ADMIN_EMAILS`

GitHub Pages 설정은 **Settings → Pages → Source: GitHub Actions** 로 변경하고, 커스텀 도메인 `seminar.dreamitbiz.com` 을 입력하세요. (CNAME 파일은 `public/CNAME` 으로 자동 포함됨)

## 📚 문서

- [docs/ARCHITECTURE.md](./docs/ARCHITECTURE.md) — 도메인 모델, 데이터 흐름, RLS 정책
- [docs/DESIGN.md](./docs/DESIGN.md) — 디자인 시스템 토큰과 사용법
- [docs/CONTRIBUTING.md](./docs/CONTRIBUTING.md) — 개발 컨벤션, 새 페이지 추가 가이드
- [supabase/schema.sql](./supabase/schema.sql) — DB 스키마 + RLS

## 📜 라이선스

© DreamIT Biz. All rights reserved.
