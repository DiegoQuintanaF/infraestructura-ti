import { Router } from 'express'
import { getSeatByAuditoriumId } from './controller.js'

const auditoriumsRouter = Router()

auditoriumsRouter.get('/seats', getSeatByAuditoriumId)

export { auditoriumsRouter }
