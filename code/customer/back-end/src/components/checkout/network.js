import { Router } from 'express'
import { createCheckout } from './controller.js'

const checkoutRouter = Router()

checkoutRouter.post('/', createCheckout)

export { checkoutRouter }
