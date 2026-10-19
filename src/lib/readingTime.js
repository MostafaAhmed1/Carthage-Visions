/**
 * Reading time for bilingual content.
 * Arabic is read a little slower than English, and Arabic strings are counted
 * by whitespace the same way — good enough for an estimate, never a promise.
 */
const WPM = { ar: 165, en: 205 }

export function countWords(value) {
  if (!value) return 0
  return String(value)
    .replace(/[^\p{L}\p{N}\s]/gu, ' ')
    .split(/\s+/)
    .filter(Boolean).length
}

/** Whole minutes, never below 2 — a one-minute read reads as an error. */
export function readingMinutes(post, lang = 'ar') {
  if (!post) return 0
  const text = [
    post.title?.[lang],
    post.excerpt?.[lang],
    ...(post.sections ?? []).flatMap((section) => [
      section.heading?.[lang],
      ...(section.body ?? []).map((paragraph) => paragraph[lang]),
      ...(section.list ?? []).map((item) => item[lang]),
    ]),
    post.takeaway?.[lang],
  ]
    .filter(Boolean)
    .join(' ')

  const words = countWords(text)
  return Math.max(2, Math.round(words / (WPM[lang] ?? WPM.en)))
}

export default readingMinutes
