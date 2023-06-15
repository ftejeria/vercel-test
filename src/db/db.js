import mongoose from 'mongoose'
import 'dotenv/config'

export const connectDb = () => {
  const MONGO_DB_URI = process.env.NODE_ENV === 'TEST' ? process.env.MONGO_DB_TEST_URI : process.env.MONGO_DB_URI

  mongoose.connect(MONGO_DB_URI, (err) => {
    if (err) {
      console.log(err)
    }
    console.log('Mongo db connected')
  })
}
