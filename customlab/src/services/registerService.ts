const API_URL = process.env.NEXT_PUBLIC_API_URL

export async function registerService(email: string, password: string) {
  const res = await fetch(`${API_URL}/api/create/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  })
}