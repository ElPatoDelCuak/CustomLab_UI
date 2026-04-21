import { usePlatformStore } from '@/stores/platformStore'
import { apiClient } from '@/services/apiClient'

/**
 * Service to handle user login.
 * Uses apiClient to maintain consistency, although auth header won't be present yet.
 */
export async function loginService(email: string, password: string) {
  const res = await apiClient("/api/login/", {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  })

  const json = await res.json()

  if (json.success) {
    const { usuario, tokens } = json.data
    // Save tokens in the store
    usePlatformStore.getState().setAuth(usuario, tokens.access, tokens.refresh)
  }

  return json
}