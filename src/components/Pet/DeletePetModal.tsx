import { Dialog, DialogPanel, DialogTitle} from '@headlessui/react'

interface DeletePetModalProps {
    isOpen: boolean
    onClose: () => void
    onConfirm: () => void
    dogName: string
    deleting: boolean
}

function DeletePetModal({ isOpen, onClose, onConfirm, dogName, deleting }: DeletePetModalProps) {
    return (
        <Dialog open={isOpen} onClose={onClose} className="relative z-50">
            <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

            <div className="fixed inset-0 flex items-center justify-center p-4">
                <DialogPanel className="bg-white rounded-3xl shadow-xl w-full max-w-md p-8">
                    <DialogTitle className="text-2xl font-semibold text-gray-800 mb-4">
                        Delete {dogName}?
                    </DialogTitle>

                    <p className="text-gray-600 mb-8">
                        Are you sure you want to delete {dogName}? This action cannot be undone.
                    </p>

                    <div className="flex gap-3">
                        <button
                            onClick={onClose}
                            disabled={deleting}
                            className="flex-1 px-6 py-3 border-2 border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition font-medium disabled:opacity-50"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={onConfirm}
                            disabled={deleting}
                            className="flex-1 px-6 py-3 bg-red-500 text-white rounded-xl hover:bg-red-600 transition font-medium disabled:bg-red-300 disabled:cursor-not-allowed"
                        >
                            {deleting ? 'Deleting...' : 'Delete'}
                        </button>
                    </div>
                </DialogPanel>
            </div>
        </Dialog>
    )
}
export default DeletePetModal
