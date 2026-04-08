import { RegisterPayload } from "@/types/register";

const API_URL = process.env.NEXT_PUBLIC_API_URL

export async function registerService(payload: RegisterPayload): Promise<{ success: boolean; message: string }> {
  try {
    const res = await fetch(`${API_URL}/api/create/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    return {
      success: data.success === true,
      message: data.message || (data.success ? 'Registro exitoso' : 'Error en el registro'),
    };
  } catch (error) {
    return {
      success: false,
      message: 'Error de red o inesperado',
    };
  }
}