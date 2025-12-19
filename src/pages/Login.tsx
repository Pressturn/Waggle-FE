import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import authService from '../services/authService'
import logo from '../assets/logo.svg'

function Login() {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })

    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        })
    }

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault()
        setError('')
        setLoading(true)

        try {
            const data = await authService.signIn(formData)
            localStorage.setItem('token', data.token)
            localStorage.setItem('account', JSON.stringify(data.account))
            navigate('/')
        } catch (error: any) {
            if (error.response && error.response.data && error.response.data.message) {
                setError(error.response.data.message)
            } else {
                setError('Login failed. Please try again.')
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-linear-to-br from-blue-200 via-white to-green-200 flex flex-col items-center justify-center p-4">
            <div className="bg-white/80 backdrop-blur-sm p-10 rounded-2xl shadow-lg w-full max-w-md">

                <div className="flex justify-center mb-6">
                    <img
                        src={logo}
                        alt="Waggle"
                        className="h-16"
                    />
                </div>

                <div className="text-center mb-8">
                    <h1 className="text-3xl font-semibold text-gray-800 mb-2">Welcome Back</h1>
                    <p className="text-gray-500">Sign in to your account to continue</p>
                </div>

                {error && (
                    <div className="bg-red-100 text-red-600 p-3 rounded-lg mb-4">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-2">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-slate-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300 placeholder-gray-400"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-2">
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Enter your password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-slate-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300 placeholder-gray-400"
                            required
                        />
                    </div>

                    <div className="flex items-center justify-between">
                        <label className="flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                className="w-4 h-4 accent-gray-700 mr-2"
                            />
                            <span className="text-sm text-gray-600">Remember me</span>
                        </label>
                        <Link to="/login" className="text-sm text-blue-400 hover:text-blue-500">
                            Forgot password?
                        </Link>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-300 text-white py-3.5 rounded-xl hover:bg-blue-400 disabled:bg-blue-200 font-medium transition-colors"
                    >
                        {loading ? 'Signing in...' : 'Sign In'}
                    </button>
                </form>

                <p className="mt-6 text-center text-gray-600">
                    Don't have an account?{' '}
                    <Link to="/signup" className="text-blue-400 hover:text-blue-500 font-medium">
                        Sign Up
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default Login