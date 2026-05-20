import { Routes, Route, Navigate } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Cards from './pages/Cards'
import Logs from './pages/Logs'
import Statistics from './pages/Statistics'
import Devices from './pages/Devices'

// Placeholder pages for unimplemented routes
import Layout from './components/layout/Layout'

function PlaceholderPage({ title }) {
  return (
    <Layout title={title}>
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div className="text-6xl mb-4">🚧</div>
          <h2 className="text-2xl font-bold text-white mb-2">{title}</h2>
          <p style={{ color: 'rgba(148,163,184,0.6)' }}>Bu sayfa geliştirme aşamasındadır.</p>
        </div>
      </div>
    </Layout>
  )
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/access" element={<Dashboard />} />
      <Route path="/cards" element={<Cards />} />
      <Route path="/logs" element={<Logs />} />
      <Route path="/statistics" element={<Statistics />} />
      <Route path="/devices" element={<Devices />} />
      <Route path="/cameras" element={<PlaceholderPage title="Kamera Sistemi" />} />
      <Route path="/fire" element={<PlaceholderPage title="Yangın Alarm" />} />
      <Route path="/students" element={<PlaceholderPage title="Öğrenci Bilgi" />} />
      <Route path="/settings" element={<PlaceholderPage title="Ayarlar" />} />
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  )
}
