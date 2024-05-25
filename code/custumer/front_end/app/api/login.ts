import { env } from '~/config/env'

type LoginResponse = {
  token: string
  user: {
    name: string
    email: string
  }
}

export interface LoginResult {
  success: boolean
  data?: LoginResponse
  message: string
  status: number
}

export const login = async (
  email: string,
  password: string
): Promise<LoginResult> => {
  try {
    const response = await fetch(`${env.API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    })
    const data = await response.json()

    if (!data.success) {
      return {
        ...data,
        message: 'Error al iniciar sesión',
        status: response.status
      }
    }

    return data
  } catch (error) {
    return { success: false, message: 'Error al iniciar sesión', status: 500 }
  }
}
