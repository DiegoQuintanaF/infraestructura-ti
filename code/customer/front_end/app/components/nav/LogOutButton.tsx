import { Form } from '@remix-run/react'

export default function LogOutButton() {
  return (
    <Form method="post" className="w-full">
      <button className="w-full rounded-md p-2 text-left text-red-600 hover:bg-red-50">
        Cerrar Sesión
      </button>
    </Form>
  )
}
