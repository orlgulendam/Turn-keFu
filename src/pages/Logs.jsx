import { useState } from 'react'
import { motion } from 'framer-motion'
import Layout from '../components/layout/Layout'
import { securityLogs } from '../data/mockData'
import { Search, Download, AlertTriangle } from 'lucide-react'

export default function Logs() {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('Tümü')

  const statuses = ['Tümü', 'BAŞARILI', 'BAŞARISIZ']

  const filtered = securityLogs.filter(l => {
    const matchSearch = l.name.toLowerCase().includes(search.toLowerCase()) ||
      l.device.toLowerCase().includes(search.toLowerCase())
    const matchStatus = statusFilter === 'Tümü' || l.status === statusFilter
    return matchSearch && matchStatus
  })

  return (
    <Layout title="Güvenlik Log" subtitle="Tüm geçiş kayıtları">
      <div className="flex flex-col gap-4 h-full">
        {/* Stats row */}
        <div className="flex gap-4">
          {[
            { label: 'Toplam Kayıt', value: securityLogs.length, color: '#7c3aed' },
            { label: 'Başarılı', value: securityLogs.filter(l => l.status === 'BAŞARILI').length, color: '#10b981' },
            { label: 'Başarısız', value: securityLogs.filter(l => l.status === 'BAŞARISIZ').length, color: '#ef4444' },
          ].map(stat => (
            <div key={stat.label} className="flex-1 rounded-xl px-5 py-4 card-hover"
              style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.07)' }}>
              <div className="font-black text-white" style={{ fontSize: 24 }}>{stat.value}</div>
              <div style={{ fontSize: 12, color: stat.color, fontWeight: 600 }}>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Toolbar */}
        <div className="flex items-center gap-3">
          <div className="relative flex-1 max-w-sm">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'rgba(148,163,184,0.5)' }} />
            <input
              type="text"
              placeholder="İsim veya cihaz ara..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-lg text-sm outline-none"
              style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                color: 'rgba(226,232,240,0.9)',
              }}
            />
          </div>
          <div className="flex gap-2">
            {statuses.map(s => (
              <button key={s} onClick={() => setStatusFilter(s)}
                className="px-3 py-2 rounded-lg text-xs font-semibold transition-all"
                style={statusFilter === s ? {
                  background: 'linear-gradient(135deg, rgba(124,58,237,0.3), rgba(6,182,212,0.2))',
                  border: '1px solid rgba(124,58,237,0.5)', color: '#a78bfa',
                } : {
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  color: 'rgba(148,163,184,0.7)', cursor: 'pointer',
                }}>
                {s}
              </button>
            ))}
          </div>
          <button className="ml-auto flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold"
            style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(148,163,184,0.7)', cursor: 'pointer' }}>
            <Download size={13} /> Export
          </button>
        </div>

        {/* Log table */}
        <div className="rounded-xl overflow-hidden flex-1" style={{
          background: 'rgba(255,255,255,0.025)',
          border: '1px solid rgba(255,255,255,0.07)',
        }}>
          <div className="grid grid-cols-6 px-5 py-3" style={{
            borderBottom: '1px solid rgba(255,255,255,0.07)',
            background: 'rgba(255,255,255,0.03)',
          }}>
            {['Kullanıcı', 'Tip', 'Cihaz', 'Saat', 'Tarih', 'Durum'].map(h => (
              <div key={h} style={{ fontSize: 11, color: 'rgba(148,163,184,0.5)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                {h}
              </div>
            ))}
          </div>
          <div className="overflow-y-auto" style={{ maxHeight: 'calc(100vh - 360px)' }}>
            {filtered.map((log, i) => (
              <motion.div
                key={log.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.04 }}
                className="grid grid-cols-6 px-5 py-3.5 items-center table-row-hover"
                style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}
              >
                <div className="flex items-center gap-2.5">
                  <div className="rounded-full flex items-center justify-center font-bold text-xs"
                    style={{ width: 30, height: 30, background: `linear-gradient(135deg, ${log.gradientFrom}, ${log.gradientTo})`, color: 'white', flexShrink: 0 }}>
                    {log.initials}
                  </div>
                  <span style={{ fontSize: 13, fontWeight: 600, color: 'rgba(226,232,240,0.9)' }}>{log.name}</span>
                </div>
                <span style={{ fontSize: 12, color: 'rgba(148,163,184,0.7)' }}>{log.type}</span>
                <span style={{ fontSize: 12, color: '#06b6d4', fontWeight: 600 }}>{log.device}</span>
                <span style={{ fontSize: 12, color: 'rgba(148,163,184,0.7)' }}>{log.time}</span>
                <span style={{ fontSize: 12, color: 'rgba(148,163,184,0.5)' }}>20.05.2026</span>
                <span className="px-2 py-0.5 rounded-full text-xs font-bold w-fit flex items-center gap-1"
                  style={log.status === 'BAŞARILI' ? {
                    background: 'rgba(16,185,129,0.12)', color: '#10b981', border: '1px solid rgba(16,185,129,0.2)',
                  } : {
                    background: 'rgba(239,68,68,0.12)', color: '#ef4444', border: '1px solid rgba(239,68,68,0.2)',
                  }}>
                  {log.status === 'BAŞARISIZ' && <AlertTriangle size={10} />}
                  {log.status}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  )
}
