/**
 * notifications.ts — 공용 알림 유틸 (DreamIT 표준)
 *
 * Supabase Edge Functions 호출:
 *   - send-email : Resend API
 *   - send-sms   : icode TCP
 *
 * 사용 예:
 *   await sendEmail({ to: 'user@example.com', subject: '제목', html: '<p>내용</p>' })
 *   await sendSMS({ receiver: '01012345678', message: '안녕하세요' })
 *   await sendBoth({ email: {...}, sms: {...} })
 */

import { supabase } from '../lib/supabase'

export interface SendEmailInput {
  to: string | string[]
  subject: string
  html: string
  from?: string
  reply_to?: string
}

export interface SendSMSInput {
  receiver: string
  message: string
  sender?: string
}

export interface SendBothInput {
  email: SendEmailInput
  sms: SendSMSInput
}

export interface NotifyResult {
  ok: boolean
  data?: unknown
  error?: string
}

/** 이메일 발송 — Edge Function: send-email */
export async function sendEmail(input: SendEmailInput): Promise<NotifyResult> {
  if (!supabase) {
    console.warn('[notifications] Supabase 미설정 — 데모 모드, 이메일 모킹')
    return { ok: true, data: { mocked: true, ...input } }
  }
  try {
    const { data, error } = await supabase.functions.invoke('send-email', { body: input })
    if (error) return { ok: false, error: error.message }
    return { ok: true, data }
  } catch (e) {
    return { ok: false, error: (e as Error).message }
  }
}

/** SMS 발송 — Edge Function: send-sms */
export async function sendSMS(input: SendSMSInput): Promise<NotifyResult> {
  if (!supabase) {
    console.warn('[notifications] Supabase 미설정 — 데모 모드, SMS 모킹')
    return { ok: true, data: { mocked: true, ...input } }
  }
  try {
    const { data, error } = await supabase.functions.invoke('send-sms', { body: input })
    if (error) return { ok: false, error: error.message }
    return { ok: true, data }
  } catch (e) {
    return { ok: false, error: (e as Error).message }
  }
}

/** 이메일 + SMS 동시 발송 */
export async function sendBoth(input: SendBothInput): Promise<{
  email: NotifyResult
  sms: NotifyResult
}> {
  const [email, sms] = await Promise.all([sendEmail(input.email), sendSMS(input.sms)])
  return { email, sms }
}

/** 기본 이메일 HTML 빌더 (브랜드 톤) */
export function buildEmailHtml(opts: {
  title: string
  body: string
  cta?: { label: string; url: string }
  footer?: string
}) {
  const { title, body, cta, footer } = opts
  return `<!doctype html>
<html lang="ko">
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#0f172a;font-family:'Nanum Gothic','Apple SD Gothic Neo','Malgun Gothic',sans-serif;color:#e5e7eb;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#0f172a;padding:32px 12px;">
    <tr><td align="center">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;background:#1e293b;border:1px solid #334155;border-radius:12px;overflow:hidden;">
        <tr><td style="padding:32px 36px 0;">
          <div style="font-size:13px;letter-spacing:.18em;text-transform:uppercase;color:#60a5fa;font-weight:700;">DreamIT Seminar</div>
          <h1 style="margin:14px 0 18px;font-size:24px;line-height:1.35;color:#f8fafc;">${escapeHtml(title)}</h1>
        </td></tr>
        <tr><td style="padding:0 36px 28px;font-size:15px;line-height:1.75;color:#cbd5e1;">${body}</td></tr>
        ${
          cta
            ? `<tr><td style="padding:0 36px 36px;"><a href="${escapeAttr(cta.url)}" style="display:inline-block;padding:14px 26px;background:#3b82f6;color:#ffffff;text-decoration:none;border-radius:8px;font-weight:700;font-size:14px;">${escapeHtml(cta.label)}</a></td></tr>`
            : ''
        }
        <tr><td style="padding:18px 36px 28px;border-top:1px solid #334155;font-size:12px;color:#64748b;">
          ${footer ? escapeHtml(footer) : '본 메일은 DreamIT Seminar에서 자동 발송되었습니다.'}
        </td></tr>
      </table>
      <div style="margin-top:18px;font-size:11px;color:#475569;">© ${new Date().getFullYear()} DreamIT Biz</div>
    </td></tr>
  </table>
</body></html>`
}

function escapeHtml(s: string) {
  return s
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')
}
function escapeAttr(s: string) {
  return escapeHtml(s)
}
