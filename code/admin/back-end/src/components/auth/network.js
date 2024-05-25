import { Router } from 'express'

import { login } from './controller.js'

const authRouter = Router()

authRouter.post('/login', login)

export { authRouter }
