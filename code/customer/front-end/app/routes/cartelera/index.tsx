import { LoaderFunction } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { Card } from '~/components/movies/Card'
import { env } from '~/config/env'

export const loader: LoaderFunction = async () => {
  const movies = await fetch(`${env.API_URL}/movies`)
    .then((res) => res.json())
    .then((res) => res.results)

  return movies ?? []
}

interface movie {
  movie_id: number
  title: string
  release_date: string
  poster_path: string
  rating: number
}

export default function Index() {
  const movies: movie[] = useLoaderData()

  return (
    <section className="container min-h-[calc(100dvh_-_var(--nav-height)_-_136px)] w-full  gap-4">
      <h1 className="border-b p-2 text-xl font-bold">Cartelera</h1>
      <br />

      <div className="mx-auto grid w-fit grid-cols-1 gap-4 justify-self-center sm:grid-cols-2  md:grid-cols-3 lg:grid-cols-4">
        {movies.map((movie) => (
          <Card
            key={movie.movie_id}
            title={movie.title}
            to={`/cartelera/${movie.movie_id}`}
            releaseDate={movie.release_date}
            rating={movie.rating}
            posterPath={movie.poster_path}
          />
        ))}
      </div>
      <br />
    </section>
  )
}
