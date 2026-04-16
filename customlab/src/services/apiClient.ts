import { usePlatformStore } from "@/stores/platformStore";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "";

interface FetchOptions extends RequestInit {
    headers?: Record<string, string>;
}

export async function apiClient(endpoint: string, options: FetchOptions = {}) {
    const { accessToken, refreshToken, setAuth, clearAuth, usuario } = usePlatformStore.getState();

    // Prepare headers
    const headers: Record<string, string> = { ...options.headers };

    // Inject Authorization header if token exists
    if (accessToken) {
        headers["Authorization"] = `Bearer ${accessToken}`;
    }

    // Set JSON content-type if not FormData
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

        // Handle 401 Unauthorized (potentially expired token)
        if (response.status === 401 && refreshToken) {
            console.warn("Access token expired. Attempting silent refresh...");

            // Try to refresh the token
            const refreshResponse = await fetch(`${API_URL}/api/login/refresh/`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ refresh: refreshToken }),
            });

            if (refreshResponse.ok) {
                const refreshData = await refreshResponse.json();
                const newAccessToken = refreshData.data?.access || refreshData.access; // Standard simplejwt returns it under 'access'

                if (newAccessToken && usuario) {
                    // Update the store with the new access token
                    setAuth(usuario, newAccessToken, refreshToken);

                    console.info("Token refreshed successfully. Retrying original request...");

                    // Retry the original request with the new token
                    config.headers = {
                        ...headers,
                        "Authorization": `Bearer ${newAccessToken}`,
                    };

                    response = await fetch(url, config);
                }
            } else {
                // Refresh failed (refresh token likely expired too)
                console.error("Refresh token expired or invalid. Logging out...");
                clearAuth();
                if (typeof window !== "undefined") {
                    window.location.href = "/login";
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
