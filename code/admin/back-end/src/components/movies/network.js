import { Router } from 'express'
import {
  nowPlaying,
  createMovie,
  getMovies,
  getMovieDetails,
  searchMovie
} from './controller.js'

const moviesRouter = Router()

moviesRouter.get('/search', searchMovie)
moviesRouter.get('/now', nowPlaying)
moviesRouter.get('/', getMovies)
moviesRouter.post('/', createMovie)
moviesRouter.get('/:movieId', getMovieDetails)

export { moviesRouter }
