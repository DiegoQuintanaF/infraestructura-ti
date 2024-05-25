import { env } from '../../utils/env.js'
import { db } from '../../db/index.js'
import { pool } from '../../db/connection/index.js'

const fetchMovieById = async (movieId) => {
  const options = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${env.tmdbApiToken}`
    }
  }

  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}?language=es-CO`,
    options
  )
  const data = await res.json()

  return data
}

const getMoviesList = async (req, res) => {
  const query = 'SELECT * FROM movies'
  const { rows } = await pool.query(query)

  res.json({ results: rows })
}

const getMovieById = async (req, res) => {
  const { movieId } = req.params
  const query = 'SELECT * FROM movies WHERE movie_id = $1'
  const { rows } = await pool.query(query, [movieId])

  res.json({ result: rows[0] })
}

const addMovie = async (req, res) => {
  const { movieId } = req.params

  if (!movieId) {
    return res.status(400).json({ message: 'Need movie id' })
  }

  const movie = await db.movies.getMovieById(movieId)

  if (movie) {
    return res.status(400).json({ message: 'Movie already exists' })
  }

  const {
    title,
    vote_average: rating,
    overview: description,
    release_date: releaseDate,
    poster_path: posterPath,
    backdrop_path: backdropPath
  } = await fetchMovieById(movieId)

  const createdMovie = await db.movies.addMovie({ movieId, title, rating, description, posterPath, backdropPath, releaseDate })
  res.json(createdMovie)
}

export { getMoviesList, addMovie, getMovieById }
