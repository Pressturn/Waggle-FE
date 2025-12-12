import { useEffect, useState } from 'react'
import activityService, { Activity } from '../services/activityService'
import dogService from '../services/dogService'
import { GiDogBowl } from 'react-icons/gi'

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

                        <p>Last Walk: {lastWalk?.time || 'No Walks Logged'} - {lastWalk?.notes || ''}</p>
                        <p>Last Water: {lastWater?.time || 'No Water Logged'} - {lastWater?.notes || ''}</p>
                        <p>Last Medication: {lastMedication?.time || 'No Medication Logged'} - {lastMedication?.notes || ''}</p>
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