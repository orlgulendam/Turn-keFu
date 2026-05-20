import { useState, useEffect, useRef, useCallback } from 'react'

const FAKE_USERS = [
  { name: 'Mehmet Sıdık Karakaya', type: 'Öğrenci', initials: 'MK', gradientFrom: '#7c3aed', gradientTo: '#06b6d4' },
  { name: 'Beyza Nur Karadağ',     type: 'Öğrenci', initials: 'BK', gradientFrom: '#ec4899', gradientTo: '#7c3aed' },
  { name: 'Elif Cankara',           type: 'Öğrenci', initials: 'EC', gradientFrom: '#06b6d4', gradientTo: '#10b981' },
  { name: 'Veysel Şahin Düzgün',   type: 'Çalışan', initials: 'VD', gradientFrom: '#ef4444', gradientTo: '#fbbf24' },
  { name: 'Yusuf Yıldız',           type: 'Öğrenci', initials: 'YY', gradientFrom: '#10b981', gradientTo: '#06b6d4' },
  { name: 'Şule Nur Baygut',        type: 'Öğrenci', initials: 'ŞB', gradientFrom: '#fbbf24', gradientTo: '#ec4899' },
  { name: 'Ali Kemal Öztürk',       type: 'Öğretim Görevlisi', initials: 'AÖ', gradientFrom: '#7c3aed', gradientTo: '#10b981' },
  { name: 'Fatma Zehra Arslan',     type: 'Öğrenci', initials: 'FA', gradientFrom: '#06b6d4', gradientTo: '#ec4899' },
  { name: 'Hasan Çelik',            type: 'Öğrenci', initials: 'HÇ', gradientFrom: '#ef4444', gradientTo: '#7c3aed' },
  { name: 'Ayşe Kaya',              type: 'Çalışan', initials: 'AK', gradientFrom: '#10b981', gradientTo: '#06b6d4' },
  { name: 'Emre Demir',             type: 'Öğrenci', initials: 'ED', gradientFrom: '#7c3aed', gradientTo: '#ec4899' },
  { name: 'Zeynep Aktaş',           type: 'Öğrenci', initials: 'ZA', gradientFrom: '#06b6d4', gradientTo: '#7c3aed' },
  { name: 'Burak Koç',              type: 'Öğrenci', initials: 'BK', gradientFrom: '#fbbf24', gradientTo: '#10b981' },
  { name: 'Selin Yıldırım',         type: 'Çalışan', initials: 'SY', gradientFrom: '#ec4899', gradientTo: '#06b6d4' },
  { name: 'Oğuz Han Şimşek',        type: 'Öğrenci', initials: 'OŞ', gradientFrom: '#10b981', gradientTo: '#7c3aed' },
]

const DEVICES = ['ANA GİRİŞ', 'SAĞ 4-5', 'SOL 2', 'SAĞ 2-3', 'SOL 3', 'ARKA GİRİŞ']

// Turnike index → turnikeData index mapping
const DEVICE_TO_TURNIKE = {
  'ANA GİRİŞ': 0,
  'SAĞ 4-5':   1,
  'SOL 2':     2,
  'SAĞ 2-3':   3,
  'SOL 3':     4,
}

const rand = (arr) => arr[Math.floor(Math.random() * arr.length)]

let idCounter = 100

function generateEntry() {
  const user   = rand(FAKE_USERS)
  const device = rand(DEVICES)
  const isSuccess = Math.random() > 0.12  // %88 başarılı

  const now   = new Date()
  const hh    = String(now.getHours()).padStart(2, '0')
  const mm    = String(now.getMinutes()).padStart(2, '0')
  const ss    = String(now.getSeconds()).padStart(2, '0')

  return {
    id: ++idCounter,
    ...user,
    device,
    time: `${hh}:${mm}:${ss}`,
    status: isSuccess ? 'BAŞARILI' : 'BAŞARISIZ',
    isNew: true,
  }
}

export function useSimulation(intervalMs = 3000) {
  const [logs, setLogs]           = useState([])
  const [stats, setStats]         = useState(null)   // null = henüz başlamadı
  const [turnikeData, setTurnikeData] = useState(null)
  const [isRunning, setIsRunning] = useState(true)
  const timerRef = useRef(null)

  // Initialize from mockData on mount
  useEffect(() => {
    import('../data/mockData.js').then(m => {
      setLogs(m.recentLogs.map(l => ({ ...l, isNew: false })))
      setStats({
        totalUsers:       m.stats.totalUsers,
        activeUsers:      m.stats.activeUsers,
        students:         m.stats.students,
        activeStudents:   m.stats.activeStudents,
        staff:            m.stats.staff,
        activeStaff:      m.stats.activeStaff,
        failedAccess:     m.stats.failedAccess,
        failedTrend:      m.stats.failedTrend,
        totalAccess:      m.stats.totalAccess,
        accessTrend:      m.stats.accessTrend,
        successfulAccess: m.stats.successfulAccess,
        successTrend:     m.stats.successTrend,
        totalCards:       m.stats.totalCards,
        todayAccess:      m.stats.todayAccess,
        todayDate:        m.stats.todayDate,
      })
      setTurnikeData(m.turnikeData.map(t => ({ ...t })))
    })
  }, [])

  // Tick: generate new entry
  const tick = useCallback(() => {
    const entry = generateEntry()

    // 1. Log listesini güncelle — yeni kayıt üste, en eski düşer
    setLogs(prev => [entry, ...prev.slice(0, 7)])

    // 2. İstatistikleri güncelle
    setStats(prev => {
      if (!prev) return prev
      const isSuccess = entry.status === 'BAŞARILI'
      return {
        ...prev,
        todayAccess:      prev.todayAccess + 1,
        totalAccess:      prev.totalAccess + 1,
        successfulAccess: isSuccess ? prev.successfulAccess + 1 : prev.successfulAccess,
        failedAccess:     !isSuccess ? prev.failedAccess + 1 : prev.failedAccess,
      }
    })

    // 3. Turnike yoğunluğunu hafifçe güncelle
    setTurnikeData(prev => {
      if (!prev) return prev
      const idx = DEVICE_TO_TURNIKE[entry.device]
      if (idx === undefined) return prev
      return prev.map((t, i) => {
        if (i !== idx) return t
        // Başarılı geçiş → yoğunluk +1 (max 99), başarısız → -1 (min 20)
        const delta   = entry.status === 'BAŞARILI' ? 1 : -1
        const newPct  = Math.min(99, Math.max(20, t.percent + delta))
        return { ...t, percent: newPct }
      })
    })
  }, [])

  // Interval yönetimi
  useEffect(() => {
    if (!isRunning) {
      clearInterval(timerRef.current)
      return
    }
    timerRef.current = setInterval(tick, intervalMs)
    return () => clearInterval(timerRef.current)
  }, [isRunning, tick, intervalMs])

  const toggle = () => setIsRunning(r => !r)

  return { logs, stats, turnikeData, isRunning, toggle }
}
