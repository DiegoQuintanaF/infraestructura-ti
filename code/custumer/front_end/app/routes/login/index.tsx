import { Form, useActionData } from '@remix-run/react'
import { ActionFunction, ActionFunctionArgs, redirect } from '@remix-run/node'
import { Input } from '~/components/forms/Input'
import { login } from '~/api/login'
import { getSession, commitSession } from '~/store/session'
import { Alert, AlertDescription, AlertTitle } from '~/components/ui/alert'

export const action: ActionFunction = async ({
  request
}: ActionFunctionArgs) => {
  const session = await getSession(request.headers.get('Cookie'))

  const formData = await request.formData()

  const email = formData.get('email')
  const password = formData.get('password')

  if (
    !email ||
    !password ||
    typeof email !== 'string' ||
    typeof password !== 'string'
  ) {
    return {
      status: 400,
      json: { message: 'Email y contraseña son requeridas' }
    }
  }

  const res = await login(email, password)

  if (res === undefined) {
    return {
      status: 401,
      json: { message: 'Email o contraseña invalida' }
    }
  }

  if (!res.data?.token) {
    return {
      status: 500,
      errors: {
        email: true,
        password: true,
        message: 'Email o contraseña invalida',
        hasError: true
      }
    }
  }

  console.log(res.data)
  session.set('payload', JSON.stringify(res.data))

  return redirect('/cartelera', {
    headers: {
      'Set-Cookie': await commitSession(session)
    }
  })
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

export default function Login() {
  const data = useActionData<typeof action>()

  const errors = data?.errors ?? {}

  return (
    <div className="container grid h-page w-full place-content-center">
      {errors?.hasError && <MyAlert description={errors?.message} />}

      <h1 className="p-2 text-center text-xl font-bold">Iniciar Sesión</h1>
      <Form method="POST" className="flex w-full flex-col gap-4 p-2">
        <Input
          label="Email"
          name="email"
          type="email"
          hasError={errors?.hasError}
        />
        <Input
          label="Contraseña"
          name="password"
          type="password"
          hasError={errors?.hasError}
        />
        <button
          type="submit"
          className="w-full rounded-md bg-black p-2 text-white disabled:bg-slate-800"
        >
          Iniciar Sesión
        </button>
      </Form>
    </div>
  )
}
