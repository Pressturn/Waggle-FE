const getUserRole = (): 'OWNER' | 'MEMBER' | null => {
    try {
        const accountString = localStorage.getItem('account')
        if (!accountString) return null

        const account = JSON.parse(accountString)
        console.log('Full account:', account)
        console.log('Role:', account?.profile?.role)
        return account?.profile?.role || null
    } catch {
        return null
    }
}

export default getUserRole