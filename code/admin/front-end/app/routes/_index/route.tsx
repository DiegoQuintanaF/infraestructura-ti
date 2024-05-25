import { LoaderFunction, json, redirect } from '@remix-run/node'
import { useNavigate } from '@remix-run/react'
import { commitSession, getSession } from '~/store/session'

export const loader: LoaderFunction = async ({ request }) => {
  const session = await getSession(request.headers.get('Cookie'))

  if (!session.has('payload')) {
    // Redirect to the home page if they are already signed in.
    return redirect('/login')
  }

  const data = { error: session.get('error') }

  return json(data, {
    headers: {
      'Set-Cookie': await commitSession(session)
    }
  })
}

export default function Index() {
  const navigate = useNavigate()

  return (
    <section className="min-h-dvh p-8">
      <h1 className="text-xl font-bold">Administración</h1>
      <div className="flex h-[calc(100dvh_-_200px)] min-h-fit grid-cols-1 flex-wrap items-center justify-center gap-8 border py-4 md:grid-cols-2">
        <article
          onClick={() => navigate('/cartelera')}
          className="flex size-fit flex-col justify-center gap-4 rounded-lg border
          border-neutral-700 p-4 transition-transform hover:scale-105 hover:cursor-pointer"
        >
          <h2>Agregar pelicula</h2>
          <span className="icon-[material-symbols--add-circle-outline-rounded] mx-auto size-10 bg-neutral-600"></span>
        </article>
        <article
          onClick={() => navigate('/cartelera')}
          className="flex size-fit flex-col justify-center gap-4 rounded-lg border
          border-neutral-700 p-4 transition-transform hover:scale-105 hover:cursor-pointer"
        >
          <h2>Peliculas en cine</h2>
          <span className="icon-[material-symbols--check-circle-outline-rounded] mx-auto size-10 bg-neutral-600"></span>
        </article>
      </div>
    </section>
  )
}
