import { useEffect, useState } from 'react'
import dogService, { type Dog } from "../services/dogService"
import { useNavigate } from 'react-router-dom'
import AddPetModal from '../components/Pet/AddpetModal'
import { uploadDogPhoto } from '../services/SupabaseService/supabaseService'
import getUserRole from '../utils/getUserRole'

function Pets() {
    const navigate = useNavigate()
    const userRole = getUserRole()

    const [dogs, setDogs] = useState<Dog[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [showAddPetModal, setShowAddPetModal] = useState(false)


    const handlePhotoClick = (dogId: string) => {
        const input = document.createElement('input')
        input.type = 'file'
        input.accept = 'image/jpeg,image/png/image,webp'

        input.onchange = async (event) => {
            const target = event.target as HTMLInputElement
            const file = target.files ? target.files[0] : null

            if (!file) {
                return
            }

            const maxSize = 5 * 1024 * 1024
            if (file.size > maxSize) {
                alert('File too large. Maximum size is 5MB')
                return
            }
            try {
                setLoading(true)

                const photoUrl = await uploadDogPhoto(file, dogId)

                await dogService.update(dogId, { photo: photoUrl })

                await fetchDogs()
            } catch (error) {
                alert('Upload failed. Please try again')
            } finally {
                setLoading(false)
            }
        }
        input.click()
    }

    useEffect(() => {
        fetchDogs()
    }, [])

    const fetchDogs = async () => {
        try {
            const data = await dogService.getAll()
            setDogs(data.dogs)

        } catch (error) {
            setError(error instanceof Error ? error.message : 'Failed to fetch dogs')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="flex justify-between items-start mb-2">
                <div>
                    <h1 className="text-4xl font-semibold text-gray-700">My Pets</h1>
                    <p className="text-gray-400 mt-2">Manage your pets and their care team.</p>
                </div>
                <button
                    onClick={() => setShowAddPetModal(true)}
                    className="bg-blue-400 text-white px-5 py-2.5 rounded-lg flex items-center gap-2 hover:bg-blue-400 transition">
                    + Add Pet
                </button>
            </div>

            {loading && <p className="text-gray-600 mt-8">Loading...</p>}
            {error && <p className="text-red-500 mt-8">Error: {error}</p>}

            {dogs.length === 0 ? (
                <div className="bg-white rounded-2xl shadow-sm p-12 text-center border border-gray-200 mt-8">
                    <p className="text-gray-500 text-lg font-medium mb-2">No pets added yet</p>
                    <button
                        onClick={() => setShowAddPetModal(true)}
                        className="bg-blue-400 text-white px-6 py-3 rounded-xl hover:bg-blue-500 transition font-medium inline-flex items-center gap-2"
                    >
                        + Add Your First Pet
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                    {dogs.map(dog => (
                        <div key={dog.id} className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
                            <div
                                className="w-full h-64 bg-gray-200 rounded-2xl mb-4 overflow-hidden flex items-center justify-center cursor-pointer hover:opacity-90 transition group"
                                onClick={() => handlePhotoClick(dog.id)}
                                title="Click to upload photo"
                            >
                                {dog.photo ? (
                                    <img
                                        src={dog.photo}
                                        alt={`${dog.name} photo`}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="text-center">
                                        <span className="text-gray-400 text-sm group-hover:text-gray-600 transition">
                                            Click to upload photo
                                        </span>
                                    </div>
                                )}
                            </div>

                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-2xl font-semibold text-gray-800">{dog.name}</h2>
                                <span className={`text-sm px-4 py-1.5 rounded-full font-medium ${userRole === 'OWNER'
                                        ? 'bg-blue-200 text-blue-700'
                                        : 'bg-green-200 text-green-700'
                                    }`}>
                                    {userRole === 'OWNER' ? 'Owner' : 'Member'}
                                </span>
                            </div>

                            <div className="text-gray-600 mb-6 space-y-1">
                                <p>Breed: {dog.breed}</p>
                                <p>Age: {dog.age} years old </p>
                                <p>Weight: {dog.weight} kg</p>
                            </div>


                            <button
                                onClick={() => navigate(`/pets/${dog.id}`)}
                                className="w-full bg-blue-100 text-blue-600 py-3 rounded-xl hover:bg-blue-200 transition font-medium flex items-center justify-center gap-2"
                            >
                                <span>⚙️</span>
                                Manage Pet
                            </button>
                        </div>
                    ))}
                </div>
            )}

            <AddPetModal
                isOpen={showAddPetModal}
                onClose={() => setShowAddPetModal(false)}
                onPetAdded={async () => {
                    await fetchDogs()
                    setShowAddPetModal(false)
                }}
            />
        </div>
    )
}

export default Pets