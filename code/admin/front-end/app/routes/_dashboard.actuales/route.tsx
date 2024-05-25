import { ActionFunction, LoaderFunction } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { fetchAddMovie } from '~/api/fetchAddMovie'
import { fetchNowPlaying } from '~/api/fetchNowPlaying'
import { Card } from '~/components/movies/Card'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '~/components/ui/dialog'

export const loader: LoaderFunction = async () => {
  const res = await fetchNowPlaying()

  if (!res.success) {
    return []
  }

  return res.data
}

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData()

  const movieId = formData.get('movieId')
  console.log(movieId, typeof movieId)

  if (movieId === undefined || typeof movieId != 'string') {
    console.log(movieId, typeof movieId)

    return {
      status: 400,
      message: 'ups'
    }
  }

  console.log('hola lleuge aca')

  const res = await fetchAddMovie(Number(movieId))

  console.log(res)

  return {
    status: 201,
    message: 'ok'
  }
}

interface Movie {
  movieId: number
  title: string
  description: string
  rating: number
  releaseDate: string
  posterPath: string
  backdropPath: string
}

export default function Actuales() {
  const movies: Movie[] = useLoaderData<typeof loader>()

  return (
    <section className="flex min-h-dvh flex-col gap-8 p-8">
      <h2>Agregar: Actuales</h2>
      <div className="mx-auto grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
        {movies.map(({ movieId, title, releaseDate, posterPath, rating }) => (
          <Dialog key={movieId}>
            <DialogTrigger>
              <Card
                key={movieId}
                title={title}
                releaseDate={releaseDate}
                posterPath={posterPath}
                rating={rating}
              />
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>¿Desea agregar "{title}"?</DialogTitle>
                <form method="POST" className="mt-4 flex justify-between">
                  <input
                    type="number"
                    name="movieId"
                    value={movieId}
                    className="opacity-0"
                  />
                  <button className="block rounded-sm bg-black px-8 py-2 text-white">
                    confirmar
                  </button>
                </form>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        ))}
      </div>
    </section>
  )
}
