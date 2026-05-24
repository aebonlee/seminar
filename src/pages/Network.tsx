import { useMemo, useState } from 'react'
import { SubPage } from '../components/layout/SubPage'
import { COMPANY, familySites, siteCategories } from '../data/familySites'

export function Network() {
  const [cat, setCat] = useState<string>('all')
  const [q, setQ] = useState('')

  const filtered = useMemo(() => {
    const kw = q.trim().toLowerCase()
    return familySites.filter((s) => {
      const okCat = cat === 'all' || s.category === cat
      const okKw =
        !kw ||
        s.nameKo.toLowerCase().includes(kw) ||
        s.name.toLowerCase().includes(kw) ||
        s.description.toLowerCase().includes(kw)
      return okCat && okKw
    })
  }, [cat, q])

  const total = familySites.length
  const byCat = useMemo(() => {
    const m: Record<string, number> = {}
    familySites.forEach((s) => (m[s.category] = (m[s.category] ?? 0) + 1))
    return m
  }, [])

  return (
    <SubPage
      title="DreamIT 사이트 네트워크"
      description={`${total}개 교육·서비스 플랫폼을 한눈에. 카테고리별 분류 + 검색으로 빠르게 찾아보세요.`}
      breadcrumb={[{ label: '소개', to: '/about' }, { label: 'Network' }]}
    >
      {/* 검색바 + 카테고리 */}
      <div
        style={{
          background: '#fff',
          padding: 22,
          boxShadow: '0 8px 24px rgba(5,10,24,0.16)',
          marginBottom: 18,
        }}
      >
        <input
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="사이트 이름 또는 설명으로 검색..."
          style={{
            width: '100%',
            padding: '12px 16px',
            border: '1px solid #cbd5e1',
            borderRadius: 8,
            fontSize: 15,
            outline: 'none',
            color: '#0f172a',
            background: '#fff',
          }}
        />

        <div style={{ marginTop: 16, display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          <Pill active={cat === 'all'} onClick={() => setCat('all')}>
            전체 <span style={{ marginLeft: 4, opacity: 0.7 }}>{total}</span>
          </Pill>
          {siteCategories.map((c) => (
            <Pill key={c.id} active={cat === c.id} onClick={() => setCat(c.id)}>
              <span style={{ marginRight: 4 }}>{c.icon}</span>
              {c.nameKo}
              <span style={{ marginLeft: 4, opacity: 0.7 }}>{byCat[c.id] ?? 0}</span>
            </Pill>
          ))}
        </div>
      </div>

      {/* 결과 */}
      {filtered.length === 0 ? (
        <div
          style={{
            background: '#fff',
            padding: 64,
            textAlign: 'center',
            color: '#64748b',
            boxShadow: '0 8px 24px rgba(5,10,24,0.16)',
          }}
        >
          검색 결과가 없습니다.
        </div>
      ) : (
        renderByCategory(filtered)
      )}

      {/* 본사 사이트 안내 */}
      <div
        style={{
          marginTop: 32,
          padding: 28,
          background:
            'linear-gradient(135deg, var(--accent-700) 0%, var(--accent-500) 100%)',
          color: '#fff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 16,
          boxShadow: '0 12px 32px rgba(5,10,24,0.22)',
        }}
      >
        <div>
          <div style={{ fontSize: 12, letterSpacing: '0.16em', color: '#fcd34d', fontWeight: 800 }}>HEADQUARTER</div>
          <h3 style={{ margin: '6px 0 0', fontSize: '1.4rem', fontWeight: 800 }}>
            {COMPANY.parentSite.name} — DreamIT 전체 사이트의 본 허브
          </h3>
        </div>
        <a
          href={COMPANY.parentSite.url}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            padding: '12px 20px',
            background: '#fff',
            color: 'var(--accent-700)',
            textDecoration: 'none',
            fontWeight: 800,
          }}
        >
          본사이트 방문
          <svg width="11" height="11" viewBox="0 0 16 16" fill="none" aria-hidden>
            <path d="M3 8h10M8 3l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </a>
      </div>
    </SubPage>
  )
}

function renderByCategory(sites: ReturnType<typeof familySites.filter>) {
  const byCat: Record<string, typeof sites> = {}
  sites.forEach((s) => {
    ;(byCat[s.category] ??= []).push(s)
  })
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
      {siteCategories.map((cat) => {
        const list = byCat[cat.id]
        if (!list || list.length === 0) return null
        return (
          <section key={cat.id}>
            <div
              style={{
                display: 'flex',
                alignItems: 'baseline',
                gap: 10,
                marginBottom: 12,
                color: '#fff',
                textShadow: '0 1px 8px rgba(0,0,0,0.3)',
              }}
            >
              <span style={{ fontSize: 20 }} aria-hidden>{cat.icon}</span>
              <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 800, color: '#fff' }}>
                {cat.nameKo}
              </h3>
              <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: 13, fontWeight: 700 }}>
                · {list.length}
              </span>
            </div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
                gap: 12,
              }}
            >
              {list.map((s) => (
                <SiteCard key={s.id} site={s} />
              ))}
            </div>
          </section>
        )
      })}
    </div>
  )
}

function SiteCard({ site }: { site: (typeof familySites)[number] }) {
  return (
    <a
      href={site.url}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: 'flex',
        flexDirection: 'column',
        padding: 18,
        background: '#fff',
        color: '#0f172a',
        textDecoration: 'none',
        border: '1px solid rgba(15,23,42,0.06)',
        boxShadow: '0 6px 16px rgba(5,10,24,0.14)',
        transition: 'transform 0.15s var(--ease), box-shadow 0.15s var(--ease), border-color 0.15s var(--ease)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-2px)'
        e.currentTarget.style.borderColor = 'var(--accent-500)'
        e.currentTarget.style.boxShadow = '0 10px 24px rgba(5,10,24,0.2)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)'
        e.currentTarget.style.borderColor = 'rgba(15,23,42,0.06)'
        e.currentTarget.style.boxShadow = '0 6px 16px rgba(5,10,24,0.14)'
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <div style={{ fontSize: 11, color: 'var(--accent-700)', fontWeight: 800, letterSpacing: '0.06em' }}>
          {site.name}
        </div>
        <svg width="10" height="10" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" style={{ color: '#94a3b8' }} aria-hidden>
          <path d="M3 13L13 3M6 3h7v7" />
        </svg>
      </div>
      <h4 style={{ margin: '6px 0 0', fontSize: '0.98rem', fontWeight: 800, lineHeight: 1.35 }}>{site.nameKo}</h4>
      <p style={{ marginTop: 8, marginBottom: 0, color: '#475569', fontSize: 12, lineHeight: 1.55, flex: 1 }}>
        {site.description}
      </p>
      {site.features.length > 0 && (
        <div style={{ marginTop: 10, display: 'flex', gap: 4, flexWrap: 'wrap' }}>
          {site.features.map((f) => (
            <span
              key={f}
              style={{
                fontSize: 10,
                padding: '2px 6px',
                background: '#f1f5f9',
                color: '#475569',
                fontWeight: 700,
              }}
            >
              {f}
            </span>
          ))}
        </div>
      )}
    </a>
  )
}

function Pill({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: '7px 14px',
        fontSize: 13,
        fontWeight: 700,
        background: active ? 'var(--accent-600)' : '#f1f5f9',
        color: active ? '#fff' : '#475569',
        border: `1px solid ${active ? 'var(--accent-600)' : '#e2e8f0'}`,
        borderRadius: 999,
        cursor: 'pointer',
        transition: 'all 0.15s var(--ease)',
      }}
    >
      {children}
    </button>
  )
}
