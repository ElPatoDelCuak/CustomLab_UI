import { Header } from "@/components/header"
import { CatalogFilters } from "./components/catalog-filters"
import ProductsGrid from "./components/products-grid"
import { Footer } from "@/components/footer"

export default function CatalogPage() {
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
        </div>


        <div className="flex gap-10">
          <aside className="hidden lg:block w-64 shrink-0">
            <div className="sticky top-24">
              <CatalogFilters />
            </div>
          </aside>

          <div className="flex-1 min-w-0">
            <ProductsGrid />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}