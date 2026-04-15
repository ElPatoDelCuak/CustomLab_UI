import { RegisterPayload } from "@/types/register";
import { apiClient } from "@/services/apiClient";

/**
 * Service to handle user registration using the apiClient.
 */
export async function registerService(payload: RegisterPayload): Promise<{ success: boolean; message: string }> {
  try {
    const res = await apiClient("/api/usuarios/create/", {
      method: 'POST',
      body: JSON.stringify(payload),
    });
    
    const data = await res.json();
    return {
      success: data.success === true,
      message: data.message || (data.success ? 'Registro exitoso' : 'Error en el registro'),
    };
  } catch (error) {
    console.error("Registration error:", error);
    return {
      success: false,
      message: 'Error de red o inesperado',
    };
  }
}