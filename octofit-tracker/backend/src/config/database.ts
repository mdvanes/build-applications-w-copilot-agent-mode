import mongoose from 'mongoose'

const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017/octofit_db'

export function connectDatabase() {
  return mongoose.connect(MONGO_URL)
}

export default mongoose
