import express from 'express'
import mongoose from 'mongoose'
import usersRouter from './routes/users'
import teamsRouter from './routes/teams'
import activitiesRouter from './routes/activities'
import leaderboardRouter from './routes/leaderboard'
import workoutsRouter from './routes/workouts'

const app = express()
const PORT = Number(process.env.PORT) || 8000
const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017/octofit'

app.use(express.json())

// Basic health check
app.get('/health', (_req, res) => res.json({ status: 'ok' }))

// Codespaces-aware API URL (used by frontends running in Codespaces)
const API_URL = process.env.API_URL || (process.env.CODESPACE_NAME
  ? `https://${process.env.CODESPACE_NAME}-8000.githubpreview.dev`
  : `http://localhost:${PORT}`)

app.get('/api/config', (_req, res) => {
  res.json({ apiUrl: API_URL, port: PORT })
})

// Mount feature routers
app.use('/api/users', usersRouter)
app.use('/api/teams', teamsRouter)
app.use('/api/activities', activitiesRouter)
app.use('/api/leaderboard', leaderboardRouter)
app.use('/api/workouts', workoutsRouter)

mongoose.connect(MONGO_URL).then(() => {
  app.listen(PORT, '0.0.0.0', () => console.log(`Server running on port ${PORT}`))
}).catch(err => {
  console.error('MongoDB connection error:', err)
  process.exit(1)
})
