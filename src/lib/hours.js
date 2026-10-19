import shop from '../config/shop'

const DAY_KEYS = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat']

const toMinutes = (hhmm) => {
  const [h, m] = String(hhmm).split(':').map(Number)
  return h * 60 + (m || 0)
}

/** Current wall-clock time in the shop's timezone, as {dayKey, minutes}. */
export function nowInShopTz(date = new Date(), timeZone = shop.hours.timezone) {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone,
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).formatToParts(date)

  const get = (type) => parts.find((p) => p.type === type)?.value ?? ''
  const weekdayIndex = DAY_KEYS.indexOf(get('weekday').slice(0, 3).toLowerCase())
  const hours = Number(get('hour')) % 24
  const minutes = Number(get('minute'))

  return {
    dayKey: DAY_KEYS[weekdayIndex === -1 ? new Date(date).getUTCDay() : weekdayIndex],
    minutes: hours * 60 + minutes,
    clock: `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`,
  }
}

/**
 * Open/closed status for the configured hours.
 * @returns {{open: boolean, allDay: boolean, closesAt: string|null, opensAt: string|null, clock: string}}
 */
export function getOpenStatus(date = new Date()) {
  const { dayKey, minutes, clock } = nowInShopTz(date)
  const week = shop.hours.week
  const today = week[dayKey]

  if (!today) return { open: false, allDay: false, closesAt: null, opensAt: nextOpening(dayKey), clock }

  const start = toMinutes(today.open)
  let end = toMinutes(today.close)
  const allDay = today.open === '00:00' && (today.close === '24:00' || today.close === '00:00')

  if (allDay) return { open: true, allDay: true, closesAt: null, opensAt: null, clock }

  // Overnight window (e.g. 18:00 → 02:00)
  if (end <= start) end += 24 * 60
  const now = minutes < start && end > 24 * 60 ? minutes + 24 * 60 : minutes
  const open = now >= start && now < end

  return {
    open,
    allDay: false,
    closesAt: open ? today.close : null,
    opensAt: open ? null : today.open,
    clock,
  }
}

function nextOpening(fromDayKey) {
  const order = [...DAY_KEYS]
  const start = order.indexOf(fromDayKey)
  for (let i = 1; i <= 7; i += 1) {
    const key = order[(start + i) % 7]
    if (shop.hours.week[key]) return shop.hours.week[key].open
  }
  return null
}

/** Ordered [key, hours] pairs, weeks starting Sunday (Omani convention). */
export function weekRows() {
  return DAY_KEYS.map((key) => [key, shop.hours.week[key] ?? null])
}
