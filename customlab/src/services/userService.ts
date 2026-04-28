import { apiClient } from './apiClient'

/**
 * Fetch the current authenticated user's data.
 * @returns A promise with the user data or an error response.
 */
export async function getMyUser() {
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
