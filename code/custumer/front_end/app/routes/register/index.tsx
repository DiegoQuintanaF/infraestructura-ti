import { ActionFunction, redirect } from '@remix-run/node'
import { Form, useActionData } from '@remix-run/react'
import { register } from '~/api/register'
import { Input } from '~/components/forms/Input'
import { Alert, AlertDescription, AlertTitle } from '~/components/ui/alert'

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData()

  const name = formData.get('name')
  const email = formData.get('email')
  const password = formData.get('password')
  const confirmPassword = formData.get('confirmPassword')

  if (!name || !email || !password || !confirmPassword) {
    return {
      status: 400,
      json: {
        errors: {
          hasErrors: true,
          message: 'Ingrese los datos completos'
        }
      }
    }
  }

  if (
    typeof name !== 'string' ||
    typeof email !== 'string' ||
    typeof password !== 'string' ||
    typeof confirmPassword !== 'string'
  ) {
    return {
      status: 400,
      json: {
        errors: {
          hasErrors: true,
          message: 'Algo salio mal'
        }
      }
    }
  }

  if (password !== confirmPassword) {
    return {
      status: 400,
      json: {
        errors: {
          hasErrors: true,
          message: 'No son iguales las contraseñas'
        }
      }
    }
  }

  const res = await register(name, email, password, confirmPassword)
  console.log(res)

  if (res === undefined) {
    return {
      status: 401,
      json: {
        errors: {
          hasErrors: true,
          message: 'Error en el servidor'
        }
      }
    }
  }

  if (!res.success) {
    return {
      status: 400,
      json: {
        errors: {
          hasErrors: true,
          message: res.message
        }
      }
    }
  }

  return redirect('/login')
}

type AlertProps = {
  description: string
}

function MyAlert({ description }: AlertProps) {
  return (
    <Alert variant="destructive">
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>{description}</AlertDescription>
    </Alert>
  )
}

export default function Register() {
  const data = useActionData<typeof action>()

  const errors = data?.json?.errors ?? {}

  return (
    <div className="container grid h-page w-full place-content-center">
      {errors?.hasErrors && <MyAlert description={errors?.message} />}
      <h1 className="p-2 text-center text-xl font-bold">Registro</h1>
      <Form method="POST" className="flex w-full flex-col gap-4 p-2">
        <Input
          label="Name"
          name="name"
          type="text"
          hasError={errors?.hasErrors}
        />
        <Input
          label="Email"
          name="email"
          type="email"
          hasError={errors?.hasErrors}
        />
        <Input
          label="Contraseña"
          name="password"
          type="password"
          hasError={errors?.hasErrors}
        />
        <Input
          label="Repita su contraseña"
          name="confirmPassword"
          type="password"
          hasError={errors?.hasErrors}
        />
        <button
          type="submit"
          className="w-full rounded-md bg-black p-2 text-white"
        >
          Registrarse
        </button>
      </Form>
    </div>
  )
}
