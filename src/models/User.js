import mongoose from 'mongoose'

// Everything in Mongoose starts with a Schema(the structure of a particular document).
// Each schema maps to a MongoDB collection and defines the shape of the documents within that collection.
const userSchema = new mongoose.Schema({
  email: String,
  username: String,
  passwordHash: String,
  incomes: {
    type: Number,
    default: 0
  },
  expenses: {
    type: Number,
    default: 0
  },
  movements: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Movement'
  }]
})

userSchema.set('toJSON', {
  transform: (document, returnObject) => {
    delete returnObject._id
    delete returnObject.__v
    delete returnObject.passwordHash
  }
})

// Model, interface for interacting with the database
export const User = mongoose.model('User', userSchema)
