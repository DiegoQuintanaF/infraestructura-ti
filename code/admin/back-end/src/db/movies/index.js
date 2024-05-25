import { pool } from '../connection/index.js'

const getMovies = async () => {
  const query =
    'SELECT movie_id, title, description, rating, poster_path FROM movies'
  const { rows } = await pool.query(query)
  return rows
}

const getMovieById = async (id) => {
  const query = 'SELECT * FROM movies WHERE movie_id = $1'
  const { rows } = await pool.query(query, [id])
  return rows[0]
}

const createMovie = async ({
  movieId,
  title,
  description,
  releaseDate,
  rating,
  posterPath,
  backdropPath
}) => {
  try {
    const query = `INSERT INTO movies (movie_id, title, description, release_date, rating, poster_path, backdrop_path) 
    VALUES ($1, $2, $3, $4, $5, $6, $7)
  `
    const { rows } = await pool.query(query, [
      movieId,
      title,
      description,
      releaseDate,
      rating,
      posterPath,
      backdropPath
    ])

    return rows[0]
  } catch (e) {
    console.error(e)
    throw e
  }
}

export const movies = { getMovies, getMovieById, createMovie }
