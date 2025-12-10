import React from 'react'
import { useNavigate } from 'react-router-dom'
import usePetDetails from '../hooks/usePetDetails'

function PetDetails() {

    const navigate = useNavigate()

    const {
        dog,
        loading,
        error,
        showEditPetForm,
        saving,
        petFormData,
        handleSave,
        handleFormChange,
        toggleEditMode,
    } = usePetDetails()

    if (loading) return <p>Loading</p>
    if (error) return <p> Error: {error}</p>
    if (!dog) return <p>Dog not found</p>


    if (showEditPetForm) {
        return (
            <div className="min-h-screen bg-gray-100 p-8">
                <div className="flex justify-end gap-3 mb-6">
                    <button
                        onClick={toggleEditMode}
                        className="px-6 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition flex items-center gap-2"
                    >
                        ✕ Cancel
                    </button>
                    <button
                        onClick={handleSave}
                        disabled={saving}
                        className="px-6 py-2 bg-blue-300 text-white rounded-lg hover:bg-blue-400 transition disabled:bg-blue-200 flex items-center gap-2"
                    >
                        {saving ? 'Saving...' : 'Save Changes'}
                    </button>
                </div>

                <div className="bg-white rounded-2xl shadow-sm p-8 border border-gray-200">
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
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                                <input
                                    type="text"
                                    value={petFormData.name}
                                    onChange={(event) => handleFormChange('name', event.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>

                            <div className="grid grid-cols-3 gap-4 mb-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Breed</label>
                                    <input
                                        type="text"
                                        value={petFormData.breed}
                                        onChange={(event) => handleFormChange('breed', event.target.value)}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Age (years)</label>
                                    <input
                                        type="number"
                                        value={petFormData.age || ''}
                                        onChange={(event) => handleFormChange('age', parseInt(event.target.value) || 0)}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Weight (kg)</label>
                                    <input
                                        type="number"
                                        value={petFormData.weight || ''}
                                        onChange={(event) => handleFormChange('weight', parseInt(event.target.value) || 0)}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Allergies</label>
                                <input
                                    type="text"
                                    value={petFormData.allergies}
                                    onChange={(event) => handleFormChange('allergies', event.target.value)}
                                    placeholder="Enter any allergies"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Dietary Restrictions</label>
                                <input
                                    type="text"
                                    value={petFormData.dietaryRestrictions}
                                    onChange={(event) => handleFormChange('dietaryRestrictions', event.target.value)}
                                    placeholder="Enter any dietary restrictions"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <button
                onClick={() => navigate('/pets')}
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
                                onClick={toggleEditMode}
                                className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition flex items-center gap-2"
                            >
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