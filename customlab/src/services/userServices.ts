import { apiClient } from './apiClient'

/**
 * Hook that provides user-related services.
 */
export const useUserServices = () => {
    /**
     * Fetch the current authenticated user's data.
     */
    const getMyUser = async () => {
        try {
            const response = await apiClient('/api/usuario/my/')
            
            // Try to parse JSON safely
            let json: any = {}
            const contentType = response.headers.get("content-type")
            if (contentType && contentType.includes("application/json")) {
                try {
                    json = await response.json()
                } catch (e) {
                    console.error("Error parsing JSON response:", e)
                }
            }

            if (!response.ok) {
                return {
                    success: false,
                    message: json.message || json.detail || `Error del servidor (${response.status})`,
                    status: response.status
                }
            }

            return json
        } catch (error) {
            console.error("userService error:", error)
            return {
                success: false,
                message: 'Error de red o del servidor',
                error
            }
        }
    }

    /**
     * Update the user's password.
     */
    const updatePassword = async (userId: number, oldPassword: string, newPassword: string) => {
        try {
            const response = await apiClient(`/api/usuarios/update-password/${userId}/`, {
                method: 'PATCH',
                body: JSON.stringify({
                    old_password: oldPassword,
                    new_password: newPassword
                })
            })

            // Try to parse JSON safely
            let json: any = {}
            const contentType = response.headers.get("content-type")
            if (contentType && contentType.includes("application/json")) {
                try {
                    json = await response.json()
                } catch (e) {
                    console.error("Error parsing JSON response:", e)
                }
            }

            if (!response.ok) {
                return {
                    success: false,
                    message: json.message || json.detail || 'Error al actualizar la contraseña'
                }
            }

            return json
        } catch (error) {
            console.error("userService error (updatePassword):", error)
            return {
                success: false,
                message: 'Error de red o del servidor'
            }
        }
    }

    /**
     * Delete the user's account.
     */
    const deleteUser = async (userId: number) => {
        try {
            const response = await apiClient(`/api/usuarios/delete/${userId}/`, {
                method: 'DELETE'
            })

            // Try to parse JSON safely
            let json: any = {}
            const contentType = response.headers.get("content-type")
            if (contentType && contentType.includes("application/json")) {
                try {
                    json = await response.json()
                } catch (e) {
                    console.error("Error parsing JSON response:", e)
                }
            }

            if (!response.ok) {
                return {
                    success: false,
                    message: json.message || json.detail || 'Error al eliminar la cuenta'
                }
            }

            return json
        } catch (error) {
            console.error("userService error (deleteUser):", error)
            return {
                success: false,
                message: 'Error de red o del servidor'
            }
        }
    }

    /**
     * Update the user's profile information.
     */
    const updateUser = async (userId: number, payload: {
        nombre: string;
        apellidos: string;
        email: string;
        fecha_nacimiento?: string | null;
        doble_factor?: boolean;
    }) => {
        try {
            const response = await apiClient(`/api/usuarios/update/${userId}/`, {
                method: 'PATCH',
                body: JSON.stringify(payload)
            })

            // Try to parse JSON safely
            let json: any = {}
            const contentType = response.headers.get("content-type")
            if (contentType && contentType.includes("application/json")) {
                try {
                    json = await response.json()
                } catch (e) {
                    console.error("Error parsing JSON response:", e)
                }
            }

            if (!response.ok) {
                return {
                    success: false,
                    message: json.message || json.detail || 'Error al actualizar el perfil'
                }
            }

            return json
        } catch (error) {
            console.error("userService error (updateUser):", error)
            return {
                success: false,
                message: 'Error de red o del servidor'
            }
        }
    }

    return { getMyUser, updatePassword, deleteUser, updateUser }
}
