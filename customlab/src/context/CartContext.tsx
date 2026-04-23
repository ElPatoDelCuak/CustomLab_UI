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

    // Función para transformar el formato complejo del backend al formato simple de la UI
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
            stock: item.talla.stock ?? 999
        }));
    };

    //Cargar carrito desde localStorage al iniciar
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

    //Modificar localStorage cada vez que cambien los items
    React.useEffect(() => {
        if (items.length > 0) {
            localStorage.setItem("customlab_cart", JSON.stringify(items));
        } else {
            localStorage.removeItem("customlab_cart");
        }
    }, [items]);

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

    //Sincronizar con el servidor al iniciar o cambiar token
    React.useEffect(() => {
        refreshCart();
    }, [refreshCart]);

    const addItem = async (id_producto: number, id_talla: number, cantidad: number, productInfo?: Partial<CartItem>) => {
        // --- ACTUALIZACION OPTIMISTA (INSTANTANEA) ---
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

            // Si es nuevo, necesitamos algo de info básica para mostrarlo mientras el servidor responde
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
        try {
            const result = await cartServices.addToCart(id_producto, id_talla, cantidad);
            if (!result.success) {
                alert(result.message || "No hay suficiente stock disponible");
                await refreshCart(); // Si falla, volvemos a la realidad del servidor
            }
        } catch (error) {
            console.error("Error de red al añadir:", error);
            await refreshCart();
        }
    };

    const removeItem = async (id_producto: number, id_talla: number) => {
        // --- ACTUALIZACION OPTIMISTA ---
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

    const updateQuantity = async (id_producto: number, id_talla: number, quantity: number) => {
        // --- ACTUALIZACION OPTIMISTA ---
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
                await refreshCart(); // Revertimos si el servidor dice que no (ej: falta stock)
            }
        } catch (error) {
            await refreshCart();
        }
    };

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
