
import useAddPet from '../../hooks/useAddPet'

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

    if (!isOpen) return null

    return (
        <div>
            <div>
                <h2>Add New Pet</h2>
                {error && <p style={{ color: 'red' }}>{error}</p>}

                <p>Name:</p>
                <input
                    type="text"
                    value={petFormData.name}
                    onChange={(event) => setPetFormData({ ...petFormData, name: event.target.value })}
                />

                <p>Breed:</p>
                <input
                    type="text"
                    value={petFormData.breed}
                    onChange={(event) => setPetFormData({ ...petFormData, breed: event.target.value })}
                />

                <p>Age:</p>
                <input
                    type="number"
                    value={petFormData.age || ''}
                    onChange={(event) => setPetFormData({ ...petFormData, age: parseInt(event.target.value) || 0 })}
                />

                <p>Weight:</p>
                <input
                    type="number"
                    value={petFormData.weight || ''}
                    onChange={(event) => setPetFormData({
                        ...petFormData, weight: parseFloat(event.target.value) || 0
                    })}
                />

                <button onClick={onClose}>Cancel</button>
                <button onClick={async () => {
                    const success = await handleSubmit()
                    if (success) {
                        onPetAdded()
                        onClose()
                    }
                }}
                    disabled={loading}>
                    {loading ? 'Adding...' : 'Add Pet'}
                </button>
            </div>
        </div >
    )
}

export default AddPet