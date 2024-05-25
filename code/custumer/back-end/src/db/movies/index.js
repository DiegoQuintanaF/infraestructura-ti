import { pool } from '../connection/index.js'

const getMovies = async () => {
  const query =
    'SELECT movie_id, title, description, rating, poster_path FROM movies'
  const { result } = await pool.query(query)
  return result
}

const getMovieById = async (id) => {
  const query = 'SELECT * FROM movies WHERE movie_id = $1'
  const { rows } = await pool.query(query, [id])
  return rows[0]
}

export const movies = {
  getMovies,
  getMovieById
}
