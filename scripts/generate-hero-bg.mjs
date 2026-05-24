#!/usr/bin/env node
/**
 * 서브페이지 풀스크린 배경 이미지 생성 (1920x1080)
 *
 * 사용:
 *   npm install -D sharp
 *   npm run hero-bg
 *
 * 출력: public/hero-bg.jpg (약 200-300KB)
 */

import sharp from 'sharp'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { mkdirSync, existsSync } from 'node:fs'

const __dirname = dirname(fileURLToPath(import.meta.url))

const CONFIG = {
  width: 1920,
  height: 1080,
  outputPath: resolve(__dirname, '..', 'public', 'hero-bg.jpg'),
}

function buildSvg(c) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${c.width}" height="${c.height}" viewBox="0 0 ${c.width} ${c.height}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%"  stop-color="#050a18"/>
      <stop offset="50%" stop-color="#0b1a36"/>
      <stop offset="100%" stop-color="#1e3a8a"/>
    </linearGradient>

    <radialGradient id="glow1" cx="20%" cy="30%" r="60%">
      <stop offset="0%" stop-color="#3b82f6" stop-opacity="0.35"/>
      <stop offset="100%" stop-color="#3b82f6" stop-opacity="0"/>
    </radialGradient>

    <radialGradient id="glow2" cx="85%" cy="80%" r="55%">
      <stop offset="0%" stop-color="#8b5cf6" stop-opacity="0.3"/>
      <stop offset="100%" stop-color="#8b5cf6" stop-opacity="0"/>
    </radialGradient>

    <radialGradient id="glow3" cx="70%" cy="20%" r="35%">
      <stop offset="0%" stop-color="#60a5fa" stop-opacity="0.25"/>
      <stop offset="100%" stop-color="#60a5fa" stop-opacity="0"/>
    </radialGradient>

    <pattern id="grid" x="0" y="0" width="48" height="48" patternUnits="userSpaceOnUse">
      <path d="M48 0 L0 0 0 48" fill="none" stroke="rgba(255,255,255,0.05)" stroke-width="1"/>
    </pattern>

    <pattern id="dots" x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse">
      <circle cx="16" cy="16" r="1" fill="rgba(255,255,255,0.07)"/>
    </pattern>
  </defs>

  <rect width="100%" height="100%" fill="url(#bg)"/>
  <rect width="100%" height="100%" fill="url(#grid)"/>
  <rect width="100%" height="100%" fill="url(#dots)"/>
  <rect width="100%" height="100%" fill="url(#glow1)"/>
  <rect width="100%" height="100%" fill="url(#glow2)"/>
  <rect width="100%" height="100%" fill="url(#glow3)"/>

  <!-- Decorative geometric shapes -->
  <g opacity="0.16">
    <circle cx="280" cy="200" r="180" fill="none" stroke="#60a5fa" stroke-width="1"/>
    <circle cx="280" cy="200" r="120" fill="none" stroke="#60a5fa" stroke-width="1"/>
    <circle cx="1640" cy="900" r="220" fill="none" stroke="#a78bfa" stroke-width="1"/>
    <circle cx="1640" cy="900" r="140" fill="none" stroke="#a78bfa" stroke-width="1"/>
    <line x1="0" y1="540" x2="1920" y2="540" stroke="rgba(255,255,255,0.4)" stroke-width="1" stroke-dasharray="4 8"/>
    <line x1="960" y1="0" x2="960" y2="1080" stroke="rgba(255,255,255,0.4)" stroke-width="1" stroke-dasharray="4 8"/>
  </g>

  <!-- Diagonal accent line -->
  <line x1="0" y1="1080" x2="1920" y2="0" stroke="rgba(96,165,250,0.08)" stroke-width="2"/>
</svg>`
}

async function main() {
  const svg = buildSvg(CONFIG)
  const outDir = dirname(CONFIG.outputPath)
  if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true })

  await sharp(Buffer.from(svg))
    .jpeg({ quality: 80, mozjpeg: true })
    .toFile(CONFIG.outputPath)

  console.log(`✓ Generated ${CONFIG.outputPath} (${CONFIG.width}×${CONFIG.height})`)
}

main().catch((err) => {
  console.error('Hero bg generation failed:', err)
  console.error('Hint: 먼저 sharp를 설치하세요 → npm install -D sharp')
  process.exit(1)
})
