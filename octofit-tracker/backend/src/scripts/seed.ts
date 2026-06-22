/*
Seed the octofit_db database with test data
*/
import mongoose from 'mongoose'
import http from 'http'
import User from '../models/user'
import Team from '../models/team'
import Activity from '../models/activity'
import Workout from '../models/workout'
import Leaderboard from '../models/leaderboard'

const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017/octofit_db'

async function seed() {
  console.log('Seed the octofit_db database with test data')
  await mongoose.connect(MONGO_URL)

  // Clear existing data
  await Promise.all([
    User.deleteMany({}),
    Team.deleteMany({}),
    Activity.deleteMany({}),
    Workout.deleteMany({}),
    Leaderboard.deleteMany({})
  ])

  // Create users
  const users = await User.insertMany([
    { name: 'Alice Park', email: 'alice@example.com', bio: 'Runner and yoga fan' },
    { name: 'Ben Carter', email: 'ben@example.com', bio: 'Cyclist and triathlete' },
    { name: 'Chloe Zhang', email: 'chloe@example.com', bio: 'Strength trainer' }
  ])

  // Create teams
  const teamA = await Team.create({ name: 'Morning Runners', description: 'Early bird running group', members: [users[0]._id, users[1]._id] })
  const teamB = await Team.create({ name: 'Evening Strength', description: 'Strength training crew', members: [users[2]._id] })

  // Create workouts
  const workouts = await Workout.insertMany([
    { title: '5k tempo run', creator: users[0]._id, duration: 25, exercises: [{ name: 'Run', duration: 25 }], notes: 'Felt strong' },
    { title: 'Cycling steady', creator: users[1]._id, duration: 60, exercises: [{ name: 'Cycle', duration: 60 }], notes: 'Flat route' },
    { title: 'Full body circuit', creator: users[2]._id, duration: 45, exercises: [{ name: 'Pushups', reps: 15, sets: 3 }, { name: 'Squats', reps: 20, sets: 3 }] }
  ])

  // Create activities
  const activities = await Activity.insertMany([
    { user: users[0]._id, type: 'run', distance: 5, duration: 25, calories: 320 },
    { user: users[1]._id, type: 'cycle', distance: 20, duration: 60, calories: 700 },
    { user: users[2]._id, type: 'workout', duration: 45, calories: 450 }
  ])

  // Create leaderboard entries
  await Leaderboard.insertMany([
    { user: users[1]._id, score: 1200, rank: 1 },
    { user: users[0]._id, score: 900, rank: 2 },
    { user: users[2]._id, score: 700, rank: 3 }
  ])

  console.log('Seeded collections:')
  console.log(' users:', await User.countDocuments())
  console.log(' teams:', await Team.countDocuments())
  console.log(' workouts:', await Workout.countDocuments())
  console.log(' activities:', await Activity.countDocuments())
  console.log(' leaderboard:', await Leaderboard.countDocuments())

  // Try to verify API responses if server is running
  const API_HOST = 'localhost'
  const API_PORT = process.env.PORT || 8000
  const paths = ['/api/users', '/api/teams', '/api/workouts', '/api/activities', '/api/leaderboard']

  for (const p of paths) {
    const options = { host: API_HOST, port: Number(API_PORT), path: p, method: 'GET' }
    const req = http.request(options, res => {
      let body = ''
      res.on('data', chunk => body += chunk)
      res.on('end', () => {
        try {
          const json = JSON.parse(body)
          console.log(`API ${p} response keys:`, Object.keys(json))
        } catch (e) {
          console.log(`API ${p} response:`, body.substring(0, 120))
        }
      })
    })
    req.on('error', () => console.log(`Could not reach API at ${API_HOST}:${API_PORT}${p} — is the backend running?`))
    req.end()
  }

  // Close mongoose after a short delay to allow HTTP checks to finish
  setTimeout(() => mongoose.disconnect().then(() => process.exit(0)), 1000)
}

seed().catch(err => {
  console.error('Seeding failed:', err)
  mongoose.disconnect().finally(() => process.exit(1))
})
