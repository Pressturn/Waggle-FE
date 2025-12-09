import React from 'react'

interface EditPetProps {
    isOpen: boolean
    onClose: () => void
}

function EditPet({ isOpen, onClose }: EditPetProps) {
    if (!isOpen)
        return null

    return (
        <div>
            <h1>Edit Pet</h1>
            <p> Form inputs here</p>

            <button onClick={onClose}>Cancel</button>
            <button>Save Changes</button>
        </div>
    )
}

export default EditPet