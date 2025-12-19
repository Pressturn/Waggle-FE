import { useNavigate } from 'react-router-dom'
import authService from '../services/authService'

function Settings() {
    const navigate = useNavigate()

    const handleLogout = () => {
        authService.signOut()
        navigate('/signin')
    }

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <h1 className="text-4xl font-semibold text-gray-700 mb-8">Settings</h1>

            <div className="bg-white rounded-2xl shadow-sm p-8 border border-gray-200 max-w-2xl">
                <h2 className="text-xl font-semibold text-gray-700 mb-4">Account</h2>

                <button
                    onClick={handleLogout}
                    className="px-6 py-3 bg-red-500 text-white rounded-xl hover:bg-red-600 transition font-medium"
                >
                    Logout
                </button>
            </div>
        </div>
    )
}

export default Settings