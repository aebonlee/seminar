#!/usr/bin/env node
/**
 * OG 이미지 생성 스크립트 (sharp 기반)
 *
 * 사용법:
 *   npm install -D sharp
 *   node scripts/generate-og-image.mjs
 *   또는 npm run og-image
 *
 * 출력: public/og-image.png (1200×630)
 *
 * 사이트마다 CONFIG 객체만 수정해서 재실행하면 됩니다.
 */

import sharp from 'sharp'
import { writeFileSync, mkdirSync, existsSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))

// ============================================================
// CONFIG — [수정] 사이트별 값
// ============================================================
const CONFIG = {
  width: 1200,
  height: 630,

  // 텍스트
  brand: 'DREAMIT · SEMINAR',
  title: '엄선된 강의로,\n다음 챕터를 준비하세요',
  subtitle: '관리자 큐레이션을 거친 프리미엄 세미나 플랫폼',
  url: 'seminar.dreamitbiz.com',

  // 컬러 (다크 블루 베이스)
  bg: '#0b1220',
  bgAccent: '#1e3a8a',
  accent: '#3b82f6',
  textPrimary: '#f8fafc',
  textSecondary: '#cbd5e1',
  textBrand: '#60a5fa',

  // 출력
  outputPath: resolve(__dirname, '..', 'public', 'og-image.png'),
}

// ============================================================
function buildSvg(c) {
  // 안전한 SVG 이스케이프
  const esc = (s) =>
    String(s)
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')

  const titleLines = c.title.split('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${c.width}" height="${c.height}" viewBox="0 0 ${c.width} ${c.height}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${c.bg}"/>
      <stop offset="60%" stop-color="${c.bg}"/>
      <stop offset="100%" stop-color="${c.bgAccent}"/>
    </linearGradient>
    <radialGradient id="glow" cx="80%" cy="20%" r="50%">
      <stop offset="0%" stop-color="${c.accent}" stop-opacity="0.30"/>
      <stop offset="100%" stop-color="${c.accent}" stop-opacity="0"/>
    </radialGradient>
    <pattern id="grid" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M40 0 L0 0 0 40" fill="none" stroke="rgba(255,255,255,0.04)" stroke-width="1"/>
    </pattern>
  </defs>

  <rect width="100%" height="100%" fill="url(#bg)"/>
  <rect width="100%" height="100%" fill="url(#grid)"/>
  <rect width="100%" height="100%" fill="url(#glow)"/>

  <!-- 상단 좌측 브랜드 -->
  <g transform="translate(80, 90)">
    <rect x="0" y="0" width="44" height="44" rx="10" fill="${c.accent}"/>
    <path d="M14 13 L14 33 L22 33 C28 33 31 30 31 23 C31 16 28 13 22 13 Z" fill="#ffffff"/>
    <text x="60" y="30" font-family="'Nanum Gothic', 'Apple SD Gothic Neo', sans-serif" font-size="22" font-weight="800" fill="${c.textBrand}" letter-spacing="3">${esc(c.brand)}</text>
  </g>

  <!-- 메인 타이틀 -->
  <g transform="translate(80, 270)">
    ${titleLines
      .map(
        (line, i) =>
          `<text x="0" y="${i * 78}" font-family="'Nanum Gothic', 'Apple SD Gothic Neo', sans-serif" font-size="68" font-weight="800" fill="${c.textPrimary}" letter-spacing="-2">${esc(line)}</text>`,
      )
      .join('\n    ')}
  </g>

  <!-- 서브타이틀 -->
  <text x="80" y="${270 + titleLines.length * 78 + 56}" font-family="'Nanum Gothic', 'Apple SD Gothic Neo', sans-serif" font-size="28" font-weight="400" fill="${c.textSecondary}">${esc(c.subtitle)}</text>

  <!-- 하단 우측 URL -->
  <g transform="translate(${c.width - 80}, ${c.height - 60})" text-anchor="end">
    <text x="0" y="0" font-family="'Nanum Gothic', 'Apple SD Gothic Neo', sans-serif" font-size="22" font-weight="700" fill="${c.textBrand}" letter-spacing="2">${esc(c.url)}</text>
  </g>

  <!-- 하단 좌측 데코 라인 -->
  <line x1="80" y1="${c.height - 60}" x2="220" y2="${c.height - 60}" stroke="${c.accent}" stroke-width="3" stroke-linecap="round"/>
</svg>`
}

async function main() {
  const svg = buildSvg(CONFIG)
  const outDir = dirname(CONFIG.outputPath)
  if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true })

  // (선택) SVG도 같이 저장 — 디버깅용
  writeFileSync(CONFIG.outputPath.replace(/\.png$/, '.svg'), svg)

  await sharp(Buffer.from(svg))
    .png({ compressionLevel: 9 })
    .toFile(CONFIG.outputPath)

  console.log(`✓ Generated ${CONFIG.outputPath} (${CONFIG.width}×${CONFIG.height})`)
}

main().catch((err) => {
  console.error('OG image generation failed:', err)
  console.error('Hint: 먼저 sharp를 설치하세요 → npm install -D sharp')
  process.exit(1)
})
