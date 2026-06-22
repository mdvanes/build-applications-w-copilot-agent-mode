import { Router } from 'express'

const router = Router()

router.get('/', (_req, res) => {
  res.json({ activities: [] })
})

router.post('/', (req, res) => {
  // placeholder: log activity
  res.status(201).json({ message: 'Activity logged', activity: req.body })
})

export default router
