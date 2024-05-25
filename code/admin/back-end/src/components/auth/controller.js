import { db } from '../../db/index.js'
import { createJwt } from '../../utils/jwt/createJwt.js'
import { isValidPass } from '../../utils/bcrypt/index.js'
import { response } from '../../network/response.js'

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return response.error(
        res,
        'Faltan parametros compa, no te dire cuales, pero, faltan',
        400
      )
    }

    const admin = await db.admins.getAdminByEmail(email)

    if (!admin) {
      return response.error(res, 'Invalid email or password', 401)
    }

    const isValidPassword = await isValidPass(password, admin.password)

    if (!isValidPassword) {
      return response.error(res, 'Invalid email or password', 401)
    }

    const payload = {
      id: admin.admin_id,
      name: admin.name,
      email: admin.email
    }

    const token = createJwt(payload)

    response.success(res, { token, ...payload })
  } catch (error) {
    next(error)
  }
}

export { login }
