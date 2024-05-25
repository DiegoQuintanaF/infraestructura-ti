import { Router } from 'express'
import { helloRouter } from '../components/hello/network.js'
import { moviesRouter } from '../components/movies/network.js'
import { authRouter } from '../components/auth/network.js'

const setRoutes = (app) => {
  const router = Router()

  router.use('/hello', helloRouter)
  router.use('/movies', moviesRouter)
  router.use('/auth', authRouter)

  app.use('/api/v1', router)
}

export { setRoutes }
