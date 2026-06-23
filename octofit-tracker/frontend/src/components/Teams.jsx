import { useEffect, useState } from 'react'
import { fetchResource } from '../lib/api'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME
const teamsEndpoint = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/teams`
  : 'http://localhost:8000/api/teams'

export default function Teams() {
  const [teams, setTeams] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    console.debug('Teams endpoint:', teamsEndpoint)
    fetchResource('teams', 'teams')
      .then(setTeams)
      .catch(err => setError(err.message))
  }, [])

  return (
    <section>
      <h2>Teams</h2>
      {error && <p style={{ color: 'crimson' }}>{error}</p>}
      {teams.length === 0 ? (
        <p>No teams available.</p>
      ) : (
        <div style={{ display: 'grid', gap: 16 }}>
          {teams.map(team => (
            <article key={team._id || team.id || team.name} style={{ padding: 16, border: '1px solid #d1d5db', borderRadius: 8 }}>
              <h3>{team.name}</h3>
              {team.description && <p>{team.description}</p>}
              <p>
                <strong>Members:</strong> {Array.isArray(team.members) ? team.members.length : team.members ? 1 : 0}
              </p>
              <p>
                <strong>Created:</strong> {new Date(team.createdAt || team.date || Date.now()).toLocaleDateString()}
              </p>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}
