import { apiClient } from "./apiClient";
import { ApiResponse } from "@/types/api-response";

// Tipos segun la nueva documentacion
export interface CartItem {
    id_producto: number;
    nombre: string;
    id_talla: number;
    talla: string;
    cantidad: number;
    precio_unitario: number;
    precio_total: number;
    image: string;
}

export interface CartBackendItem {
    id_usuario: number;
    id_producto: number;
    id_talla: number;
    cantidad: number;
    precio_total: number;
    producto: {
        nombre_producto: string;
        precio_unitario: number;
        imagen: string;
        categoria: string;
    };
    talla: {
        nombre: string;
    };
}

export const cartServices = {
    getCart: async (): Promise<ApiResponse<CartBackendItem[]>> => {
        const response = await apiClient("/api/carrito/", { method: "GET" });
        return await response.json();
    },

    addToCart: async (id_producto: number, id_talla: number, cantidad: number): Promise<ApiResponse<any>> => {
        const response = await apiClient("/api/carrito/add/", {
            method: "POST",
            body: JSON.stringify({ id_producto, id_talla, cantidad }),
        });
        return await response.json();
    },

    updateQuantity: async (id_producto: number, id_talla: number, cantidad: number): Promise<ApiResponse<any>> => {
        const response = await apiClient("/api/carrito/update/", {
            method: "PUT",
            body: JSON.stringify({ id_producto, id_talla, cantidad }),
        });
        return await response.json();
    },

    removeItem: async (id_producto: number, id_talla: number): Promise<ApiResponse<any>> => {
        const response = await apiClient("/api/carrito/remove/", {
            method: "DELETE",
            body: JSON.stringify({ id_producto, id_talla }),
        });
        return await response.json();
    },

    clearCart: async (): Promise<ApiResponse<any>> => {
        const response = await apiClient("/api/carrito/clear/", { method: "DELETE" });
        return await response.json();
    }
};
