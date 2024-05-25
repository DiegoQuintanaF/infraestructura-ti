import { env } from '~/config/env'

export const fetchNowPlaying = async () => {
  try {
    const res = await fetch(`${env.API_URL}/movies/now`)

    if (!res.ok || res.status > 299) {
      return {
        success: false,
        message: 'algo paso'
      }
    }

    const movies = await res.json()

    return {
      success: true,
      message: 'ok',
      data: movies.data
    }
  } catch (e) {
    return {
      message: 'ups',
      success: false,
      data: null
    }
  }
}
