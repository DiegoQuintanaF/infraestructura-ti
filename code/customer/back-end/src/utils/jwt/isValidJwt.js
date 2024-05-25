import jwt from 'jsonwebtoken'
import { env } from '../env.js'

const isValidJwt = (token) => {
  try {
    jwt.verify(token, env.jwtSecret)
    return true
  } catch {
    return false
  }
}

export { isValidJwt }
