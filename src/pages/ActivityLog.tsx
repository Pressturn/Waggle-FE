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
          <p> Type: {activity.type}</p>
          <p>Date: {activity.date}</p>
          <p>Time: {activity.time}</p>
          <p>Food Type:{activity.foodType}</p>
          <p> Portion: {activity.portion}</p>
          <p>Activity Kind: {activity.kind}</p>
          <p>Notes: {activity.notes}</p>
          <hr/>
        </div>
      ))}
    </div>
  )
}

export default ActivityLog