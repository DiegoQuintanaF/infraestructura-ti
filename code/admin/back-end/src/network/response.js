const success = (res, data, status = 200, message = '') => {
  const response = {
    success: true,
    message: message || 'Success',
    data
  }
  res.status(status).json(response)
}

const error = (res, message, status = 500) => {
  const response = {
    success: false,
    message,
    data: null
  }
  res.status(status).json(response)
}

export const response = { success, error }
