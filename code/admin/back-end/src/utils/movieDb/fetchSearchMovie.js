import { env } from '../env.js'
import { URL_TMDB } from './url_tmdb.js'

const fetchSearchMovie = async (query) => {
  const url = new URL(`${URL_TMDB}/search/movie`)
  url.searchParams.append('query', new URLSearchParams(query).toString())
  url.searchParams.append('language', 'es-CO')
  url.searchParams.append('region', 'CO')

  const res = await fetch(url, {
    headers: {
      method: 'GET',
      Authorization: `Bearer ${env.tmdbApiToken}`
    }
  })

  if (!res.ok || res.status > 299) {
    return {
      success: false,
      message: 'Algo salio mal',
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
    message: '',
    data: results
  }
}

export { fetchSearchMovie }
