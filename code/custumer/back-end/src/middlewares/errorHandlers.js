import { response } from '../network/response.js'

const errorHandler = (err, req, res, next) => {
  console.error(err)
  response.error(res, 'Something went wrong', 500)
}

export { errorHandler }
