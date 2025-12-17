import { useState } from 'react'
import dogService from '../services/dogService'

function useDeletePet() {
    const [deleting, setDeleting] = useState(false)
    const [error, setError] = useState('')

    const handleDelete = async (dogId: string) => {
        setDeleting(true)
        setError('')

        try {
            await dogService.delete(dogId)
            return true
        } catch (error) {
            setError(error instanceof Error ? error.message : 'Failed to delete pet')
            return false
        } finally {
            setDeleting(false)
        }
    }

    return {
        handleDelete,
        deleting,
        error
    }
}

export default useDeletePet