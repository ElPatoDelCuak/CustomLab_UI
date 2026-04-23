"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProductCard } from "@/components/product-card"
import { useProductsServices } from "@/services/productsServices"
import { useFeaturesServices } from "@/services/featuresService"
import { useEffect, useState, useMemo } from "react"
import { ProductCardProps } from "@/types/products"
import { FilterState, CaracteristicsResponse } from "@/types/catalogFilters"
import { CatalogFilters, MobileFilterButton, CatalogSort } from "./components/catalog-filters"
import { cn } from "@/lib/utils"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { ProductModal } from "@/components/product-modal"

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
  const { getCaracteristics } = useFeaturesServices()
  const [products, setProducts] = useState<ProductCardProps[]>([])
  const [filters, setFilters] = useState<FilterState>(initialFilters)
  const [availableFeatures, setAvailableFeatures] = useState<CaracteristicsResponse[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Modal State
  const [selectedProduct, setSelectedProduct] = useState<ProductCardProps | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleOpenModal = (product: ProductCardProps) => {
    setSelectedProduct(product)
    setIsModalOpen(true)
  }

  const handleAddToCart = (product: ProductCardProps, size: string, quantity: number) => {
    console.log("Adding to cart:", { product, size, quantity })
  }

  useEffect(() => {
    // Fetch products and features with loading state
    const fetchData = async () => {
      setIsLoading(true)
      try {
        const [productsResult, featuresResult] = await Promise.all([
          getProducts(),
          getCaracteristics()
        ])

        if (productsResult.success && productsResult.data) {
          setProducts(productsResult.data)
        } else {
          setProducts([])
          console.error(productsResult.message)
        }

        if (featuresResult.success && featuresResult.data) {
          setAvailableFeatures(featuresResult.data)
        } else {
          setAvailableFeatures([])
          console.error(featuresResult.message)
        }
      } catch (error) {
        console.error("Error fetching catalog data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  // Count products by feature
  const featuresWithCounts = useMemo(() => {
    return availableFeatures.map((f) => {
      const count = products.filter((p) =>
        p.caracteristicas?.some((c) => c.id_caracteristica === f.id_caracteristica)
      ).length
      return { ...f, count }
    })
  }, [availableFeatures, products])

  // Count products by category
  const categoriesWithCounts = useMemo(() => {
    const categoryMap = new Map<string, { id: string; label: string; count: number }>()

    products.forEach((p) => {
      const label = p.categoria || "Sin categoría"
      const id = label.toLowerCase()

      if (categoryMap.has(id)) {
        categoryMap.get(id)!.count++
      } else {
        categoryMap.set(id, { id, label, count: 1 })
      }
    })

    return Array.from(categoryMap.values())
  }, [products])

  // Filter products by selected filters
  const filteredProducts = useMemo(() => {
    let result = [...products]

    if (filters.categories.length > 0) {
      result = result.filter((p) =>
        filters.categories.includes(p.categoria?.toLowerCase() ?? "")
      )
    }

    if (filters.sizes.length > 0) {
      result = result.filter((p) =>
        p.tallas.some((t) => filters.sizes.includes(t.talla))
      )
    }

    if (filters.features.length > 0) {
      result = result.filter((p) =>
        p.caracteristicas?.some((c) => filters.features.includes(c.id_caracteristica.toString()))
      )
    }

    if (filters.priceRange.length > 0) {
      result = result.filter((p) =>
        filters.priceRange.some((range) => {
          if (range === "0-50") return p.precio >= 0 && p.precio <= 50
          if (range === "50-100") return p.precio > 50 && p.precio <= 100
          if (range === "100-200") return p.precio > 100 && p.precio <= 200
          if (range === "200+") return p.precio > 200
          return false
        })
      )
    }

    // Sort products by selected sort
    if (filters.sort === "price-asc") result.sort((a, b) => a.precio - b.precio)
    if (filters.sort === "price-desc") result.sort((a, b) => b.precio - a.precio)
    if (filters.sort === "newest") result.sort((a, b) => (b.nuevo ? 1 : 0) - (a.nuevo ? 1 : 0))

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
              <CatalogFilters
                filters={filters}
                onChange={setFilters}
                availableFeatures={featuresWithCounts}
                availableCategories={categoriesWithCounts}
              />
            </div>
          </aside>
          <div className="flex-1">
            {isLoading ? (
              <div className="flex justify-center p-12">
                <LoadingSpinner />
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
                  {filteredProducts.map((product) => (
                    <ProductCard
                      key={product.id_producto}
                      {...product}
                      onClick={() => handleOpenModal(product)}
                    />
                  ))}
                </div>
                {filteredProducts.length === 0 && (
                  <p className="text-center text-muted-foreground py-20">
                    No hay productos con los filtros seleccionados.
                  </p>
                )}
              </>
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
          availableFeatures={featuresWithCounts}
          availableCategories={categoriesWithCounts}
        />
      </div>

      <ProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        product={selectedProduct}
        onAddToCart={handleAddToCart}
      />
    </div>
  )
}