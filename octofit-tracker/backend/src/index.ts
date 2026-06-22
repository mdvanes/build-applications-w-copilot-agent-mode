import express from 'express'
import mongoose from 'mongoose'

const app = express()
const PORT = process.env.PORT || 8000
const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017/octofit'

app.use(express.json())

app.get('/health', (_req, res) => res.json({ status: 'ok' }))

mongoose.connect(MONGO_URL).then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
}).catch(err => {
  console.error('MongoDB connection error:', err)
  process.exit(1)
})
