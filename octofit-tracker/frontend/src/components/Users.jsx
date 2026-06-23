import { useEffect, useState } from 'react'
import { fetchResource } from '../lib/api'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME
const usersEndpoint = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/users`
  : 'http://localhost:8000/api/users'

export default function Users() {
  const [users, setUsers] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    console.debug('Users endpoint:', usersEndpoint)
    fetchResource('users', 'users')
      .then(setUsers)
      .catch(err => setError(err.message))
  }, [])

  return (
    <section>
      <h2>Users</h2>
      {error && <p style={{ color: 'crimson' }}>{error}</p>}
      {users.length === 0 ? (
        <p>No users available.</p>
      ) : (
        <div style={{ display: 'grid', gap: 16 }}>
          {users.map(user => (
            <article key={user._id || user.id || `${user.email}-${user.name}`} style={{ padding: 16, border: '1px solid #d1d5db', borderRadius: 8 }}>
              <h3>{user.name}</h3>
              <p>
                <strong>Email:</strong> {user.email}
              </p>
              <p>
                <strong>Team:</strong> {user.team?.name || user.team || 'Unassigned'}
              </p>
              {user.bio && <p>{user.bio}</p>}
              {user.avatarUrl && <p>Avatar: {user.avatarUrl}</p>}
              <p>
                <strong>Joined:</strong> {new Date(user.joinedAt || user.date || Date.now()).toLocaleDateString()}
              </p>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}
