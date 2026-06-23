import { useEffect, useState } from 'react'
import { fetchResource } from '../lib/api'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME
const activitiesEndpoint = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/activities`
  : 'http://localhost:8000/api/activities'

export default function Activities() {
  const [activities, setActivities] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    console.debug('Activities endpoint:', activitiesEndpoint)
    fetchResource('activities', 'activities')
      .then(setActivities)
      .catch(err => setError(err.message))
  }, [])

  return (
    <section>
      <h2>Activities</h2>
      {error && <p style={{ color: 'crimson' }}>{error}</p>}
      {activities.length === 0 ? (
        <p>No activity logs available.</p>
      ) : (
        <div style={{ display: 'grid', gap: 16 }}>
          {activities.map(activity => (
            <article key={activity._id || activity.id || `${activity.type}-${activity.date}`} style={{ padding: 16, border: '1px solid #d1d5db', borderRadius: 8 }}>
              <h3>{activity.type}</h3>
              <p>
                <strong>User:</strong> {activity.user?.name || activity.user || 'Unknown'}
              </p>
              <p>
                <strong>Date:</strong> {new Date(activity.date || Date.now()).toLocaleDateString()}
              </p>
              {activity.distance != null && <p><strong>Distance:</strong> {activity.distance} km</p>}
              {activity.duration != null && <p><strong>Duration:</strong> {activity.duration} mins</p>}
              {activity.calories != null && <p><strong>Calories:</strong> {activity.calories}</p>}
            </article>
          ))}
        </div>
      )}
    </section>
  )
}
