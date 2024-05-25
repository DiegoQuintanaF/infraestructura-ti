import bcrypt from 'bcryptjs'

const createHash = async (password) => {
  try {
    const salt = await bcrypt.genSalt(10)
    return await bcrypt.hash(password, salt)
  } catch (error) {
    throw new Error(error)
  }
}

export { createHash }
