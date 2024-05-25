import pkg from 'pg'
import { env } from '../../utils/env.js'

const { Pool } = pkg

const config = {
  user: env.dbUser,
  host: env.dbHost,
  database: env.dbName,
  password: env.dbPassword,
  port: env.dbPort
}

if (env.stage !== 'dev') {
  config.ssl = {
    rejectUnauthorized: false
  }
}

const pool = new Pool(config)

const connect = async () => {
  await pool.connect()
  console.log('[db] Connected to database')
}

export { connect, pool }
