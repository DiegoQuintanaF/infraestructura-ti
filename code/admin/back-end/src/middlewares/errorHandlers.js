import { response } from '../network/response.js'

const errorHandler = (err, _, res, __) => {
  console.error(err)
  response.error(res, 'Algo salio mal', 500)
}

export { errorHandler }
