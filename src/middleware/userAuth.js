import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'
import { User } from '../models/User.js'

export const userAuth = async (req, res, next) => {
  const authorization = req.headers.authorization

  let token = {}
  let decodedToken

  if (authorization && authorization.toLowerCase().startsWith('bearer')) {
    token = authorization.split(' ')[1]
  }
  try {
    decodedToken = jwt.verify(token, process.env.JWT_SECRET)
  } catch (error) {
    return res.status(401).send({
      error: 'Invalid token'
    })
  }

  if (!(decodedToken || token)) {
    return res.status(401).send({
      error: 'Invalid token'
    })
  }

  const userId = decodedToken.id

  if (!userId) {
    return res.status(400).send({ message: 'Missing param user_id' })
  }
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).send({ message: 'Invalid param user_id' })
  }
  const user = await User.findById(userId)
  if (!user) {
    return res.status(404).send({ message: 'User not found' })
  }
  req.user = user

  next()
}
