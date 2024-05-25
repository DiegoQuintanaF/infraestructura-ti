import { createCookieSessionStorage } from '@remix-run/node' // or cloudflare/deno

type SessionData = {
  payload: string
}

type SessionFlashData = {
  error: string
}

const { getSession, commitSession, destroySession } =
  createCookieSessionStorage<SessionData, SessionFlashData>({
    // a Cookie from `createCookie` or the CookieOptions to create one
    cookie: {
      name: '__session',
      httpOnly: true,
      maxAge: 60 * 60 * 24,
      path: '/',
      secure: false,
      secrets: ['some-secret']
    }
  })

export { getSession, commitSession, destroySession }
