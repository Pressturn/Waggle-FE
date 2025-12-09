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
    const [showEditPetForm, setShowEditPetForm] = useState(false)

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


    if (showEditPetForm) {
        return (
            <div>
                <h1> Edit Mode</h1>
                <p> Name: {dog.name}</p>
                <input type="text" value={dog.name} />
                <input type="text" value={dog.breed} />
                <input type="number" value={dog.age} />
                <input type="number" value={dog.weight} />

                <button onClick={() => setShowEditPetForm(false)}>Cancel</button>
                <button> Save Changes</button>
            </div>
        )
    }
    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <button onClick={() => navigate('/pets')}
                className="mb-6 px-4 py-2 bg-white rounded-full shadow-sm border border-gray-200 text-gray-600 hover:bg-gray-50 transition flex items-center gap-2"
            >
                ← Back to Pets
            </button>

            <div className="bg-white rounded-2xl shadow-sm p-8 border border-gray-200 mb-8">
                <div className="flex gap-6">
                    <div className="w-56 h-56 bg-gray-200 rounded-2xl overflow-hidden flex-shrink-0">
                        {dog.photo ? (
                            <img src={dog.photo} alt={dog.name} className="w-full h-full object-cover" />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-400">
                                No Image
                            </div>
                        )}
                    </div>

                    <div className="flex-1">
                        <div className="flex justify-between items-start mb-4">
                            <h1 className="text-4xl font-semibold text-gray-800">{dog.name}</h1>
                            <button
                                onClick={() => setShowEditPetForm(true)}
                                className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition flex items-center gap-2">
                                Edit Pet
                            </button>
                        </div>

                        <div className="flex gap-6 text-gray-600 mb-6">
                            <span>{dog.breed}</span>
                            <span>{dog.age} years old</span>
                            <span>{dog.weight} kg</span>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <p className="text-sm font-medium text-gray-500 mb-1">Allergies</p>
                                <p className="text-gray-800">{dog.allergies || 'None'}</p>
                            </div>

                            <div>
                                <p className="text-sm font-medium text-gray-500 mb-1">Dietary Restrictions</p>
                                <p className="text-gray-800">{dog.dietaryRestrictions || 'None'}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PetDetails