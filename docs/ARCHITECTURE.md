# Architecture

## 도메인 모델

```
Profile (auth.users 1:1)
  - id, email, full_name, role: 'user'|'admin'

Course
  - id, title, subtitle, description, category
  - instructor, instructor_bio, cover_url
  - duration_weeks, sessions, level, price, capacity
  - start_date, end_date
  - status: 'draft'|'pending'|'approved'|'rejected'|'archived'
  - highlights: string[], curriculum: { week, title, topics }[]
  - created_at, approved_at

Application
  - id, course_id (FK), user_id (FK auth.users)
  - name, email, phone, organization, motivation
  - status: 'pending'|'approved'|'rejected'
  - admin_note, created_at, reviewed_at
```

## 데이터 흐름

### 1) 공개 페이지

```
Home / Courses
  └─ DataContext.refresh()
      └─ supabase.from('courses').select('*')
          └─ RLS: status='approved' 만 반환 (관리자는 전부)
```

### 2) 신청 흐름

```
Apply 페이지 → applyToCourse()
  └─ supabase.from('applications').insert({ status: 'pending', ... })
      └─ RLS: auth.uid() is not null (로그인 필수)

관리자 → ApplicationsAdmin → updateApplicationStatus(id, 'approved'|'rejected', note)
  └─ supabase.from('applications').update({ status, admin_note, reviewed_at })
      └─ RLS: is_admin()
```

### 3) 강의 등록·승인

```
관리자 → /admin/courses/new → createCourse()
  └─ insert ({ status: 'pending' })

관리자 → /admin/courses → setCourseStatus(id, 'approved')
  └─ update ({ status: 'approved', approved_at: now() })

공개 → /courses 에 노출 (RLS)
```

## 데모 모드

`VITE_SUPABASE_URL` 또는 `VITE_SUPABASE_ANON_KEY` 미설정 시:

- `supabase` 클라이언트가 `null`
- `DataContext` / `AuthContext` 가 `localStorage` 백엔드로 자동 전환
- 초기 강의는 `src/data/mockCourses.ts` 시드
- 로그인 화면에 "사용자/관리자로 로그인" 버튼이 표시됨

배포 시 GitHub Actions Secrets 에 Supabase 키만 넣으면 자동 전환.

## RLS 정책 요약

| 테이블 | 작업 | 정책 |
|---|---|---|
| `profiles` | SELECT | 본인 또는 admin |
| `profiles` | INSERT | 본인 |
| `profiles` | UPDATE | 본인 |
| `courses` | SELECT | `status='approved'` 또는 admin |
| `courses` | INSERT/UPDATE/DELETE | admin |
| `applications` | SELECT | 본인(`user_id`) 또는 admin |
| `applications` | INSERT | 인증된 사용자 |
| `applications` | UPDATE | admin |

`is_admin()` 헬퍼 함수가 `profiles.role` 을 조회하여 권한을 판정합니다 (security definer).

## 라우팅

```
/                    Home
/courses             Courses 목록 (filter)
/courses/:id         CourseDetail
/apply               신청서
/about               소개
/login, /signup      인증
/mypage              내 신청 현황 (로그인 필요)
/admin               관리자 콘솔 레이아웃 (admin role 필요)
  ├─ /               Dashboard
  ├─ /applications   신청 검토
  ├─ /courses        강의 승인·종료
  └─ /courses/new    강의 등록
```

`AdminLayout` 에서 role 검사 → 권한 부족 시 `/` 또는 `/login` 으로 리다이렉트.
