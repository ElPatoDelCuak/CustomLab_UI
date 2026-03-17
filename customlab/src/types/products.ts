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