import React from 'react'
import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import dogService, { Dog } from '../services/dogService'

function PetDetails() {
    const { dogId } = useParams()
    const navigate = useNavigate()
    const [dog, setDog] = useState<dog | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        if (dogId) {
            fetchDog()
        }
    }, [dogId])

    const fetchDog = async () => {
        if (!dogId) {
            setError('Dog Id Missing')
            setLoading(false)
        }
        try {
            const data = await dogService.getOne(dogId)
            setDog(data.dog)
        } catch (error) {
            setError(error instanceof Error ? error.message : 'Failed to fetch dog')
        } finally {
            setLoading(false)
        }
    }

    if (loading) return <p>Loading</p>
    if (error) return <p> Error: {error}</p>
    if (!dog) return <p>Dog not found</p>

    return (
        <div>
            <button onClick={() => navigate('/pets')}>← Back to Pets</button>
            <h1>{dog.name}</h1>
            <p>Breed: {dog.breed}</p>
            <p>Age: {dog.age} years old</p>
            <p> Weight: {dog.weight} kg</p>
        </div>
    )
}

export default PetDetails