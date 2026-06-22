import { Router } from 'express'

const router = Router()

router.get('/', (_req, res) => {
  res.json({ teams: [] })
})

router.post('/', (req, res) => {
  // placeholder: create team
  res.status(201).json({ message: 'Team created', team: req.body })
})

export default router
