import { Movement } from '../models/Movement.js'

export const addMovement = async (req, res) => {
  const { user } = req
  const { name, description, type, category, note, account, date, amount } = req.body

  const movement = new Movement({ name, description, type, category, note, user: user.id, account, date, amount })
  await movement.save()

  if (type === 'Income') {
    user.incomes = user.incomes + amount
  } else {
    // Expense
    user.expenses = user.expenses + amount
  }

  user.movements = user.movements.concat(movement._id)
  await user.save()

  return res.status(201).send(movement)
}

export const getMovements = async (req, res) => {
  const { user } = req
  const movements = await Movement.find({ user: user.id })
  return res.status(200).send(movements)
}
