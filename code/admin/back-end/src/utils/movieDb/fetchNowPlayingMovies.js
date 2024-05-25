import { env } from '../env.js'
import { URL_TMDB } from './url_tmdb.js'

const fetchNowPlayingMovies = async () => {
  const url = `${URL_TMDB}/movie/now_playing?language=es-CO&region=CO`
  const res = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${env.tmdbApiToken}`
    }
  })

  if (!res.ok) {
    return {
      success: false,
      message: 'Algo paso, no sé',
      data: null
    }
  } else if (res.status > 299) {
    return {
      success: false,
      message: 'No se encontro nada',
      data: null
    }
  }

  const movies = await res.json()

  const formatedMovies = movies.results.map((movieData) => {
    return {
      movieId: movieData.id,
      title: movieData.title,
      description: movieData.overview,
      rating: movieData.vote_average,
      backdropPath: movieData.backdrop_path,
      posterPath: movieData.poster_path,
      releaseDate: movieData.release_date
    }
  })

  const results = formatedMovies.filter((movie) => {
    return (
      movie.description.length !== 0 &&
      movie.backdropPath !== null &&
      movie.rating !== 0 &&
      movie.posterPath !== null
    )
  })

  return {
    success: true,
    message: 'ok',
    data: results
  }
}

export { fetchNowPlayingMovies }
