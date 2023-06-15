import express from 'express'
import { addMovement, getMovements } from '../controllers/movementController.js'
import { userAuth } from '../middleware/userAuth.js'

const router = express.Router()

router.post('/', userAuth, addMovement)

router.get('/', userAuth, getMovements)

export { router as movementRouter }
