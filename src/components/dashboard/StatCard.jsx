import { motion, AnimatePresence } from 'framer-motion'
import { TrendingUp, TrendingDown } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

// Smooth number animation without a hook — re-animates on value change
function AnimatedNumber({ value }) {
  const [display, setDisplay] = useState(value)
  const [flash,   setFlash]   = useState(false)
  const prev = useRef(value)
  const rafRef = useRef(null)

  useEffect(() => {
    const start   = prev.current
    const end     = value
    if (start === end) return

    // Flash highlight when number jumps
    setFlash(true)
    setTimeout(() => setFlash(false), 400)

    const duration = 400
    const startTime = performance.now()

    const step = (now) => {
      const t   = Math.min((now - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - t, 3)
      setDisplay(Math.round(start + (end - start) * eased))
      if (t < 1) rafRef.current = requestAnimationFrame(step)
      else prev.current = end
    }
    rafRef.current = requestAnimationFrame(step)
    return () => cancelAnimationFrame(rafRef.current)
  }, [value])

  return (
    <motion.span
      animate={{ color: flash ? '#a78bfa' : '#ffffff' }}
      transition={{ duration: 0.4 }}
    >
      {display.toLocaleString('tr-TR')}
    </motion.span>
  )
}

export default function StatCard({
  icon: Icon,
  value,
  label,
  sublabel,
  trend,
  glowColor,
  iconBg,
  delay = 0,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: delay / 1000 }}
      className="card-hover rounded-xl p-5 relative overflow-hidden flex-1"
      style={{
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.07)',
        boxShadow: `0 0 30px ${glowColor}22`,
      }}
    >
      {/* Corner glow */}
      <div
        className="absolute top-0 right-0 w-24 h-24 rounded-full pointer-events-none"
        style={{
          background: `radial-gradient(circle at top right, ${glowColor}20, transparent 70%)`,
        }}
      />

      <div className="flex items-start justify-between mb-4">
        <div
          className="rounded-xl flex items-center justify-center"
          style={{
            width: 44, height: 44,
            background: iconBg,
            boxShadow: `0 4px 15px ${glowColor}40`,
          }}
        >
          <Icon size={20} color="white" />
        </div>

        {trend !== undefined && (
          <div
            className="flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-semibold"
            style={{
              background: trend >= 0 ? 'rgba(16,185,129,0.12)' : 'rgba(239,68,68,0.12)',
              color:      trend >= 0 ? '#10b981' : '#ef4444',
            }}
          >
            {trend >= 0 ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
            {trend >= 0 ? '+' : ''}{trend}%
          </div>
        )}
      </div>

      <div>
        <div className="font-black text-white mb-1" style={{ fontSize: 28, lineHeight: 1 }}>
          <AnimatedNumber value={value} />
        </div>
        <div className="font-semibold text-sm mb-1" style={{ color: 'rgba(148,163,184,0.9)' }}>
          {label}
        </div>
        {sublabel && (
          <div style={{ fontSize: 11, color: 'rgba(148,163,184,0.5)' }}>{sublabel}</div>
        )}
      </div>
    </motion.div>
  )
}
