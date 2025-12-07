import { useEffect, useState } from 'react'
import activityService from "../services/activityService"

function ActivityLog() {
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

  return (
    <div>

      <h1> Activity Log</h1>

      {loading && <p> Loading activities</p>}
      {error && <p>Error: {error}</p>}

      <p> Total Activities: {activities.length}</p>

      {activities.map(activity => (
        <div key={activity.id}>
          {activity.time && <p> Type: {activity.type}</p>}
          {activity.date && <p>Date: {activity.date}</p>}
          {activity.time && <p>Time: {activity.time}</p>}

          {activity.type === 'MEAL' && (
            <>
              {activity.foodType && <p>Food Type:{activity.foodType}</p>}
              {activity.portion && <p> Portion: {activity.portion}</p>}
            </>
          )}

          {(activity.type === 'WALK' || activity.type === 'PLAY') && (
            <>
              {activity.activityKind && <p>Activity Kind: {activity.activityKind}</p>}
            </>
          )}

          {activity.type === 'MEDICATION' && (
            <>
              {activity.medication && <p>Activity Medication: {activity.medication}</p>}
            </>
          )}

          {activity.time && <p>Notes: {activity.notes}</p>}
          {activity.dog && <p>Dog:{activity.dog.name}</p>}
          {activity.loggedBy && <p>Logged by: {activity.loggedBy.name}</p>}

          <hr />
        </div >
      ))
      }
    </div >
  )
}

export default ActivityLog