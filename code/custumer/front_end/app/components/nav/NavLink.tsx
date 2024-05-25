import { NavLink as Link } from '@remix-run/react'

type NavLinkProps = {
  to: string
  handleClick: () => void
  children: string
}

export const NavLink = ({ to, handleClick, children }: NavLinkProps) => {
  return (
    <li className="flex items-center overflow-hidden rounded-lg">
      <Link
        to={to}
        onClick={handleClick}
        className="flex w-full p-3 md:py-1 [&.active]:bg-gray-100 [&.active]:font-bold [&.active]:text-black"
      >
        {children}
      </Link>
    </li>
  )
}
