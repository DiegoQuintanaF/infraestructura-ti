import { Link } from '@remix-run/react'
import { format } from 'date-fns'

type CardProps = {
  title: string
  to: string
  releaseDate: string
  posterPath: string
  rating: number
}

export const Card = ({
  title,
  to,
  releaseDate,
  posterPath,
  rating
}: CardProps) => {
  console.log('releaseDate', releaseDate)
  return (
    <Link
      to={to}
      className="inline-block w-fit rounded-md border border-gray-300 p-2 shadow-md transition hover:scale-105 hover:shadow-lg"
    >
      <img
        loading="lazy"
        className="mx-auto aspect-[2/3] rounded-md object-cover"
        // src="https://admin.cinemasroyalfilms.com/assets/images/movies-poster/1703626035495-Kung%20Fu%20Panda%204.png"
        src={`https://image.tmdb.org/t/p/w500${posterPath}`}
        alt="kung fu panda"
      />
      <div className="flex flex-col">
        <h2 className="text-lg   font-bold">{title}</h2>
        <div className="mt-auto">
          <p className="text-sm text-gray-500">
            Fecha de estreno: {format(new Date(releaseDate), 'dd-MM-yyyy')}
          </p>
          <p className="text-sm text-gray-500">Calificación: {rating}</p>
        </div>
      </div>
    </Link>
  )
}
