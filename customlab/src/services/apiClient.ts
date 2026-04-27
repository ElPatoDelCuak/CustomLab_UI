import { usePlatformStore } from "@/stores/platformStore";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "";

interface FetchOptions extends RequestInit {
    headers?: Record<string, string>;
}

export async function apiClient(endpoint: string, options: FetchOptions = {}) {
    const { accessToken, refreshToken, rememberMe, setAuth, clearAuth, usuario } = usePlatformStore.getState();

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

        // If response 401, refresh token (Potentially expired token)
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

                //If refresh token is valid, update the token
                if (newAccessToken && usuario) {
                    setAuth(usuario, newAccessToken, refreshToken, rememberMe);

                    console.info("Token refreshed successfully. Retrying original request...");

                    // Retry the original request with the new token
                    config.headers = {
                        ...headers,
                        "Authorization": `Bearer ${newAccessToken}`,
                    };

                    response = await fetch(url, config);
                }
            } else {
                //If refresh token is invalid, log out and redirect to login
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
