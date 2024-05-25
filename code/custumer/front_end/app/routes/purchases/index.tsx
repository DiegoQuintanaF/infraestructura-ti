import { Link, Outlet } from '@remix-run/react'

export default function Login() {
  return (
    <div className="container flex h-page w-full flex-col items-center pt-8">
      <section className="flex w-full flex-col gap-4 md:w-[600px] lg:w-[800px]">
        <h2 className="text-xl font-bold">Tus compras:</h2>
        <div className="w-full">
          <div className="flex w-full flex-col gap-2">
            <PurchaseItem
              movieName="Kung Fu Panda"
              quantity={1}
              date="10/05/22"
              id={1}
            />
            <PurchaseItem
              movieName="Kung Fu Panda"
              quantity={1}
              date="10/05/22"
              id={2}
            />
            <PurchaseItem
              movieName="Kung Fu Panda"
              quantity={1}
              date="10/05/22"
              id={3}
            />
          </div>

          <Outlet />
        </div>
      </section>
    </div>
  )
}

type PurchaseItemProps = {
  movieName: string
  quantity: number
  date: string
  id: number
}

function PurchaseItem({ movieName, quantity, date, id }: PurchaseItemProps) {
  return (
    <Link
      to={`/purchases/${id}`}
      className="flex h-fit w-full flex-col justify-between gap-4 rounded-lg border border-black p-2 transition-transform hover:scale-[1.01] hover:bg-gray-50 sm:flex-row"
    >
      <div className="w-full">
        <h3>
          <span className="font-bold">Pelicula:</span> {movieName}
        </h3>
        <p>
          <span className="font-bold">Cantidad:</span> {quantity}
        </p>
      </div>
      <p className="w-fit">
        <span className="font-bold">Fecha de compra:</span> {date}
      </p>
    </Link>
  )
}
