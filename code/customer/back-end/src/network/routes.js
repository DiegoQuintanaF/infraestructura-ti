import { Router } from 'express'
import { helloWorldRouter } from '../components/hello-world/network.js'
import { authRouter } from '../components/auth/network.js'
import { moviesRouter } from '../components/movies/network.js'
import { auditoriumsRouter } from '../components/auditoriums/network.js'
import { checkoutRouter } from '../components/checkout/network.js'

const setRoutes = (app) => {
  const router = Router()

  router.use('/hello-world', helloWorldRouter)
  router.use('/auth', authRouter)
  router.use('/movies', moviesRouter)
  router.use('/auditoriums', auditoriumsRouter)
  router.use('/checkout', checkoutRouter)

  app.use('/api/v1', router)
}

export { setRoutes }
