import { ActionFunction, LoaderFunction, json, redirect } from '@remix-run/node'
import { useActionData } from '@remix-run/react'
import { login } from '~/api/login'
import { Input } from '~/components/forms/Input'
import { Alert, AlertDescription, AlertTitle } from '~/components/ui/alert'
import { commitSession, getSession } from '~/store/session'

export const loader: LoaderFunction = async ({ request }) => {
  const session = await getSession(request.headers.get('Cookie'))

  if (session.has('payload')) {
    // Redirect to the home page if they are already signed in.
    return redirect('/')
  }

  const data = { error: session.get('error') }

  return json(data, {
    headers: {
      'Set-Cookie': await commitSession(session)
    }
  })
}

export const action: ActionFunction = async ({ request }) => {
  const session = await getSession(request.headers.get('Cookie'))

  const formData = await request.formData()

  const email = formData.get('email')
  const password = formData.get('password')

  if (
    !email ||
    !password ||
    typeof email != 'string' ||
    typeof password != 'string'
  ) {
    return {
      status: 401,
      message: 'No deje valores vacios'
    }
  }

  const res = await login(email, password)
  console.log(res)

  if (!res.success) {
    return {
      status: 400,
      message: 'Email o contraseña incorrectos'
    }
  }

  if (res?.data === undefined) {
    return {
      status: 400,
      message: 'Email o contraseña incorrectos'
    }
  }

  session.set('payload', JSON.stringify(res.data))

  return redirect('/', {
    headers: {
      'Set-Cookie': await commitSession(session)
    }
  })
}

export default function Login() {
  const data = useActionData<typeof action>()

  const status = data?.status ?? 0
  const hasError = status > 0
  const description = data?.message ?? ''

  return (
    <div className="grid min-h-dvh place-content-center">
      <div className="p-4 md:max-w-96">
        {hasError && (
          <Alert variant="destructive" className="mb-4">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{description}</AlertDescription>
          </Alert>
        )}
        <h1 className="text-center text-xl font-bold">Iniciar sesión</h1>
        <form method="POST" className="flex w-full flex-col gap-4 p-2">
          <Input label="Email" name="email" type="email" hasError={hasError} />
          <Input
            label="Contraseña"
            name="password"
            type="password"
            hasError={hasError}
          />
          <button
            type="submit"
            className="w-full rounded-md bg-black p-2 text-white disabled:bg-slate-800"
          >
            Iniciar sesión
          </button>
        </form>
      </div>
    </div>
  )
}
