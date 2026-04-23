export interface CartItem {
    id_producto: number;
    nombre: string;
    id_talla: number;
    talla: string;
    cantidad: number;
    precio_unitario: number;
    precio_total: number;
    image: string;
    stock: number;
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
        stock: number;
    };
}

export interface CartContextType {
    items: CartItem[];
    isLoading: boolean;
    refreshCart: () => Promise<void>;
    addItem: (id_producto: number, id_talla: number, cantidad: number, productInfo?: Partial<CartItem>) => Promise<void>;
    removeItem: (id_producto: number, id_talla: number) => Promise<void>;
    updateQuantity: (id_producto: number, id_talla: number, quantity: number) => Promise<void>;
    totalItems: number;
    totalPrice: number;
}

export interface CartModalProps {
    isOpen: boolean
    onClose: () => void
    items: CartItem[]
    onUpdateQuantity: (id_producto: number, id_talla: number, quantity: number) => void
    onRemoveItem: (id_producto: number, id_talla: number) => void
}