import { useEffect, useState } from 'react'
import dogService, { Dog } from "../services/dogService"
import { useNavigate } from 'react-router-dom'

function Pets() {
    const [dogs, setDogs] = useState<Dog[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const navigate = useNavigate()

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
                <button className="bg-blue-300 text-white px-5 py-2.5 rounded-lg flex items-center gap-2 hover:bg-blue-400 transition">
                    + Add Pet
                </button>
            </div>

            {loading && <p className="text-gray-600 mt-8">Loading...</p>}
            {error && <p className="text-red-500 mt-8">Error: {error}</p>}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                {dogs.map(dog => (
                    <div key={dog.id} className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
                        <div className="w-full h-64 bg-gray-200 rounded-2xl mb-4 overflow-hidden flex items-center justify-center">
                            {dog.imageUrl ? (
                                <img
                                    src={dog.imageUrl}
                                    alt={dog.name}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <span className="text-gray-400">No Image</span>
                            )}
                        </div>

                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-2xl font-semibold text-gray-800">{dog.name}</h2>
                            <span className="bg-blue-200 text-blue-700 text-sm px-4 py-1.5 rounded-full font-medium">
                                Owner
                            </span>
                        </div>

                        <div className="text-gray-600 mb-6 space-y-1">
                            <p>{dog.breed}</p>
                            <p>{dog.age} years old • {dog.weight} kg</p>
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
        </div>
    )
}

export default Pets