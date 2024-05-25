import jwt from 'jsonwebtoken'
import { env } from '../env.js'

const createJwt = (payload) => {
  return jwt.sign(payload, env.jwtSecret, {
    expiresIn: '1h'
  })
}

export { createJwt }
