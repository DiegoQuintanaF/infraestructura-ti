import { Router } from 'express'
import { helloWorld } from './controller.js'

const helloRouter = Router()

helloRouter.get('/', helloWorld)

export { helloRouter }
