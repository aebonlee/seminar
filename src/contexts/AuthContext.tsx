import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react'
import { isSupabaseConfigured, supabase } from '../lib/supabase'
import type { Profile, UserRole } from '../types'

interface AuthApi {
  loading: boolean
  user: Profile | null
  signIn: (email: string, password: string) => Promise<void>
  signUp: (email: string, password: string, name: string) => Promise<void>
  signOut: () => Promise<void>
  isAdmin: boolean
  mockLoginAs: (role: UserRole) => void
  backendReady: boolean
}

const Ctx = createContext<AuthApi | null>(null)
const LS_USER = 'seminar:mock-user'
const ADMIN_EMAILS = (
  (import.meta.env.VITE_ADMIN_EMAILS as string | undefined) ?? 'admin@dreamitbiz.com'
)
  .split(',')
  .map((s) => s.trim().toLowerCase())
  .filter(Boolean)

function loadMockUser(): Profile | null {
  try {
    const raw = localStorage.getItem(LS_USER)
    return raw ? (JSON.parse(raw) as Profile) : null
  } catch {
    return null
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true
    const sb = supabase
    if (!sb) {
      setUser(loadMockUser())
      setLoading(false)
      return
    }

    sb.auth.getSession().then(async ({ data }) => {
      if (!mounted) return
      const sUser = data.session?.user
      if (sUser) {
        const { data: profile } = await sb
          .from('profiles')
          .select('*')
          .eq('id', sUser.id)
          .maybeSingle()
        setUser(
          (profile as Profile | null) ?? {
            id: sUser.id,
            email: sUser.email ?? '',
            full_name: (sUser.user_metadata?.full_name as string) ?? null,
            role: ADMIN_EMAILS.includes((sUser.email ?? '').toLowerCase()) ? 'admin' : 'user',
            created_at: new Date().toISOString(),
          },
        )
      }
      setLoading(false)
    })

    const { data: sub } = sb.auth.onAuthStateChange(async (_evt, session) => {
      const sUser = session?.user
      if (!sUser) {
        setUser(null)
        return
      }
      const { data: profile } = await sb
        .from('profiles')
        .select('*')
        .eq('id', sUser.id)
        .maybeSingle()
      setUser(
        (profile as Profile | null) ?? {
          id: sUser.id,
          email: sUser.email ?? '',
          full_name: (sUser.user_metadata?.full_name as string) ?? null,
          role: ADMIN_EMAILS.includes((sUser.email ?? '').toLowerCase()) ? 'admin' : 'user',
          created_at: new Date().toISOString(),
        },
      )
    })

    return () => {
      mounted = false
      sub.subscription.unsubscribe()
    }
  }, [])

  const signIn = useCallback(async (email: string, password: string) => {
    if (!supabase) {
      const role: UserRole = ADMIN_EMAILS.includes(email.toLowerCase()) ? 'admin' : 'user'
      const u: Profile = {
        id: `mock-${email}`,
        email,
        full_name: email.split('@')[0],
        role,
        created_at: new Date().toISOString(),
      }
      localStorage.setItem(LS_USER, JSON.stringify(u))
      setUser(u)
      return
    }
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) throw error
  }, [])

  const signUp = useCallback(async (email: string, password: string, name: string) => {
    if (!supabase) {
      const u: Profile = {
        id: `mock-${email}`,
        email,
        full_name: name,
        role: ADMIN_EMAILS.includes(email.toLowerCase()) ? 'admin' : 'user',
        created_at: new Date().toISOString(),
      }
      localStorage.setItem(LS_USER, JSON.stringify(u))
      setUser(u)
      return
    }
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: name } },
    })
    if (error) throw error
    if (data.user) {
      await supabase.from('profiles').upsert({
        id: data.user.id,
        email,
        full_name: name,
        role: ADMIN_EMAILS.includes(email.toLowerCase()) ? 'admin' : 'user',
      })
    }
  }, [])

  const signOut = useCallback(async () => {
    if (!supabase) {
      localStorage.removeItem(LS_USER)
      setUser(null)
      return
    }
    await supabase.auth.signOut()
    setUser(null)
  }, [])

  const mockLoginAs = useCallback((role: UserRole) => {
    const email = role === 'admin' ? 'admin@dreamitbiz.com' : 'demo@dreamitbiz.com'
    const u: Profile = {
      id: `mock-${role}`,
      email,
      full_name: role === 'admin' ? '관리자' : '데모 사용자',
      role,
      created_at: new Date().toISOString(),
    }
    localStorage.setItem(LS_USER, JSON.stringify(u))
    setUser(u)
  }, [])

  const value: AuthApi = {
    loading,
    user,
    signIn,
    signUp,
    signOut,
    isAdmin: user?.role === 'admin',
    mockLoginAs,
    backendReady: isSupabaseConfigured,
  }

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export function useAuth() {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider')
  return ctx
}
