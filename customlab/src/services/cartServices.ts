import { apiClient } from "./apiClient";
import { ApiResponse } from "@/types/api-response";
import { CartBackendItem } from "@/types/cartTypes";

/**
 * Hook that provides cart-related services.
 */
export const useCartServices = () => {
    const getCart = async (): Promise<ApiResponse<CartBackendItem[]>> => {
        const response = await apiClient("/api/carrito/", { method: "GET" });
        return await response.json();
    };

    const addToCart = async (id_producto: number, id_talla: number, cantidad: number): Promise<ApiResponse<any>> => {
        const response = await apiClient("/api/carrito/add/", {
            method: "POST",
            body: JSON.stringify({ id_producto, id_talla, cantidad }),
        });
        return await response.json();
    };

    const updateQuantity = async (id_producto: number, id_talla: number, cantidad: number): Promise<ApiResponse<any>> => {
        const response = await apiClient("/api/carrito/update/", {
            method: "PUT",
            body: JSON.stringify({ id_producto, id_talla, cantidad }),
        });
        return await response.json();
    };

    const removeItem = async (id_producto: number, id_talla: number): Promise<ApiResponse<any>> => {
        const response = await apiClient("/api/carrito/remove/", {
            method: "DELETE",
            body: JSON.stringify({ id_producto, id_talla }),
        });
        return await response.json();
    };

    const clearCart = async (): Promise<ApiResponse<any>> => {
        const response = await apiClient("/api/carrito/clear/", { method: "DELETE" });
        return await response.json();
    };

    return {
        getCart,
        addToCart,
        updateQuantity,
        removeItem,
        clearCart
    };
};
