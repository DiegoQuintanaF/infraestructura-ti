import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '~/components/ui/popover'
import { Link } from '@remix-run/react'
import { User } from '~/store/useSessionStore'
import LogOutButton from './LogOutButton'

type UserNavProps = {
  user: User
}

export const UserNav = ({ user }: UserNavProps) => {
  console.log('user', user)
  return (
    <div className="z-[999] flex flex-col items-center gap-4 md:flex-row">
      <Popover>
        <PopoverTrigger className="z-[999] rounded-md border border-gray-600 bg-white p-3 text-center font-bold text-black hover:bg-gray-100 md:h-fit md:w-max md:px-3 md:py-1">
          {user?.email}
        </PopoverTrigger>

        <PopoverContent className="z-[999] mt-2 flex flex-col items-start gap-2">
          <Link
            to="/purchases"
            className="inline-block w-full rounded-md p-2 text-left hover:bg-gray-100"
          >
            Mis compras
          </Link>
          <LogOutButton />
        </PopoverContent>
      </Popover>
    </div>
  )
}
