import Sidebar from './Sidebar'
import Topbar from './Topbar'

export default function Layout({ children, title, subtitle }) {
  return (
    <div className="flex h-screen w-screen overflow-hidden">
      <Sidebar />
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <Topbar title={title} subtitle={subtitle} />
        <main className="flex-1 overflow-y-auto overflow-x-hidden p-5">
          {children}
        </main>
      </div>
    </div>
  )
}
