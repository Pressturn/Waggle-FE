import useAddPet from '../../hooks/useAddPet'
import { Dialog, DialogTitle, DialogPanel } from '@headlessui/react'

interface AddPetProps {
    isOpen: boolean
    onClose: () => void
    onPetAdded: () => void

}

function AddPet({ isOpen, onClose, onPetAdded }: AddPetProps) {
    const {
        petFormData,
        loading,
        error,
        setPetFormData,
        handleSubmit,
    } = useAddPet()

    return (
        <Dialog open={isOpen} onClose={onClose} className="relative z-50">
            <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

            <div className="fixed inset-0 flex items-center justify-center p-4">
                <DialogPanel className="bg-white rounded-3xl shadow-xl w-full max-w-lg p-8">

                    {/* Header */}
                    <div className="flex justify-between items-start mb-8">
                        <DialogTitle className="text-2xl font-semibold text-gray-800">
                            Add New Pet
                        </DialogTitle>
                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:text-gray-600 text-3xl leading-none"
                        >
                            ×
                        </button>
                    </div>

                    {error && (
                        <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-6 text-sm">
                            {error}
                        </div>
                    )}

                    <div className="space-y-5">
                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-2">
                                Name
                            </label>
                            <input
                                type="text"
                                value={petFormData.name}
                                onChange={(event) => setPetFormData({ ...petFormData, name: event.target.value })}
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white transition"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-2">
                                Breed
                            </label>
                            <input
                                type="text"
                                value={petFormData.breed}
                                onChange={(event) => setPetFormData({ ...petFormData, breed: event.target.value })}
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white transition"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-2">
                                    Age (years)
                                </label>
                                <input
                                    type="number"
                                    value={petFormData.age || ''}
                                    onChange={(event) => setPetFormData({ ...petFormData, age: parseInt(event.target.value) || 0 })}
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white transition"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-2">
                                    Weight (kg)
                                </label>
                                <input
                                    type="number"
                                    value={petFormData.weight || ''}
                                    onChange={(event) => setPetFormData({
                                        ...petFormData, weight: parseFloat(event.target.value) || 0
                                    })}
                                    placeholder="4.5"
                                    step="0.1"
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white transition"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-3 mt-8">
                        <button
                            onClick={onClose}
                            className="flex-1 px-6 py-3 border-2 border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition font-medium"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={async () => {
                                const success = await handleSubmit()
                                if (success) {
                                    onPetAdded()
                                    onClose()
                                }
                            }}
                            disabled={loading}
                            className="flex-1 px-6 py-3 bg-blue-400 text-white rounded-xl hover:bg-blue-500 transition font-medium disabled:bg-blue-300 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Adding...' : 'Add Pet'}
                        </button>
                    </div>
                </DialogPanel>
            </div>
        </Dialog>
    )
}

export default AddPet