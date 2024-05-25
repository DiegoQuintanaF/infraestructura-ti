import { config } from 'dotenv'

config()

type Env = {
  API_URL: string
}

const env: Env = {
  API_URL: process.env.API_URL || 'http://localhost:3000'
}
console.log('env', env)

export { env }
