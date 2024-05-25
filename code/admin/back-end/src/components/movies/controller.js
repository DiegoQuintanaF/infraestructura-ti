import { db } from '../../db/index.js'
import { response } from '../../network/response.js'
import { fetchMovieDetails } from '../../utils/movieDb/fetchMovieDetails.js'
import { fetchNowPlayingMovies } from '../../utils/movieDb/fetchNowPlayingMovies.js'
import { fetchSearchMovie } from '../../utils/movieDb/fetchSearchMovie.js'

const createMovie = async (req, res, next) => {
  try {
    const { movieId } = req.body

    if (!movieId) {
      return response.error(res, 'El id de la pelicula.')
    }

    const movie = await fetchMovieDetails(movieId)

    if (!movie.success) {
      return response.error(
        res,
        'No se pudo obtener los detalles de la pelicula',
        404
      )
    }

    const movieData = movie.data

    let dbRes
    try {
      dbRes = await db.movies.createMovie({
        movieId: movieData.id,
        title: movieData.title,
        description: movieData.overview,
        rating: movieData.vote_average,
        backdropPath: movieData.backdrop_path,
        posterPath: movieData.poster_path,
        releaseDate: movieData.release_date
      })

      console.log(dbRes)
    } catch (e) {
      return response.error(res, 'Hiciste algo mal en la db')
    }

    response.success(res, dbRes)
  } catch (e) {
    next(e)
  }
}

const nowPlaying = async (_, res, next) => {
  try {
    const movies = await fetchNowPlayingMovies()

    if (!movies.success) {
      return response.error(res, 'No se pudo obtener la pelicula')
    }

    response.success(res, movies.data)
  } catch (e) {
    next(e)
  }
}

const getMovies = async (_, res, next) => {
  try {
    const movies = await db.movies.getMovies()

    response.success(res, movies)
  } catch (e) {
    next(e)
  }
}

const getMovieDetails = async (req, res, next) => {
  try {
    const { movieId } = req.params

    let movie
    try {
      movie = await db.movies.getMovieById(movieId)
    } catch (e) {
      return response.error(res, 'No se pudo obtener la pelicula.', 404)
    }

    if (!movie)
      return response.error(res, 'No se pudo obtener la pelicula', 404)

    response.success(res, movie)
  } catch (e) {
    next(e)
  }
}

const searchMovie = async (req, res, next) => {
  try {
    const { query } = req.query

    if (!query) {
      return response.error(res, 'Falta el query', 400)
    }

    const movies = await fetchSearchMovie(query)

    if (!movies.success || movies.data.length === 0) {
      return response.error(res, 'No se encontraron resultados', 404)
    }

    response.success(res, movies.data)
  } catch (e) {
    next(e)
  }
}

export { createMovie, nowPlaying, getMovies, getMovieDetails, searchMovie }
