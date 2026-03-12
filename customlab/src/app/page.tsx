import { Header } from "@/components/header"
import { HeroBanner } from "@/components/hero-banner"
import { ProductCard } from "@/components/product-card"
import { Footer } from "@/components/footer"

export default function LandingPage() {
const products = [
  {
    id: 1,
    name: "Vestido Midi de Lino",
    price: 189,
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&q=80",
    hoverImage: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=600&q=80",
    category: "Vestidos",
    isNew: true,
  },
  {
    id: 2,
    name: "Blazer Estructurado",
    price: 245,
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&q=80",
    hoverImage: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&q=80",
    category: "Chaquetas",
  },
  {
    id: 3,
    name: "Pantalón Wide Leg",
    price: 129,
    originalPrice: 169,
    image: "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=600&q=80",
    hoverImage: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&q=80",
    category: "Pantalones",
    isSale: true,
  },
]    
    return (
        <div>
            <Header />
            <HeroBanner />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Productos Destacados</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
                    {products.map((product) => (
                        <ProductCard 
                            key={product.id}
                            id={product.id}
                            name={product.name}
                            price={product.price}
                            originalPrice={product.originalPrice}
                            image={product.image}
                            hoverImage={product.hoverImage}
                            category={product.category}
                            isNew={product.isNew}
                            isSale={product.isSale}
                        />
                    ))}
                </div>
            </div>
            <Footer />
        </div>
    )
}