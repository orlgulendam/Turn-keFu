import { NavLink, useLocation } from 'react-router-dom'
import {
  LayoutDashboard, Camera, Flame, CreditCard, WalletCards,
  BarChart3, GraduationCap, Shield, Settings, Cpu
} from 'lucide-react'

const navItems = [
  { path: '/dashboard',  icon: LayoutDashboard, label: 'Dashboard',      badge: null },
  { path: '/cameras',    icon: Camera,          label: 'Kamera',         badge: 8    },
  { path: '/fire',       icon: Flame,           label: 'Yangın Alarm',   badge: null },
  { path: '/access',     icon: CreditCard,      label: 'Kartlı Geçiş',  badge: null },
  { path: '/cards',      icon: CreditCard,      label: 'Kart Yönetimi', badge: null },
  { path: '/devices',    icon: Cpu,             label: 'Turnike Cihaz', badge: null },
  { path: '/statistics', icon: BarChart3,       label: 'İstatistikler', badge: null },
  { path: '/students',   icon: GraduationCap,   label: 'Öğrenci Bilgi', badge: null },
  { path: '/logs',       icon: Shield,          label: 'Güvenlik Log',  badge: null },
  { path: '/settings',   icon: Settings,        label: 'Ayarlar',        badge: null },
]

export default function Sidebar() {
  const location = useLocation()

  return (
    <aside
      className="sidebar-bg flex flex-col shrink-0 h-full"
      style={{ width: '170px', borderRight: '1px solid rgba(255,255,255,0.07)' }}
    >
      {/* Logo */}
      <div className="flex flex-col items-center pt-6 pb-5" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div
          className="flex items-center justify-center rounded-xl mb-3"
          style={{
            width: 44,
            height: 44,
            background: 'linear-gradient(135deg, #7c3aed, #06b6d4)',
            boxShadow: '0 4px 20px rgba(124,58,237,0.5)',
          }}
        >
          {/* B icon */}
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
            <path d="M5 3h8a4 4 0 0 1 0 8H5V3Z" fill="white" fillOpacity="0.9"/>
            <path d="M5 11h9a4 4 0 0 1 0 8H5V11Z" fill="white" fillOpacity="0.7"/>
          </svg>
        </div>
        <span className="font-black text-white tracking-widest text-lg">FÜ</span>
        <span style={{ fontSize: 9, letterSpacing: '2px', color: 'rgba(139,92,246,0.7)', fontWeight: 600 }}>
          TURNİKE SİSTEMİ
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-3 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = location.pathname === item.path ||
            (item.path === '/dashboard' && location.pathname === '/')
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className="flex items-center gap-2.5 px-4 py-2.5 relative group transition-all"
              style={isActive ? {
                background: 'linear-gradient(135deg, rgba(124,58,237,0.2), rgba(6,182,212,0.1))',
                borderRight: '2px solid #06b6d4',
              } : {}}
            >
              {/* Hover bg */}
              {!isActive && (
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ background: 'rgba(255,255,255,0.04)' }} />
              )}
              <Icon
                size={15}
                style={{ color: isActive ? '#06b6d4' : 'rgba(148,163,184,0.8)', flexShrink: 0 }}
              />
              <span
                className="text-xs font-medium flex-1"
                style={{ color: isActive ? '#06b6d4' : 'rgba(148,163,184,0.8)' }}
              >
                {item.label}
              </span>
              {item.badge && (
                <span className="badge">{item.badge}</span>
              )}
            </NavLink>
          )
        })}
      </nav>

      {/* User */}
      <div
        className="p-4 flex items-center gap-2.5"
        style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
      >
        <div
          className="flex items-center justify-center rounded-full text-white font-bold shrink-0"
          style={{
            width: 32,
            height: 32,
            background: 'linear-gradient(135deg, #7c3aed, #06b6d4)',
            fontSize: 12,
          }}
        >
          SY
        </div>
        <div className="overflow-hidden">
          <div className="text-xs font-semibold text-white truncate">Sistem Yön.</div>
          <div style={{ fontSize: 9, color: 'rgba(148,163,184,0.5)', fontWeight: 500 }}>v2.4.1</div>
        </div>
      </div>
    </aside>
  )
}
