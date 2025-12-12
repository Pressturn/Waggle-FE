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
        const { token, account } = response.data

        localStorage.setItem('token', token)
        localStorage.setItem('account', JSON.stringify(account))

        return response.data
    },

    signIn: async (data: SignInData): Promise<AuthResponse> => {
        const response = await api.post('/auth/signin', data)
        const { token, account } = response.data

        localStorage.setItem('token', token)
        localStorage.setItem('account', JSON.stringify(account))
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