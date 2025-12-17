import { useEffect, useState } from 'react'
import activityService, { type Activity } from '../services/activityService'

const useActivities = () => {
    const [activities, setActivities] = useState<Activity[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')



    const fetchActivities = async () => {
        try {
            const data = await activityService.getAll()
            setActivities(data.activities)
            setError('')
        } catch (error) {
            setError(error instanceof Error ? error.message : 'Failed to fetch activities')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchActivities()
    }, [])

    return {
        activities,
        loading,
        error,
        fetchActivities
    }

}
export {useActivities} 