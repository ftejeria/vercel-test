import { User } from '../models/User.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const signIn = async (req, res) => {
  const { username, password } = req.body
  const user = await User.findOne({ username })

  const validPassword = user === null ? false : await bcrypt.compare(password, user.passwordHash)

  if (!(user && validPassword)) {
    return res.status(401).send({ error: 'Invalid user or password' })
  }

  const userToken = {
    id: user._id,
    username: user.username
  }

  const token = jwt.sign(userToken, process.env.JWT_SECRET, {
    expiresIn: '1h'
  })
  return res.send({ username: user.username, token })
}

export const singUp = async (req, res) => {
  const { email, username, password } = req.body
  const validUsername = await User.find({ username })

  if (validUsername.length > 0) return res.status(400).send({ status: 'Failed', error: 'Username already exists' })

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)
  const user = new User({ email, username, passwordHash })
  await user.save()

  return res.status(201).send({ status: 'Success' })
}

export const userSummary = async (req, res) => {
  const { user } = req
  const movements = await user.populate('movements', {
    name: 1,
    description: 1,
    type: 1,
    category: 1,
    note: 1,
    amount: 1,
    account: 1,
    date: 1
  })
  const last5Movements = movements.movements.slice(-5)
  return res.status(200).send({ incomes: user.incomes, expenses: user.expenses, last5Movements })
}
