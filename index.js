import express, { json } from 'express'
import { connectDb } from './src/db/db.js'
import { userRouter } from './src/routes/userRoutes.js'
import { movementRouter } from './src/routes/movementRoutes.js'

const app = express()
const PORT = process.env.PORT

connectDb()

app.use(json())

app.use('/user', userRouter)
app.use('/movements', movementRouter)

const server = app.listen(PORT, () => {
  console.log(`Server on port ${PORT}`)
})

export { app, server }
