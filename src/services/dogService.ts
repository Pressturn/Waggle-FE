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


}

export default dogService