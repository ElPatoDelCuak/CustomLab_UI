"use client"

import { useState } from "react"
import { ChevronDown, SlidersHorizontal, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Checkbox } from "@/components/ui/checkbox"
import { cn } from "@/lib/utils"
import { FilterState, CatalogFiltersProps, CatalogSortProps } from "@/types/catalogFilters"

const sizes = ["XS", "S", "M", "L", "XL"]

const priceRanges = [
  { id: "0-50", label: "$0 - $50" },
  { id: "50-100", label: "$50 - $100" },
  { id: "100-200", label: "$100 - $200" },
  { id: "200+", label: "$200+" },
]

export function CatalogFilters({ isMobile, onClose, filters, onChange, availableFeatures, availableCategories }: CatalogFiltersProps) {

  const toggle = (
    key: keyof Pick<FilterState, "categories" | "sizes" | "features" | "priceRange">,
    value: string
  ) => {
    onChange({
      ...filters,
      [key]: filters[key].includes(value)
        ? filters[key].filter((v) => v !== value)
        : [...filters[key], value],
    })
  }

  const clearFilters = () =>
    onChange({ ...filters, categories: [], sizes: [], features: [], priceRange: [] })

  const hasActiveFilters =
    filters.categories.length > 0 ||
    filters.sizes.length > 0 ||
    filters.features.length > 0 ||
    filters.priceRange.length > 0

  return (
    <div className={cn("space-y-6", isMobile && "p-4")}>
      {isMobile && (
        <div className="flex items-center justify-between pb-4 border-b border-border">
          <h2 className="font-serif text-xl font-semibold">Filtros</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>
      )}

      {hasActiveFilters && (
        <Button
          variant="ghost"
          size="sm"
          className="text-sm text-muted-foreground hover:text-foreground"
          onClick={clearFilters}
        >
          Limpiar filtros
        </Button>
      )}

      <Accordion type="multiple" defaultValue={["features", "category", "size", "price"]} className="space-y-2">
        <AccordionItem value="features" className="border-b border-border">
          <AccordionTrigger className="text-sm uppercase tracking-wider hover:no-underline py-4">
            Características
          </AccordionTrigger>
          <AccordionContent className="pb-4">
            <div className="space-y-3">
              {availableFeatures.map((feature) => (
                <label key={feature.id_caracteristica} className="flex items-center gap-3 cursor-pointer group">
                  <Checkbox
                    checked={filters.features.includes(feature.id_caracteristica.toString())}
                    onCheckedChange={() => toggle("features", feature.id_caracteristica.toString())}
                  />
                  <span className="text-sm group-hover:text-accent transition-colors">
                    {feature.caracteristica}
                  </span>
                  <span className="text-xs text-muted-foreground ml-auto">
                    ({feature.count || 0})
                  </span>
                </label>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="category" className="border-b border-border">
          <AccordionTrigger className="text-sm uppercase tracking-wider hover:no-underline py-4">
            Categoría
          </AccordionTrigger>
          <AccordionContent className="pb-4">
            <div className="space-y-3">
              {availableCategories.map((category) => (
                <label key={category.id} className="flex items-center gap-3 cursor-pointer group">
                  <Checkbox
                    checked={filters.categories.includes(category.id)}
                    onCheckedChange={() => toggle("categories", category.id)}
                  />
                  <span className="text-sm group-hover:text-accent transition-colors">
                    {category.label}
                  </span>
                  <span className="text-xs text-muted-foreground ml-auto">
                    ({category.count})
                  </span>
                </label>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="size" className="border-b border-border">
          <AccordionTrigger className="text-sm uppercase tracking-wider hover:no-underline py-4">
            Talla
          </AccordionTrigger>
          <AccordionContent className="pb-4">
            <div className="flex flex-wrap gap-2">
              {sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => toggle("sizes", size)}
                  className={cn(
                    "w-10 h-10 text-sm border rounded-sm transition-all duration-200",
                    filters.sizes.includes(size)
                      ? "bg-foreground text-background border-foreground"
                      : "border-border hover:border-foreground"
                  )}
                >
                  {size}
                </button>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="price" className="border-b border-border">
          <AccordionTrigger className="text-sm uppercase tracking-wider hover:no-underline py-4">
            Precio
          </AccordionTrigger>
          <AccordionContent className="pb-4">
            <div className="space-y-3">
              {priceRanges.map((range) => (
                <label key={range.id} className="flex items-center gap-3 cursor-pointer group">
                  <Checkbox
                    checked={filters.priceRange.includes(range.id)}
                    onCheckedChange={() => toggle("priceRange", range.id)}
                  />
                  <span className="text-sm group-hover:text-accent transition-colors">
                    {range.label}
                  </span>
                </label>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {isMobile && (
        <div className="pt-4 border-t border-border">
          <Button
            className="w-full bg-foreground text-background hover:bg-foreground/90"
            onClick={onClose}
          >
            Ver resultados
          </Button>
        </div>
      )}
    </div>
  )
}

export function CatalogSort({ selected, onChange }: CatalogSortProps) {
  const [isOpen, setIsOpen] = useState(false)

  const sortOptions = [
    { id: "newest", label: "Más recientes" },
    { id: "price-asc", label: "Precio: menor a mayor" },
    { id: "price-desc", label: "Precio: mayor a menor" },
  ]

  return (
    <div className="relative">
      <Button
        variant="outline"
        className="min-w-[180px] justify-between"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-sm">
          {sortOptions.find((o) => o.id === selected)?.label}
        </span>
        <ChevronDown className={cn("h-4 w-4 transition-transform", isOpen && "rotate-180")} />
      </Button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-full bg-background border border-border rounded-sm shadow-lg z-10">
          {sortOptions.map((option) => (
            <button
              key={option.id}
              className={cn(
                "w-full px-4 py-2 text-left text-sm hover:bg-muted transition-colors",
                selected === option.id && "bg-muted"
              )}
              onClick={() => {
                onChange(option.id)
                setIsOpen(false)
              }}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export function MobileFilterButton({ onClick }: { onClick: () => void }) {
  return (
    <Button
      variant="outline"
      className="lg:hidden flex items-center gap-2"
      onClick={onClick}
    >
      <SlidersHorizontal className="h-4 w-4" />
      <span>Filtros</span>
    </Button>
  )
}