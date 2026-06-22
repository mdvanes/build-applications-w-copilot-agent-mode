import { Router } from 'express'
import Team from '../models/team'

const router = Router()

router.get('/', async (_req, res) => {
  const teams = await Team.find().populate('members').lean()
  res.json({ teams })
})

router.post('/', async (req, res) => {
  const team = new Team(req.body)
  await team.save()
  res.status(201).json({ message: 'Team created', team })
})

export default router
