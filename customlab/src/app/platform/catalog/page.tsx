import { Header } from "@/components/header"
import ProductsGrid from "./components/products-grid"
import { Footer } from "@/components/footer"

export default function CatalogPage() {

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
            </div>
            <div className="flex items-center justify-between pt-4 border-t border-border"></div>
            <ProductsGrid />
        </main>
        <Footer />
    </div>
)
}