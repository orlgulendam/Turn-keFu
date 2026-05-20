import { useState } from 'react'
import { motion } from 'framer-motion'
import Layout from '../components/layout/Layout'
import { allCards } from '../data/mockData'
import { Search, Plus, Download, Filter, MoreHorizontal } from 'lucide-react'

export default function Cards() {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('Tümü')

  const types = ['Tümü', 'Öğrenci', 'Çalışan', 'Öğretim Görevlisi']

  const filtered = allCards.filter(c => {
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.cardNo.toLowerCase().includes(search.toLowerCase())
    const matchType = filter === 'Tümü' || c.type === filter
    return matchSearch && matchType
  })

  return (
    <Layout title="Kart Yönetimi" subtitle="Kart listesi ve yönetim paneli">
      <div className="flex flex-col gap-4 h-full">
        {/* Toolbar */}
        <div className="flex items-center gap-3">
          {/* Search */}
          <div className="relative flex-1 max-w-sm">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'rgba(148,163,184,0.5)' }} />
            <input
              type="text"
              placeholder="İsim veya kart numarası ara..."
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

          {/* Type filters */}
          <div className="flex gap-2">
            {types.map(t => (
              <button
                key={t}
                onClick={() => setFilter(t)}
                className="px-3 py-2 rounded-lg text-xs font-semibold transition-all"
                style={filter === t ? {
                  background: 'linear-gradient(135deg, rgba(124,58,237,0.3), rgba(6,182,212,0.2))',
                  border: '1px solid rgba(124,58,237,0.5)',
                  color: '#a78bfa',
                } : {
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  color: 'rgba(148,163,184,0.7)',
                  cursor: 'pointer',
                }}
              >
                {t}
              </button>
            ))}
          </div>

          <div className="ml-auto flex gap-2">
            <button className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold transition-all hover:scale-105"
              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(148,163,184,0.7)', cursor: 'pointer' }}>
              <Download size={13} /> Export
            </button>
            <button className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-bold transition-all hover:scale-105"
              style={{ background: 'linear-gradient(135deg, #7c3aed, #06b6d4)', color: 'white', border: 'none', cursor: 'pointer' }}>
              <Plus size={13} /> Yeni Kart
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="rounded-xl overflow-hidden flex-1" style={{
          background: 'rgba(255,255,255,0.025)',
          border: '1px solid rgba(255,255,255,0.07)',
        }}>
          {/* Head */}
          <div className="grid grid-cols-7 px-5 py-3" style={{
            borderBottom: '1px solid rgba(255,255,255,0.07)',
            background: 'rgba(255,255,255,0.03)',
          }}>
            {['Ad Soyad', 'Tip', 'Bölüm', 'Kart No', 'Son Kullanım', 'Durum', ''].map(h => (
              <div key={h} style={{ fontSize: 11, color: 'rgba(148,163,184,0.5)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                {h}
              </div>
            ))}
          </div>

          {/* Rows */}
          <div className="overflow-y-auto" style={{ maxHeight: 'calc(100vh - 320px)' }}>
            {filtered.map((card, i) => (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.04 }}
                className="grid grid-cols-7 px-5 py-3.5 table-row-hover items-center"
                style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}
              >
                <div className="flex items-center gap-2.5">
                  <div className="rounded-full flex items-center justify-center font-bold text-xs"
                    style={{ width: 30, height: 30, background: 'linear-gradient(135deg, #7c3aed, #06b6d4)', color: 'white', flexShrink: 0 }}>
                    {card.name.split(' ').map(n => n[0]).slice(0, 2).join('')}
                  </div>
                  <span style={{ fontSize: 13, fontWeight: 600, color: 'rgba(226,232,240,0.9)' }}>{card.name}</span>
                </div>
                <span style={{ fontSize: 12, color: 'rgba(148,163,184,0.7)' }}>{card.type}</span>
                <span style={{ fontSize: 12, color: 'rgba(148,163,184,0.7)' }}>{card.department}</span>
                <span style={{ fontSize: 12, fontFamily: 'monospace', color: '#06b6d4' }}>{card.cardNo}</span>
                <span style={{ fontSize: 12, color: 'rgba(148,163,184,0.7)' }}>{card.lastUsed} · {card.date}</span>
                <span className="px-2 py-0.5 rounded-full text-xs font-bold w-fit"
                  style={card.status === 'Aktif' ? {
                    background: 'rgba(16,185,129,0.12)',
                    color: '#10b981',
                    border: '1px solid rgba(16,185,129,0.2)',
                  } : {
                    background: 'rgba(239,68,68,0.12)',
                    color: '#ef4444',
                    border: '1px solid rgba(239,68,68,0.2)',
                  }}>
                  {card.status}
                </span>
                <button style={{ color: 'rgba(148,163,184,0.4)', cursor: 'pointer', background: 'none', border: 'none' }}>
                  <MoreHorizontal size={16} />
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  )
}
