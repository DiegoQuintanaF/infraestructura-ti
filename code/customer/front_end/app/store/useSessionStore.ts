import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type User = {
  name: string
  email: string
}

export const useSessionStore = create(
  persist(
    (set) => ({
      isLogged: false,
      user: null,
      setUser: (user: User) => set({ user, isLogged: true }),
      logout: () => set({ user: null, isLogged: false })
    }),
    {
      name: 'auth'
    }
  )
)
