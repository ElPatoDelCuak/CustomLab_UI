"use client"
import { Header } from "@/components/header"
import { HeroBanner } from "@/components/hero-banner"
import { ProductCard } from "@/components/product-card"
import { Footer } from "@/components/footer"
import { useProductsServices } from "@/app/services/productsServices"
import { useEffect, useState } from "react"
import { ProductCardProps } from "@/types/products"

export default function LandingPage() {
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
    }, [getProducts]);

    return (
        <div>
            <Header />
            <HeroBanner />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Productos Destacados</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
                    {products.map((product) => (
                        <ProductCard 
                            key={product.id_producto}
                            id_producto={product.id_producto}
                            nombre_producto={product.nombre_producto}
                            precio={product.precio}
                            stock={product.stock}
                            image_cover={product.image_cover}
                            image_hover={product.image_hover}
                            categoria={product.categoria}
                            personalizable={product.personalizable}
                            images={product.images}
                            tallas={product.tallas}
                        />
                    ))}
                </div>
            </div>
            <Footer />
        </div>
    )
}