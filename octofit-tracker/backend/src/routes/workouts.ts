import { Router } from 'express'
import Workout from '../models/workout'

const router = Router()

router.get('/', async (_req, res) => {
  const workouts = await Workout.find().populate('creator').lean()
  res.json({ workouts })
})

router.post('/', async (req, res) => {
  const workout = new Workout(req.body)
  await workout.save()
  res.status(201).json({ message: 'Workout created', workout })
})

export default router
