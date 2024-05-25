import { Router } from 'express'

import { login, register } from './controller.js'

const authRouter = Router()

authRouter.post('/login', login)
authRouter.post('/register', register)

export { authRouter }
