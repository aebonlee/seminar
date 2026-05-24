# Contributing

## 새 페이지 추가

1. `src/pages/MyPage.tsx` 형태로 컴포넌트 작성 — **서브 페이지는 `<SubPage>` 로 감싸기**
2. `src/App.tsx` 의 `<Routes>` 에 `<Route path="..." element={<MyPage />} />` 추가
3. Header 네비게이션에 노출하려면 `src/components/layout/Header.tsx` 의 `links` 배열 수정

### 서브 페이지 템플릿

```tsx
import { SubPage, SubPanel, PanelHeroBanner } from '../components/layout/SubPage'

export function MyPage() {
  return (
    <SubPage
      title="페이지 제목"
      description="짧은 설명"
      breadcrumb={[{ label: '카테고리', to: '/category' }, { label: '현재 페이지' }]}
    >
      <SubPanel topImage={<PanelHeroBanner>...</PanelHeroBanner>}>
        ... 콘텐츠 ...
      </SubPanel>
    </SubPage>
  )
}
```

## 새 도메인 객체 추가

1. `src/types/index.ts` 에 TypeScript 타입 정의
2. `supabase/schema.sql` 에 테이블 (반드시 `seminar_` 접두어) + RLS 정책 추가
3. `src/contexts/DataContext.tsx` 에 CRUD 메서드 추가 (Supabase / localStorage 분기)
4. (선택) 신청·승인 등 상태 변경 시 `src/utils/notifications.ts` 의 `sendEmail` / `sendSMS` 호출

## 새 패밀리 사이트 추가

1. **마스터 SoT**: `aebonlee/site` 의 [`src/data/sites.ts`](https://github.com/aebonlee/site/blob/main/src/data/sites.ts) 에 먼저 추가 (해당 리포에 PR)
2. 본 리포의 `src/data/familySites.ts` 동기화 (수동 복사)
3. `siteCategories` 의 `count` 업데이트 필요 시 수정
4. 빌드 → `/network` 페이지에 자동 노출

## 새 카테고리 추가

`familySites.ts` 의 `siteCategories` 배열에 항목 추가 (`id`, `name`, `nameKo`, `icon`, `count`). 모든 사용처(홈 벤토 하단 + `/network`)에 자동 반영.

## 새 컬러 스킴 추가

1. `src/index.css` 에 `[data-scheme='new-id']` 블록 추가 (10단계 accent 토큰)
2. `src/contexts/ThemeContext.tsx` 의 `SCHEMES` 배열에 추가 (`id`, `label`, `swatch`)

## 스타일 컨벤션

- **CSS 변수 우선** — `var(--accent-600)` 등 토큰을 직접, 매직 컬러 금지
- **유틸 클래스 활용** — `.btn`, `.card`, `.badge`, `.eyebrow`, `.form-*`
- **레이아웃은 인라인 스타일 OK** — 페이지 한정 일회성 grid/flex
- **재사용 컴포넌트는 별도 파일** — `src/components/{layout,ui}/...`
- **다크/라이트 모두 동작 검증** — `[data-theme='dark']` 셀렉터로 override

## TypeScript

- 엄격 모드 (`strict: true`)
- `supabase` 는 nullable — 사용 전 `const sb = supabase; if (!sb) return ...` 패턴
- 외부 응답은 `as Type` 대신 가능하면 zod 검증 (현재는 캐스팅)

## 정적 자산 (이미지)

- `public/og-image.png` — `npm run og-image` → `scripts/generate-og-image.mjs` 의 `CONFIG` 수정
- `public/hero-bg.jpg` — `npm run hero-bg` → `scripts/generate-hero-bg.mjs` 의 `CONFIG` 수정
- 생성된 파일은 반드시 커밋 (배포 시 빌드 단계에서 재생성하지 않음)

## 커밋 컨벤션

```
feat: 신규 기능
fix: 버그 수정
docs: 문서
style: 포맷
refactor: 리팩터
chore: 빌드/배포/도구
```

## PR 머지 전략

- **squash merge** 사용 (커밋 히스토리 간결화)
- 머지 후 feature 브랜치는 삭제
- `main` 브랜치 push 시 GitHub Actions 가 자동 빌드·배포

## 로컬 검증 체크리스트

```bash
npm run build    # tsc + vite build 통과
npm run preview  # 정적 빌드 미리보기
```

- [ ] `/` (홈 벤토 + 5종 슬라이더 + 패밀리 네트워크) 정상 렌더
- [ ] `/courses` 필터 동작 + 카드 hover
- [ ] `/courses/:id` 상세 + sticky 사이드바
- [ ] `/apply` 신청 (데모 모드에서 mypage 이동 확인)
- [ ] `/login` 데모 모드 admin 로그인 → `/admin/applications` 승인/거절
- [ ] `/admin/courses/new` 강의 등록 → `/admin/courses` 개강 승인 → `/courses` 노출
- [ ] `/network` 카테고리 필터 + 키워드 검색
- [ ] 좌측 사이드바 모드 토글 (해/달) + 컬러 피커 (5색)
- [ ] 다크 / 라이트 / auto 모드 새로고침 후 유지 (localStorage)
- [ ] 모바일 (≤880px): LeftRail 자동 숨김, 햄버거 메뉴

## 백엔드 마이그레이션 (데모 → Supabase)

1. Supabase 프로젝트 생성, `supabase/schema.sql` 실행
2. `.env` 에 URL/Anon key 입력 → 즉시 Supabase 모드로 전환
3. 본인 계정 회원가입 후 `seminar_profiles.role = 'admin'` 으로 변경
4. (선택) Google · Kakao OAuth Provider 활성화
5. (선택) Edge Functions `send-email`, `send-sms` 배포 (또는 공용 인프라 재사용)
6. 빌드/배포

GitHub Actions 환경에서는 Repository Secrets 로 동일 변수 주입.

## 환경 갱신 시 운영자 작업

1. 회사 정보 변경 → `src/data/familySites.ts` 의 `COMPANY` 상수 수정 → 빌드/배포
2. 패밀리 사이트 추가 → `familySites.ts` 의 배열 + 카테고리 count 수정
3. 새 컬러 테마 → `index.css` + `ThemeContext.tsx` 의 `SCHEMES`
4. 새 이미지 → `scripts/generate-*.mjs` CONFIG 수정 후 재생성 + 커밋
