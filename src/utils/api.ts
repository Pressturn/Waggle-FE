const API_BASE_URL = 'http://localhost:5001/api'

const api = {
    baseUrl: API_BASE_URL,
    
    getToken: () => localStorage.getItem('token'),

    getHeaders: (includeAuth = true) => {
        const headers: Record<string, string> = {
            'Content-type': 'application/json'
        }

        if (includeAuth) {
            const token = localStorage.getItem('token')
            if (token) {
                headers['Authorization'] = `Bearer ${token}`
            }
        }
    }

}



export default api