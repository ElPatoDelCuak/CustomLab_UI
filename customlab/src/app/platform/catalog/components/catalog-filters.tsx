"use client"

import { useState } from "react"
import { ChevronDown, SlidersHorizontal, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Checkbox } from "@/components/ui/checkbox"
import { cn } from "@/lib/utils"

const categories = [
  { id: "dresses", label: "Vestidos", count: 24 },
  { id: "tops", label: "Tops y Blusas", count: 36 },
  { id: "pants", label: "Pantalones", count: 18 },
  { id: "jackets", label: "Chaquetas", count: 12 },
  { id: "skirts", label: "Faldas", count: 15 },
]

const sizes = ["XS", "S", "M", "L", "XL"]

const priceRanges = [
  { id: "0-50", label: "$0 - $50" },
  { id: "50-100", label: "$50 - $100" },
  { id: "100-200", label: "$100 - $200" },
  { id: "200+", label: "$200+" },
]

interface CatalogFiltersProps {
  isMobile?: boolean
  onClose?: () => void
}

export function CatalogFilters({ isMobile, onClose }: CatalogFiltersProps) {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedSizes, setSelectedSizes] = useState<string[]>([])
  const [selectedColors, setSelectedColors] = useState<string[]>([])

  const toggleCategory = (id: string) => {
    setSelectedCategories(prev =>
      prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
    )
  }

  const toggleSize = (size: string) => {
    setSelectedSizes(prev =>
      prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]
    )
  }

  const clearFilters = () => {
    setSelectedCategories([])
    setSelectedSizes([])
    setSelectedColors([])
  }

  const hasActiveFilters = selectedCategories.length > 0 || selectedSizes.length > 0 || selectedColors.length > 0

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

      <Accordion type="multiple" defaultValue={["category", "size", "color", "price"]} className="space-y-2">
        <AccordionItem value="category" className="border-b border-border">
          <AccordionTrigger className="text-sm uppercase tracking-wider hover:no-underline py-4">
            Categoría
          </AccordionTrigger>
          <AccordionContent className="pb-4">
            <div className="space-y-3">
              {categories.map((category) => (
                <label
                  key={category.id}
                  className="flex items-center gap-3 cursor-pointer group"
                >
                  <Checkbox
                    checked={selectedCategories.includes(category.id)}
                    onCheckedChange={() => toggleCategory(category.id)}
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
                  onClick={() => toggleSize(size)}
                  className={cn(
                    "w-10 h-10 text-sm border rounded-sm transition-all duration-200",
                    selectedSizes.includes(size)
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
                <label
                  key={range.id}
                  className="flex items-center gap-3 cursor-pointer group"
                >
                  <Checkbox />
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

export function CatalogSort() {
  const [isOpen, setIsOpen] = useState(false)
  const [selected, setSelected] = useState("newest")

  const sortOptions = [
    { id: "newest", label: "Más recientes" },
    { id: "price-asc", label: "Precio: menor a mayor" },
    { id: "price-desc", label: "Precio: mayor a menor" },
    { id: "popular", label: "Más populares" },
  ]

  return (
    <div className="relative">
      <Button
        variant="outline"
        className="min-w-[180px] justify-between"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-sm">
          {sortOptions.find(o => o.id === selected)?.label}
        </span>
        <ChevronDown className={cn(
          "h-4 w-4 transition-transform",
          isOpen && "rotate-180"
        )} />
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
                setSelected(option.id)
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
