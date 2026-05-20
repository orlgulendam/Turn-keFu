import { Bell, RefreshCw, Wifi } from 'lucide-react'
import { useState } from 'react'

export default function Topbar({ title = 'Kartlı Geçiş Dashboard', subtitle }) {
  const [refreshing, setRefreshing] = useState(false)

  const now = new Date()
  const dateStr = now.toLocaleDateString('tr-TR', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
  })

  const handleRefresh = () => {
    setRefreshing(true)
    setTimeout(() => setRefreshing(false), 1000)
  }

  return (
    <div
      className="flex items-center justify-between px-6 shrink-0"
      style={{
        height: 64,
        borderBottom: '1px solid rgba(255,255,255,0.07)',
        background: 'rgba(15,12,41,0.8)',
        backdropFilter: 'blur(12px)',
      }}
    >
      {/* Left */}
      <div>
        <h1 className="font-bold text-white text-base leading-tight">{title}</h1>
        <p style={{ fontSize: 11, color: 'rgba(148,163,184,0.6)', fontWeight: 400, marginTop: 1 }}>
          Fırat Üniversitesi &nbsp;·&nbsp; {subtitle || dateStr}
        </p>
      </div>

      {/* Right: pill buttons */}
      <div className="flex items-center gap-2">
        {/* Live */}
        <div
          className="flex items-center gap-2 px-3 py-1.5 rounded-full relative"
          style={{
            background: 'rgba(16,185,129,0.1)',
            border: '1px solid rgba(16,185,129,0.25)',
            fontSize: 12,
            color: '#10b981',
            fontWeight: 600,
          }}
        >
          <span className="relative flex h-2 w-2">
            <span
              className="live-ring absolute inline-flex h-full w-full rounded-full"
              style={{ background: '#10b981' }}
            />
            <span
              className="live-dot relative inline-flex rounded-full h-2 w-2"
              style={{ background: '#10b981' }}
            />
          </span>
          Canlı
        </div>

        {/* Notifications */}
        <button
          className="flex items-center gap-2 px-3 py-1.5 rounded-full transition-all hover:scale-105"
          style={{
            background: 'rgba(124,58,237,0.1)',
            border: '1px solid rgba(124,58,237,0.25)',
            fontSize: 12,
            color: '#a78bfa',
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          <Bell size={13} />
          3 Bildirim
        </button>

        {/* Refresh */}
        <button
          onClick={handleRefresh}
          className="flex items-center gap-2 px-3 py-1.5 rounded-full transition-all hover:scale-105"
          style={{
            background: 'rgba(6,182,212,0.1)',
            border: '1px solid rgba(6,182,212,0.25)',
            fontSize: 12,
            color: '#06b6d4',
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          <RefreshCw size={13} className={refreshing ? 'animate-spin' : ''} />
          Yenile
        </button>
      </div>
    </div>
  )
}
