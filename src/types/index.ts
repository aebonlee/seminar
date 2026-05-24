export type CourseStatus = 'draft' | 'pending' | 'approved' | 'rejected' | 'archived'
export type ApplicationStatus = 'pending' | 'approved' | 'rejected'
export type UserRole = 'user' | 'admin'

export interface Course {
  id: string
  title: string
  subtitle: string | null
  description: string
  category: string
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
  created_at: string
  approved_at: string | null
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
