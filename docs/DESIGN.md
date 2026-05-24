# Design System — Obsidian & Gold

## 컬러 토큰

```css
--bg-0: #07070a;   /* 가장 깊은 표면 */
--bg-1: #0c0c11;   /* 페이지 배경 */
--bg-2: #14141b;   /* 카드 */
--bg-3: #1c1c25;   /* 엘리베이션 */
--bg-4: #262631;   /* hover */

--text-0: #f5f1e6; /* 강조 */
--text-1: #c9c5b8; /* 본문 */
--text-2: #8a8579; /* 보조 */
--text-3: #5a5650; /* 비활성 */

--gold-100: #f6e7b8;
--gold-200: #e8d089;
--gold-300: #d4af37; /* primary */
--gold-400: #b9942a;
--gold-500: #8c6f1f;
```

## 타이포그래피

| 용도 | 폰트 | 비고 |
|---|---|---|
| 제목/디스플레이 | Cormorant Garamond 500–600 + Noto Serif KR | 세리프 럭셔리감 |
| 본문/UI | Inter 300–600 + Noto Serif KR | 가독성 우선 |
| 강조 텍스트 | `.gold-text` 유틸 | gradient text fill |

### 헤딩 스케일
- `h1`: `clamp(2.4rem, 5vw, 4.2rem)` — 페이지 타이틀
- `h2`: `clamp(1.8rem, 3.4vw, 2.8rem)` — 섹션 헤딩
- `h3`: `clamp(1.3rem, 2vw, 1.6rem)` — 카드 헤딩

## 컴포넌트 유틸

### Buttons
```html
<button class="btn btn-primary">  <!-- 골드 그라데이션 -->
<button class="btn btn-ghost">    <!-- 투명 + 골드 라인 -->
<button class="btn btn-outline">  <!-- 골드 보더 -->
<button class="btn btn-success">  <!-- 승인 -->
<button class="btn btn-danger">   <!-- 거절 -->
```
크기 변형: `.btn-sm`, `.btn-lg`

### Cards
```html
<div class="card">                 <!-- 다크 그라데이션 + 보더, hover 시 lift -->
```

### Badges
```html
<span class="badge badge-gold">   <!-- 카테고리 -->
<span class="badge badge-pending"> <!-- 검토 중 -->
<span class="badge badge-approved"><!-- 승인 -->
<span class="badge badge-rejected"><!-- 거절 -->
<span class="badge badge-live">    <!-- 라이브 -->
```

### Layout
```html
<div class="container">             <!-- max 1240px -->
<div class="container-narrow">      <!-- max 880px -->
<section class="section">           <!-- 상하 패딩 clamp(64,9vw,120) -->
```

### Brand Marks
```html
<div class="eyebrow">EYEBROW LABEL</div>
<span class="gold-text">강조 텍스트</span>
<div class="divider-gold"></div>
```

## 모션

- 기본 이징: `cubic-bezier(0.22, 0.61, 0.36, 1)` (`--ease`)
- 페이드업: `.fade-up` (0.6s)
- 스켈레톤: `.skeleton` (shimmer 1.6s)

## 접근성

- 모든 인터랙티브에 hover/focus 색 변화
- 폼은 `label[for]` + `aria-live` 토스트
- 헤더는 high-contrast (text-0 on bg-0)
- 골드/다크 명도비 충분 (`--text-0` AA 통과)

## 디자인 원칙

1. **여백이 럭셔리다** — 충분한 padding(48–80px section)으로 호흡감
2. **세리프와 산세리프의 대비** — 헤딩만 세리프로 격조 형성
3. **컬러는 한 점에만** — 골드는 액센트로만, 본문은 무채색
4. **모서리는 부드럽되 작게** — radius 8–14px (radical하지 않음)
5. **그림자는 약하게** — 의도된 한 두 곳에만 (button-primary, modal)
