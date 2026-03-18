import { ProductCard } from "@/components/product-card"

export default function ProductsGrid() {
  const products = [
  {
    id_producto: 1,
    nombre_producto: "Vestido Midi de Lino",
    precio: 189,
    stock: 10,
    image_cover: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&q=80",
    image_hover: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=600&q=80",
    images: [
      {
        id_imagen: 1,
        url: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&q=80"
      },
      {
        id_imagen: 2,
        url: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=600&q=80"
      },
      {
        id_imagen: 3,
        url: "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=600&q=80"
      }
    ],
    categoria: "Vestidos",
    personalizable: true,
    tallas: [
      {
        id_talla: 1,
        id_producto: 1,
        talla: "S",
        stock: 5,
      },
      {
        id_talla: 2,
        id_producto: 1,
        talla: "M",
        stock: 3,
      },
    ]
  }
]    
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
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
    )
}
