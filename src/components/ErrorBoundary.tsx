import { Component, type ErrorInfo, type ReactNode } from 'react'

interface Props {
  children: ReactNode
}

interface State {
  error: Error | null
}

/**
 * 최상위 ErrorBoundary — 렌더링 에러 시 전체 트리가 unmount되어 빈 페이지가 되는 것을 방지.
 * 에러 발생 시 안내 + localStorage 초기화 옵션을 제공.
 */
export class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null }

  static getDerivedStateFromError(error: Error): State {
    return { error }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('[ErrorBoundary]', error, info)
  }

  private reset = () => {
    try {
      Object.keys(localStorage)
        .filter((k) => k.startsWith('seminar:'))
        .forEach((k) => localStorage.removeItem(k))
    } catch {
      /* ignore */
    }
    window.location.href = '/'
  }

  render() {
    if (!this.state.error) return this.props.children

    return (
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 24,
          background: '#0b1220',
          color: '#f1f5f9',
          fontFamily: "'Nanum Gothic','Apple SD Gothic Neo',sans-serif",
        }}
      >
        <div style={{ maxWidth: 520, textAlign: 'center' }}>
          <div style={{ fontSize: 48, marginBottom: 14 }}>⚠️</div>
          <h1 style={{ fontSize: 22, fontWeight: 800, margin: '0 0 10px' }}>
            페이지를 표시하는 중 오류가 발생했습니다
          </h1>
          <p style={{ color: '#94a3b8', marginBottom: 18, fontSize: 14, lineHeight: 1.7 }}>
            이전 버전의 캐시 때문일 수 있습니다. 아래 버튼을 누르면 로컬 데이터를
            초기화하고 새로 로드합니다.
          </p>
          <pre
            style={{
              textAlign: 'left',
              background: '#131f33',
              padding: 12,
              borderRadius: 8,
              border: '1px solid #1f2c44',
              fontSize: 12,
              color: '#cbd5e1',
              overflow: 'auto',
              maxHeight: 160,
              marginBottom: 18,
            }}
          >
            {this.state.error.message}
          </pre>
          <button
            onClick={this.reset}
            style={{
              padding: '12px 24px',
              background: '#2563eb',
              color: '#fff',
              border: 0,
              borderRadius: 8,
              fontSize: 14,
              fontWeight: 800,
              cursor: 'pointer',
            }}
          >
            캐시 초기화 후 다시 시도
          </button>
        </div>
      </div>
    )
  }
}
