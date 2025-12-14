import { useState, useEffect } from 'react'
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import activityService, { type Activity } from '../../services/activityService'

interface LogFeedingModalProps {
    isOpen: boolean
    onClose: () => void
    onFeedingLogged: () => void
    dogId: string
    editActivity: Activity
}

const getCurrentDate = () => {
    const currentDate = new Date()
    const year = currentDate.getFullYear()
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0')
    const day = currentDate.getDate().toString().padStart(2, '0')
    return `${year}-${month}-${day}`

}

const getCurrentTime = () => {
    const now = new Date()
    const hours = now.getHours().toString().padStart(2, '0')
    const minutes = now.getMinutes().toString().padStart(2, '0')
    return `${hours}:${minutes}`
}

function LogFeedingModal({ isOpen, onClose, onFeedingLogged, dogId, editActivity }: LogFeedingModalProps) {
    const [date, setDate] = useState(getCurrentDate())
    const [time, setTime] = useState(getCurrentTime())
    const [foodType, setFoodType] = useState('')
    const [portion, setPortion] = useState('')
    const [notes, setNotes] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    useEffect(() => {
        if (editActivity) {
            setDate(editActivity.date.split('T')[0])
            setTime(editActivity.time || getCurrentTime())
            setFoodType(editActivity.foodType || '')
            setPortion(editActivity.portion || '')
            setNotes(editActivity.notes || '')
        } else {
            setDate(getCurrentDate())
            setTime(getCurrentTime())
            setFoodType('')
            setPortion('')
            setNotes('')
        }
    }, [editActivity])

    const handleSubmit = async () => {
        setLoading(true)
        setError('')

        try {
            if (editActivity) {
                await activityService.update(editActivity.id, {
                    type: 'MEAL',
                    date: date,
                    time: time,
                    foodType: foodType,
                    portion: portion,
                    notes: notes,
                    dogId: dogId
                })
            } else {

                await activityService.create({
                    type: 'MEAL',
                    date: date,
                    time: time,
                    foodType: foodType,
                    portion: portion,
                    notes: notes,
                    dogId: dogId
                })
                onFeedingLogged()
                onClose()
            }
        } catch (error) {
            setError(error instanceof Error ? error.message : 'Failed to log feeding')
        } finally {
            setLoading(false)
        }
    }

    return (
        <Dialog open={isOpen} onClose={onClose} className="relative z-50">
            <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

            <div className="fixed inset-0 flex items-center justify-center p-4">
                <DialogPanel className="bg-white rounded-3xl shadow-xl w-full max-w-lg p-8">
                    <DialogTitle className="text-2xl font-semibold text-gray-800 mb-6">
                        Log Feeding
                    </DialogTitle>

                    <div className="space-y-5">
                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-2">
                                Date
                            </label>
                            <input
                                type="date"
                                value={date}
                                onChange={(event) => setDate(event.target.value)}
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white transition"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-2">
                            Time
                        </label>
                        <input
                            type="time"
                            value={time}
                            onChange={(event) => setTime(event.target.value)}
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white transition"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-2">
                            Food Type
                        </label>
                        <input
                            type="text"
                            value={foodType}
                            onChange={(event) => setFoodType(event.target.value)}
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white transition"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-2">
                            Portion
                        </label>
                        <input
                            type="text"
                            value={portion}
                            onChange={(event) => setPortion(event.target.value)}
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white transition"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-2">
                            Notes
                        </label>
                        <textarea
                            value={notes}
                            onChange={(event) => setNotes(event.target.value)}
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white transition resize-none"
                        />
                    </div>

                    <div className="flex gap-3 mt-8">
                        <button
                            onClick={onClose}
                            disabled={loading}
                            className="flex-1 px-6 py-3 border-2 border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition font-medium disabled:opacity-50"
                        >
                            Cancel
                        </button>
                        <button

                            onClick={handleSubmit}
                            disabled={loading}
                            className="flex-1 px-6 py-3 bg-blue-400 text-white rounded-xl hover:bg-blue-500 transition font-medium disabled:bg-blue-300 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Logging...' : 'Log Feeding'}
                        </button>
                    </div>

                </DialogPanel>
            </div >
        </Dialog >
    )
}

export default LogFeedingModal