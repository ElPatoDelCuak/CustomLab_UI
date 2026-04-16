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

/*
export interface ProductCardProps {
  id: number
  name: string
  price: number
  originalPrice?: number
  image: string
  hoverImage?: string
  category: string
  isNew?: boolean
  isSale?: boolean
}
*/