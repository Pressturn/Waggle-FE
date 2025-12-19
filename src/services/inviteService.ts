import api from '../utils/api'

export interface createInviteData {
    role: 'MEMBER'
}

export interface InviteResponse {
    message: string
    code: string
    role: string
    expiresAt: string
}

const inviteService = {
    create: async (data: createInviteData): Promise<InviteResponse> => {
        const response = await api.post('/invites', data)
        return response.data
    }
}

export default inviteService