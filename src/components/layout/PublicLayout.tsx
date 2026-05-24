import { Outlet, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { Header } from './Header'
import { Footer } from './Footer'
import { LeftRail } from './LeftRail'

export function PublicLayout() {
  const { pathname } = useLocation()
  const isHome = pathname === '/'

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }, [pathname])

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      <LeftRail />
      <main style={{ paddingTop: isHome ? 0 : 64, flex: 1 }}>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
