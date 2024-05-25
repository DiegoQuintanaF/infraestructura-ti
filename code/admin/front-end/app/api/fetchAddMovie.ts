import { env } from '~/config/env'

export const fetchAddMovie = async (movieId: number) => {
  const res = await fetch(`${env.API_URL}/movies`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ movieId })
  })

  if (!res.ok || res.status > 299) {
    return {
      success: false,
      message: 'ups',
      data: undefined
    }
  }

  const movie = await res.json()

  if (!movie.success) {
    return {
      success: false,
      message: movie.message,
      data: undefined
    }
  }
  return movie
}
