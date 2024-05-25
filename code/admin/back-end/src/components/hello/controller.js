import { response } from '../../network/response.js'

const helloWorld = (_, res, next) => {
  try {
    response.success(res, { message: 'hola' })
  } catch (error) {
    next(error)
  }
}

export { helloWorld }
