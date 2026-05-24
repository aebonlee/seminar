# Troubleshooting

본 프로젝트에서 만난 실제 이슈와 해결 기록.

## 1. 빈 페이지 — `Failed to load module script` MIME 오류

### 증상
```
main.tsx:1 Failed to load module script: Expected a JavaScript-or-Wasm
module script but the server responded with a MIME type of
"application/octet-stream". Strict MIME type checking is enforced for
module scripts per HTML spec.
/favicon.svg:1  Failed to load resource: 404 (Not Found)
```

### 원인
GitHub Pages 가 **빌드 산출물(`dist/`) 이 아니라 main 브랜치 루트의 raw 소스** 를 서빙. 소스 `index.html` 은 `/src/main.tsx` 를 모듈로 가리키지만 브라우저는 `.tsx` 를 실행할 수 없음 → 빈 페이지.

### 해결
1. 워크플로우(`.github/workflows/deploy.yml`) 가 `peaceiris/actions-gh-pages` 로 `dist/` 를 **`gh-pages`** 브랜치에 push (이미 적용됨)
2. **Settings → Pages → Source: `Deploy from a branch`** + **Branch: `gh-pages` / `(root)`** 로 설정
3. main에 push할 때마다 자동으로 빌드 → `gh-pages` 브랜치 갱신 → 사이트 반영

---

## 2. 빈 페이지 — localStorage 캐시 호환 깨짐

### 증상
이전 버전을 방문한 적 있는 브라우저에서 새 버전 로드 시 빈 페이지.

### 원인
localStorage 에 옛 스키마의 `mockCourses` (예: `learning_sites` 필드 누락) 가 캐시되어 있고, 새 코드에서 `course.learning_sites.length` 접근 시 `TypeError` 발생 → React 트리 unmount.

### 해결 (이미 적용)
1. **LS 키 버전 관리**: `seminar:mock-courses` → `seminar:mock-courses:v2`
2. **`normalizeCourse()`** — 누락 필드 자동 기본값 채움
3. **`<ErrorBoundary>`** — 런타임 에러 시 안내 + 캐시 초기화 버튼

### 임시 회복 (DevTools 콘솔)
```js
Object.keys(localStorage)
  .filter(k => k.startsWith('seminar:'))
  .forEach(k => localStorage.removeItem(k));
location.reload();
```

---

## 3. 다크 모드 — 흰 배경 박스에서 텍스트 안 보임

### 증상
SubPanel / neutral 카드(명시적 흰 배경) 안의 sub-text(설명, 헬프, 메모 등)가 다크 모드에서 너무 밝아 보이지 않음.

### 원인
`var(--text)` / `var(--text-3)` 등은 모드 의존 토큰. 다크 모드에선 `#f1f5f9` / `#94a3b8` 같은 라이트 톤이 되어 흰 배경에서 가독성 결여.

### 해결 (이미 적용)
- **`.on-light` / `.on-dark`** 컨텍스트 클래스 도입 (`src/index.css`)
  - `.on-light` 내부에서 `var(--text-*)` 가 항상 다크 slate 톤으로 강제 매핑
  - SubPanel 자동 적용, BentoCard 가 톤에 따라 자동 선택
- Admin 페이지(흰 배경 강제)는 `var(--text-*)` 를 명시적 slate 컬러로 대체

---

## 4. 카드 컬러가 다크 블루 베이스와 이질감

### 증상
선택된 컬러 스킴이 Deep Blue 인데 카드들이 fuchsia/mustard/burgundy/pink 등 무작위 컬러여서 시각적 조화 깨짐.

### 해결 (이미 적용)
카드 톤 시스템을 **accent 컬러 기반 variants** 로 통일:
- `tone="hero" | "strong" | "mid" | "soft" | "light" | "neutral" | "dark"`
- 모두 `var(--accent-*)` 에서 파생
- 컬러 피커 전환 시 모든 카드가 동일 톤 패밀리로 동기화

---

## 5. 학습 사이트 URL 무차별 공개

### 증상
초기에 95개 패밀리 사이트 URL을 푸터/홈/네트워크에서 모두 공개 → 운영 정책 위반.

### 해결 (이미 적용)
- `Course.learning_sites` 필드 도입 — 강의별 큐레이션 매핑
- URL은 **MyPage 에서, 신청 승인된 사용자에게만** 노출
- CourseDetail은 사이트 이름만 미리보기 (자물쇠 아이콘)
- `/network` 는 카테고리/개수만 노출하는 '운영 학습 분야' 페이지로 재정의
- Footer 의 FAMILY SITES 박스 제거 (본사이트 단순 링크만 유지)

---

## 6. GitHub App 권한 부족 — push / merge / 브랜치 삭제 실패

### 증상
- `git push`: `remote: Permission to aebonlee/seminar.git denied to aebonlee. ... 403`
- MCP: `403 Resource not accessible by integration`

### 원인
Claude Code 세션에 부여된 GitHub App 권한이 read-only 이거나 일시 정지 상태.

### 해결
- **github.com/settings/installations** → Claude / Claude Code App → **Repository access** 에 `aebonlee/seminar` 추가 + **Contents: Read and write** + **Pull requests: Read and write**
- 일시 정지(Suspended) 상태면 해제(Unsuspend)
- 권한 갱신 후엔 **새 세션**을 시작 (기존 세션의 토큰은 갱신 안 됨)
- 브랜치 삭제는 권한이 까다로워 사용자가 GitHub 웹에서 직접 처리 권장

---

## 7. 다크 와인 잔재 (브레드크럼 등)

### 증상
HYCU 레퍼런스의 `bg-pink-950` (다크 와인)을 그대로 사용 → 다크 블루 베이스와 충돌.

### 해결 (이미 적용)
- 모든 `rgba(76,5,25,0.78)` / `bg-pink-950` 류 → `var(--accent-700|800)` 로 변경
- SubPage 브레드크럼 바도 accent 스킴 따르도록 수정

---

## 운영 권장

- PR 머지 후 feature 브랜치 자동 삭제: **Settings → General → Pull Requests → "Automatically delete head branches"** 체크
- 환경변수는 Repository Secrets 에만 — `.env` 는 절대 커밋하지 말 것 (.gitignore 에 포함됨)
- Resend API Key 같은 민감 정보는 **Edge Function 비밀**로만 — 클라이언트(`VITE_*`)에 노출 금지
