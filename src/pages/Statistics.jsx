import { motion } from 'framer-motion'
import Layout from '../components/layout/Layout'
import { weeklyData, hourlyData, monthlyStats, turnikeData } from '../data/mockData'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, AreaChart, Area
} from 'recharts'

const CustomTooltipStyle = {
  background: 'rgba(15,12,41,0.95)',
  border: '1px solid rgba(124,58,237,0.3)',
  borderRadius: 8,
  padding: '8px 12px',
  fontSize: 12,
  color: '#e2e8f0',
}

function SectionCard({ title, subtitle, children, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay }}
      className="rounded-xl p-5"
      style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.07)' }}
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-bold text-white text-sm">{title}</h3>
          {subtitle && <p style={{ fontSize: 11, color: 'rgba(148,163,184,0.5)', marginTop: 2 }}>{subtitle}</p>}
        </div>
      </div>
      {children}
    </motion.div>
  )
}

export default function Statistics() {
  return (
    <Layout title="İstatistikler" subtitle="Detaylı analiz ve raporlar">
      <div className="grid gap-4" style={{ gridTemplateColumns: '1fr 1fr' }}>

        {/* Weekly bar chart */}
        <SectionCard title="Haftalık Geçiş Analizi" subtitle="Bu haftanın geçiş istatistikleri" delay={0}>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={weeklyData} barGap={4}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="day" tick={{ fill: 'rgba(148,163,184,0.6)', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: 'rgba(148,163,184,0.6)', fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={CustomTooltipStyle} cursor={{ fill: 'rgba(124,58,237,0.08)' }} />
              <Bar dataKey="successful" fill="#7c3aed" radius={[4, 4, 0, 0]} name="Başarılı" />
              <Bar dataKey="failed" fill="#ef4444" radius={[4, 4, 0, 0]} name="Başarısız" />
            </BarChart>
          </ResponsiveContainer>
        </SectionCard>

        {/* Hourly area chart */}
        <SectionCard title="Saatlik Yoğunluk Eğrisi" subtitle="Bugün · 08:00 - 15:00" delay={0.1}>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={hourlyData}>
              <defs>
                <linearGradient id="hourGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#7c3aed" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#7c3aed" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="hour" tick={{ fill: 'rgba(148,163,184,0.6)', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: 'rgba(148,163,184,0.6)', fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={CustomTooltipStyle} />
              <Area type="monotone" dataKey="value" stroke="#7c3aed" strokeWidth={2.5} fill="url(#hourGrad)" name="Geçiş" />
            </AreaChart>
          </ResponsiveContainer>
        </SectionCard>

        {/* Monthly users line chart */}
        <SectionCard title="Aylık Kullanıcı Büyümesi" subtitle="Ocak - Mayıs 2026" delay={0.2}>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={monthlyStats}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="month" tick={{ fill: 'rgba(148,163,184,0.6)', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: 'rgba(148,163,184,0.6)', fontSize: 11 }} axisLine={false} tickLine={false} domain={[44000, 50000]} />
              <Tooltip contentStyle={CustomTooltipStyle} />
              <Line type="monotone" dataKey="users" stroke="#06b6d4" strokeWidth={2.5} dot={{ fill: '#06b6d4', r: 4 }} name="Kullanıcı" />
            </LineChart>
          </ResponsiveContainer>
        </SectionCard>

        {/* Turnike density */}
        <SectionCard title="Turnike Karşılaştırması" subtitle="Günlük yoğunluk oranları" delay={0.3}>
          <div className="flex flex-col gap-4 mt-1">
            {turnikeData.map((item, i) => (
              <div key={item.name} className="flex items-center gap-3">
                <span style={{ width: 80, fontSize: 12, color: 'rgba(226,232,240,0.8)', fontWeight: 600, flexShrink: 0 }}>
                  {item.name}
                </span>
                <div className="flex-1 rounded-full overflow-hidden" style={{ height: 10, background: 'rgba(255,255,255,0.07)' }}>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${item.percent}%` }}
                    transition={{ duration: 1, delay: i * 0.15 + 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="h-full rounded-full"
                    style={{ background: `linear-gradient(90deg, ${item.gradientFrom}, ${item.gradientTo})` }}
                  />
                </div>
                <span style={{ width: 40, fontSize: 13, fontWeight: 700, color: '#a78bfa', textAlign: 'right', flexShrink: 0 }}>
                  {item.percent}%
                </span>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>
    </Layout>
  )
}
