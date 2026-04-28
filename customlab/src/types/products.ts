export interface ProductCardProps {
  id_producto: number
  nombre_producto: string
  precio: number
  precio_original?: number
  stock: number
  image_cover: string
  image_hover: string
  images: {
    id_imagen: number
    url: string
  }[]
  categoria: string
  personalizable: boolean
  nuevo: boolean
  oferta: boolean
  precio_costo?: number
  tallas: {
    id_talla: number
    id_producto: number
    talla: string
    stock: number
  }[]
  caracteristicas?: {
    id_caracteristica: number
    caracteristica: string
  }[]
}

export interface BackendProduct {
  id_producto: number;
  nombre_producto: string;
  precio_venta: number;
  precio_original?: number;
  stock: number;
  categoria: string;
  personalizable: boolean;
  nuevo: boolean;
  oferta: boolean;
  precio_costo?: number;
  images: {
    id_imagen_producto: number;
    ruta: string;
  }[];
  tallas: {
    id_talla: number;
    id_producto: number;
    talla: string;
    stock: number;
  }[];
  caracteristicas?: {
    id_caracteristica: number;
    caracteristica: string;
  }[];
}
export interface UploadModalProps {
  onClose: () => void
  onSuccess: () => void
}
export interface TallaItem {
  talla: string
  stock: number
}

export interface ProductModalProps {
  isOpen: boolean
  onClose: () => void
  product: ProductCardProps | null
  onAddToCart: (product: ProductCardProps, size: string, quantity: number) => void
}