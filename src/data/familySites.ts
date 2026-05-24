/**
 * DreamIT Family Sites — 95개 교육·서비스 플랫폼 (14 카테고리)
 *
 * 원본: aebonlee/site 리포지토리의 src/data/sites.ts
 * 동기화: site.dreamitbiz.com 의 마스터 데이터를 따름.
 */

export interface SiteInfo {
  id: string
  name: string
  nameKo: string
  description: string
  url: string
  category: string
  features: string[]
}

export interface SiteCategory {
  id: string
  name: string
  nameKo: string
  icon: string
  count: number
}

export const siteCategories: SiteCategory[] = [
  { id: 'company',  name: 'Company',                  nameKo: '회사 사이트',           icon: '🏢', count: 6 },
  { id: 'ahp',      name: 'AHP / Competency',         nameKo: 'AHP / 역량평가',        icon: '📊', count: 2 },
  { id: 'hub',      name: 'Group Hub',                nameKo: '그룹 허브',             icon: '🔗', count: 9 },
  { id: 'business', name: 'Business Major',           nameKo: '경영전공',              icon: '💼', count: 8 },
  { id: 'liberal',  name: 'Liberal Arts',             nameKo: '교양 / 인문',           icon: '📚', count: 9 },
  { id: 'thesis',   name: 'Thesis / Research',        nameKo: '논문연구',              icon: '🎓', count: 2 },
  { id: 'career',   name: 'Career / Personal',        nameKo: '취업 / 진로 / 개인',    icon: '🎯', count: 5 },
  { id: 'cs',       name: 'Computer Science',         nameKo: '컴퓨터과학',            icon: '💻', count: 5 },
  { id: 'cert',     name: 'Certifications',           nameKo: '자격증',                icon: '📜', count: 6 },
  { id: 'ai',       name: 'Artificial Intelligence',  nameKo: '인공지능',              icon: '🤖', count: 20 },
  { id: 'coding',   name: 'Coding / Programming',     nameKo: '코딩 / 프로그래밍',     icon: '⌨️', count: 8 },
  { id: 'teaching', name: 'Teaching / Instructor',    nameKo: '교수 / 강사',           icon: '👨‍🏫', count: 4 },
  { id: 'external', name: 'External Companies',       nameKo: '외부 회사',             icon: '🏭', count: 10 },
  { id: 'etc',      name: 'Others',                   nameKo: '기타',                  icon: '📦', count: 6 },
]

export const familySites: SiteInfo[] = [
  // 회사 사이트
  { id: 'www', name: 'DreamIT Biz', nameKo: '드림아이티비즈 메인', description: '공식 홈페이지 — 회사소개, 서비스 안내, 전체 사이트 허브', url: 'https://www.dreamitbiz.com', category: 'company', features: ['Supabase','PortOne','Auth'] },
  { id: 'books', name: 'DreamIT Books', nameKo: '드림아이티 출판', description: '교재 판매, 디지털 콘텐츠, 교육 자료, E-Publishing', url: 'https://books.dreamitbiz.com', category: 'company', features: ['Supabase','PortOne','Auth'] },
  { id: 'reserve', name: 'Reserve', nameKo: '강의 예약', description: '강의 일정 관리, 예약, 강사 매칭, 관리자 대시보드', url: 'https://reserve.dreamitbiz.com', category: 'company', features: ['Supabase','Auth'] },
  { id: 'docs', name: 'DreamIT Docs', nameKo: '학습 자료 라이브러리', description: '프로그래밍, CS, 수학, 과학, 영어, 경영, 자격증 분류', url: 'https://docs.dreamitbiz.com', category: 'company', features: ['Supabase','Auth'] },
  { id: 'rest', name: 'AI Reboot Academy', nameKo: '쉬었음청년 AI교육', description: 'AI·바이브코딩 교육, AI 리부트 경진대회, LMS, 코칭', url: 'https://rest.dreamitbiz.com', category: 'company', features: ['Supabase','Auth'] },
  { id: 'site', name: 'DreamIT Sites', nameKo: 'DreamIT 전체 사이트 포탈', description: '전체 사이트 목록 및 카테고리별 분류 포탈', url: 'https://site.dreamitbiz.com', category: 'company', features: ['Supabase','Auth'] },

  // AHP / 역량평가
  { id: 'ahp-basic', name: 'AHP Basic', nameKo: 'AHP 기초 학습', description: '쌍대비교, 가중치 계산, 일관성 검증, 의사결정 지원', url: 'https://ahp-basic.dreamitbiz.com', category: 'ahp', features: ['Supabase','PortOne','Auth'] },
  { id: 'competency', name: 'Competency', nameKo: '역량평가 시스템', description: 'NCS 기반 역량 진단, 자가평가, 결과 분석 리포트', url: 'https://competency.dreamitbiz.com', category: 'ahp', features: ['Supabase','PortOne','Auth'] },

  // 그룹 허브
  { id: 'edu-hub', name: 'Edu Hub', nameKo: '교육 종합 허브', description: '전체 교육 사이트 통합 포털', url: 'https://edu-hub.dreamitbiz.com', category: 'hub', features: ['Supabase','PortOne','Auth'] },
  { id: 'coding-hub', name: 'Coding Hub', nameKo: '코딩 학습 허브', description: 'HTML, React, Python, Java, C 등 7개 플랫폼', url: 'https://coding-hub.dreamitbiz.com', category: 'hub', features: ['Supabase','PortOne','Auth'] },
  { id: 'cs-hub', name: 'CS Hub', nameKo: 'CS전공 학습 허브', description: '알고리즘, 자료구조, DB, SW공학 등 5개 플랫폼', url: 'https://cs-hub.dreamitbiz.com', category: 'hub', features: ['Supabase','PortOne','Auth'] },
  { id: 'career-hub', name: 'Career Hub', nameKo: '커리어 학습 허브', description: '취업, 진로, 역량개발 등 6개 플랫폼', url: 'https://career-hub.dreamitbiz.com', category: 'hub', features: ['Supabase','PortOne','Auth'] },
  { id: 'thesis-hub', name: 'Thesis Hub', nameKo: '논문연구 학습 허브', description: '연구방법론, 통계학, 조사방법론, AHP 등 5개 플랫폼', url: 'https://thesis-hub.dreamitbiz.com', category: 'hub', features: ['Supabase','PortOne','Auth'] },
  { id: 'ai-hub', name: 'AI Hub', nameKo: 'AI 전문 학습 허브', description: '챗봇, 자동화, 데이터, 미디어 등 11개 AI 플랫폼', url: 'https://ai-hub.dreamitbiz.com', category: 'hub', features: ['Supabase','PortOne','Auth'] },
  { id: 'basic-hub', name: 'Basic Hub', nameKo: '교양/인문 학습 허브', description: '어학, 프레젠테이션, 학습법 등 5개 플랫폼', url: 'https://basic-hub.dreamitbiz.com', category: 'hub', features: ['Supabase','PortOne','Auth'] },
  { id: 'exam-hub', name: 'Exam Hub', nameKo: '자격증 학습 허브', description: '정보처리기사, SQLD, 리눅스마스터 등 5개 플랫폼', url: 'https://exam-hub.dreamitbiz.com', category: 'hub', features: ['Supabase','PortOne','Auth'] },
  { id: 'biz-hub', name: 'Biz Hub', nameKo: '경영전공 학습 허브', description: '회계, 마케팅, 디지털경영 등 11개 경영 플랫폼', url: 'https://biz-hub.dreamitbiz.com', category: 'hub', features: ['Supabase','PortOne','Auth'] },

  // 경영전공
  { id: 'hrm', name: 'HRM', nameKo: '인적자원관리', description: '채용, 교육, 성과관리, 보상, 노사관계, 조직문화', url: 'https://hrm.dreamitbiz.com', category: 'business', features: ['Supabase','Auth'] },
  { id: 'research', name: 'Research', nameKo: '사회과학 조사방법론', description: '연구설계, 표본추출, 측정, 설문, 실험, 질적연구', url: 'https://research.dreamitbiz.com', category: 'business', features: ['Supabase','PortOne','Auth'] },
  { id: 'accounting', name: 'Accounting', nameKo: '회계 & 재무 가이드', description: '회계 기초, 재무제표, 원가/관리회계, 세무, 감사', url: 'https://accounting.dreamitbiz.com', category: 'business', features: ['Supabase','PortOne','Auth'] },
  { id: 'planning', name: 'Planning', nameKo: '경영기획', description: '사업계획, 전략기획, 예산관리, 경영분석', url: 'https://planning.dreamitbiz.com', category: 'business', features: ['Supabase','Auth'] },
  { id: 'marketing', name: 'Marketing', nameKo: '마케팅 전략', description: '마케팅 원론, STP, 4P, 디지털마케팅, 소비자행동', url: 'https://marketing.dreamitbiz.com', category: 'business', features: ['Supabase','Auth'] },
  { id: 'digitalbiz', name: 'Digital Biz', nameKo: '디지털비즈니스전략세미나', description: 'DX, 플랫폼, AI 혁신, 핀테크, 구독경제, 스타트업', url: 'https://digitalbiz.dreamitbiz.com', category: 'business', features: ['Supabase','Auth','LMS'] },
  { id: 'self-branding', name: 'Self-Branding', nameKo: '셀프 브랜딩 마케팅', description: '기업홍보, 개인브랜딩, SNS마케팅, 콘텐츠마케팅', url: 'https://self-branding.dreamitbiz.com', category: 'business', features: ['Supabase','Auth','LMS'] },
  { id: 'uxdesign', name: 'UX Design', nameKo: 'UX 디자인', description: 'UX/UI 설계, 사용성 평가, 프로토타이핑, 디자인씽킹', url: 'https://uxdesign.dreamitbiz.com', category: 'business', features: ['Supabase','Auth','LMS'] },

  // 교양 / 인문
  { id: 'statistics', name: 'Statistics', nameKo: '통계학', description: '통계학의 모든 것을 배우는 종합 학습 플랫폼', url: 'https://statistics.dreamitbiz.com', category: 'liberal', features: ['Supabase','Auth'] },
  { id: 'study', name: 'Study', nameKo: '공부 잘하는 방법', description: '효과적인 학습 노하우를 배우는 종합 학습 플랫폼', url: 'https://study.dreamitbiz.com', category: 'liberal', features: ['Supabase','PortOne','Auth'] },
  { id: 'japanese', name: 'Japanese', nameKo: 'Japanese Pro', description: '비즈니스 및 일상 실용 일본어 회화·작문, JLPT 대비', url: 'https://japanese.dreamitbiz.com', category: 'liberal', features: ['Supabase','Auth'] },
  { id: 'english', name: 'English', nameKo: 'English Pro', description: '비즈니스 및 일상 실용 영어 회화·작문, TOEIC 대비', url: 'https://english.dreamitbiz.com', category: 'liberal', features: ['Supabase','Auth'] },
  { id: 'presentation', name: 'Presentation', nameKo: '프레젠테이션', description: '발표 기법, 슬라이드 디자인, 스토리텔링', url: 'https://presentation.dreamitbiz.com', category: 'liberal', features: ['Supabase','Auth'] },
  { id: 'koreatech', name: 'KoreaTech', nameKo: '한국기술교육대 컴퓨팅 사고', description: '파이썬 기초부터 문제해결, CT 학습, AI Tips', url: 'https://koreatech.dreamitbiz.com', category: 'liberal', features: ['Supabase','Auth'] },
  { id: 'safety', name: 'Safety', nameKo: '안전보건관리', description: '산업안전, 보건관리, 위험성평가, 안전교육', url: 'https://safety.dreamitbiz.com', category: 'liberal', features: ['Supabase','Auth'] },
  { id: 'esg', name: 'ESG', nameKo: 'ESG & CSR 가이드', description: 'ESG, CSR, 사회적 경제를 종합 학습하는 가이드', url: 'https://esg.dreamitbiz.com', category: 'liberal', features: ['Supabase','PortOne','Auth'] },
  { id: 'ai-literacy', name: 'AI Literacy', nameKo: 'AI 리터러시', description: 'AI 시대 필수 교양 — AI 기초, 활용, 윤리, 미래 학습', url: 'https://ai-literacy.dreamitbiz.com', category: 'liberal', features: ['Supabase','Auth'] },

  // 논문연구
  { id: 'survey', name: 'Survey', nameKo: '논문작성 가이드', description: '논문작성의 전 과정을 체계적으로 배우는 학습 플랫폼', url: 'https://survey.dreamitbiz.com', category: 'thesis', features: ['Supabase','PortOne','Auth'] },
  { id: 'papers', name: 'Papers', nameKo: '논문작성 학습 & 연구 협업', description: '대학원생을 위한 논문작성 학습 자료와 연구자 협업', url: 'https://papers.dreamitbiz.com', category: 'thesis', features: ['Supabase','PortOne','Auth'] },

  // 취업 / 진로 / 개인
  { id: 'career', name: 'Career', nameKo: '취업 가이드', description: '취업 준비, 이력서 작성, 면접 코칭, 취업 전략', url: 'https://career.dreamitbiz.com', category: 'career', features: ['Supabase','PortOne','Auth'] },
  { id: 'wonjunjang', name: 'Wonjunjang', nameKo: '원준장', description: '개인 포트폴리오 사이트', url: 'https://wonjunjang.dreamitbiz.com', category: 'career', features: [] },
  { id: 'aebon', name: 'Aebon', nameKo: '이애본', description: 'Ph.D 이애본 개인 포트폴리오·소개 사이트', url: 'https://aebon.dreamitbiz.com', category: 'career', features: [] },
  { id: 'hohai', name: 'Hohai', nameKo: '호하이', description: '개인 포트폴리오 사이트', url: 'https://hohai.dreamitbiz.com', category: 'career', features: [] },
  { id: 'jdy', name: 'JDY', nameKo: '정동엽', description: '정동엽 개인 포트폴리오·소개 사이트', url: 'https://jdy.dreamitbiz.com', category: 'career', features: ['Supabase','Auth'] },

  // 컴퓨터과학
  { id: 'aisw', name: 'AI·SW 개론', nameKo: 'AI·SW 개론', description: 'SW·DS·AIoT·AI·XR·HMI 분야 탐색, 한신대학교 교과목', url: 'https://aisw.dreamitbiz.com', category: 'cs', features: ['Supabase','Auth'] },
  { id: 'data-structure', name: 'Data Structure', nameKo: '자료구조 학습', description: '선형/비선형 자료구조, 해시, 정렬, 고급 자료구조', url: 'https://data-structure.dreamitbiz.com', category: 'cs', features: ['Supabase','Auth'] },
  { id: 'db-study', name: 'DB Study', nameKo: '데이터베이스 & SQL', description: 'DB 기초, SQL, 웹 연동, 튜닝, Oracle, 시험 대비', url: 'https://db-study.dreamitbiz.com', category: 'cs', features: ['Supabase','Auth'] },
  { id: 'algorithm', name: 'Algorithm', nameKo: '알고리즘 학습', description: '정렬, 탐색, 그래프, DP, 그리디, 코딩 테스트 대비', url: 'https://algorithm.dreamitbiz.com', category: 'cs', features: ['Supabase','Auth'] },
  { id: 'software', name: 'SW Design', nameKo: '소프트웨어 설계 & 구현', description: '설계 원칙, UML, 디자인 패턴, OOP, TDD, 실습', url: 'https://software.dreamitbiz.com', category: 'cs', features: ['Supabase','Auth'] },

  // 자격증
  { id: 'jobpath', name: 'JobPath', nameKo: '직업상담사 시험 준비', description: '직업상담사 1급·2급 필기·실기 CBT 학습 플랫폼', url: 'https://jobpath.dreamitbiz.com', category: 'cert', features: ['Supabase','Auth'] },
  { id: 'eip', name: 'EIP', nameKo: '정보처리기사', description: '정보처리기사 시험 대비 학습 플랫폼', url: 'https://eip.dreamitbiz.com', category: 'cert', features: ['Supabase','Auth'] },
  { id: 'linux-study', name: 'Linux Study', nameKo: '리눅스 마스터 자격증', description: '리눅스 마스터 2급/1급 시험 대비, 명령어 사전, 모의고사', url: 'https://linux-study.dreamitbiz.com', category: 'cert', features: ['Supabase','Auth'] },
  { id: 'sqld', name: 'SQLD', nameKo: 'SQLD 자격증', description: 'SQL 개발자 자격증 시험 대비 학습 플랫폼', url: 'https://sqld.dreamitbiz.com', category: 'cert', features: ['Supabase','Auth'] },
  { id: 'aws', name: 'AWS', nameKo: 'AWS 자격증', description: 'AWS 클라우드 자격증 시험 대비 학습 플랫폼', url: 'https://aws.dreamitbiz.com', category: 'cert', features: ['Supabase','Auth'] },
  { id: 'aice', name: 'AICE Associate', nameKo: 'AICE Associate 학습', description: 'AICE Associate 자격증 시험 대비 학습 플랫폼', url: 'https://aice.dreamitbiz.com', category: 'cert', features: ['Supabase','Auth'] },

  // 인공지능
  { id: 'ai-prompt', name: 'AI Prompt', nameKo: 'AI 프롬프트 학습', description: '효과적인 프롬프트 작성법, 프롬프트 엔지니어링 가이드', url: 'https://ai-prompt.dreamitbiz.com', category: 'ai', features: ['Supabase','Auth'] },
  { id: 'chatgpt', name: 'ChatGPT', nameKo: 'ChatGPT 활용', description: 'ChatGPT 사용법, GPTs, API 활용, 업무 자동화', url: 'https://chatgpt.dreamitbiz.com', category: 'ai', features: ['Supabase','Auth'] },
  { id: 'gemini', name: 'Gemini', nameKo: 'Gemini 활용', description: 'Google Gemini 사용법, Workspace 연동, 멀티모달 활용', url: 'https://gemini.dreamitbiz.com', category: 'ai', features: ['Supabase','Auth'] },
  { id: 'claude', name: 'Claude', nameKo: 'Claude 활용', description: 'Anthropic Claude 사용법, 프롬프트 기법, API 활용', url: 'https://claude.dreamitbiz.com', category: 'ai', features: ['Supabase','Auth'] },
  { id: 'genspark', name: 'GenSpark', nameKo: 'GenSpark 활용', description: 'GenSpark AI 에이전트 기반 검색·리서치 활용 가이드', url: 'https://genspark.dreamitbiz.com', category: 'ai', features: ['Supabase','Auth'] },
  { id: 'copilot', name: 'Copilot', nameKo: 'Microsoft Copilot', description: 'MS Copilot 사용법, Office 연동, 코딩 보조', url: 'https://copilot.dreamitbiz.com', category: 'ai', features: ['Supabase','Auth'] },
  { id: 'openclaw', name: 'OpenClaw', nameKo: 'OpenClaw 학습', description: 'OpenClaw AI 플랫폼 활용 가이드', url: 'https://openclaw.dreamitbiz.com', category: 'ai', features: ['Supabase','Auth'] },
  { id: 'fine-tuning', name: 'Fine-Tuning', nameKo: '파인튜닝 학습', description: 'LLM 파인튜닝 실습, LoRA, QLoRA, 데이터셋 구축', url: 'https://fine-tuning.dreamitbiz.com', category: 'ai', features: ['Supabase','Auth'] },
  { id: 'ai-data', name: 'AI Data', nameKo: 'AI 데이터 학습', description: 'AI 데이터 수집, 전처리, 라벨링, 데이터 품질 관리', url: 'https://ai-data.dreamitbiz.com', category: 'ai', features: ['Supabase','Auth'] },
  { id: 'ai-media', name: 'AI Media', nameKo: 'AI 미디어 학습', description: 'AI 기반 이미지/영상/음성 생성, 편집, 활용', url: 'https://ai-media.dreamitbiz.com', category: 'ai', features: ['Supabase','Auth'] },
  { id: 'ai-agents', name: 'AI Agents', nameKo: 'AI 에이전트 학습', description: 'AI 에이전트 설계, 개발, 배포, 오케스트레이션', url: 'https://ai-agents.dreamitbiz.com', category: 'ai', features: ['Supabase','Auth'] },
  { id: 'autowork', name: 'AutoWork', nameKo: '업무자동화 학습', description: 'AI 기반 업무자동화 도구 활용, 워크플로우 설계', url: 'https://autowork.dreamitbiz.com', category: 'ai', features: ['Supabase','Auth'] },
  { id: 'harness-study', name: 'Harness Master', nameKo: '하네스 마스터', description: 'Harness 에이전트 오케스트레이션 — 팀 설계부터 실전', url: 'https://harness-study.dreamitbiz.com', category: 'ai', features: ['Supabase','Auth'] },
  { id: 'solar', name: 'Solar AI', nameKo: 'Solar LLM 학습', description: '국산 LLM Solar 기반 AI 서비스 개발 실무 교육', url: 'https://solar.dreamitbiz.com', category: 'ai', features: ['Supabase','Auth'] },
  { id: 'ax', name: 'AX & DX', nameKo: 'AX & DX 학습', description: 'AI 전환(AX)과 디지털 전환(DX), 최신 트렌드 종합 학습', url: 'https://ax.dreamitbiz.com', category: 'ai', features: ['Supabase','Auth'] },
  { id: 'basic-ai', name: 'Basic AI', nameKo: '인공지능 기초 학습', description: 'AI 기초, 활용, 윤리, 트렌드, AX, 용어사전까지 학습', url: 'https://basic-ai.dreamitbiz.com', category: 'ai', features: ['Supabase','Auth'] },
  { id: 'notebooklm', name: 'NotebookLM', nameKo: 'NotebookLM 학습 센터', description: 'Google NotebookLM 교육 과정 — 기초부터 사업계획서 작성까지', url: 'https://notebooklm.dreamitbiz.com', category: 'ai', features: ['Supabase','Auth'] },
  { id: 'codex-study', name: 'Codex CLI Master', nameKo: '코덱스 CLI 마스터', description: 'OpenAI Codex CLI 완전 정복 — 설치부터 고급 프로젝트까지', url: 'https://codex.dreamitbiz.com', category: 'ai', features: ['Supabase','Auth'] },
  { id: 'startup', name: 'AI Startup Academy', nameKo: '생성형 AI 창업 교육', description: '생성형 AI를 활용한 비즈니스 기획 및 성장 전략 교육', url: 'https://startup.dreamitbiz.com', category: 'ai', features: ['Supabase','PortOne','Auth'] },
  { id: 'manus', name: 'Manus AI Master', nameKo: 'Manus AI 학습 플랫폼', description: 'Manus AI — 세계 최초 자율형 AI 에이전트 플랫폼 종합 학습', url: 'https://manus.dreamitbiz.com', category: 'ai', features: ['Supabase','Auth'] },

  // 코딩 / 프로그래밍
  { id: 'html', name: 'HTML', nameKo: 'HTML/CSS 학습', description: '웹 프론트엔드 기초, HTML5, CSS3, 반응형 웹', url: 'https://html.dreamitbiz.com', category: 'coding', features: ['Supabase','Auth'] },
  { id: 'webstudy', name: 'Web Study', nameKo: '웹 개발 학습', description: '웹 개발 종합 (HTML, CSS, JS, 프레임워크)', url: 'https://webstudy.dreamitbiz.com', category: 'coding', features: ['Supabase','Auth'] },
  { id: 'reactstudy', name: 'React Study', nameKo: 'React 학습', description: 'React 기초부터 Hooks, 상태관리, 프로젝트 실습', url: 'https://reactstudy.dreamitbiz.com', category: 'coding', features: ['Supabase','Auth'] },
  { id: 'c-study', name: 'C Study', nameKo: 'C언어 학습', description: 'C언어 기초 문법, 포인터, 구조체, 파일 처리', url: 'https://c-study.dreamitbiz.com', category: 'coding', features: ['Supabase','Auth'] },
  { id: 'java-study', name: 'Java Study', nameKo: 'Java 학습', description: 'Java 기초, OOP, 컬렉션, 스레드, 프로젝트 실습', url: 'https://java-study.dreamitbiz.com', category: 'coding', features: ['Supabase','Auth'] },
  { id: 'python-study', name: 'Python Study', nameKo: 'Python 학습', description: 'Python 기초, 데이터 분석, 자동화, 웹 스크래핑', url: 'https://python-study.dreamitbiz.com', category: 'coding', features: ['Supabase','Auth'] },
  { id: 'coding', name: 'Coding', nameKo: '코딩 학습', description: 'C, Java, Python 코딩 문제 풀기, 플레이그라운드', url: 'https://coding.dreamitbiz.com', category: 'coding', features: ['Supabase','Auth'] },
  { id: 'web', name: 'Web Development', nameKo: '웹 개발 학습', description: '웹 개발 기초부터 실전까지 종합 학습 플랫폼', url: 'https://web.dreamitbiz.com', category: 'coding', features: ['Supabase','Auth'] },

  // 교수 / 강사
  { id: 'teaching', name: 'Teaching AI', nameKo: '교수학습 AI 도구', description: '대학교수·강사·교사를 위한 AI 기반 교수학습 도구', url: 'https://teaching.dreamitbiz.com', category: 'teaching', features: ['Supabase','Auth'] },
  { id: 'instructor', name: 'Instructor', nameKo: '강사 역량 개발', description: '강의 스킬, 커리큘럼 개발, 강사 포트폴리오', url: 'https://instructor.dreamitbiz.com', category: 'teaching', features: ['Supabase','Auth'] },
  { id: 'university', name: 'University AI', nameKo: '생성형 AI 실무 자동화', description: '전남대학교 직원·조교 대상 AI 실무 자동화 교육', url: 'https://university.dreamitbiz.com', category: 'teaching', features: ['Supabase','Auth'] },
  { id: 'seoultech', name: 'SeoulTech AI Lecture', nameKo: '서울과학기술대학교 생성형AI 강의', description: '서울과학기술대학교 전체 교수 대상 생성형 AI 활용 강의', url: 'https://seoultech.dreamitbiz.com', category: 'teaching', features: ['Supabase','Auth'] },

  // 외부 회사
  { id: 'koreait', name: 'KoreaIT', nameKo: '코리아IT아카데미', description: '직업능력개발훈련 대시보드 (기관경영, 훈련과정, 인프라)', url: 'https://koreait.dreamitbiz.com', category: 'external', features: ['Supabase','Auth'] },
  { id: 'pbi', name: 'PBI', nameKo: 'PBI 로봇 교육센터', description: '키즈~성인~기업 맞춤 로봇 교육, 과정 안내·강사·FAQ', url: 'https://pbi.dreamitbiz.com', category: 'external', features: ['Supabase','Auth'] },
  { id: 'pbirobot', name: 'PBI Robot', nameKo: 'PBI Robot 제품', description: 'AI 기반 로봇 수영장 청소기 AquaSense 시리즈', url: 'https://pbirobot.dreamitbiz.com', category: 'external', features: ['Supabase','Auth'] },
  { id: 'allthat', name: 'AllThat Study', nameKo: 'AllThat Study', description: 'ESG(환경·사회·거버넌스) 종합 학습 플랫폼', url: 'https://allthat.dreamitbiz.com', category: 'external', features: ['Supabase','PortOne','Auth'] },
  { id: 'knc', name: 'KNC Dashboard', nameKo: '산업안전 성과 대시보드', description: '50개 기업 통합 사회비용 절감액 관리 대시보드', url: 'https://knc.dreamitbiz.com', category: 'external', features: ['Supabase','Auth'] },
  { id: 'komipo', name: 'KOMIPO AI Academy', nameKo: '한국중부발전 AI 아카데미', description: '한국중부발전 전 직원 대상 AI 리터러시 교육', url: 'https://komipo.dreamitbiz.com', category: 'external', features: ['Supabase','Auth'] },
  { id: 'dasco', name: 'DASCO AI Academy', nameKo: '다스코 생성형AI 교육', description: '다스코(주) 직원을 위한 생성형 AI 업무 활용 교육', url: 'https://dasco.dreamitbiz.com', category: 'external', features: ['Supabase','Auth'] },
  { id: 'kdn', name: 'KDN Vibe Coding', nameKo: '한전KDN 바이브코딩', description: 'KDN 직원 대상 바이브코딩을 활용한 풀스택 웹 개발 교육 (3일, 21시간)', url: 'https://kdn.dreamitbiz.com', category: 'external', features: ['Supabase','Auth'] },
  { id: 'cnu', name: 'CNU AI Education', nameKo: '전남대학교 생성형 AI 교육', description: '전남대학교 대상 생성형 AI 활용 교육 학습 플랫폼', url: 'https://cnu.dreamitbiz.com', category: 'external', features: ['Supabase','Auth'] },
  { id: 'joongang', name: 'JoongAng Washington', nameKo: '중앙일보 워싱턴', description: '중앙일보 워싱턴 교육 프로그램 학습 플랫폼', url: 'https://joongang.dreamitbiz.com', category: 'external', features: ['Supabase','Auth'] },

  // 기타
  { id: 'hwp', name: 'HWP Web', nameKo: '한글 문서 변환기', description: 'HWP/HWPX 문서를 웹에서 변환·편집·관리하는 도구', url: 'https://hwp.dreamitbiz.com', category: 'etc', features: ['Supabase','Auth'] },
  { id: 'jobexam', name: 'JobExam', nameKo: '직업상담사 시험 준비', description: '직업상담사 1급·2급 필기·실기 CBT 학습 플랫폼', url: 'https://jobexam.dreamitbiz.com', category: 'etc', features: ['Supabase','PortOne','Auth'] },
  { id: 'vibe', name: 'Vibe Coding Master', nameKo: '바이브코딩 마스터', description: 'AI 코딩 커리큘럼 + 실전 프로젝트 9개 + 28일 부트캠프', url: 'https://vibe-coding.dreamitbiz.com', category: 'etc', features: ['Supabase','Auth'] },
  { id: 'full-stack', name: 'Full-Stack', nameKo: '풀스택 학습', description: '프론트엔드~백엔드~DevOps 풀스택 개발 학습', url: 'https://full-stack.dreamitbiz.com', category: 'etc', features: ['Supabase','Auth'] },
  { id: 'korean', name: 'Korean Pro', nameKo: '한국어 학습', description: '베트남·인도·일본·영어권 학생을 위한 한국어 학습, TOPIK', url: 'https://korean.dreamitbiz.com', category: 'etc', features: ['Supabase','Auth'] },
  { id: 'ppt', name: 'GenPPT', nameKo: 'AI 프레젠테이션 생성기', description: 'AI 기반 프레젠테이션 자동 생성 — OpenAI/Claude 활용 슬라이드 제작', url: 'https://ppt.dreamitbiz.com', category: 'etc', features: ['Supabase','Auth'] },
]

/**
 * 회사 정보 (templete_2 표준)
 */
export const COMPANY = {
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
} as const
