import { Router } from 'express'
import User from '../models/user'

const router = Router()

router.get('/', async (_req, res) => {
  const users = await User.find().lean()
  res.json({ users })
})

router.post('/', async (req, res) => {
  const user = new User(req.body)
  await user.save()
  res.status(201).json({ message: 'User created', user })
})

export default router
