"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProductCard } from "@/components/product-card"
import { useProductsServices } from "@/services/productsServices"
import { useEffect, useState, useMemo } from "react"
import { ProductCardProps } from "@/types/products"
import { FilterState } from "@/types/catalogFilters"
import { CatalogFilters, MobileFilterButton, CatalogSort } from "./components/catalog-filters"
import { cn } from "@/lib/utils"

const initialFilters: FilterState = {
  categories: [],
  sizes: [],
  features: [],
  priceRange: [],
  sort: "newest",
}

export default function CatalogPage() {
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false)
  const { getProducts } = useProductsServices()
  const [products, setProducts] = useState<ProductCardProps[]>([])
  const [filters, setFilters] = useState<FilterState>(initialFilters)

  useEffect(() => {
    const fetchProducts = async () => {
      const result = await getProducts()
      if (result.success && result.data) {
        setProducts(result.data)
        return
      }
      setProducts([])
      console.error(result.message)
    }
    fetchProducts()
  }, [])

  const filteredProducts = useMemo(() => {
    let result = [...products]

    // Categoría — ajusta los valores si tu API devuelve en español
    if (filters.categories.length > 0) {
      result = result.filter((p) =>
        filters.categories.includes(p.categoria?.toLowerCase() ?? "")
      )
    }

    // Tallas — ahora usamos t.talla porque es un array de objetos
    if (filters.sizes.length > 0) {
      result = result.filter((p) =>
        p.tallas.some((t) => filters.sizes.includes(t.talla))
      )
    }

    // Características
    if (filters.features.includes("new")) {
      result = result.filter((p) => p.nuevo)
    }
    if (filters.features.includes("bestseller")) {
      result = result.filter((p) => p.oferta)
    }
    if (filters.features.includes("eco")) {
      result = result.filter((p) => p.personalizable)
    }

    // Precio
    if (filters.priceRange.length > 0) {
      result = result.filter((p) =>
        filters.priceRange.some((range) => {
          if (range === "0-50")    return p.precio >= 0 && p.precio <= 50
          if (range === "50-100")  return p.precio > 50 && p.precio <= 100
          if (range === "100-200") return p.precio > 100 && p.precio <= 200
          if (range === "200+")    return p.precio > 200
          return false
        })
      )
    }

    // Ordenación
    if (filters.sort === "price-asc")  result.sort((a, b) => a.precio - b.precio)
    if (filters.sort === "price-desc") result.sort((a, b) => b.precio - a.precio)
    if (filters.sort === "newest")     result.sort((a, b) => (b.nuevo ? 1 : 0) - (a.nuevo ? 1 : 0))

    return result
  }, [products, filters])

  return (
    <div>
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col gap-6 mb-10">
          <div className="text-center space-y-2">
            <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold">
              Nuestra Colección
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Piezas cuidadosamente seleccionadas que combinan artesanía excepcional con diseño contemporáneo
            </p>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-border">
            <div className="flex items-center gap-4">
              <MobileFilterButton onClick={() => setIsMobileFiltersOpen(true)} />
              <span className="text-sm text-muted-foreground">
                {filteredProducts.length} productos
              </span>
            </div>
            <CatalogSort
              selected={filters.sort}
              onChange={(sort) => setFilters((prev) => ({ ...prev, sort }))}
            />
          </div>
        </div>

        <div className="flex gap-10">
          <aside className="hidden lg:block w-64 shrink-0">
            <div className="sticky top-24">
              <CatalogFilters filters={filters} onChange={setFilters} />
            </div>
          </aside>
          <div className="flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id_producto}
                  {...product}
                />
              ))}
            </div>
            {filteredProducts.length === 0 && (
              <p className="text-center text-muted-foreground py-20">
                No hay productos con los filtros seleccionados.
              </p>
            )}
          </div>
        </div>
      </main>
      <Footer />

      <div
        className={cn(
          "fixed inset-0 bg-foreground/50 z-50 lg:hidden transition-opacity duration-300",
          isMobileFiltersOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setIsMobileFiltersOpen(false)}
      />
      <div
        className={cn(
          "fixed inset-y-0 left-0 w-full max-w-sm bg-background z-50 lg:hidden transition-transform duration-300 overflow-y-auto",
          isMobileFiltersOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <CatalogFilters
          isMobile
          onClose={() => setIsMobileFiltersOpen(false)}
          filters={filters}
          onChange={setFilters}
        />
      </div>
    </div>
  )
}