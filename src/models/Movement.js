import mongoose from 'mongoose'

const movementSchema = new mongoose.Schema({
  name: String,
  description: String,
  type: {
    type: String,
    enum: ['Income', 'Expense']
  },
  category: String,
  date: Date,
  account: String,
  amount: Number,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  note: String
})

movementSchema.set('toJSON', {
  transform: (document, returnObject) => {
    delete returnObject._id
    delete returnObject.__v
  }
})

export const Movement = mongoose.model('Movement', movementSchema)
