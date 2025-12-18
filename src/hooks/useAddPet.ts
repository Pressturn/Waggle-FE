import { useState } from 'react'
import dogService from '../services/dogService'

function useAddPet() {

    const [petFormData, setPetFormData] = useState({
        name: '',
        breed: '',
        age: 0,
        weight: 0,
        allergies: '',
        dietaryRestrictions: '',
    })

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const handleSubmit = async () => {
        if (!petFormData.name) {
            setError('Name is required')
            return false
        }

        setLoading(true)
        setError('')

        try {
            await dogService.create(petFormData)

            setPetFormData({
                name: '',
                breed: '',
                age: 0,
                weight: 0,
                allergies: '',
                dietaryRestrictions: '',
            })

            return true
        } catch (error) {
            setError(error instanceof Error ? error.message : 'Failed to add pet')
            return false
        } finally {
            setLoading(false)
        }
    }

    return {
        petFormData,
        loading,
        error,
        setPetFormData,
        handleSubmit,
    }
}

export default useAddPet