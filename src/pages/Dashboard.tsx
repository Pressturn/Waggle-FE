import { useEffect, useState } from 'react'
import activityService, { type Activity } from '../services/activityService'
import { GiDogBowl, GiMedicines } from 'react-icons/gi'
import { IoPawOutline, IoWaterOutline } from 'react-icons/io5'
import { useActivities } from '../hooks/useActivities'

function Dashboard() {
    const { activities, loading, error } = useActivities()

    const getTodaysActivities = () => {
        const today = new Date()
        today.setHours(0, 0, 0, 0)

        return activities.filter(activity => {
            const activityDate = new Date(activity.timestamp || activity.date)
            activityDate.setHours(0, 0, 0, 0)
            return activityDate.getTime() === today.getTime()
        })
    }

    const getActivityTitle = (activity: Activity): string => {
        switch (activity.type) {
            case 'MEAL':
                return activity.foodType || 'Meal'

            case 'WATER':
                return activity.notes?.split(',')[0] || 'Refill Water Bowl'

            case 'WALK':
                return activity.notes?.split(',')[0] || 'Walk'

            case 'PLAY':
                return activity.notes?.split(',')[0] || 'Play'

            case 'MEDICATION':
                return activity.notes?.split(',')[0] || 'Medication'

            default:
                return activity.type

        }
    }

    const getActivityTypeColor = (type: string): string => {
        switch (type) {
            case 'MEAL':
                return 'bg-orange-100 text-orange-600'
            case 'WATER':
                return 'bg-blue-100 text-blue-600'
            case 'WALK':
                return 'bg-green-100 text-green-600'
            case 'PLAY':
                return 'bg-green-100 text-green-600'
            case 'MEDICATION':
                return 'bg-purple-100 text-purple-600'
            default:
                return 'bg-gray-100 text-gray-600'
        }
    }

    const getActivityType = (type: string): string => {
        switch (type) {
            case 'MEAL':
                return 'Food'
            case 'WATER':
                return 'Water'
            case 'WALK':
                return 'Walk'
            case 'PLAY':
                return 'Walk'
            case 'MEDICATION':
                return 'Medication'
            default:
                return type
        }
    }

    const capitaliseFirstLetter = (name: string): string => {
        return name.charAt(0).toUpperCase() + name.slice(1)
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

                    <div className="space-y-4">
                        {getTodaysActivities().length === 0 ? (
                            <div className="bg-white rounded-2xl border border-gray-200 p-6 text-center">
                                <p className="text-gray-500">No activities logged today</p>
                            </div>
                        ) : (
                            getTodaysActivities().map((activity) => (
                                <div key={activity.id} className="bg-white rounded-2xl border border-gray-200 p-5">
                                    <div className="flex justify-between items-start">
                                        <div className="flex-1 pr-4">
                                            <h3 className="text-lg font-semibold text-gray-800 mb-1">
                                                {getActivityTitle(activity)}
                                            </h3>
                                            <p className="text-sm text-gray-500 mb-2">
                                                {activity.time || 'No time specified'}
                                            </p>
                                            {activity.notes && (
                                                <p className="text-gray-600 text-sm">
                                                    {activity.notes}
                                                </p>
                                            )}
                                            {activity.loggedBy && (
                                                <p className="text-gray-400 text-xs mt-2">
                                                    by {capitaliseFirstLetter(activity.loggedBy.name)}
                                                </p>
                                            )}
                                        </div>

                                        <span className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap ${getActivityTypeColor(activity.type)}`}>
                                            {getActivityType(activity.type)}
                                        </span>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard