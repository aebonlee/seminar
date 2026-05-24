import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'

export type ThemeMode = 'light' | 'dark' | 'auto'
export type ColorScheme = 'blue' | 'emerald' | 'violet' | 'rose' | 'amber'

interface ThemeApi {
  mode: ThemeMode
  scheme: ColorScheme
  resolvedMode: 'light' | 'dark'
  setMode: (m: ThemeMode) => void
  setScheme: (s: ColorScheme) => void
  toggleMode: () => void
}

const Ctx = createContext<ThemeApi | null>(null)
const LS_MODE = 'seminar:theme-mode'
const LS_SCHEME = 'seminar:theme-scheme'

export const SCHEMES: { id: ColorScheme; label: string; swatch: string }[] = [
  { id: 'blue', label: 'Deep Blue', swatch: '#2563eb' },
  { id: 'emerald', label: 'Emerald', swatch: '#10b981' },
  { id: 'violet', label: 'Royal Violet', swatch: '#7c3aed' },
  { id: 'rose', label: 'Rose', swatch: '#e11d48' },
  { id: 'amber', label: 'Amber', swatch: '#d97706' },
]

function readMode(): ThemeMode {
  if (typeof window === 'undefined') return 'dark'
  const v = localStorage.getItem(LS_MODE) as ThemeMode | null
  return v === 'light' || v === 'dark' || v === 'auto' ? v : 'dark'
}
function readScheme(): ColorScheme {
  if (typeof window === 'undefined') return 'blue'
  const v = localStorage.getItem(LS_SCHEME) as ColorScheme | null
  return SCHEMES.some((s) => s.id === v) ? (v as ColorScheme) : 'blue'
}

function resolve(mode: ThemeMode): 'light' | 'dark' {
  if (mode === 'auto') {
    if (typeof window === 'undefined') return 'dark'
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  }
  return mode
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setModeState] = useState<ThemeMode>(readMode)
  const [scheme, setSchemeState] = useState<ColorScheme>(readScheme)
  const [resolvedMode, setResolvedMode] = useState<'light' | 'dark'>(() => resolve(readMode()))

  // Apply to <html>
  useEffect(() => {
    const root = document.documentElement
    root.setAttribute('data-theme', mode)
    root.setAttribute('data-scheme', scheme)
    root.style.colorScheme = resolvedMode
  }, [mode, scheme, resolvedMode])

  // Listen to OS preference when auto
  useEffect(() => {
    if (mode !== 'auto' || typeof window === 'undefined') {
      setResolvedMode(resolve(mode))
      return
    }
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const apply = () => setResolvedMode(mq.matches ? 'dark' : 'light')
    apply()
    mq.addEventListener('change', apply)
    return () => mq.removeEventListener('change', apply)
  }, [mode])

  const setMode = useCallback((m: ThemeMode) => {
    setModeState(m)
    localStorage.setItem(LS_MODE, m)
    setResolvedMode(resolve(m))
  }, [])

  const setScheme = useCallback((s: ColorScheme) => {
    setSchemeState(s)
    localStorage.setItem(LS_SCHEME, s)
  }, [])

  const toggleMode = useCallback(() => {
    setMode(resolvedMode === 'dark' ? 'light' : 'dark')
  }, [resolvedMode, setMode])

  const value = useMemo<ThemeApi>(
    () => ({ mode, scheme, resolvedMode, setMode, setScheme, toggleMode }),
    [mode, scheme, resolvedMode, setMode, setScheme, toggleMode],
  )

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export function useTheme() {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('useTheme must be used inside ThemeProvider')
  return ctx
}
