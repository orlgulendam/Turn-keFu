import { motion } from 'framer-motion'

export default function TurnikeProgress({ turnikeData = [] }) {
  return (
    <div
      className="rounded-xl p-5"
      style={{
        background: 'rgba(255,255,255,0.025)',
        border: '1px solid rgba(255,255,255,0.07)',
      }}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-white text-sm">Turnike Yoğunluğu</h3>
        <span style={{ fontSize: 11, color: 'rgba(148,163,184,0.5)' }}>Anlık</span>
      </div>

      <div className="flex flex-col gap-3">
        {turnikeData.map((item, i) => (
          <div key={item.name}>
            <div className="flex items-center justify-between mb-1.5">
              <span
                style={{ fontSize: 12, color: 'rgba(226,232,240,0.8)', fontWeight: 600 }}
              >
                {item.name}
              </span>
              {/* Percent animates when value changes */}
              <motion.span
                key={item.percent}
                initial={{ scale: 1.3, color: '#ffffff' }}
                animate={{ scale: 1,   color: i === 0 ? '#ec4899' : '#7c3aed' }}
                transition={{ duration: 0.3 }}
                className="font-bold"
                style={{ fontSize: 13 }}
              >
                {item.percent}%
              </motion.span>
            </div>
            <div
              className="w-full rounded-full overflow-hidden"
              style={{ height: 7, background: 'rgba(255,255,255,0.07)' }}
            >
              <motion.div
                animate={{ width: `${item.percent}%` }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="h-full rounded-full"
                style={{
                  background: `linear-gradient(90deg, ${item.gradientFrom}, ${item.gradientTo})`,
                  boxShadow: `0 0 8px ${item.gradientFrom}60`,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
