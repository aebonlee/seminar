export type CourseStatus = 'draft' | 'pending' | 'approved' | 'rejected' | 'archived'
export type ApplicationStatus = 'pending' | 'approved' | 'rejected'
export type UserRole = 'user' | 'admin'

/**
 * 학습 사이트 — 강의 신청 승인 시에만 사용자에게 URL이 공개됩니다.
 * (familySites.ts 의 SiteInfo 와 호환되며, 강의별 큐레이션을 통해 매핑)
 */
export interface LearningSite {
  /** familySites.ts 의 site id */
  id: string
  /** 사용자에게 노출할 한글 이름 */
  name: string
  /** 신청 승인된 사용자에게만 공개되는 URL */
  url: string
  /** 짧은 설명 (선택) */
  description?: string
}

/** 강좌 진행 형태 — 일반 온라인 / 오프라인 / 혼합 */
export type CourseFormat = 'online' | 'offline' | 'hybrid'

export interface Course {
  id: string
  title: string
  subtitle: string | null
  description: string
  category: string
  /** 강좌 진행 형태 */
  format: CourseFormat
  /** 오프라인/혼합 강의의 진행 장소 (옵션) */
  venue: string | null
  instructor: string
  instructor_bio: string | null
  cover_url: string | null
  duration_weeks: number
  sessions: number
  level: 'beginner' | 'intermediate' | 'advanced'
  price: number
  capacity: number
  start_date: string | null
  end_date: string | null
  status: CourseStatus
  highlights: string[]
  curriculum: { week: number; title: string; topics: string[] }[]
  /** 이 강의를 신청해 승인받으면 접근 가능한 학습 사이트들 (관리자 큐레이션) */
  learning_sites: LearningSite[]
  created_at: string
  approved_at: string | null
}

export const FORMAT_LABEL: Record<CourseFormat, string> = {
  online: '온라인',
  offline: '오프라인',
  hybrid: '혼합',
}

export interface Application {
  id: string
  course_id: string
  user_id: string
  name: string
  email: string
  phone: string
  organization: string | null
  motivation: string
  status: ApplicationStatus
  admin_note: string | null
  created_at: string
  reviewed_at: string | null
  course?: Course
}

export interface Profile {
  id: string
  email: string
  full_name: string | null
  role: UserRole
  created_at: string
}
