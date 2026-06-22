import { Router } from 'express'

const router = Router()

router.get('/', (_req, res) => {
  res.json({ workouts: [] })
})

router.post('/', (req, res) => {
  // placeholder: create workout
  res.status(201).json({ message: 'Workout created', workout: req.body })
})

export default router
