import { Router } from 'express'

const router = Router()

router.get('/', (_req, res) => {
  res.json({ users: [] })
})

router.post('/', (req, res) => {
  // placeholder: create user
  res.status(201).json({ message: 'User created', user: req.body })
})

export default router
