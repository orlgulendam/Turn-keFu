import { motion } from 'framer-motion'
import { hourlyData } from '../../data/mockData'

export default function HourlyChart() {
  const maxValue = Math.max(...hourlyData.map(d => d.value))

  return (
    <div
      className="rounded-xl p-5"
      style={{
        background: 'rgba(255,255,255,0.025)',
        border: '1px solid rgba(255,255,255,0.07)',
      }}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-white text-sm">Saatlik Geçiş Analizi</h3>
        <span style={{ fontSize: 11, color: 'rgba(148,163,184,0.5)' }}>Bugün</span>
      </div>

      <div className="flex items-end gap-2" style={{ height: 100 }}>
        {hourlyData.map((bar, i) => {
          const heightPct = (bar.value / maxValue) * 100
          return (
            <div key={bar.hour} className="flex flex-col items-center gap-1 flex-1">
              <motion.div
                initial={{ scaleY: 0, originY: 1 }}
                animate={{ scaleY: 1 }}
                transition={{ duration: 0.6, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                className="w-full rounded-t-md relative group cursor-pointer"
                style={{
                  height: `${heightPct}%`,
                  background: 'linear-gradient(to top, #7c3aed, #06b6d4)',
                  minHeight: 4,
                  transformOrigin: 'bottom',
                }}
              >
                {/* Tooltip */}
                <div
                  className="absolute -top-7 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity
                    px-2 py-0.5 rounded text-xs font-bold text-white whitespace-nowrap pointer-events-none"
                  style={{ background: 'rgba(124,58,237,0.9)', fontSize: 10 }}
                >
                  {bar.value}
                </div>
              </motion.div>
              <span style={{ fontSize: 10, color: 'rgba(148,163,184,0.45)', fontWeight: 500 }}>
                {bar.hour}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
