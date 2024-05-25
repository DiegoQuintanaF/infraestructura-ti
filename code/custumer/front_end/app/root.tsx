import {
  Links,
  Meta,
  Navigate,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useLocation
} from '@remix-run/react'
import { NavBar } from '~/components/nav/NavBar'
import { Footer } from '~/components/footer/Footer'

import './globals.css'
import { destroySession, getSession } from './store/session'
import {
  ActionFunction,
  LoaderFunction,
  LoaderFunctionArgs,
  redirect
} from '@remix-run/node'

export const loader: LoaderFunction = async ({
  request
}: LoaderFunctionArgs) => {
  const session = await getSession(request.headers.get('Cookie'))
  if (session.has('payload')) {
    return { ...JSON.parse(session.get('payload') as string), isLogged: true }
  }
  return { isLogged: false }
}

export const action: ActionFunction = async ({ request }) => {
  const session = await getSession(request.headers.get('Cookie'))
  console.log('session logout')
  return redirect('/login', {
    headers: {
      'Set-Cookie': await destroySession(session)
    }
  })
}

export function Layout({ children }: { children: React.ReactNode }) {
  const session = useLoaderData<typeof loader>()
  const location = useLocation()
  return (
    <html lang="es">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://admin.cinemasroyalfilms.com" />
        <link rel="icon" type="image/svg+xml" href="/ticket.svg" />
        <title>E-MOVIE</title>
        <Meta />
        <Links />
      </head>
      <body className="min-h-dvh">
        <div className="h-[var(--nav-height)] w-full"></div>
        <NavBar session={session} />
        {location.pathname === '/' && <Navigate to="/cartelera" />}
        {children}
        <Footer />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}

export default function App() {
  return <Outlet />
}
