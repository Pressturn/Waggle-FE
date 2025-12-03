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
        const response = await fetch(`${api.baseUrl}/auth/signup`, {
            method: 'POST',
            headers: api.getHeaders(false),
            body: JSON.stringify(data)
        })

        const result = await response.json

        if (!response.ok) {
            throw new Error(result.message || 'Signup failed')
        }

        return result
    }
}



export default authService