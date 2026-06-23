import { Router } from 'express'
import Leaderboard from '../models/leaderboard'

const router = Router()

router.get('/', async (_req, res) => {
  const leaderboard = await Leaderboard.find().populate('user').sort({ score: -1 }).lean()
  res.json({ leaderboard })
})

export default router
