import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import dogService, { type Dog } from '../services/dogService'

function usePetDetails() {
    const { dogId } = useParams()
    const [dog, setDog] = useState<Dog | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [showEditPetForm, setShowEditPetForm] = useState(false)
    const [saving, setSaving] = useState(false)

    const [petFormData, setPetFormData] = useState({
        name: '',
        breed: '',
        age: 0,
        weight: 0,
        allergies: '',
        dietaryRestrictions: '',
    })

    useEffect(() => {
        if (dogId) {
            fetchDog()
        }
    }, [dogId])

    const fetchDog = async () => {
        if (!dogId) {
            setError('Dog Id Missing')
            setLoading(false)
            return
        }
        try {
            const data = await dogService.getOne(dogId)
            setDog(data.dog)

            setPetFormData({
                name: data.dog.name || '',
                breed: data.dog.breed || '',
                age: data.dog.age || 0,
                weight: data.dog.weight || 0,
                allergies: data.dog.allergies || '',
                dietaryRestrictions: data.dog.dietaryRestrictions || '',
            })
        } catch (error) {
            setError(error instanceof Error ? error.message : 'Failed to fetch dog')
        } finally {
            setLoading(false)
        }
    }

    const handleSave = async () => {
        if (!dogId) return

        setSaving(true)
        try {
            await dogService.update(dogId, petFormData)
            await fetchDog()

            setShowEditPetForm(false)
        } catch (error) {
            setError(error instanceof Error ? error.message : 'Failed to update dog details')
        } finally {
            setSaving(false)
        }
    }


    const handleFormChange = (field: string, value: string | number) => {
        setPetFormData({
            ...petFormData,
            [field]: value
        })
    }

    const toggleEditMode = () => {
        setShowEditPetForm(!showEditPetForm)
    }

    return {
        dog,
        loading,
        error,
        showEditPetForm,
        saving,
        petFormData,
        handleSave,
        handleFormChange,
        toggleEditMode,
        setPetFormData,
    }
}


export default usePetDetails 