import { ApiResponse } from "@/types/api-response";
import { CaracteristicsResponse } from "@/types/catalogFilters";

export const useFiltersServices = () => {
    const getCaracteristics = async (): Promise<ApiResponse<CaracteristicsResponse[]>> => {
        try {
            const response = await fetch(
                process.env.NEXT_PUBLIC_API_URL + "/api/caracteristicas/",
                {
                    method: "GET",
                }
            );

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

    return { getCaracteristics };
};