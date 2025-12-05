import React, { useEffect, useState } from 'react'
import activityService, { Activity } from '../services/activityService'

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


    return (
        <div>
            <h1>Dashboard</h1>

            {loading && <p>Loading...</p>}
            {error && <p>Error: {error} </p>}

            <h2> Today at a Glance</h2>
            <p>Last Meal: {lastMeal?.time || 'No Meals Logged'} - {lastMeal?.notes || ''}</p>
            <p>Last Walk: {lastWalk?.time || 'No Walks Logged'} - {lastWalk?.notes || ''}</p>
            <p>Last Water: {lastWater?.time || 'No Water Logged'} - {lastWater?.notes || ''}</p>
            <p>Last Medication: {lastMedication?.time || 'No Medication Logged'} - {lastMedication?.notes || ''}</p>
        </div>
    )
}

export default Dashboard