import bcrypt from 'bcryptjs'

const isValidPass = async (password, hash) => {
  try {
    return await bcrypt.compare(password, hash)
  } catch (error) {
    throw new Error(error)
  }
}

export { isValidPass }
