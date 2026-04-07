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
}

export interface CatalogSortProps {
  selected: string
  onChange: (value: string) => void
}