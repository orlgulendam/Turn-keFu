import Layout from '../components/layout/Layout'
import StatCard from '../components/dashboard/StatCard'
import StatCardSmall from '../components/dashboard/StatCardSmall'
import LogTable from '../components/dashboard/LogTable'
import HourlyChart from '../components/dashboard/HourlyChart'
import TurnikeProgress from '../components/dashboard/TurnikeProgress'
import { useSimulation } from '../hooks/useSimulation'
import {
  Users, GraduationCap, Briefcase, XCircle,
  ArrowLeftRight, CheckCircle, CreditCard, CalendarDays,
  Play, Pause
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Dashboard() {
  const { logs, stats, turnikeData, isRunning, toggle } = useSimulation(3000)

  // stats henüz yüklenmediyse skeleton göster
  if (!stats || !turnikeData) {
    return (
      <Layout title="Kartlı Geçiş Dashboard">
        <div className="flex items-center justify-center h-full">
          <div className="flex flex-col items-center gap-4">
            <div className="w-10 h-10 rounded-full border-2 border-t-transparent animate-spin"
              style={{ borderColor: '#7c3aed', borderTopColor: 'transparent' }} />
            <span style={{ color: 'rgba(148,163,184,0.6)', fontSize: 14 }}>Yükleniyor...</span>
          </div>
        </div>
      </Layout>
    )
  }

  return (
    <Layout title="Kartlı Geçiş Dashboard">
      <div className="flex flex-col gap-4 h-full">

        {/* Simulation control bar */}
        <div className="flex items-center justify-end gap-3">
          {/* Live entry flash indicator */}
          <AnimatePresence>
            {isRunning && (
              <motion.div
                key="sim-badge"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold"
                style={{
                  background: 'rgba(124,58,237,0.12)',
                  border: '1px solid rgba(124,58,237,0.3)',
                  color: '#a78bfa',
                }}
              >
                <span className="relative flex h-1.5 w-1.5">
                  <span className="live-ring absolute inline-flex h-full w-full rounded-full"
                    style={{ background: '#7c3aed' }} />
                  <span className="live-dot relative inline-flex h-1.5 w-1.5 rounded-full"
                    style={{ background: '#7c3aed' }} />
                </span>
                Simülasyon Aktif · 3sn
              </motion.div>
            )}
          </AnimatePresence>

          <button
            onClick={toggle}
            className="flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold transition-all hover:scale-105 active:scale-95"
            style={isRunning ? {
              background: 'rgba(239,68,68,0.12)',
              border: '1px solid rgba(239,68,68,0.3)',
              color: '#ef4444',
              cursor: 'pointer',
            } : {
              background: 'linear-gradient(135deg, #7c3aed, #06b6d4)',
              border: 'none',
              color: 'white',
              cursor: 'pointer',
              boxShadow: '0 4px 15px rgba(124,58,237,0.4)',
            }}
          >
            {isRunning
              ? <><Pause size={12} /> Durdur</>
              : <><Play  size={12} /> Başlat</>
            }
          </button>
        </div>

        {/* Row 1 — Big stat cards */}
        <div className="flex gap-4">
          <StatCard
            icon={Users}
            value={stats.totalUsers}
            label="Toplam Kullanıcı"
            sublabel={`${stats.activeUsers.toLocaleString('tr-TR')} aktif`}
            glowColor="#7c3aed"
            iconBg="linear-gradient(135deg, #7c3aed, #5b21b6)"
            delay={0}
          />
          <StatCard
            icon={GraduationCap}
            value={stats.students}
            label="Öğrenci"
            sublabel={`${stats.activeStudents.toLocaleString('tr-TR')} aktif`}
            glowColor="#06b6d4"
            iconBg="linear-gradient(135deg, #06b6d4, #0284c7)"
            delay={100}
          />
          <StatCard
            icon={Briefcase}
            value={stats.staff}
            label="Çalışan"
            sublabel="Tümü aktif"
            glowColor="#10b981"
            iconBg="linear-gradient(135deg, #10b981, #059669)"
            delay={200}
          />
          <StatCard
            icon={XCircle}
            value={stats.failedAccess}
            label="Başarısız Geçiş"
            sublabel="Son 30 gün"
            trend={stats.failedTrend}
            glowColor="#ef4444"
            iconBg="linear-gradient(135deg, #ef4444, #dc2626)"
            delay={300}
          />
        </div>

        {/* Row 2 — Small stat cards */}
        <div className="flex gap-4">
          <StatCardSmall
            icon={ArrowLeftRight}
            value={stats.totalAccess}
            label="Toplam Geçiş"
            trend={stats.accessTrend}
            iconColor="#06b6d4"
            delay={0}
          />
          <StatCardSmall
            icon={CheckCircle}
            value={stats.successfulAccess}
            label="Başarılı Geçiş"
            trend={stats.successTrend}
            iconColor="#10b981"
            delay={80}
          />
          <StatCardSmall
            icon={CreditCard}
            value={stats.totalCards}
            label="Toplam Kart"
            iconColor="#7c3aed"
            delay={160}
          />
          <StatCardSmall
            icon={CalendarDays}
            value={stats.todayAccess}
            label="Bugünkü Geçiş"
            extraLabel={stats.todayDate}
            iconColor="#fbbf24"
            delay={240}
          />
        </div>

        {/* Row 3 — Bottom panels */}
        <div className="flex gap-4 flex-1 min-h-0" style={{ minHeight: 320 }}>
          {/* Left — Live log table */}
          <div className="flex-1 min-w-0">
            <LogTable logs={logs} />
          </div>

          {/* Right — Charts */}
          <div className="flex flex-col gap-4" style={{ width: 340, flexShrink: 0 }}>
            <HourlyChart />
            <TurnikeProgress turnikeData={turnikeData} />
          </div>
        </div>

      </div>
    </Layout>
  )
}
