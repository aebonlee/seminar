# DreamIT Family Sites

> 95개 교육·서비스 플랫폼, 14 카테고리 — DreamIT Biz가 운영하는 사이트 네트워크.
> 마스터 데이터: `aebonlee/site` 리포지토리의 [`src/data/sites.ts`](https://github.com/aebonlee/site).

## 공개 정책 ⚠️

> **본 사이트는 95개 패밀리 사이트의 URL을 일반에 직접 공개하지 않습니다.**
>
> - 학습 사이트는 **강의에 큐레이션 매핑**되어 운영됩니다.
> - 사용자는 해당 강의를 신청하고 **관리자 승인을 받은 뒤**, 마이페이지에서만 학습 사이트 URL에 접근할 수 있습니다.
> - 본 사이트의 어떤 페이지(홈/네트워크/푸터)도 학습 사이트의 직접 URL을 노출하지 않습니다.

## 통합 방식

본 리포지토리(`seminar`)의 [`src/data/familySites.ts`](../src/data/familySites.ts) 가
95개 사이트 + 14 카테고리 + 회사 정보를 동기화합니다. UI는 세 곳에 다른 방식으로 노출됩니다.

1. **Home '학습 분야' 섹션** — 14 카테고리 + 각 카테고리의 사이트 개수만 (URL 없음)
2. **`/network` 페이지** — '운영 학습 분야' 페이지. 카테고리/개수만 노출 + 강의 신청 유도 CTA
3. **`/courses/:id` (CourseDetail)** — 해당 강의에 매핑된 학습 사이트의 **이름 목록만** 미리보기 (URL 잠금)
4. **`/mypage` (MyPage)** — 신청 승인된 강의의 학습 사이트 URL이 처음으로 공개됨
5. **Footer** — 본사이트(`www.dreamitbiz.com`) 단순 링크만

## 카테고리

| | 카테고리 | 개수 | 설명 |
|---|---|---|---|
| 🏢 | 회사 사이트 | 6 | 본사, 출판, 예약, 자료, AI Reboot, 포탈 |
| 📊 | AHP / 역량평가 | 2 | AHP Basic, Competency |
| 🔗 | 그룹 허브 | 9 | edu / coding / cs / career / thesis / ai / basic / exam / biz |
| 💼 | 경영전공 | 8 | HRM, 회계, 마케팅, 디지털비즈, UX 등 |
| 📚 | 교양 / 인문 | 9 | 통계, 영어, 일본어, 학습법, ESG 등 |
| 🎓 | 논문연구 | 2 | Survey, Papers |
| 🎯 | 취업 / 진로 / 개인 | 5 | Career + 개인 포트폴리오 |
| 💻 | 컴퓨터과학 | 5 | 자료구조, DB, 알고리즘, SW설계 등 |
| 📜 | 자격증 | 6 | 직업상담사, 정보처리기사, SQLD, AWS, AICE 등 |
| 🤖 | **인공지능** | **20** | ChatGPT, Claude, Gemini, NotebookLM, Codex 등 |
| ⌨️ | 코딩 / 프로그래밍 | 8 | HTML, React, Python, Java, C 등 |
| 👨‍🏫 | 교수 / 강사 | 4 | Teaching AI, 전남대, 서울과기대 등 |
| 🏭 | 외부 회사 | 10 | KoreaIT, PBI, 한전KDN, 다스코 등 |
| 📦 | 기타 | 6 | HWP, 바이브코딩, 한국어 등 |

## 주요 사이트

- **본사이트**: [www.dreamitbiz.com](https://www.dreamitbiz.com) — 전체 사이트 허브
- **포탈**: [site.dreamitbiz.com](https://site.dreamitbiz.com) — 95개 분류 포탈
- **본 사이트**: [seminar.dreamitbiz.com](https://seminar.dreamitbiz.com)

## 사이트 데이터 갱신

새 사이트가 추가/변경되면:

1. `aebonlee/site` 리포의 [`src/data/sites.ts`](https://github.com/aebonlee/site/blob/main/src/data/sites.ts) 가 단일 진실 공급원(SoT)
2. 본 리포의 `src/data/familySites.ts` 에 동기화 (수동 복사 또는 빌드 시 fetch)
3. 카테고리 변경 시 `siteCategories` 배열의 `count` 업데이트

## 회사 정보 (`COMPANY` 상수)

`familySites.ts` 의 `COMPANY` 객체가 푸터 표준 정보의 단일 출처입니다. templete_2 의 [`src/config/site.ts`](https://github.com/aebonlee/templete_2/blob/main/src/config/site.ts) 와 동기 유지.

```ts
COMPANY = {
  name: '드림아이티비즈 (DreamIT Biz)',
  ceo: '이애본',
  bizNumber: '601-45-20154',
  salesNumber: '제2024-수원팔달-0584호',
  publisherNumber: '제2026-000026호',
  address: '경기도 수원시 팔달구 매산로 45, 419호',
  email: 'aebon@dreamitbiz.com',
  phone: '010-3700-0629',
  kakao: 'aebon',
  businessHours: '평일 09:00 ~ 18:00',
  parentSite: { name: 'DreamIT Biz', url: 'https://www.dreamitbiz.com' },
  portalSite: { name: 'DreamIT Sites', url: 'https://site.dreamitbiz.com' },
}
```

## 새 사이트 추가 시 체크리스트

본 sermon-style 템플릿을 복제해 새 사이트를 만들 때:

- [ ] `src/data/familySites.ts` 의 마스터 리스트에 신규 사이트 항목 추가 (마스터에 먼저)
- [ ] `site.dreamitbiz.com` 포탈도 동기화 (`aebonlee/site` PR)
- [ ] 신규 사이트의 `dbPrefix` 결정 (테이블 충돌 방지)
- [ ] 환경변수 `VITE_SITE_URL` 설정
- [ ] OG 이미지 / hero 배경 — `scripts/generate-*.mjs` CONFIG 수정
- [ ] CNAME (서브도메인) 등록 + DNS 설정 + GitHub Pages 커스텀 도메인
