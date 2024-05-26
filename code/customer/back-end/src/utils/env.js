import 'dotenv/config'

const env = {
  stage: process.env.STAGE,
  port: process.env.PORT || 3001,
  hostApi: process.env.HOST_API,
  dbPassword: process.env.DB_PASSWORD,
  dbName: process.env.DB_NAME,
  dbHost: process.env.DB_HOST,
  dbPort: process.env.DB_PORT,
  dbUser: process.env.DB_USER,
  jwtSecret: process.env.JWT_SECRET,
  bcryptSalt: process.env.BCRYPT_SALT,
  tmdbApiToken: process.env.TMDB_API_TOKEN
}

export { env }
