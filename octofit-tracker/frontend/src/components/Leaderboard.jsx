import { useEffect, useState } from 'react'
import { fetchResource } from '../lib/api'

export default function Leaderboard() {
  const [entries, setEntries] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    fetchResource('leaderboard', 'leaderboard')
      .then(setEntries)
      .catch(err => setError(err.message))
  }, [])

  return (
    <section>
      <h2>Leaderboard</h2>
      {error && <p style={{ color: 'crimson' }}>{error}</p>}
      {entries.length === 0 ? (
        <p>No leaderboard entries available.</p>
      ) : (
        <ol style={{ paddingLeft: 20 }}>
          {entries.map(entry => (
            <li key={entry._id || entry.id || `${entry.user?.name || entry.user}-${entry.score}`} style={{ marginBottom: 12 }}>
              <strong>{entry.user?.name || entry.user || 'Unknown'}</strong>
              : {entry.score} points
              {entry.rank != null && <span> • Rank {entry.rank}</span>}
              <div style={{ fontSize: '0.9rem', color: '#6b7280' }}>
                Updated {new Date(entry.updatedAt || entry.date || Date.now()).toLocaleDateString()}
              </div>
            </li>
          ))}
        </ol>
      )}
    </section>
  )
}
