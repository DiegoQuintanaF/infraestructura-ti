import { env } from '~/config/env'

type registerResponse = {
  token: string
  user: {
    name: string
    email: string
  }
}

export interface registerResult {
  success: boolean
  data?: registerResponse
  message: string
  status: number
}

export const register = async (
  name: string,
  email: string,
  password: string,
  confirmPassword: string
): Promise<registerResult> => {
  try {
    const response = await fetch(`${env.API_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, email, password, confirmPassword })
    })

    if (!response.ok) {
      return {
        status: 400,
        success: false,
        message: 'Minimo 8 caracteres las contraseñas'
      }
    }

    const data = await response.json()

    if (!data.success) {
      return {
        ...data,
        message: 'Error al registrar',
        status: response.status
      }
    }

    return data
  } catch (error) {
    return {
      success: false,
      message: 'Asegurese min 8 caracteres en la contraseña',
      status: 500
    }
  }
}
