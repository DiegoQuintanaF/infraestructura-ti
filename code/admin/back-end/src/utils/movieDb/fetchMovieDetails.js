import { env } from '../env.js'
import { URL_TMDB } from './url_tmdb.js'

const fetchMovieDetails = async (movieId) => {
  if (!movieId) {
    return {
      success: false,
      message: 'No se paso un ID',
      data: null
    }
  }

  const url = `${URL_TMDB}/movie/${movieId}?language=es-CO`

  const res = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${env.tmdbApiToken}`
    }
  })

  if (!res.ok || res.status > 299) {
    return {
      success: false,
      message: 'Fallo',
      data: null
    }
  }

  const data = await res.json()

  return {
    success: true,
    message: 'Todo ok',
    data
  }
}

export { fetchMovieDetails }
