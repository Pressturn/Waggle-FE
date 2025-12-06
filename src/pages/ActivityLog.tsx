import { useEffect, useState } from 'react'
import activityService from "../services/activityService"

function ActivityLog() {
  const [activities, setActivities] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  return (
    <div>

      <h1> Activity Log</h1>

      {loading && <p> Loading activities</p>}
      {error && <p>Error: {error}</p>}

      <p> Total Activities: {activities.length}</p>
    </div>


  )
}

export default ActivityLog