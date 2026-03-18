export interface ProductCardProps {
  id_producto: number
  nombre_producto: string
  precio: number
  stock: number
  image_cover: string
  image_hover: string
  images: {
    id_imagen: number
    url: string
  }[]
  categoria: string
  personalizable: boolean
  tallas: {
    id_talla: number
    id_producto: number
    talla: string
    stock: number
  }[]
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