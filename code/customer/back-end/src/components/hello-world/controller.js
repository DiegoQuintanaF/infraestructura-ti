import { db } from '../../db/index.js'

const hello = async (req, res, next) => {
  try {
    const users = await db.users.getUsers()
    res.json(users)
  } catch (error) {
    next(error)
  }
}

const helloById = async (req, res, next) => {
  try {
    const { id } = req.params
    const user = await db.users.getUserById(id)
    res.json(user)
  } catch (err) {
    next(err)
  }
}

export { hello, helloById }
