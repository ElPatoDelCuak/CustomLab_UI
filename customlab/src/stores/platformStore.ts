// stores/platformStore.ts
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { Usuario, AuthStore } from '../types/authenticationResponse'

const cookieStorage = {
  getItem: (name: string) => {
    const cookies = document.cookie.split('; ')
    const cookie = cookies.find(c => c.startsWith(`${name}=`))
    return cookie ? decodeURIComponent(cookie.split('=')[1]) : null
  },
  setItem: (name: string, value: string) => {
    let maxAge = ''
    try {
      const parsed = JSON.parse(value)
      if (parsed.state.rememberMe) {
        maxAge = `; max-age=${60 * 60 * 24 * 7}` // 7 días
      }
    } catch (e) {
      console.error('Error parsing auth storage value', e)
    }
    document.cookie = `${name}=${encodeURIComponent(value)}; path=/${maxAge}`
  },
  removeItem: (name: string) => {
    document.cookie = `${name}=; path=/; max-age=0`
  },
}

export const usePlatformStore = create<AuthStore>()(
  persist(
    (set) => ({
      usuario: null,
      accessToken: null,
      refreshToken: null,
      rememberMe: false,
      setAuth: (usuario, accessToken, refreshToken, rememberMe) =>
        set({ usuario, accessToken, refreshToken, rememberMe }),
      setUsuario: (usuario) =>
        set({ usuario }),
      clearAuth: () =>
        set({ usuario: null, accessToken: null, refreshToken: null, rememberMe: false }),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => cookieStorage),
    }
  )
)