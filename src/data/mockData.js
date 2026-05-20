// Mock data for FÜ Turnike Yönetim Sistemi

export const stats = {
  totalUsers: 49390,
  activeUsers: 49389,
  students: 43463,
  activeStudents: 43462,
  staff: 5927,
  activeStaff: 5927,
  failedAccess: 7418,
  failedTrend: -5,
  totalAccess: 44927,
  accessTrend: 12,
  successfulAccess: 37435,
  successTrend: 8,
  totalCards: 46625,
  todayAccess: 734,
  todayDate: '29.04.2026',
}

export const recentLogs = [
  {
    id: 1,
    name: 'Mehmet Sıdık Karakaya',
    type: 'Öğrenci',
    device: 'SAĞ 4-5',
    time: '11:33',
    status: 'BAŞARILI',
    gradientFrom: '#7c3aed',
    gradientTo: '#06b6d4',
    initials: 'MK',
  },
  {
    id: 2,
    name: 'Beyza Nur Karadağ',
    type: 'Öğrenci',
    device: 'SOL 2',
    time: '11:33',
    status: 'BAŞARILI',
    gradientFrom: '#ec4899',
    gradientTo: '#7c3aed',
    initials: 'BK',
  },
  {
    id: 3,
    name: 'Elif Cankara',
    type: 'Öğrenci',
    device: 'SOL 2',
    time: '11:30',
    status: 'BAŞARILI',
    gradientFrom: '#06b6d4',
    gradientTo: '#10b981',
    initials: 'EC',
  },
  {
    id: 4,
    name: 'Veysel Şahin Düzgün',
    type: 'Çalışan',
    device: 'SAĞ 4-5',
    time: '11:22',
    status: 'BAŞARISIZ',
    gradientFrom: '#ef4444',
    gradientTo: '#fbbf24',
    initials: 'VD',
  },
  {
    id: 5,
    name: 'Yusuf Yıldız',
    type: 'Öğrenci',
    device: 'SAĞ 2-3',
    time: '11:21',
    status: 'BAŞARILI',
    gradientFrom: '#10b981',
    gradientTo: '#06b6d4',
    initials: 'YY',
  },
  {
    id: 6,
    name: 'Şule Nur Baygut',
    type: 'Öğrenci',
    device: 'SAĞ 3',
    time: '11:28',
    status: 'BAŞARILI',
    gradientFrom: '#fbbf24',
    gradientTo: '#ec4899',
    initials: 'ŞB',
  },
]

export const hourlyData = [
  { hour: '08', value: 45, label: '08:00' },
  { hour: '09', value: 68, label: '09:00' },
  { hour: '10', value: 82, label: '10:00' },
  { hour: '11', value: 100, label: '11:00' },
  { hour: '12', value: 73, label: '12:00' },
  { hour: '13', value: 58, label: '13:00' },
  { hour: '14', value: 39, label: '14:00' },
  { hour: '15', value: 22, label: '15:00' },
]

export const turnikeData = [
  { name: 'ANA GİRİŞ', percent: 93, gradientFrom: '#ec4899', gradientTo: '#7c3aed' },
  { name: 'SAĞ 4-5', percent: 87, gradientFrom: '#7c3aed', gradientTo: '#06b6d4' },
  { name: 'SOL 2', percent: 74, gradientFrom: '#7c3aed', gradientTo: '#06b6d4' },
  { name: 'SAĞ 2-3', percent: 61, gradientFrom: '#06b6d4', gradientTo: '#10b981' },
  { name: 'SOL 3', percent: 45, gradientFrom: '#06b6d4', gradientTo: '#10b981' },
]

export const allCards = [
  { id: 'C001', userId: 'U10001', name: 'Mehmet Sıdık Karakaya', type: 'Öğrenci', department: 'Bilgisayar Müh.', status: 'Aktif', cardNo: '8A4F2C1D', lastUsed: '11:33', date: '20.05.2026' },
  { id: 'C002', userId: 'U10002', name: 'Beyza Nur Karadağ', type: 'Öğrenci', department: 'Elektrik-Elektronik', status: 'Aktif', cardNo: '3B8E9F2A', lastUsed: '11:33', date: '20.05.2026' },
  { id: 'C003', userId: 'U10003', name: 'Elif Cankara', type: 'Öğrenci', department: 'Makine Müh.', status: 'Aktif', cardNo: '7D1C4A6B', lastUsed: '11:30', date: '20.05.2026' },
  { id: 'C004', userId: 'U10004', name: 'Veysel Şahin Düzgün', type: 'Çalışan', department: 'Güvenlik', status: 'Pasif', cardNo: '2F5E8G9H', lastUsed: '11:22', date: '20.05.2026' },
  { id: 'C005', userId: 'U10005', name: 'Yusuf Yıldız', type: 'Öğrenci', department: 'İnşaat Müh.', status: 'Aktif', cardNo: '9K2M5P7Q', lastUsed: '11:21', date: '20.05.2026' },
  { id: 'C006', userId: 'U10006', name: 'Şule Nur Baygut', type: 'Öğrenci', department: 'Mimarlık', status: 'Aktif', cardNo: '4N8R1T3V', lastUsed: '11:28', date: '20.05.2026' },
  { id: 'C007', userId: 'U10007', name: 'Ali Kemal Öztürk', type: 'Öğretim Görevlisi', department: 'Matematik', status: 'Aktif', cardNo: '6W9X2Y5Z', lastUsed: '09:15', date: '20.05.2026' },
  { id: 'C008', userId: 'U10008', name: 'Fatma Zehra Arslan', type: 'Öğrenci', department: 'Fizik', status: 'Aktif', cardNo: '1A4B7C0D', lastUsed: '10:42', date: '20.05.2026' },
]

export const securityLogs = [
  ...recentLogs,
  { id: 7, name: 'Ali Kemal Öztürk', type: 'Öğretim Görevlisi', device: 'ANA GİRİŞ', time: '09:15', status: 'BAŞARILI', gradientFrom: '#7c3aed', gradientTo: '#10b981', initials: 'AÖ' },
  { id: 8, name: 'Fatma Zehra Arslan', type: 'Öğrenci', device: 'SOL 3', time: '10:42', status: 'BAŞARILI', gradientFrom: '#06b6d4', gradientTo: '#ec4899', initials: 'FA' },
  { id: 9, name: 'Hasan Çelik', type: 'Öğrenci', device: 'SAĞ 2-3', time: '10:15', status: 'BAŞARISIZ', gradientFrom: '#ef4444', gradientTo: '#7c3aed', initials: 'HÇ' },
  { id: 10, name: 'Ayşe Kaya', type: 'Çalışan', device: 'ANA GİRİŞ', time: '08:30', status: 'BAŞARILI', gradientFrom: '#10b981', gradientTo: '#06b6d4', initials: 'AK' },
]

export const devices = [
  { id: 'T001', name: 'ANA GİRİŞ', location: 'Ana Kampüs Girişi', status: 'Aktif', type: 'Çift Yönlü', todayPass: 734, lastPing: '11:33', ip: '192.168.1.101', firmware: 'v2.4.1' },
  { id: 'T002', name: 'SAĞ 4-5', location: 'Sağ Kanat - Kat 4-5', status: 'Aktif', type: 'Tek Yönlü', todayPass: 312, lastPing: '11:33', ip: '192.168.1.102', firmware: 'v2.4.1' },
  { id: 'T003', name: 'SOL 2', location: 'Sol Kanat - Kat 2', status: 'Aktif', type: 'Tek Yönlü', todayPass: 267, lastPing: '11:30', ip: '192.168.1.103', firmware: 'v2.3.8' },
  { id: 'T004', name: 'SAĞ 2-3', location: 'Sağ Kanat - Kat 2-3', status: 'Aktif', type: 'Çift Yönlü', todayPass: 189, lastPing: '11:22', ip: '192.168.1.104', firmware: 'v2.4.1' },
  { id: 'T005', name: 'SOL 3', location: 'Sol Kanat - Kat 3', status: 'Bakımda', type: 'Tek Yönlü', todayPass: 0, lastPing: '09:45', ip: '192.168.1.105', firmware: 'v2.3.5' },
  { id: 'T006', name: 'ARKA GİRİŞ', location: 'Arka Kampüs Kapısı', status: 'Aktif', type: 'Çift Yönlü', todayPass: 98, lastPing: '11:31', ip: '192.168.1.106', firmware: 'v2.4.1' },
]

export const weeklyData = [
  { day: 'Pzt', total: 4231, successful: 3820, failed: 411 },
  { day: 'Sal', total: 3987, successful: 3651, failed: 336 },
  { day: 'Çar', total: 5142, successful: 4701, failed: 441 },
  { day: 'Per', total: 4876, successful: 4432, failed: 444 },
  { day: 'Cum', total: 3654, successful: 3321, failed: 333 },
  { day: 'Cmt', total: 1243, successful: 1180, failed: 63 },
  { day: 'Paz', total: 543, successful: 521, failed: 22 },
]

export const monthlyStats = [
  { month: 'Oca', users: 45210 },
  { month: 'Şub', users: 46890 },
  { month: 'Mar', users: 47340 },
  { month: 'Nis', users: 48120 },
  { month: 'May', users: 49390 },
]
