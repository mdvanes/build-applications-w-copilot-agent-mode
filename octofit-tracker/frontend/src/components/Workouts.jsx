import { useEffect, useState } from 'react'
import { fetchResource } from '../lib/api'

export default function Workouts() {
  const [workouts, setWorkouts] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    fetchResource('workouts', 'workouts')
      .then(setWorkouts)
      .catch(err => setError(err.message))
  }, [])

  return (
    <section>
      <h2>Workouts</h2>
      {error && <p style={{ color: 'crimson' }}>{error}</p>}
      {workouts.length === 0 ? (
        <p>No workouts available.</p>
      ) : (
        <div style={{ display: 'grid', gap: 16 }}>
          {workouts.map(workout => (
            <article key={workout._id || workout.id || workout.title} style={{ padding: 16, border: '1px solid #d1d5db', borderRadius: 8 }}>
              <h3>{workout.title}</h3>
              <p>
                <strong>Creator:</strong> {workout.creator?.name || workout.creator || 'Unknown'}
              </p>
              <p>
                <strong>Date:</strong> {new Date(workout.date || Date.now()).toLocaleDateString()}
              </p>
              {workout.duration && <p><strong>Duration:</strong> {workout.duration} mins</p>}
              {workout.notes && <p>{workout.notes}</p>}
              {Array.isArray(workout.exercises) && workout.exercises.length > 0 && (
                <div>
                  <strong>Exercises:</strong>
                  <ul>
                    {workout.exercises.map((exercise, index) => (
                      <li key={`${exercise.name}-${index}`}>
                        {exercise.name}{' '}
                        {exercise.reps ? `• ${exercise.reps} reps` : ''}
                        {exercise.sets ? ` • ${exercise.sets} sets` : ''}
                        {exercise.duration ? ` • ${exercise.duration} mins` : ''}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </article>
          ))}
        </div>
      )}
    </section>
  )
}
