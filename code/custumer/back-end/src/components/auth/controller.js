import { db } from '../../db/index.js'
import { createJwt } from '../../utils/jwt/createJwt.js'
import { isValidPass, createHash } from '../../utils/bcrypt/index.js'
import {
  isValidSchema,
  userSchema,
  registerSchema
} from '../../schemas/index.js'
import { response } from '../../network/response.js'

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body

    try {
      isValidSchema(userSchema, { email, password })
    } catch (error) {
      response.error(res, 'Invalid email or password', 400)
    }

    const user = await db.users.getUserByEmail(email)

    if (!user) {
      return response.error(res, 'Invalid email or password', 401)
    }

    const isValidPassword = await isValidPass(password, user.password)

    if (!isValidPassword) {
      return response.error(res, 'Invalid email or password', 401)
    }

    const payload = {
      id: user.user_id,
      name: user.name,
      email: user.email
    }

    const token = createJwt(payload)

    response.success(res, { token, ...payload })
  } catch (error) {
    next(error)
  }
}

const register = async (req, res, next) => {
  try {
    const { name, email, password, confirmPassword } = req.body

    if (!name || !email || !password || !confirmPassword) {
      return response.error(res, 'Missing required fields', 400)
    }

    try {
      isValidSchema(registerSchema, { name, email, password, confirmPassword })
    } catch (error) {
      return response.error(res, error.message, 400)
    }

    if (password !== confirmPassword) {
      return response.error(res, 'Passwords do not match', 400)
    }

    const user = await db.users.getUserByEmail(email)

    if (user) {
      return response.error(res, 'User already exists', 400)
    }

    const passwordHash = await createHash(password, 10)

    const newUser = await db.users.createUser(name, email, passwordHash)
    const payload = {
      id: newUser.user_id,
      name: newUser.name,
      email: newUser.email
    }
    response.success(res, { user: payload }, 201)
  } catch (error) {
    next(error)
  }
}

export { login, register }
