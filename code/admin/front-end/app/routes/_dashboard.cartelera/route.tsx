import { LoaderFunction } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { fetchCartelera } from '~/api/fetchCartelera'
import { Card } from '~/components/movies/Card'

export const loader: LoaderFunction = async () => {
  const res = await fetchCartelera()

  if (!res.success) {
    return []
  }

  return res.data
}

interface Movie {
  movie_id: number
  title: string
  description: string
  rating: number
  release_date: string
  poster_path: string
  backdrop_path: string
}

export default function Cartelera() {
  const movies: Movie[] = useLoaderData()

  return (
    <section className="flex min-h-dvh flex-col gap-8 p-8">
      <h2>Cartelera actual</h2>
      <div className="mx-auto grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
        {movies.map(
          ({ movie_id, title, release_date, poster_path, rating }) => (
            <Card
              key={movie_id}
              title={title}
              releaseDate={release_date}
              posterPath={poster_path}
              rating={rating}
            />
          )
        )}
      </div>
    </section>
  )
}
