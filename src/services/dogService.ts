import api from '../utils/api'

export interface Dog {
    id: string
    name: string
    breed?: string
    age?: number
    weight?: number
    photo?: string
    allergies?: string
    dietaryRestrictions?: string
    medication?: string
    vetContact?: string
}

export interface CreateDogData {
    name: string
    breed?: string
    age?: number
    weight?: number
    photo?: string
    allergies?: string
    dietaryRestrictions?: string
    medication?: string
    vetContact?: string
}

const dogService = {
    getAll: async (): Promise<{ dogs: Dog[] }> => {
        const response = await api.get('/dogs')
        return response.data
    },

    getOne: async (id: string): Promise<{ dog: Dog }> => {
        const response = await api.get(`/dogs/${id}`)
        return response.data
    },

    create: async (data: CreateDogData): Promise<{ message: string; dog: Dog }> => {
        const response = await api.post('/dogs', data)
        return response.data
    },

    update: async (id: string, data: Partial<CreateDogData>): Promise<{ message: string; dog: Dog }> => {
        const response = await api.put(`/dog/${id}`, data)
        return response.data
    },

    delete: async (id: string): Promise<{ message: string }> => {
        const response = await api.delete(`/dogs/${id}`)
        return response.data
    }
}

export default dogService