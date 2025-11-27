import { ReactNode } from 'react'
import { FiHome, FiList, FiHeart, FiUsers, FiSettings } from 'react-icons/fi'

interface MainLayoutProps {
    children: ReactNode
}
const navItems = [
    { icon: FiHome, label: 'Dashboard', path: '/' },
    { icon: FiList, label: 'Activity Log', path: '/activity' },
    { icon: FiHeart, label: 'My Pets', path: '/pets' },
    { icon: FiUsers, label: 'Caregivers', path: '/caregivers' },
    { icon: FiSettings, label: 'Settings', path: '/settings' },
]


function MainLayout({ children }: MainLayoutProps) {
    return (
        <div className="flex min-h-screen bg-gray-100">
            <aside className="w-64 bg-slate-900 text-white p-6 flex flex-col">
                <h1 className="text-2xl font-bold mb-8">Waggle</h1>

                <nav className="space-y-2 flex-1">
                    {navItems.map((item) => (
                        <a
                            key={item.path}
                            href={item.path}
                            className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-slate-800 hover:text-white"
                            >
                            <item.icon size={20} />
                            <span>{item.label}</span>
                        </a>
                    ))}
                </nav>

                <div className="flex items-center gap-3 pt-6 border-t border-slate-700">
                    <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center font-bold">
                        p
                    </div>

                    <div>
                        <p className="font-medium">Preston</p>
                        <p className="text-sm text-gray-400">Owner</p>
                    </div>
                </div>
            </aside>
            <main className="flex-1 p-8">
                {children}
            </main>
        </div >
    )
}
export default MainLayout