# Architecture

## 도메인 모델

```
Profile (auth.users 1:1, table: seminar_profiles)
  - id, email, full_name, role: 'user' | 'admin'

Course (table: seminar_courses)
  - id, title, subtitle, description, category
  - format: 'online' | 'offline' | 'hybrid'   ← 진행 형태
  - venue: string | null                      ← 오프라인/혼합 장소
  - instructor, instructor_bio, cover_url
  - duration_weeks, sessions, level, price, capacity
  - start_date, end_date
  - status: 'draft' | 'pending' | 'approved' | 'rejected' | 'archived'
  - highlights: string[], curriculum: { week, title, topics }[]
  - learning_sites: LearningSite[]            ← 강의별 매핑, 승인 시 MyPage 노출
  - created_at, approved_at

LearningSite
  - id (familySites.ts 의 site id)
  - name, url, description

Application (table: seminar_applications)
  - id, course_id (FK), user_id (FK auth.users)
  - name, email, phone, organization, motivation
  - status: 'pending' | 'approved' | 'rejected'
  - admin_note, created_at, reviewed_at
```

> **접두어 규약**: 같은 Supabase 프로젝트를 여러 사이트가 공유할 수 있어 모든 테이블/RPC에 `seminar_` 접두어를 사용합니다. 다른 패밀리 사이트는 자체 접두어를 사용합니다 (예: `tmpl_`, `ahp_basic_`, `ai_prompt_` 등).

## 데이터 흐름

### 1) 공개 페이지

```
Home / Courses
  └─ DataContext.refresh()
      └─ supabase.from('seminar_courses').select('*')
          └─ RLS: status='approved' 만 반환 (관리자는 전부)
```

### 2) 신청 흐름

```
Apply 페이지 → applyToCourse()
  └─ supabase.from('seminar_applications').insert({ status: 'pending', ... })
      └─ RLS: auth.uid() is not null (로그인 필수)
      └─ (선택) notifications.sendEmail() — 신청 확인 메일

관리자 → ApplicationsAdmin → updateApplicationStatus(id, 'approved'|'rejected', note)
  └─ supabase.from('seminar_applications').update({ status, admin_note, reviewed_at })
      └─ RLS: seminar_is_admin()
      └─ (선택) notifications.sendBoth() — 결과 통보 메일 + SMS
```

### 3) 강의 등록·승인

```
관리자 → /admin/courses/new → createCourse()
  └─ insert ({ status: 'pending' })

관리자 → /admin/courses → setCourseStatus(id, 'approved')
  └─ update ({ status: 'approved', approved_at: now() })

공개 → /courses 에 노출 (RLS)
```

## 인증

### 이메일·비밀번호
- `AuthContext.signIn(email, password)` → `supabase.auth.signInWithPassword`
- `AuthContext.signUp(email, password, name)` → `supabase.auth.signUp` + profiles upsert

### OAuth (Google · Kakao)
- `AuthContext.signInWithOAuth('google' | 'kakao')`
- `redirectTo`: `VITE_SITE_URL + '/mypage'`
- Supabase Console → **Authentication → Providers** 에서 활성화 필요

## 알림 (`src/utils/notifications.ts`)

DreamIT 공용 Edge Functions 호출 표준 시그니처:

```ts
import { sendEmail, sendSMS, sendBoth, buildEmailHtml } from '../utils/notifications'

await sendEmail({ to: 'user@example.com', subject: '제목', html: '<p>내용</p>' })
await sendSMS({ receiver: '01012345678', message: '안녕하세요' })
await sendBoth({ email: {...}, sms: {...} })

const html = buildEmailHtml({
  title: '신청이 승인되었습니다',
  body: '<p>안녕하세요, ...</p>',
  cta: { label: '내 강의 보기', url: 'https://seminar.dreamitbiz.com/mypage' },
})
```

- Edge Function `send-email`: Resend API (키는 Function 환경변수)
- Edge Function `send-sms`: icode TCP 게이트웨이
- 데모 모드(Supabase 미설정)에서는 콘솔 로그로 모킹

## 안정성 메커니즘

1. **`<ErrorBoundary>` (`src/components/ErrorBoundary.tsx`)**
   - 최상위에서 React 트리 내부 에러 캐치
   - 빈 페이지 대신 안내 화면 + "캐시 초기화" 버튼 노출 (seminar:* localStorage 일괄 삭제)
2. **LocalStorage 키 버전 관리**
   - `seminar:mock-courses:v2`, `seminar:mock-applications:v2`
   - 스키마 변경 시 키 버전을 bump 하여 옛 캐시 자동 무효화
3. **`normalizeCourse()` 안전 가드 (`DataContext`)**
   - 누락 필드(learning_sites/format/venue/highlights/curriculum)를 기본값으로 채워 옛 데이터/외부 DB 호환 보장
4. **404.html SPA 폴백**
   - 워크플로우가 `index.html`을 `404.html`로 복제 — 딥링크/새로고침 시에도 SPA 라우터가 처리

## 데모 모드

`VITE_SUPABASE_URL` 또는 `VITE_SUPABASE_ANON_KEY` 미설정 시:

- `supabase` 클라이언트가 `null`
- `DataContext` / `AuthContext` 가 `localStorage` 백엔드로 자동 전환
- 초기 강의는 `src/data/mockCourses.ts` 시드
- `/login` 에 "사용자/관리자로 로그인" 버튼 노출
- `notifications` 호출은 모킹 (콘솔 출력)

배포 시 GitHub Actions Secrets 에 Supabase 키만 넣으면 자동 전환.

## 테마 시스템 (`src/contexts/ThemeContext.tsx`)

- **mode**: `'light' | 'dark' | 'auto'` — `auto`는 OS `prefers-color-scheme` 동기화
- **scheme**: `'blue' | 'emerald' | 'violet' | 'rose' | 'amber'`
- localStorage 영속: `seminar:theme-mode`, `seminar:theme-scheme`
- HTML attribute 적용: `data-theme`, `data-scheme`
- FOUC 방지: `index.html` 의 inline 스크립트가 첫 페인트 전 적용

## RLS 정책 요약

| 테이블 | 작업 | 정책 |
|---|---|---|
| `seminar_profiles` | SELECT | 본인 또는 admin |
| `seminar_profiles` | INSERT | 본인 |
| `seminar_profiles` | UPDATE | 본인 |
| `seminar_courses` | SELECT | `status='approved'` 또는 admin |
| `seminar_courses` | INSERT/UPDATE/DELETE | admin |
| `seminar_applications` | SELECT | 본인(`user_id`) 또는 admin |
| `seminar_applications` | INSERT | 인증된 사용자 |
| `seminar_applications` | UPDATE | admin |

`seminar_is_admin()` 헬퍼가 `seminar_profiles.role`을 조회하여 권한을 판정 (security definer).

## 라우팅

```
/                    Home (벤토 그리드 + DreamIT Network 섹션)
/courses             Courses 목록 (filter)
/courses/:id         CourseDetail
/apply               신청서
/about               소개
/network             DreamIT 패밀리 95개 사이트 (검색/카테고리 필터)
/login, /signup      인증 (Google · Kakao OAuth + 이메일)
/mypage              내 신청 현황 (로그인 필요)
/admin               관리자 콘솔 레이아웃 (admin role 필요)
  ├─ /               Dashboard
  ├─ /applications   신청 검토
  ├─ /courses        강의 승인·종료
  └─ /courses/new    강의 등록
*                    NotFound
```

`AdminLayout` 에서 role 검사 → 권한 부족 시 `/` 또는 `/login` 으로 리다이렉트.
`MyPage` 는 비로그인 시 `/login` 으로 리다이렉트.

## 정적 자산 생성 스크립트

| 명령 | 출력 | 용도 |
|---|---|---|
| `npm run og-image` | `public/og-image.png` (1200×630) | 카카오·페북 공유 미리보기 |
| `npm run hero-bg`  | `public/hero-bg.jpg` (1920×1080)  | 서브페이지 풀스크린 배경 |

스크립트는 `sharp` 의존성을 사용. `scripts/*.mjs` 의 `CONFIG` 객체만 수정해 사이트별 재생성.

## DreamIT 패밀리 네트워크

`src/data/familySites.ts` — `site.dreamitbiz.com` 마스터 데이터 동기화.

- 95개 사이트, 14 카테고리
- 카테고리별 카드 + 검색은 `/network` 페이지
- Home 벤토 하단의 'DreamIT Network' 섹션이 카테고리 미리보기 제공
- Footer 에 본사이트(`www.dreamitbiz.com`) / 포탈(`site.dreamitbiz.com`) 링크
