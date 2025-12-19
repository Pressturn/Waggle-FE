const getUserRole = (): 'OWNER' | 'MEMBER' | null => {
    try {
        const accountString = localStorage.getItem('account')
        if (!accountString) return null

        const account = JSON.parse(accountString)
       
        return account?.profile?.role || null
    } catch {
        return null
    }
}

export default getUserRole