import { usePlatformStore } from "@/stores/platformStore";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "";

interface FetchOptions extends RequestInit {
    headers?: Record<string, string>;
}

export async function apiClient(endpoint: string, options: FetchOptions = {}) {
    const { accessToken, refreshToken, rememberMe, setAuth, clearAuth, usuario } = usePlatformStore.getState();

    //Preparar los headers
    const headers: Record<string, string> = { ...options.headers };

    //Si existe el token, añadimos el token de autorización
    if (accessToken) {
        headers["Authorization"] = `Bearer ${accessToken}`;
    }

    //Set JSON content-type si no es FormData
    if (!(options.body instanceof FormData) && !headers["Content-Type"]) {
        headers["Content-Type"] = "application/json";
    }

    const config: FetchOptions = {
        ...options,
        headers,
    };

    const url = endpoint.startsWith("http") ? endpoint : `${API_URL}${endpoint}`;

    try {
        let response = await fetch(url, config);

        // Si response 401, refresh token (Potentially expired token)
        if (response.status === 401 && refreshToken) {
            console.warn("Access token expired. Attempting silent refresh...");

            // Refresh token
            const refreshResponse = await fetch(`${API_URL}/api/login/refresh/`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ refresh: refreshToken }),
            });

            if (refreshResponse.ok) {
                const refreshData = await refreshResponse.json();
                const newAccessToken = refreshData.data?.access || refreshData.access;

                //Si el token es válido, actualizamos el token
                if (newAccessToken && usuario) {
                    setAuth(usuario, newAccessToken, refreshToken, rememberMe);

                    console.info("Token refreshed successfully. Retrying original request...");

                    // Reintentar la petición original con el nuevo token
                    config.headers = {
                        ...headers,
                        "Authorization": `Bearer ${newAccessToken}`,
                    };

                    response = await fetch(url, config);
                }
            } else {
                //Si refresh token es inválido, cerramos sesión y redirigimos a login
                console.error("Refresh token expired or invalid. Logging out...");
                clearAuth();
                if (typeof window !== "undefined") {
                    window.location.href = "/auth/login";
                }
                throw new Error("Session expired. Please log in again.");
            }
        }

        return response;

    } catch (error) {
        console.error("API client error:", error);
        throw error;
    }
}
