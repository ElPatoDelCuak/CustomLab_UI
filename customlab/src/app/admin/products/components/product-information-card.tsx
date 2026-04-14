"use client"

import { useEffect, useState } from "react"
import { useProductsServices } from "@/services/productsServices"
import { ProductCardProps } from "@/types/products"
import { X, CheckCircle, Package } from "lucide-react"

interface ProductInformationCardProps {
  productId: number
  onClose: () => void
}

export function ProductInformationCard({ productId, onClose }: ProductInformationCardProps) {
  const { getProductById } = useProductsServices()
  const [product, setProduct] = useState<ProductCardProps | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true)
      const result = await getProductById(productId)
      if (result.success && result.data) {
        setProduct(result.data)
        setSelectedImage(result.data.image_cover || result.data.images?.[0]?.url || null)
      } else {
        setError(result.message || "Error al cargar la información del producto")
      }
      setLoading(false)
    }

    if (productId) {
      fetchProduct()
    }
  }, [productId])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col relative animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gray-50/50">
          <h2 className="text-xl font-bold text-gray-900">Detalles del Producto</h2>
          <button 
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {loading ? (
            <div className="flex flex-col items-center justify-center h-64 gap-4">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-black"></div>
              <p className="text-gray-500 text-sm">Cargando información...</p>
            </div>
          ) : error ? (
            <div className="flex items-center justify-center h-64 text-red-500 bg-red-50 rounded-xl p-8 text-center border border-red-100">
              <p>{error}</p>
            </div>
          ) : product ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              {/* Left Column: Images */}
              <div className="space-y-4">
                <div className="aspect-[3/4] md:aspect-[2/3] lg:aspect-[3/4] rounded-xl overflow-hidden bg-gray-100 border border-gray-200">
                  {selectedImage ? (
                    <img src={selectedImage} alt={product.nombre_producto} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400 font-medium">Sin imagen</div>
                  )}
                </div>
                
                {product.images && product.images.length > 0 && (
                  <div className="flex gap-3 overflow-x-auto pb-2">
                    {product.images.map((img, index) => (
                      <div key={img.id_imagen} className="flex flex-col items-center gap-1">
                        <div 
                          onClick={() => setSelectedImage(img.url)}
                          className={`w-20 h-28 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100 border-2 cursor-pointer transition-all ${
                            selectedImage === img.url ? "border-black ring-2 ring-black/10" : "border-transparent hover:border-gray-300"
                          }`}
                        >
                          <img src={img.url} alt={`Imagen ${img.id_imagen}`} className="w-full h-full object-cover" />
                        </div>
                        {index === 0 && <span className="text-[10px] uppercase font-bold text-gray-500 tracking-wider">Portada</span>}
                        {index === 1 && <span className="text-[10px] uppercase font-bold text-gray-500 tracking-wider">Hover</span>}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Right Column: Details */}
              <div className="space-y-8">
                
                {/* Header Information */}
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xs font-semibold uppercase tracking-wider text-gray-500 bg-gray-100 px-2 py-1 rounded-md">
                      {product.categoria}
                    </span>
                    {product.nuevo && <span className="text-xs font-medium bg-blue-100 text-blue-800 px-2.5 py-1 rounded-full">Nuevo</span>}
                    {product.oferta && <span className="text-xs font-medium bg-purple-100 text-purple-800 px-2.5 py-1 rounded-full">Oferta</span>}
                  </div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.nombre_producto}</h1>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl font-bold text-black">€{product.precio.toFixed(2)}</span>
                    {product.precio_original && (
                      <span className="text-lg text-gray-400 line-through">€{product.precio_original.toFixed(2)}</span>
                    )}
                  </div>
                </div>

                {/* Stock & Customization */}
                <div className="flex gap-6 py-4 border-y border-gray-100">
                  <div className="flex items-center gap-2">
                    <Package className={`w-5 h-5 ${product.stock > 0 ? "text-green-600" : "text-red-500"}`} />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Stock Total</p>
                      <p className={`text-sm ${product.stock > 0 ? "text-green-600" : "text-red-500 font-medium"}`}>
                        {product.stock} unidades
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className={`w-5 h-5 ${product.personalizable ? "text-blue-600" : "text-gray-400"}`} />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Personalizable</p>
                      <p className="text-sm text-gray-500">{product.personalizable ? "Sí" : "No"}</p>
                    </div>
                  </div>
                </div>

                {/* Sizes Table */}
                {product.tallas && product.tallas.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Tallas y Stock</h3>
                    <div className="border border-gray-200 rounded-lg overflow-hidden">
                      <table className="w-full text-sm text-left">
                        <thead className="bg-gray-50 text-gray-600 border-b border-gray-200">
                          <tr>
                            <th className="px-4 py-3 font-medium">Talla</th>
                            <th className="px-4 py-3 font-medium text-right">Stock Disponible</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                          {product.tallas.map((talla) => (
                            <tr key={talla.id_talla} className="hover:bg-gray-50/50">
                              <td className="px-4 py-3 font-medium text-gray-900">{talla.talla}</td>
                              <td className="px-4 py-3 text-right">
                                <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium ${
                                  talla.stock > 5 ? "bg-green-100 text-green-700" :
                                  talla.stock > 0 ? "bg-yellow-100 text-yellow-700" : "bg-red-100 text-red-700"
                                }`}>
                                  {talla.stock}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* Features */}
                {product.caracteristicas && product.caracteristicas.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Características</h3>
                    <ul className="space-y-2">
                      {product.caracteristicas.map((carac) => (
                        <li key={carac.id_caracteristica} className="flex items-start gap-2 text-sm text-gray-600">
                          <span className="block w-1.5 h-1.5 mt-1.5 rounded-full bg-black flex-shrink-0" />
                          <span>{carac.caracteristica}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
}
