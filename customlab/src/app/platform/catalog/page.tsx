"use client"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProductCard } from "@/components/product-card"
import { useProductsServices } from "@/app/services/productsServices"
import { useEffect, useState } from "react"
import { ProductCardProps } from "@/types/products"
import { CatalogFilters, MobileFilterButton, CatalogSort } from "./components/catalog-filters"
import { cn } from "@/lib/utils"

export default function CatalogPage() {
    const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false)
    const { getProducts } = useProductsServices();
    const [products, setProducts] = useState<ProductCardProps[]>([]);
  
    useEffect(() => {
        const fetchProducts = async () => {
            const result = await getProducts();
  
            if (result.success && result.data) {
                setProducts(result.data);
                return;
            }
  
            setProducts([]);
            console.error(result.message);
        };
        fetchProducts();
    }, []);

  return (
    <div>
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Catalog Header */}
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
                {products.length} productos
              </span>
            </div>
            <CatalogSort />
          </div>
        </div>

        <div className="flex gap-10">
          <aside className="hidden lg:block w-64 shrink-0">
            <div className="sticky top-24">
              <CatalogFilters />
            </div>
          </aside>
          <div className="flex-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
                  {products.map((product) => (
                      <ProductCard 
                      key={product.id_producto}
                      id_producto={product.id_producto}
                      nombre_producto={product.nombre_producto}
                      precio={product.precio}
                      precio_original={product.precio_original}
                      stock={product.stock}
                      image_cover={product.image_cover}
                      image_hover={product.image_hover}
                      categoria={product.categoria}
                      personalizable={product.personalizable}
                      images={product.images}
                      tallas={product.tallas}
                      nuevo={product.nuevo}
                      oferta={product.oferta}
                      />
                  ))}
              </div>
          </div>
        </div>
      </main>
      <Footer />

      {/* Mobile Filters Overlay */}
      <div
        className={cn(
          "fixed inset-0 bg-foreground/50 z-50 lg:hidden transition-opacity duration-300",
          isMobileFiltersOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setIsMobileFiltersOpen(false)}
      />
      
      {/* Mobile Filters Panel */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 w-full max-w-sm bg-background z-50 lg:hidden transition-transform duration-300 overflow-y-auto",
          isMobileFiltersOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <CatalogFilters isMobile onClose={() => setIsMobileFiltersOpen(false)} />
      </div>
    </div>
  )
}