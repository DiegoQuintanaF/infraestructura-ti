import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
import { setRoutes } from './network/routes.js'
import { bootstrap } from './utils/bootstrap.js'
import { errorHandler } from './middlewares/errorHandlers.js'

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(helmet())
app.use(cors())

setRoutes(app)

bootstrap(app)

app.use(errorHandler)
