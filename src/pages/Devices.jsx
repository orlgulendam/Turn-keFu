import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Layout from '../components/layout/Layout'
import { devices } from '../data/mockData'
import {
  Wifi, WifiOff, Wrench, Activity, MoreHorizontal,
  Server, MapPin, Clock, Hash, Cpu, Zap, X,
  ArrowUpDown, RefreshCw, AlertTriangle, CheckCircle2,
  Network, HardDrive, ToggleLeft, ToggleRight
} from 'lucide-react'

/* ─── Status helpers ─────────────────────────── */
function statusStyle(status) {
  return {
    Aktif:   { bg: 'rgba(16,185,129,0.12)', color: '#10b981', border: '1px solid rgba(16,185,129,0.25)' },
    Pasif:   { bg: 'rgba(239,68,68,0.12)',  color: '#ef4444', border: '1px solid rgba(239,68,68,0.25)'  },
    Bakımda: { bg: 'rgba(251,191,36,0.12)', color: '#fbbf24', border: '1px solid rgba(251,191,36,0.25)' },
  }[status] || {}
}

function StatusDot({ status }) {
  const color = { Aktif: '#10b981', Pasif: '#ef4444', Bakımda: '#fbbf24' }[status]
  return (
    <span className="relative flex h-2 w-2 shrink-0">
      {status === 'Aktif' && (
        <span className="live-ring absolute inline-flex h-full w-full rounded-full" style={{ background: color }} />
      )}
      <span className="relative inline-flex h-2 w-2 rounded-full" style={{ background: color }} />
    </span>
  )
}

/* ─── Info row in modal ──────────────────────── */
function InfoRow({ icon: Icon, label, value, accent }) {
  return (
    <div className="flex items-center gap-3 py-2.5"
      style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
      <div className="flex items-center justify-center rounded-lg shrink-0"
        style={{ width: 32, height: 32, background: 'rgba(124,58,237,0.12)' }}>
        <Icon size={14} style={{ color: '#a78bfa' }} />
      </div>
      <span style={{ fontSize: 12, color: 'rgba(148,163,184,0.6)', flex: 1 }}>{label}</span>
      <span style={{ fontSize: 13, fontWeight: 700, color: accent || 'rgba(226,232,240,0.9)',
        fontFamily: accent ? 'monospace' : 'inherit' }}>
        {value}
      </span>
    </div>
  )
}

/* ─── Device Detail Modal ────────────────────── */
function DeviceModal({ device, onClose }) {
  const s = statusStyle(device.status)
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(6px)' }}
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.92, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.92, y: 20 }}
        transition={{ type: 'spring', damping: 20, stiffness: 300 }}
        className="rounded-2xl p-6 w-full"
        style={{
          maxWidth: 460,
          background: 'linear-gradient(135deg, #1a1040, #0f0c29)',
          border: '1px solid rgba(124,58,237,0.3)',
          boxShadow: '0 25px 60px rgba(0,0,0,0.6), 0 0 40px rgba(124,58,237,0.15)',
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Modal header */}
        <div className="flex items-start justify-between mb-5">
          <div className="flex items-center gap-3">
            <div className="rounded-xl flex items-center justify-center"
              style={{ width: 48, height: 48, background: 'linear-gradient(135deg, #7c3aed, #06b6d4)',
                boxShadow: '0 4px 20px rgba(124,58,237,0.4)' }}>
              <Cpu size={22} color="white" />
            </div>
            <div>
              <h2 className="font-black text-white text-lg">{device.name}</h2>
              <span style={{ fontSize: 11, color: 'rgba(148,163,184,0.5)' }}>{device.id}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold"
              style={{ background: s.bg, color: s.color, border: s.border }}>
              <StatusDot status={device.status} />
              {device.status}
            </span>
            <button onClick={onClose}
              className="rounded-full p-1.5 transition-colors hover:bg-white/10"
              style={{ background: 'none', border: 'none', color: 'rgba(148,163,184,0.6)', cursor: 'pointer' }}>
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Info rows */}
        <div>
          <InfoRow icon={MapPin}    label="Konum"          value={device.location} />
          <InfoRow icon={Network}   label="IP Adresi"      value={device.ip}       accent="#06b6d4" />
          <InfoRow icon={HardDrive} label="Firmware"       value={device.firmware} accent="#a78bfa" />
          <InfoRow icon={ArrowUpDown} label="Cihaz Tipi"   value={device.type} />
          <InfoRow icon={Zap}       label="Bugünkü Geçiş"  value={device.todayPass.toLocaleString('tr-TR')} />
          <InfoRow icon={Clock}     label="Son Ping"       value={device.lastPing} />
        </div>

        {/* Stats mini-row */}
        <div className="grid grid-cols-3 gap-3 mt-5">
          {[
            { label: 'Uptime', value: device.status === 'Aktif' ? '99.8%' : '0%', color: '#10b981' },
            { label: 'Gecikme', value: device.status === 'Aktif' ? '12ms' : '-', color: '#06b6d4' },
            { label: 'Hata', value: device.status === 'Bakımda' ? '3' : '0', color: '#fbbf24' },
          ].map(s => (
            <div key={s.label} className="rounded-xl p-3 text-center"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}>
              <div className="font-black" style={{ fontSize: 18, color: s.color }}>{s.value}</div>
              <div style={{ fontSize: 10, color: 'rgba(148,163,184,0.5)', marginTop: 2 }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Action buttons */}
        <div className="flex gap-2 mt-5">
          <button className="flex-1 flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-bold transition-all hover:scale-105"
            style={{ background: 'rgba(6,182,212,0.12)', border: '1px solid rgba(6,182,212,0.25)',
              color: '#06b6d4', cursor: 'pointer' }}>
            <RefreshCw size={13} /> Yeniden Başlat
          </button>
          <button className="flex-1 flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-bold transition-all hover:scale-105"
            style={{ background: 'rgba(124,58,237,0.12)', border: '1px solid rgba(124,58,237,0.25)',
              color: '#a78bfa', cursor: 'pointer' }}>
            <Activity size={13} /> Diagnostik
          </button>
          <button className="flex-1 flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-bold transition-all hover:scale-105"
            style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)',
              color: '#ef4444', cursor: 'pointer' }}>
            <AlertTriangle size={13} /> Alarm
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}

/* ─── Device Card ────────────────────────────── */
function DeviceCard({ device, onClick }) {
  const s = statusStyle(device.status)
  const glowColor = { Aktif: 'rgba(16,185,129,0.12)', Pasif: 'rgba(239,68,68,0.1)', Bakımda: 'rgba(251,191,36,0.1)' }[device.status]

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -3, borderColor: 'rgba(124,58,237,0.35)' }}
      transition={{ duration: 0.2 }}
      onClick={onClick}
      className="rounded-xl p-5 relative overflow-hidden cursor-pointer"
      style={{
        background: 'rgba(255,255,255,0.025)',
        border: '1px solid rgba(255,255,255,0.07)',
        transition: 'all 0.2s ease',
      }}
    >
      {/* Corner glow */}
      <div className="absolute top-0 right-0 w-28 h-28 rounded-full pointer-events-none"
        style={{ background: `radial-gradient(circle at top right, ${glowColor}, transparent 65%)` }} />

      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="rounded-xl flex items-center justify-center shrink-0"
            style={{ width: 42, height: 42,
              background: device.status === 'Aktif'
                ? 'linear-gradient(135deg, #7c3aed, #06b6d4)'
                : device.status === 'Bakımda'
                  ? 'linear-gradient(135deg, #fbbf24, #f59e0b)'
                  : 'linear-gradient(135deg, #ef4444, #dc2626)',
              boxShadow: device.status === 'Aktif' ? '0 4px 15px rgba(124,58,237,0.4)' : 'none',
            }}>
            <Cpu size={18} color="white" />
          </div>
          <div>
            <h4 className="font-bold text-white text-sm">{device.name}</h4>
            <span style={{ fontSize: 10, color: 'rgba(148,163,184,0.4)', fontFamily: 'monospace' }}>
              {device.id}
            </span>
          </div>
        </div>
        <span className="flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-bold"
          style={{ background: s.bg, color: s.color, border: s.border }}>
          <StatusDot status={device.status} />
          {device.status}
        </span>
      </div>

      {/* Location */}
      <div className="flex items-center gap-1.5 mb-4"
        style={{ fontSize: 11, color: 'rgba(148,163,184,0.55)' }}>
        <MapPin size={11} />
        {device.location}
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 gap-2 mb-4">
        <div className="rounded-lg px-3 py-2" style={{ background: 'rgba(255,255,255,0.04)' }}>
          <div style={{ fontSize: 9, color: 'rgba(148,163,184,0.45)', marginBottom: 3, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Bugünkü Geçiş
          </div>
          <div className="font-bold text-white" style={{ fontSize: 16 }}>
            {device.todayPass.toLocaleString('tr-TR')}
          </div>
        </div>
        <div className="rounded-lg px-3 py-2" style={{ background: 'rgba(255,255,255,0.04)' }}>
          <div style={{ fontSize: 9, color: 'rgba(148,163,184,0.45)', marginBottom: 3, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Son Ping
          </div>
          <div className="font-bold" style={{ fontSize: 16, color: device.status === 'Aktif' ? '#10b981' : '#ef4444' }}>
            {device.lastPing}
          </div>
        </div>
      </div>

      {/* Footer — IP + Firmware */}
      <div className="flex items-center justify-between pt-3"
        style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="flex items-center gap-1.5">
          <Network size={11} style={{ color: '#06b6d4' }} />
          <span style={{ fontSize: 11, color: '#06b6d4', fontFamily: 'monospace', fontWeight: 700 }}>
            {device.ip}
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <HardDrive size={11} style={{ color: '#a78bfa' }} />
          <span style={{ fontSize: 11, color: '#a78bfa', fontWeight: 600 }}>
            {device.firmware}
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <ArrowUpDown size={11} style={{ color: 'rgba(148,163,184,0.4)' }} />
          <span style={{ fontSize: 10, color: 'rgba(148,163,184,0.4)' }}>
            {device.type}
          </span>
        </div>
      </div>
    </motion.div>
  )
}

/* ─── Main Page ──────────────────────────────── */
export default function Devices() {
  const [selected, setSelected] = useState(null)
  const [filterStatus, setFilterStatus] = useState('Tümü')

  const statuses = ['Tümü', 'Aktif', 'Bakımda', 'Pasif']

  const filtered = filterStatus === 'Tümü'
    ? devices
    : devices.filter(d => d.status === filterStatus)

  const counts = {
    total:   devices.length,
    active:  devices.filter(d => d.status === 'Aktif').length,
    repair:  devices.filter(d => d.status === 'Bakımda').length,
    passive: devices.filter(d => d.status === 'Pasif').length,
    todayTotal: devices.reduce((s, d) => s + d.todayPass, 0),
  }

  return (
    <Layout title="Turnike Cihaz Yönetimi" subtitle="Tüm turnike cihazları ve anlık durum izleme">
      <div className="flex flex-col gap-4">

        {/* Summary stat cards */}
        <div className="flex gap-4">
          {[
            { label: 'Toplam Cihaz', value: counts.total, color: '#7c3aed', icon: Cpu,          bg: 'rgba(124,58,237,0.12)' },
            { label: 'Aktif',        value: counts.active, color: '#10b981', icon: CheckCircle2, bg: 'rgba(16,185,129,0.12)' },
            { label: 'Bakımda',      value: counts.repair, color: '#fbbf24', icon: Wrench,       bg: 'rgba(251,191,36,0.12)' },
            { label: "Bugünkü Geçiş (Toplam)", value: counts.todayTotal, color: '#06b6d4', icon: Zap, bg: 'rgba(6,182,212,0.12)' },
          ].map((s, i) => (
            <motion.div key={s.label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
              className="flex-1 rounded-xl px-5 py-4 flex items-center gap-4 card-hover"
              style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.07)' }}>
              <div className="rounded-xl flex items-center justify-center shrink-0"
                style={{ width: 40, height: 40, background: s.bg }}>
                <s.icon size={18} style={{ color: s.color }} />
              </div>
              <div>
                <div className="font-black text-white" style={{ fontSize: 22 }}>
                  {s.value.toLocaleString('tr-TR')}
                </div>
                <div style={{ fontSize: 11, color: s.color, fontWeight: 600 }}>{s.label}</div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Filter bar */}
        <div className="flex items-center gap-3">
          <span style={{ fontSize: 12, color: 'rgba(148,163,184,0.5)', fontWeight: 600 }}>
            Filtrele:
          </span>
          <div className="flex gap-2">
            {statuses.map(s => (
              <button key={s} onClick={() => setFilterStatus(s)}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all"
                style={filterStatus === s ? {
                  background: 'linear-gradient(135deg, rgba(124,58,237,0.3), rgba(6,182,212,0.2))',
                  border: '1px solid rgba(124,58,237,0.5)', color: '#a78bfa', cursor: 'pointer',
                } : {
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  color: 'rgba(148,163,184,0.6)', cursor: 'pointer',
                }}>
                {s}
              </button>
            ))}
          </div>
          <span style={{ marginLeft: 'auto', fontSize: 12, color: 'rgba(148,163,184,0.4)' }}>
            {filtered.length} cihaz gösteriliyor — Detay için tıklayın
          </span>
        </div>

        {/* Device grid */}
        <div className="grid gap-4" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
          <AnimatePresence>
            {filtered.map((device, i) => (
              <motion.div
                key={device.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: i * 0.06 }}
              >
                <DeviceCard device={device} onClick={() => setSelected(device)} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Network topology hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="rounded-xl p-4 flex items-center gap-4"
          style={{ background: 'rgba(124,58,237,0.06)', border: '1px solid rgba(124,58,237,0.15)' }}
        >
          <Server size={18} style={{ color: '#a78bfa', flexShrink: 0 }} />
          <div>
            <span className="font-semibold text-white text-sm">Ağ Topolojisi: </span>
            <span style={{ fontSize: 12, color: 'rgba(148,163,184,0.6)' }}>
              Tüm turnike cihazları&nbsp;
              <code style={{ color: '#06b6d4', fontFamily: 'monospace' }}>192.168.1.0/24</code>
              &nbsp;alt ağında &nbsp;·&nbsp; Gateway:&nbsp;
              <code style={{ color: '#06b6d4', fontFamily: 'monospace' }}>192.168.1.1</code>
              &nbsp;·&nbsp; VLAN 20 (Güvenlik)
            </span>
          </div>
          <div className="ml-auto flex items-center gap-2 shrink-0">
            <span className="live-dot h-2 w-2 rounded-full inline-block" style={{ background: '#10b981' }} />
            <span style={{ fontSize: 11, color: '#10b981', fontWeight: 600 }}>Ağ Sağlıklı</span>
          </div>
        </motion.div>
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selected && (
          <DeviceModal device={selected} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>
    </Layout>
  )
}
