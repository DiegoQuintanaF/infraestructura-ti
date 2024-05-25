import { Router } from 'express'
import { hello, helloById } from './controller.js'

const helloWorldRouter = Router()

helloWorldRouter.get('/', hello)
helloWorldRouter.get('/:id', helloById)

export { helloWorldRouter }
