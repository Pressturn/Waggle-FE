import { ReactNode } from 'react'
import { FiHome, FiList, FiHeart, FiUsers, FiSettings } from 'react-icons/fi'
import authService from '../services/authService'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

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
    const navigate = useNavigate()
    const account = authService.getStoredAccount()

    useEffect(() => {
        if (!account) {
            navigate('/login')
        }
    }, [account, navigate])

    if (!account) {
        return null
    }

    const userInitial = account.name.charAt(0).toUpperCase()
    const userName = account.name

    return (
        <div className="flex h-screen overflow-hidden bg-gray-100">
            <aside className="w-64 bg-slate-900 text-white p-6 flex flex-col fixed h-full overflow-y-auto">
                <h1 className="text-2xl font-bold mb-8">Waggle</h1>

                <nav className="space-y-2 flex-1">
                    {navItems.map((item) => (
                        <a
                            key={item.path}
                            href={item.path}
                            className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-slate-800 hover:text-white transition"
                        >
                            <item.icon size={20} />
                            <span>{item.label}</span>
                        </a>
                    ))}
                </nav>

                <div className="flex items-center gap-3 pt-6 border-t border-slate-700">
                    <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center font-bold text-lg">
                        {userInitial}
                    </div>

                    <div>
                        <p className="font-medium">{userName}</p>
                    </div>
                </div>
            </aside>

            <main className="flex-1 ml-64 overflow-y-auto p-8">
                {children}
            </main>
        </div>

    )
}


export default MainLayout