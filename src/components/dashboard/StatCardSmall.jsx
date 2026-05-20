import { motion } from 'framer-motion'
import { TrendingUp } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

function AnimatedNumber({ value }) {
  const [display, setDisplay] = useState(value)
  const [flash,   setFlash]   = useState(false)
  const prev   = useRef(value)
  const rafRef = useRef(null)

  useEffect(() => {
    const start = prev.current
    const end   = value
    if (start === end) return

    setFlash(true)
    setTimeout(() => setFlash(false), 400)

    const duration  = 400
    const startTime = performance.now()
    const step = (now) => {
      const t     = Math.min((now - startTime) / duration, 1)
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

export default function StatCardSmall({
  icon: Icon,
  value,
  label,
  trend,
  iconColor,
  delay = 0,
  extraLabel,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: delay / 1000 + 0.3 }}
      className="card-hover rounded-xl px-5 py-4 flex items-center gap-4 flex-1"
      style={{
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.07)',
      }}
    >
      <div
        className="rounded-lg flex items-center justify-center shrink-0"
        style={{
          width: 40, height: 40,
          background: `${iconColor}18`,
          border: `1px solid ${iconColor}30`,
        }}
      >
        <Icon size={18} style={{ color: iconColor }} />
      </div>

      <div className="min-w-0 flex-1">
        <div className="font-black text-white" style={{ fontSize: 22 }}>
          <AnimatedNumber value={value} />
        </div>
        <div style={{ fontSize: 11, color: 'rgba(148,163,184,0.6)', fontWeight: 500 }}>
          {label}
        </div>
      </div>

      <div className="text-right shrink-0">
        {trend && (
          <div className="flex items-center gap-1 text-xs font-bold" style={{ color: '#10b981' }}>
            <TrendingUp size={11} />
            +{trend}%
          </div>
        )}
        {extraLabel && (
          <div style={{ fontSize: 10, color: 'rgba(148,163,184,0.4)', marginTop: 2 }}>
            {extraLabel}
          </div>
        )}
      </div>
    </motion.div>
  )
}
