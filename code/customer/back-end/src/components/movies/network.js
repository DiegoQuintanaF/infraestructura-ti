import { Router } from 'express'
import { addMovie, getMoviesList, getMovieById } from './controller.js'

const moviesRouter = Router()

moviesRouter.get('/', getMoviesList)
moviesRouter.get('/:movieId', getMovieById)
moviesRouter.post('/:movieId', addMovie)

export { moviesRouter }
