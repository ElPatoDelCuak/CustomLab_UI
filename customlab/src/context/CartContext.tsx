"use client";

import React, { createContext, useContext, useState, useCallback } from "react";

// Definimos el tipo de item del carrito segun tu documentacion de backend
export interface CartItem {
    id_producto: number;
    nombre: string;
    id_talla: number;
    talla: string;
    cantidad: number;
    precio_unidad: number;
    precio_total: number;
    image?: string; // Opcional, para la UI
}

interface CartContextType {
    items: CartItem[];
    addItem: (item: CartItem) => void;
    removeItem: (id_producto: number, id_talla: number) => void;
    updateQuantity: (id_producto: number, id_talla: number, quantity: number) => void;
    totalItems: number;
    totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [items, setItems] = useState<CartItem[]>([]);

    const addItem = useCallback((newItem: CartItem) => {
        setItems(prevItems => {
            // Comprobamos si el producto con esa talla ya existe
            const existingIndex = prevItems.findIndex(
                item => item.id_producto === newItem.id_producto && item.id_talla === newItem.id_talla
            );

            if (existingIndex > -1) {
                // Si existe, actualizamos cantidad
                const updatedItems = [...prevItems];
                const existingItem = updatedItems[existingIndex];
                existingItem.cantidad += newItem.cantidad;
                existingItem.precio_total = existingItem.cantidad * existingItem.precio_unidad;
                return updatedItems;
            }

            // Si no existe, lo añadimos
            return [...prevItems, { ...newItem, precio_total: newItem.cantidad * newItem.precio_unidad }];
        });
    }, []);

    const removeItem = useCallback((id_producto: number, id_talla: number) => {
        setItems(prevItems => prevItems.filter(
            item => !(item.id_producto === id_producto && item.id_talla === id_talla)
        ));
    }, []);

    const updateQuantity = useCallback((id_producto: number, id_talla: number, quantity: number) => {
        setItems(prevItems => prevItems.map(item => {
            if (item.id_producto === id_producto && item.id_talla === id_talla) {
                return { 
                    ...item, 
                    cantidad: quantity, 
                    precio_total: quantity * item.precio_unidad 
                };
            }
            return item;
        }));
    }, []);

    const totalItems = items.reduce((acc, item) => acc + item.cantidad, 0);
    const totalPrice = items.reduce((acc, item) => acc + item.precio_total, 0);

    return (
        <CartContext.Provider value={{ 
            items, 
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

export const useCart = () => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error("useCart debe usarse dentro de un CartProvider");
    }
    return context;
};
