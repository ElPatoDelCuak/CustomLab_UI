export interface FilterState {
  categories: string[]
  sizes: string[]
  features: string[]
  priceRange: string[]
  sort: string
}

export interface CatalogFiltersProps {
  isMobile?: boolean
  onClose?: () => void
  filters: FilterState
  onChange: (filters: FilterState) => void
  availableFeatures: (CaracteristicsResponse & { count?: number })[]
  availableCategories: { id: string; label: string; count: number }[]
}

export interface CatalogSortProps {
  selected: string
  onChange: (value: string) => void
}

export interface CaracteristicsResponse {
  id_caracteristica: number
  caracteristica: string
}