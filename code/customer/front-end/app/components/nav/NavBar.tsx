import { Link } from '@remix-run/react'
import { NavLink } from './NavLink'
import { useState } from 'react'
import { UserNav } from './UserNav'
// import { LoaderFunction } from '@remix-run/node'
// import { getSession } from '~/store/session'

type NavBarProps = {
  session: {
    token: string
    id: string
    name: string
    email: string
    isLogged: boolean
  }
}

export const NavBar = ({ session }: NavBarProps) => {
  const [mobileMenu, setMobileMenu] = useState(false)

  console.log('estado', session)

  const handleMobileMenu = () => {
    setMobileMenu(!mobileMenu)
  }

  const mobileMenuClass = mobileMenu
    ? 'block flex flex-col gap-4 w-full justify-between h-view'
    : 'hidden'

  return (
    <header className="fixed top-0 z-[99] flex min-h-[var(--nav-height)] w-dvw border-b bg-background py-3">
      <nav className="container flex h-full w-full flex-col items-center justify-between gap-4 md:flex-row">
        <div className="flex h-full w-full justify-between md:w-max">
          <Link to="/" className="flex items-center gap-2">
            <span className="icon-[ph--ticket-bold] inline-block h-8 w-8"></span>
            <span className="w-max font-bold">E-MOVIE</span>
          </Link>
          <button
            onClick={handleMobileMenu}
            className="icon-[ci--hamburger-lg] h-8 w-8 md:hidden"
          />
        </div>
        <div
          className={
            mobileMenuClass + ' ' + 'md:flex md:h-fit md:flex-row md:gap-4'
          }
        >
          <ul
            className={'flex w-full flex-col gap-4 md:flex-row md:justify-end'}
          >
            <NavLink to="/cartelera" handleClick={handleMobileMenu}>
              Cartelera
            </NavLink>
          </ul>
          {!session?.isLogged ? (
            <div className="flex flex-col items-center gap-4 md:flex-row">
              <Link
                to="/login"
                className="inline-block w-full rounded-md border border-black bg-black p-3 text-center font-bold text-white md:h-fit md:w-max md:px-3 md:py-1"
                onClick={handleMobileMenu}
              >
                Iniciar sesión
              </Link>
              <Link
                to="/register"
                className="inline-block w-full rounded-md border border-black bg-white p-3 text-center font-bold text-black md:h-fit md:w-max md:px-3 md:py-1"
                onClick={handleMobileMenu}
              >
                Registrarse
              </Link>
            </div>
          ) : (
            <UserNav user={{ name: session.name, email: session.email }} />
          )}
        </div>
      </nav>
    </header>
  )
}
