import { pool } from '../connection/index.js'

const getAdminByEmail = async (email) => {
  const query = 'SELECT * FROM admins WHERE email = $1;'
  const { rows } = await pool.query(query, [email])

  return rows[0]
}

export const admins = {
  getAdminByEmail
}
