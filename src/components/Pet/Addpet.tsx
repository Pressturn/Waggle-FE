interface AddPetProps {
    isOpen: boolean
    onClose: () => void
    onPetAdded: () => void

}

function AddPet({ isOpen, onClose, onPetAdded }: AddPetProps) {
    if (!isOpen) return null

    return (
        <div>
            <div>
                <h2>Add New Pet</h2>

                <p>Name:</p>
                <input type="text" />

                <p>Breed:</p>
                <input type="text" />

                <p>Age:</p>
                <input type="number" />

                <p>Weight:</p>
                <input type="number" />

                <button onClick={onClose}>Cancel</button>
                <button>Add Pet</button>
            </div>
        </div>
    )
}

export default AddPet