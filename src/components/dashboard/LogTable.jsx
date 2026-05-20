import { useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

function Avatar({ initials, gradientFrom, gradientTo }) {
  return (
    <div
      className="rounded-full flex items-center justify-center font-bold shrink-0"
      style={{
        width: 36,
        height: 36,
        background: `linear-gradient(135deg, ${gradientFrom}, ${gradientTo})`,
        fontSize: 13,
        color: 'white',
        boxShadow: `0 2px 10px ${gradientFrom}40`,
      }}
    >
      {initials}
    </div>
  )
}

export default function LogTable({ logs = [] }) {
  return (
    <div
      className="rounded-xl flex flex-col h-full"
      style={{
        background: 'rgba(255,255,255,0.025)',
        border: '1px solid rgba(255,255,255,0.07)',
      }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between px-5 py-4 shrink-0"
        style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
      >
        <h3 className="font-bold text-white text-sm">Son Log Kayıtları</h3>
        <div
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold"
          style={{
            background: 'rgba(16,185,129,0.12)',
            border: '1px solid rgba(16,185,129,0.25)',
            color: '#10b981',
          }}
        >
          <span className="relative flex h-1.5 w-1.5">
            <span
              className="live-ring absolute inline-flex h-full w-full rounded-full"
              style={{ background: '#10b981' }}
            />
            <span
              className="live-dot relative inline-flex h-1.5 w-1.5 rounded-full"
              style={{ background: '#10b981' }}
            />
          </span>
          Canlı
        </div>
      </div>

      {/* Log rows — AnimatePresence handles enter/exit */}
      <div className="flex-1 overflow-hidden">
        <AnimatePresence initial={false}>
          {logs.map((log) => (
            <motion.div
              key={log.id}
              layout
              initial={{ opacity: 0, y: -20, backgroundColor: 'rgba(124,58,237,0.15)' }}
              animate={{ opacity: 1, y: 0, backgroundColor: 'rgba(0,0,0,0)' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="flex items-center gap-3 px-5 py-3 table-row-hover"
              style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}
            >
              <Avatar
                initials={log.initials}
                gradientFrom={log.gradientFrom}
                gradientTo={log.gradientTo}
              />
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-white text-sm truncate">
                  {log.name}
                </div>
                <div style={{ fontSize: 11, color: 'rgba(148,163,184,0.55)', marginTop: 1 }}>
                  {log.type}&nbsp;·&nbsp;{log.device}&nbsp;·&nbsp;{log.time}
                </div>
              </div>
              <span
                className="px-2.5 py-1 rounded-full text-xs font-bold shrink-0"
                style={
                  log.status === 'BAŞARILI'
                    ? { background: 'rgba(16,185,129,0.12)', color: '#10b981', border: '1px solid rgba(16,185,129,0.2)' }
                    : { background: 'rgba(239,68,68,0.12)',  color: '#ef4444', border: '1px solid rgba(239,68,68,0.2)' }
                }
              >
                {log.status}
              </span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}
