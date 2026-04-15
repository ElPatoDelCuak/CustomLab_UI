import { ApiResponse } from "@/types/api-response";
import { BackendProduct } from "@/types/products";
import { ProductCardProps } from "@/types/products";

export const useProductsServices = () => {
    const getProducts = async (): Promise<ApiResponse<ProductCardProps[]>> => {
        try {
            const response = await fetch(
                process.env.NEXT_PUBLIC_API_URL + "/api/productos/",
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
                precio_original: product.precio_original,
                stock: product.stock,
                image_cover: product.images[0]?.ruta ?? "",
                image_hover: product.images[1]?.ruta ?? product.images[0]?.ruta ?? "",
                images: product.images.map((image) => ({
                    id_imagen: image.id_imagen_producto,
                    url: image.ruta,
                })),
                categoria: product.categoria,
                personalizable: product.personalizable,
                nuevo: product.nuevo,
                oferta: product.oferta,
                tallas: product.tallas,
                caracteristicas: product.caracteristicas,
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

    const getFeaturedProducts = async (): Promise<ApiResponse<ProductCardProps[]>> => {
        try {
            const response = await fetch(
                process.env.NEXT_PUBLIC_API_URL + "/api/productos/featured/",
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
                precio_original: product.precio_original,
                stock: product.stock,
                image_cover: product.images[0]?.ruta ?? "",
                image_hover: product.images[1]?.ruta ?? product.images[0]?.ruta ?? "",
                images: product.images.map((image) => ({
                    id_imagen: image.id_imagen_producto,
                    url: image.ruta,
                })),
                categoria: product.categoria,
                personalizable: product.personalizable,
                nuevo: product.nuevo,
                oferta: product.oferta,
                tallas: product.tallas,
                caracteristicas: product.caracteristicas,
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


    const getProductById = async (id: string | number): Promise<ApiResponse<ProductCardProps>> => {
        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/productos/${id}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            if (!response.ok) {
                return {
                    success: false,
                    message: `Error HTTP ${response.status}`,
                };
            }

            const payload = (await response.json()) as ApiResponse<BackendProduct>;

            if (!payload.success || !payload.data) {
                return {
                    success: false,
                    message: payload.message || "Producto no encontrado",
                };
            }

            const product = payload.data;
            const images = Array.isArray(product.images) ? product.images : [];
            const tallas = Array.isArray(product.tallas) ? product.tallas : [];
            const caracteristicas = Array.isArray(product.caracteristicas) ? product.caracteristicas : [];

            const productCard: ProductCardProps = {
                id_producto: product.id_producto,
                nombre_producto: product.nombre_producto,
                precio: product.precio_venta,
                precio_original: product.precio_original,
                stock: product.stock,
                image_cover: images[0]?.ruta ?? "",
                image_hover: images[1]?.ruta ?? images[0]?.ruta ?? "",
                images: images.map((image) => ({
                    id_imagen: image.id_imagen_producto,
                    url: image.ruta,
                })),
                categoria: product.categoria,
                personalizable: product.personalizable,
                nuevo: product.nuevo,
                oferta: product.oferta,
                tallas: tallas,
                caracteristicas: caracteristicas,
            };

            return {
                success: true,
                data: productCard,
            };
        } catch {
            return {
                success: false,
                message: "No se pudo conectar con el servidor",
            };
        }
    };

    const postProductFormData = async (formData: FormData): Promise<ApiResponse<BackendProduct>> => {
        try {
            const response = await fetch(
                process.env.NEXT_PUBLIC_API_URL + "/api/productos/create/",
                {
                    method: "POST",
                    body: formData,
                }
            );

            const payload = (await response.json()) as ApiResponse<BackendProduct>;

            if (!response.ok) {
                return {
                    success: false,
                    message: payload.message || `Error HTTP ${response.status}`,
                };
            }

            return {
                success: payload.success,
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

    return { getProducts, getFeaturedProducts, getProductById, postProductFormData };
}