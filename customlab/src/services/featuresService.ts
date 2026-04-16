import { ApiResponse } from "@/types/api-response";
import { CaracteristicsResponse } from "@/types/catalogFilters";
import { apiClient } from "@/services/apiClient";

/**
 * Hook that provides characteristics-related services using the authenticated apiClient.
 */
export const useFeaturesServices = () => {
    const getCaracteristics = async (): Promise<ApiResponse<CaracteristicsResponse[]>> => {
        try {
            const response = await apiClient("/api/caracteristicas/", {
                method: "GET",
            });

            if (!response.ok) {
                return {
                    success: false,
                    message: `Error HTTP ${response.status}`,
                };
            }

            const payload = (await response.json()) as ApiResponse<CaracteristicsResponse[]>;

            if (!payload.success || !Array.isArray(payload.data)) {
                return {
                    success: false,
                    message: payload.message,
                };
            }

            return {
                success: true,
                data: payload.data,
            };
        } catch {
            return {
                success: false,
                message: "No se pudo conectar con el servidor",
            };
        }
    };

    const createCaracteristica = async (caracteristica: string): Promise<ApiResponse<CaracteristicsResponse>> => {
        try {
            const response = await apiClient("/api/caracteristicas/create/", {
                method: "POST",
                body: JSON.stringify({ caracteristica }),
            });

            const payload = (await response.json()) as ApiResponse<CaracteristicsResponse>;

            if (!response.ok) {
                return {
                    success: false,
                    message: payload.message || `Error HTTP ${response.status}`,
                };
            }

            return {
                success: true,
                message: payload.message,
                data: payload.data,
            };
        } catch {
            return {
                success: false,
                message: "No se pudo conectar con el servidor",
            };
        }
    };

    const deleteCaracteristica = async (id: number): Promise<ApiResponse<null>> => {
        try {
            const response = await apiClient(`/api/caracteristicas/delete/${id}/`, {
                method: "DELETE",
            });

            const payload = (await response.json()) as ApiResponse<null>;

            if (!response.ok) {
                return {
                    success: false,
                    message: payload.message || `Error HTTP ${response.status}`,
                };
            }

            return {
                success: true,
                message: payload.message,
            };
        } catch {
            return {
                success: false,
                message: "No se pudo conectar con el servidor",
            };
        }
    };

    return { getCaracteristics, createCaracteristica, deleteCaracteristica };
};