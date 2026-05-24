# Design System v2

> 폰트: **Nanum Gothic** · 기본 컬러: **Deep Blue** · 5색 컬러 테마 · Light / Dark / Auto
> 영감: HYCU 대학원 메인의 벤토 그리드 + 풀스크린 fixed 배경 서브페이지

## 컬러 토큰

### Mode 토큰 (light / dark)

```css
/* Light */
--bg:        #ffffff;   --bg-soft:   #f8fafc;   --bg-mute:   #f1f5f9;
--surface:   #ffffff;   --surface-2: #f8fafc;   --hover:     #f1f5f9;
--text:      #0f172a;   --text-2:    #334155;   --text-3:    #64748b;
--border:   #e2e8f0;    --divider:  #e2e8f0;

/* Dark (default) */
--bg:        #0b1220;   --bg-soft:   #0f172a;   --bg-mute:   #111c30;
--surface:   #131f33;   --surface-2: #18243a;   --hover:     #1d2c44;
--text:      #f1f5f9;   --text-2:    #cbd5e1;   --text-3:    #94a3b8;
--border:   #1f2c44;    --divider:  #1e2a40;
```

### 5색 컬러 스킴 (mode 독립)

```css
[data-scheme='blue']    /* Deep Blue (기본) — #2563eb / #1d4ed8 / #1e3a8a */
[data-scheme='emerald'] /* Emerald — #10b981 / #047857 / #064e3b */
[data-scheme='violet']  /* Royal Violet — #8b5cf6 / #6d28d9 / #4c1d95 */
[data-scheme='rose']    /* Rose — #f43f5e / #be123c / #881337 */
[data-scheme='amber']   /* Amber — #f59e0b / #b45309 / #78350f */
```

`accent-50`부터 `accent-900`까지 10단계로 각 스킴 정의. 사용자는 좌측 사이드바의 **컬러 피커**에서 즉시 전환 (localStorage 영속).

## 타이포그래피

**Nanum Gothic** 단일 패밀리 (Korean + Latin 모두 커버).

| 용도 | 사이즈 | weight |
|---|---|---|
| `h1` | clamp(2rem, 4.4vw, 3rem) | 800 |
| `h2` | clamp(1.5rem, 2.8vw, 2.1rem) | 800 |
| `h3` | clamp(1.15rem, 1.8vw, 1.35rem) | 800 |
| body | 15px | 400 |
| eyebrow | 0.72rem | 800, letterspacing 0.24em |

## 레이아웃 패턴

### 홈 — 벤토 그리드

- 풀스크린 다크 배경(그라데이션 + 도트 패턴) + glow
- 6열 그리드 + `grid-auto-flow: dense`
- 카드 사이즈: `2x2`, `2x1`, `1x2`, `1x1`
- 카드 톤: `dark` / `white` / `mustard` / `fuchsia` / `purple` / `pink`
- 16+ 카드 + 5종 자동 회전 슬라이더 (slogan / news / paper / club / pride)
- 벤토 하단에 **DreamIT Network** 14 카테고리 그리드

### 서브 페이지 — `<SubPage>` 컴포넌트

- 풀스크린 `background-attachment: fixed` 배경 (`/hero-bg.jpg`)
- 다크 오버레이로 헤더와 자연스럽게 연결
- 가운데 정렬 큰 화이트 타이틀 + 설명
- 액센트 컬러 반투명 **브레드크럼 바** (Home › 카테고리 › 현재)
- max-width 1290px 컨테이너 + `<SubPanel>` 화이트 패널
- `<PanelHeroBanner>`: 패널 상단에 그라데이션 배너 (이미지 대신)

```tsx
<SubPage
  title="모집 강의"
  description="..."
  breadcrumb={[{ label: '강의 안내', to: '/courses' }, { label: '모집 강의' }]}
>
  <SubPanel>... 콘텐츠 ...</SubPanel>
</SubPage>
```

적용 페이지: Courses, CourseDetail, Apply, About, Network, Login, Signup, MyPage, NotFound, AdminLayout

### 좌측 유틸리티 사이드바 — `<LeftRail>`

- 모든 페이지에서 항상 노출 (HYCU와 동일)
- 64px 폭, 다크 글래스(`rgba(0,0,0,0.32)` + blur)
- 모드 토글 / 컬러 피커 / 로그인 / 마이페이지 / 관리자 / SNS

## 컴포넌트 유틸 (CSS)

### Buttons
```html
<button class="btn btn-primary">     <!-- 메인 액션 (accent-600) -->
<button class="btn btn-ghost">       <!-- 보조 (투명) -->
<button class="btn btn-outline">     <!-- 라인 -->
<button class="btn btn-success">     <!-- 승인 -->
<button class="btn btn-danger">      <!-- 거절 -->
<button class="btn btn-oauth btn-google">  <!-- 화이트 + 구글 컬러 -->
<button class="btn btn-oauth btn-kakao">   <!-- #FEE500 -->
```
사이즈: `.btn-sm`, `.btn-lg`

### Cards · Badges · Forms
- `.card` — 다크/라이트 자동 surface
- `.badge`, `.badge-accent`, `.badge-pending`, `.badge-approved`, `.badge-rejected`, `.badge-live`
- `.form-input`, `.form-textarea`, `.form-select`, `.form-label`, `.form-error`, `.form-help`

### Layout
- `.container` (max 1240) / `.container-narrow` (max 820)
- `.section` (clamp 패딩)
- `.page-header` (fixed nav 높이 보정)

### Marks
- `.eyebrow` — 액센트 컬러 키워드 (앞 라인 prefix)
- 자동 다크/라이트 색상 전환

## 모션

- 기본 이징: `cubic-bezier(0.4, 0, 0.2, 1)` (`--ease`)
- `.fade-up` (0.45s)
- `.skeleton` (shimmer 1.4s)
- 헤더: 스크롤 시 transparent → blur dark
- 카드 hover: `translateY(-2px)` + box-shadow 증가
- 슬라이더 dots: 활성 시 폭이 18px로 확장

## 접근성

- 모든 인터랙티브에 hover/focus 색 변화
- 폼: `label[for]` + `aria-live` 토스트
- 다크 모드 명도비 AA 통과 (text-0 on bg-0)
- 좌측 사이드바: 모바일 880px 이하에서 자동 숨김
- "전체메뉴/주메뉴/본문/푸터 바로가기" 스킵 링크 가능 (HYCU 패턴)

## 정적 자산

- `public/hero-bg.jpg` — 서브페이지 fixed 배경 (sharp 생성, 1920×1080, 36KB)
- `public/og-image.png` — 공유 미리보기 (1200×630, 카카오 디버거 호환)
- `public/favicon.svg` — accent-600 위 화이트 D 마크

스크립트(`scripts/generate-*.mjs`)의 CONFIG만 수정해 사이트별 재생성.

## 디자인 원칙

1. **여백이 우선** — 충분한 패딩(섹션 48~80px)으로 호흡감
2. **컬러는 액센트로** — 본문은 모노톤, 액센트는 한 점에만
3. **레이어드 surface** — 카드 위 카드, 명도차로 깊이
4. **모서리는 작게** — 6~14px (radical하지 않음)
5. **그림자는 적게** — 의도된 한두 곳에만 (`.btn-primary`, `.card:hover`)
6. **모드별 토큰** — 라이트/다크/auto 모두 동일 컴포넌트 코드로 동작
