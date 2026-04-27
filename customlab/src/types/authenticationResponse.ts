export interface Usuario {
  id_usuario: number
  nombre: string
  apellidos: string
  email: string
  rol: string
  doble_factor: boolean | null
}

export interface AuthStore {
  usuario: Usuario | null
  accessToken: string | null
  refreshToken: string | null
  rememberMe: boolean
  setAuth: (usuario: Usuario, accessToken: string, refreshToken: string, rememberMe: boolean) => void
  clearAuth: () => void
}