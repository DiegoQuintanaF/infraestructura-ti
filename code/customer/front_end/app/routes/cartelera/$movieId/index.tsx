import { LoaderFunction } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { format } from 'date-fns'
import { MovieDates, OtherMoviesCarousel } from '~/components/movies/MovieDates'
import { env } from '~/config/env'

interface Movie {
  movie_id: number
  title: string
  description: string
  release_date: string
  rating: number
  poster_path: string
  backdrop_path: string
}

export const loader: LoaderFunction = async ({ params }) => {
  const { movieId } = params

  const movie: Movie = await fetch(`${env.API_URL}/movies/${movieId}`)
    .then((res) => res.json())
    .then((res) => res.result)

  const movies: Movie[] = await fetch(`${env.API_URL}/movies`)
    .then((res) => res.json())
    .then((res) => res.results)

  const otherMovies = movies.filter(
    (movie) => movie.movie_id !== parseInt(movieId as string)
  )

  return [movie, otherMovies]
}

export default function MovieDetails() {
  const [movie, otherMovies]: [Movie, Movie[]] = useLoaderData()

  return (
    <div className="min-h-page pt-32">
      <img
        className="absolute top-[57px] z-[-1] h-96 w-full object-cover object-top blur-sm"
        src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
        alt={String(movie.movie_id)}
      />

      <div className="container z-50 flex w-dvw flex-col gap-4 md:flex-row">
        <div className="mx-auto flex w-fit flex-col gap-4">
          <figure className="flex aspect-[2/3] h-96 w-fit justify-center">
            <img
              className="aspect-[2/3] h-96 w-auto rounded-md object-cover shadow-xl"
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt=""
            />
          </figure>
          <h1 className="w-64 text-balance text-center text-2xl font-bold">
            {movie.title}
          </h1>
        </div>

        <div className="flex flex-col gap-4 md:mt-64 md:pt-2">
          <article className="z-50 flex flex-col gap-4">
            <h2 className="text-lg font-bold">Sinopsis</h2>
            <p className="text-pretty">{movie.description}</p>
            <hr />
            <div className="flex flex-col md:flex-row md:gap-4">
              <p className="font-bold text-gray-500">
                Fecha de lanzamiento:{' '}
                <span className="text-sm font-normal">
                  {format(new Date(movie.release_date), 'dd-MM-yyyy')}
                </span>
              </p>
              <p className="font-bold text-gray-500">
                Calificación:{' '}
                <span className="text-sm font-normal">{movie.rating}</span>
              </p>
            </div>
          </article>

          <div className="w-full">
            <h2 className="text-xl font-bold">Funciones</h2>
          </div>

          <MovieDates />

          <h2 className="text-xl font-bold">Otras funciones</h2>

          <div>
            <OtherMoviesCarousel movies={otherMovies} />
          </div>
          <br />
        </div>
      </div>
    </div>
  )
}
