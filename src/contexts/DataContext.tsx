import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react'
import { supabase } from '../lib/supabase'
import { mockCourses } from '../data/mockCourses'
import type { Application, ApplicationStatus, Course, CourseStatus } from '../types'
import { useAuth } from './AuthContext'

interface DataApi {
  courses: Course[]
  applications: Application[]
  loading: boolean
  refresh: () => Promise<void>
  applyToCourse: (
    course: Course,
    payload: { name: string; email: string; phone: string; organization?: string; motivation: string },
  ) => Promise<void>
  updateApplicationStatus: (id: string, status: ApplicationStatus, note?: string) => Promise<void>
  setCourseStatus: (id: string, status: CourseStatus) => Promise<void>
  createCourse: (input: Omit<Course, 'id' | 'created_at' | 'approved_at' | 'status'>) => Promise<void>
}

const Ctx = createContext<DataApi | null>(null)

// 스키마 변경(learning_sites, format, venue 추가) 시 옛 캐시 무효화를 위해 버전 bump
const LS_COURSES = 'seminar:mock-courses:v2'
const LS_APPS = 'seminar:mock-applications:v2'

/** 옛 캐시 데이터를 새 스키마로 정규화 — 누락 필드 기본값 채움 */
function normalizeCourse(c: Partial<Course>): Course {
  return {
    ...c,
    learning_sites: Array.isArray(c.learning_sites) ? c.learning_sites : [],
    highlights: Array.isArray(c.highlights) ? c.highlights : [],
    curriculum: Array.isArray(c.curriculum) ? c.curriculum : [],
    format: c.format ?? 'online',
    venue: c.venue ?? null,
  } as Course
}

function loadLS<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key)
    return raw ? (JSON.parse(raw) as T) : fallback
  } catch {
    return fallback
  }
}
function saveLS<T>(key: string, value: T) {
  localStorage.setItem(key, JSON.stringify(value))
}

export function DataProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth()
  const [courses, setCourses] = useState<Course[]>([])
  const [applications, setApplications] = useState<Application[]>([])
  const [loading, setLoading] = useState(true)

  const refresh = useCallback(async () => {
    setLoading(true)
    if (!supabase) {
      const raw = loadLS<Partial<Course>[] | null>(LS_COURSES, null)
      const c = (raw ?? mockCourses).map(normalizeCourse)
      const a = loadLS<Application[]>(LS_APPS, [])
      if (!raw) saveLS(LS_COURSES, mockCourses)
      setCourses(c)
      setApplications(a)
      setLoading(false)
      return
    }
    const [{ data: cs }, { data: apps }] = await Promise.all([
      supabase.from('seminar_courses').select('*').order('created_at', { ascending: false }),
      supabase
        .from('seminar_applications')
        .select('*, course:seminar_courses(*)')
        .order('created_at', { ascending: false }),
    ])
    setCourses(((cs as Partial<Course>[] | null) ?? []).map(normalizeCourse))
    setApplications(
      ((apps as (Application & { course?: Partial<Course> })[] | null) ?? []).map((a) => ({
        ...a,
        course: a.course ? normalizeCourse(a.course) : undefined,
      })),
    )
    setLoading(false)
  }, [])

  useEffect(() => {
    refresh()
  }, [refresh, user?.id])

  const applyToCourse: DataApi['applyToCourse'] = useCallback(
    async (course, payload) => {
      if (!supabase) {
        const next: Application = {
          id: `a-${Date.now()}`,
          course_id: course.id,
          user_id: user?.id ?? 'guest',
          name: payload.name,
          email: payload.email,
          phone: payload.phone,
          organization: payload.organization ?? null,
          motivation: payload.motivation,
          status: 'pending',
          admin_note: null,
          created_at: new Date().toISOString(),
          reviewed_at: null,
          course,
        }
        const updated = [next, ...applications]
        setApplications(updated)
        saveLS(LS_APPS, updated)
        return
      }
      const { error } = await supabase.from('seminar_applications').insert({
        course_id: course.id,
        user_id: user?.id ?? null,
        name: payload.name,
        email: payload.email,
        phone: payload.phone,
        organization: payload.organization ?? null,
        motivation: payload.motivation,
        status: 'pending',
      })
      if (error) throw error
      await refresh()
    },
    [applications, refresh, user?.id],
  )

  const updateApplicationStatus: DataApi['updateApplicationStatus'] = useCallback(
    async (id, status, note) => {
      if (!supabase) {
        const updated = applications.map((a) =>
          a.id === id
            ? {
                ...a,
                status,
                admin_note: note ?? a.admin_note,
                reviewed_at: new Date().toISOString(),
              }
            : a,
        )
        setApplications(updated)
        saveLS(LS_APPS, updated)
        return
      }
      const { error } = await supabase
        .from('seminar_applications')
        .update({
          status,
          admin_note: note ?? null,
          reviewed_at: new Date().toISOString(),
        })
        .eq('id', id)
      if (error) throw error
      await refresh()
    },
    [applications, refresh],
  )

  const setCourseStatus: DataApi['setCourseStatus'] = useCallback(
    async (id, status) => {
      if (!supabase) {
        const updated = courses.map((c) =>
          c.id === id
            ? {
                ...c,
                status,
                approved_at: status === 'approved' ? new Date().toISOString() : c.approved_at,
              }
            : c,
        )
        setCourses(updated)
        saveLS(LS_COURSES, updated)
        return
      }
      const { error } = await supabase
        .from('seminar_courses')
        .update({
          status,
          approved_at: status === 'approved' ? new Date().toISOString() : null,
        })
        .eq('id', id)
      if (error) throw error
      await refresh()
    },
    [courses, refresh],
  )

  const createCourse: DataApi['createCourse'] = useCallback(
    async (input) => {
      if (!supabase) {
        const next: Course = {
          ...input,
          id: `c-${Date.now()}`,
          status: 'pending',
          created_at: new Date().toISOString(),
          approved_at: null,
        }
        const updated = [next, ...courses]
        setCourses(updated)
        saveLS(LS_COURSES, updated)
        return
      }
      const { error } = await supabase.from('seminar_courses').insert({ ...input, status: 'pending' })
      if (error) throw error
      await refresh()
    },
    [courses, refresh],
  )

  const value: DataApi = {
    courses,
    applications,
    loading,
    refresh,
    applyToCourse,
    updateApplicationStatus,
    setCourseStatus,
    createCourse,
  }

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export function useData() {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('useData must be used inside DataProvider')
  return ctx
}
