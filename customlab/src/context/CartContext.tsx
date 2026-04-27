"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { cartServices } from "@/services/cartServices";
import { usePlatformStore } from "@/stores/platformStore";
import { CartItem, CartBackendItem, CartContextType } from "@/types/cartTypes";

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [items, setItems] = useState<CartItem[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const { accessToken } = usePlatformStore();

    //CARRITO - Transforma los datos del backend al formato de datos sencillo del carrito de la UI
    const mapBackendToUi = (backendItems: CartBackendItem[]): CartItem[] => {
        return backendItems.map(item => ({
            id_producto: item.id_producto,
            id_talla: item.id_talla,
            nombre: item.producto.nombre_producto,
            talla: item.talla.nombre,
            cantidad: item.cantidad,
            precio_unitario: item.producto.precio_unitario,
            precio_total: item.precio_total,
            image: item.producto.imagen,
            stock: item.talla.stock
        }));
    };

    //CARRITO - Carga el carrito guardado en localStorage al iniciar, y evita que se vea vacío por un instante al esperar la respuesta de la API.
    React.useEffect(() => {
        const savedCart = localStorage.getItem("customlab_cart");
        if (savedCart) {
            try {
                setItems(JSON.parse(savedCart));
            } catch (e) {
                console.error("Error parsing cart from localStorage");
            }
        }
    }, []);

    //CARRITO - Persistencia local: Guardamos cada cambio en localStorage para una experiencia fluida
    React.useEffect(() => {
        if (items.length > 0) {
            localStorage.setItem("customlab_cart", JSON.stringify(items));
        } else {
            localStorage.removeItem("customlab_cart");
        }
    }, [items]);

    //CARRITO - Sincronización forzada con el servidor: Asegura que las cantidades y el stock coinciden con la realidad del backend
    const refreshCart = useCallback(async () => {
        if (!accessToken) {
            setItems([]);
            return;
        }

        try {
            const result = await cartServices.getCart();
            if (result.success && result.data) {
                const freshItems = mapBackendToUi(result.data);
                setItems(freshItems);
            }
        } catch (error) {
            console.error("Error al sincronizar el carrito:", error);
        }
    }, [accessToken]);

    //CARRITO - Autocarga y sincronización: Carga el carrito al iniciar y cuando el usuario cambia (login/logout)
    React.useEffect(() => {
        refreshCart();
    }, [refreshCart]);

    // CARRITO - Función para AÑADIR productos, se usa en CatalogPage y LandingPage (a través del ProductModal), Añade productos o incrementa la cantidad de uno existente si ya está en el carrito
    const addItem = async (id_producto: number, id_talla: number, cantidad: number, productInfo?: Partial<CartItem>) => {
        setItems(prevItems => {
            const existingIndex = prevItems.findIndex(
                item => item.id_producto === id_producto && item.id_talla === id_talla
            );

            if (existingIndex > -1) {
                const updatedItems = [...prevItems];
                const item = { ...updatedItems[existingIndex] };
                item.cantidad += cantidad;
                item.precio_total = item.cantidad * item.precio_unitario;
                updatedItems[existingIndex] = item;
                return updatedItems;
            }

            if (productInfo) {
                const newItem: CartItem = {
                    id_producto,
                    id_talla,
                    nombre: productInfo.nombre || "Producto",
                    talla: productInfo.talla || "-",
                    cantidad: cantidad,
                    precio_unitario: productInfo.precio_unitario || 0,
                    precio_total: cantidad * (productInfo.precio_unitario || 0),
                    image: productInfo.image || "",
                    stock: productInfo.stock || 999
                };
                return [...prevItems, newItem];
            }
            return prevItems;
        });

        // --- SINCRONIZACION EN SEGUNDO PLANO ---
        // Paso 2: Avisamos al servidor (API) del cambio.
        // Si el servidor falla o no hay stock, el Paso 1 se deshace automáticamente con refreshCart().

        try {
            const result = await cartServices.addToCart(id_producto, id_talla, cantidad);
            if (!result.success) {
                alert(result.message || "No hay suficiente stock disponible");
                // Si el servidor rechaza (ej: por stock), revertimos el carrito a la realidad del servidor
                await refreshCart();
            }
        } catch (error) {
            console.error("Error de red al añadir:", error);
            await refreshCart();
        }
    };

    // CARRITO - Función para ELIMINAR productos por completo. Se usa en Header.tsx, pasa como props al componente CartModal. Quita el producto del estado local y avisa a la API para que lo borre de la BD.
    const removeItem = async (id_producto: number, id_talla: number) => {
        // --- ACTUALIZACION OPTIMISTA ---
        // Lo quitamos de la vista inmediatamente (Paso 1)
        setItems(prevItems => prevItems.filter(
            item => !(item.id_producto === id_producto && item.id_talla === id_talla)
        ));

        // --- SINCRONIZACION EN SEGUNDO PLANO ---
        try {
            await cartServices.removeItem(id_producto, id_talla);
        } catch (error) {
            await refreshCart();
        }
    };

    // CARRITO - Función para CAMBIAR LA CANTIDAD (sumar/restar con botones +/-). Se usa en Header.tsx, pasa como props al componente CartModal. Modifica la cantidad de un item existente y recalcula sus totales.
    const updateQuantity = async (id_producto: number, id_talla: number, quantity: number) => {
        // --- ACTUALIZACION OPTIMISTA ---
        // Reflejamos el cambio de número en la UI al instante (Paso 1)
        setItems(prevItems => prevItems.map(item => {
            if (item.id_producto === id_producto && item.id_talla === id_talla) {
                return {
                    ...item,
                    cantidad: quantity,
                    precio_total: quantity * item.precio_unitario
                };
            }
            return item;
        }));

        // --- SINCRONIZACION EN SEGUNDO PLANO ---
        try {
            const result = await cartServices.updateQuantity(id_producto, id_talla, quantity);
            if (!result.success) {
                alert(result.message || "No se pudo actualizar la cantidad por falta de stock");
                // Revertimos si el servidor dice que no (ej: alguien compró el último stock mientras el modal estaba abierto)
                await refreshCart();
            }
        } catch (error) {
            await refreshCart();
        }
    };

    // CARRITO - Función para VACIAR el carrito por completo.
    const clearCart = async () => {
        // --- ACTUALIZACION OPTIMISTA ---
        setItems([]);
        localStorage.removeItem("customlab_cart");

        // --- SINCRONIZACION EN SEGUNDO PLANO ---
        try {
            await cartServices.clearCart();
        } catch (error) {
            console.error("Error al vaciar el carrito:", error);
            await refreshCart();
        }
    };

    //CARRITO - Valores calculados para exportar (totales del carrito)
    const totalItems = items.reduce((acc, item) => acc + item.cantidad, 0);
    const totalPrice = items.reduce((acc, item) => acc + item.precio_total, 0);

    return (
        <CartContext.Provider value={{
            items,
            isLoading,
            refreshCart,
            addItem,
            removeItem,
            updateQuantity,
            clearCart,
            totalItems,
            totalPrice
        }}>
            {children}
        </CartContext.Provider>
    );
};

export { type CartItem } from "@/types/cartTypes";

export const useCart = () => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error("useCart debe usarse dentro de un CartProvider");
    }
    return context;
};
