import { useEffect, useState } from 'react'
import activityService, { Activity } from '../services/activityService'
import dogService from '../services/dogService'
import { GiDogBowl, GiMedicines } from 'react-icons/gi'
import { IoPawOutline, IoWaterOutline } from 'react-icons/io5'

function Dashboard() {
    const [activities, setActivities] = useState<Activity[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        fetchActivities()
    }, [])

    const fetchActivities = async () => {
        try {
            const data = await activityService.getAll()
            setActivities(data.activities)
        } catch (error) {
            setError(error instanceof Error ? error.message : 'Failed to fetch activities')
        } finally {
            setLoading(false)
        }
    }

    const lastMeal = activities.find(activity => activity.type === 'MEAL')
    const lastWalk = activities.find(activity => activity.type === 'WALK')
    const lastWater = activities.find(activity => activity.type === 'WATER')
    const lastMedication = activities.find(activity => activity.type === 'MEDICATION')

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-100 p-8">
                <p className="text-gray-600">Loading...</p>
            </div>
        )
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-100 p-8">
                <p className="text-red-600">Error: {error}</p>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-100 p-8">

            <div className="mb-8">
                <h1 className="text-4xl font-semibold text-gray-800">Dashboard</h1>
                <p className="text-gray-500 mt-2"> Welcome back! Here's what's happening today.</p>
            </div>

            <div className="grid grid-cols-2 gap-8">

                <div>
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Today at a Glance</h2>

                    <div className="space-y-4">

                        <div className="bg-orange-50 border border-orange-200 rounded-2xl p-6">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="w-10 h-10 bg-orange-200 rounded-full flex items-center justify-center">
                                    <GiDogBowl className="text-orange-600 text-xl" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-800">Last Meal</h3>
                                    <p className="text-sm text-gray-600">
                                        {lastMeal?.time || 'No meals logged'}
                                    </p>
                                </div>
                            </div>
                            <p className="text-gray-700 text-sm">
                                {lastMeal?.notes || 'No details available'}
                            </p>
                        </div>

                        <div className="bg-green-50 border border-green-200 rounded-2xl p-6">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="w-10 h-10 bg-green-200 rounded-full flex items-center justify-center">
                                    <IoPawOutline className="text-green-800 text-xl" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-800">Last Walk/Play</h3>
                                    <p className="text-sm text-gray-600">
                                        {lastWalk?.time || 'No walks logged'}
                                    </p>
                                </div>
                            </div>
                            <p className="text-gray-700 text-sm">
                                {lastWalk?.notes || 'No details available'}
                            </p>
                        </div>

                        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="w-10 h-10 bg-blue-200 rounded-full flex items-center justify-center">
                                    <IoWaterOutline className="text-blue-800 text-xl" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-800">Last Water Log</h3>
                                    <p className="text-sm text-gray-600">
                                        {lastWater?.time || 'No water logged'}
                                    </p>
                                </div>
                            </div>
                            <p className="text-gray-700 text-sm">
                                {lastWater?.notes || 'No details available'}
                            </p>
                        </div>

                        <div className="bg-purple-50 border border-purple-200 rounded-2xl p-6">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="w-10 h-10 bg-purple-200 rounded-full flex items-center justify-center">
                                    <GiMedicines className="text-purple-500 text-xl" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-800">Next Medication</h3>
                                    <p className="text-sm text-gray-600">
                                        {lastMedication?.time || 'No medication logged'}
                                    </p>
                                </div>
                            </div>
                            <p className="text-gray-700 text-sm">
                                {lastMedication?.notes || 'No details available'}
                            </p>
                        </div>
                    </div>
                </div>

                <div>
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Today's Activity Log</h2>
                </div>

            </div>
        </div>
    )
}

export default Dashboard