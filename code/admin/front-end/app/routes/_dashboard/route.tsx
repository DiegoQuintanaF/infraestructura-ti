import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar'

import { Link, Outlet, useLoaderData, useLocation } from '@remix-run/react'
import { LoaderFunction } from '@remix-run/node'
import { getSession } from '~/store/session'
import { ScrollArea } from '~/components/ui/scroll-area'

export const loader: LoaderFunction = async ({ request }) => {
  const session = await getSession(request.headers.get('Cookie'))

  const info = JSON.parse(session.get('payload') as string)

  return info
}

export default function Layout() {
  const location = useLocation()
  const session: {
    name: string
    token: string
    id: number
    email: string
  } = useLoaderData()

  return (
    <div className="flex border-r border-neutral-700">
      <article className="flex h-dvh w-72 flex-col border-r border-neutral-700 p-8">
        <div>
          <h1 className="mb-10 text-lg font-bold">Dashboard</h1>

          <div className="flex flex-col gap-2">
            <Link
              to="/"
              className={`block w-full rounded-md bg-gray-50 p-2 hover:bg-gray-100`}
            >
              Inicio
            </Link>
            <Link
              to="/cartelera"
              className={`block rounded-md bg-gray-50 p-2 hover:bg-gray-100 ${location.pathname === '/cartelera' ? 'font-bold' : ''}`}
            >
              Peliculas en cartelera
            </Link>
            <Link
              to="/actuales"
              className={`block rounded-md bg-gray-50 p-2 hover:bg-gray-100 ${location.pathname === '/actuales' ? 'font-bold' : ''}`}
            >
              Agregar pelicula
            </Link>
          </div>
        </div>

        <div className="mt-auto flex items-center gap-4">
          <Avatar className="size-14">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div>
            <h4 className="font-bold">Administrador</h4>
            <p className="text-sm text-neutral-500">{session.name}</p>
          </div>
        </div>
      </article>
      <ScrollArea className="h-dvh">
        <Outlet />
      </ScrollArea>
    </div>
  )
}
