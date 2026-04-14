import { usePlatformStore } from '@/stores/platformStore'

const API_URL = process.env.NEXT_PUBLIC_API_URL

export async function loginService(email: string, password: string) {
  const res = await fetch(`${API_URL}/api/login/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  })

  const json = await res.json()

  if (json.success) {
    const { usuario, tokens } = json.data
    usePlatformStore.getState().setAuth(usuario, tokens.access, tokens.refresh)
  }

  return json
}