import api from '../utils/api'

export interface SignUpData {
    name: string
    email: string
    password: string
}

export interface SignInData {
    email: string
    password: string
}

export interface AuthResponse {
    message: string
    token: string
    account: {
        id: string
        name: string
        email: string
    }
}

const authService = {
    signUp: async (data: SignUpData): Promise<AuthResponse> => {
        const response = await api.post('/auth/signup', data)
        return response.data
    },

    signIn: async (data: SignInData): Promise<AuthResponse> => {
        const response = await api.post('/auth/signin', data)
        return response.data
    },

    signOut: () => {
        localStorage.removeItem('token')
        localStorage.removeItem('account')
    },

    getStoredAccount: () => {
        const account = localStorage.getItem('account')
        return account ? JSON.parse(account) : null
    },

    isAuthenticated: () => {
        return !!localStorage.getItem('token')
    }
}

export default authService