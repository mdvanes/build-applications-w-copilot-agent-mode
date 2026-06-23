import { Router } from 'express'
import Activity from '../models/activity'

const router = Router()

router.get('/', async (_req, res) => {
  const activities = await Activity.find().populate('user').lean()
  res.json({ activities })
})

router.post('/', async (req, res) => {
  const activity = new Activity(req.body)
  await activity.save()
  res.status(201).json({ message: 'Activity logged', activity })
})

export default router
