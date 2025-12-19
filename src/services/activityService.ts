import api from '../utils/api'

export interface Activity {
    id: string
    type: 'MEAL' | 'WALK' | 'PLAY' | 'WATER' | 'MEDICATION'
    date: string
    time?: string
    foodType?: string
    portion?: string
    activityKind?: string
    medication?: string
    notes?: string
    photo?: string
    timestamp: string
    dog: {
        id: string
        name: string
    }
    loggedBy: {
        id: string
        name: string
    }
}

export interface CreateActivityData {
    type: 'MEAL' | 'WALK' | 'PLAY' | 'WATER' | 'MEDICATION'
    date: string
    time?: string
    foodType?: string
    portion?: string
    activityKind?: string
    medication?: string
    notes?: string
    photo?: string
    dogId: string
}


const activityService = {

    getAll: async (): Promise<{ activities: Activity[] }> => {
        const response = await api.get('/activities')
        return response.data
    },

    create: async (data: CreateActivityData): Promise<{ message: string; activity: Activity }> => {
        const response = await api.post('/activities', data)
        return response.data
    },

    update: async (id: string, data: Partial<CreateActivityData>): Promise<{ message: string, activity: Activity }> => {
        const response = await api.put(`/activities/${id}`, data)
        return response.data
    },

    delete: async (id: string): Promise<{ message: string }> => {
        const response = await api.delete(`/activities/${id}`)
        return response.data
    }
}
export default activityService