import { env } from '~/config/env'

interface LoginResponse {
  success: boolean
  message: string
  data?: {
    token: string
    id: number
    name: string
    email: string
  }
}

export const login = async (
  email: string,
  password: string
): Promise<LoginResponse> => {
  try {
    console.log('Aqui llega', email, password)
    const res = await fetch(`${env.API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        password
      })
    })

    if (!res.ok || res.status > 299) {
      console.log('Entro aqui', res.ok, res.status)
      return {
        success: false,
        message: 'Algo salio mal.'
      }
    }

    const result: LoginResponse = await res.json()

    if (!result.success) {
      return {
        success: false,
        message: result.message
      }
    }

    console.log(result)

    return result
  } catch {
    return {
      success: false,
      message: 'Algo salio peor'
    }
  }
}
