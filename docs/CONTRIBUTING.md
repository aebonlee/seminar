# Contributing

## 새 페이지 추가하기

1. `src/pages/MyPage.tsx` 작성 → `export function MyPage()` 형태
2. `src/App.tsx` 의 `<Routes>` 에 `<Route path="..." element={<MyPage />} />` 추가
3. Header 네비게이션에 노출하려면 `src/components/layout/Header.tsx` 의 `links` 배열 수정

## 새 도메인 객체 추가하기

1. `src/types/index.ts` 에 TS 타입 정의
2. `supabase/schema.sql` 에 테이블 + RLS 정책 추가
3. `src/contexts/DataContext.tsx` 에 CRUD 메서드 추가 (Supabase / localStorage 분기)

## 스타일 컨벤션

- **CSS 변수 우선** — 토큰(`var(--gold-300)`)을 직접 쓰고, 매직 컬러 금지
- **유틸 클래스 활용** — `.btn`, `.card`, `.badge`, `.eyebrow`, `.gold-text`
- **레이아웃은 인라인 스타일 OK** — 페이지 한정 일회성 grid/flex
- **컴포넌트 스타일은 글로벌 CSS** — 재사용시 `src/index.css` 에 유틸 추가

## TypeScript

- 엄격 모드 사용 — `strict: true`
- 외부 응답은 `as Type` 캐스팅보다 zod 검증 권장 (필요 시 추후 도입)
- `supabase` 가 nullable 이므로 사용 전 `const sb = supabase; if (!sb) return ...` 패턴

## 커밋 컨벤션

```
feat: 신규 기능
fix: 버그 수정
docs: 문서
style: 포맷
refactor: 리팩터
chore: 빌드/배포/도구
```

## 로컬 검증 체크리스트

```bash
npm run build    # tsc + vite build 통과
npm run preview  # 정적 빌드 미리보기
```

- [ ] /  (Home) 로딩
- [ ] /courses 필터 동작
- [ ] /courses/:id 상세
- [ ] /apply 신청 (데모 모드에서 mypage 이동 확인)
- [ ] /login → 데모 모드 admin 로그인
- [ ] /admin/applications 승인/거절
- [ ] /admin/courses 개강 승인
- [ ] /admin/courses/new 강의 등록 후 승인 → 공개 노출 확인

## 백엔드 마이그레이션 (데모 → Supabase)

1. Supabase 프로젝트 생성, `schema.sql` 실행
2. `.env` 에 URL/Anon key 입력 → 즉시 Supabase 모드로 전환
3. 본인 계정 생성 후 `profiles.role = 'admin'` 으로 변경
4. 빌드/배포

GitHub Actions 환경에서는 Repository Secrets 로 동일 변수 주입.
