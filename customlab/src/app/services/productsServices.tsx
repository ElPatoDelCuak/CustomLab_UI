import { ApiResponse } from "@/types/api-response";
import { BackendProduct } from "@/types/products";
import { ProductCardProps } from "@/types/products";
import { useCallback } from "react";

export const useProductsServices = () => {
    const getProducts = async (): Promise<ApiResponse<ProductCardProps[]>> => {
        try {
            const response = await fetch(
                process.env.NEXT_PUBLIC_API_URL + "/api/productos",
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

            const payload = (await response.json()) as ApiResponse<BackendProduct[]>;

            if (!payload.success || !Array.isArray(payload.data)) {
                return {
                    success: false,
                    message: payload.message,
                };
            }

            const products = payload.data.map((product) => ({
                id_producto: product.id_producto,
                nombre_producto: product.nombre_producto,
                precio: product.precio_venta,
                stock: product.stock,
                image_cover: product.images[0]?.ruta ?? "",
                image_hover: product.images[1]?.ruta ?? product.images[0]?.ruta ?? "",
                images: product.images.map((image) => ({
                    id_imagen: image.id_imagen_producto,
                    url: image.ruta,
                })),
                categoria: product.categoria,
                personalizable: product.personalizable,
                tallas: product.tallas,
            }));

            return {
                success: true,
                data: products,
            };
        } catch {
            return {
                success: false,
                message: "No se pudo conectar con el servidor",
            };
        }

    };

    return { getProducts };
}