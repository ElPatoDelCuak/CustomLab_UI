"use client"

import { useEffect, useState } from "react"
import { useProductsServices } from "@/services/productsServices"
import { ProductCardProps } from "@/types/products"
import { Button } from "@/components/ui/button"
import { Plus, Edit, Trash2, Eye } from "lucide-react"
import { ProductInformationCard } from "./components/product-information-card"
import UploadModal from "./components/product-uploadModal"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { ConfirmModal } from "@/components/ui/confirm-modal"

export default function AdminProductsPage() {
    const { getProducts, deleteProduct } = useProductsServices()
    const [products, setProducts] = useState<ProductCardProps[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [selectedProductId, setSelectedProductId] = useState<number | null>(null)
    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false)
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false)
    const [productToDelete, setProductToDelete] = useState<number | null>(null)
    const [isDeleting, setIsDeleting] = useState(false)

    const fetchProducts = async () => {
        setLoading(true)
        const result = await getProducts()
        if (result.success && result.data) {
            setProducts(result.data)
        } else {
            setError(result.message || "Error al cargar los productos")
        }
        setLoading(false)
    }

    useEffect(() => {
        fetchProducts()
    }, [])

    const handleDeleteClick = (id: number) => {
        setProductToDelete(id)
        setIsConfirmModalOpen(true)
    }

    const handleConfirmDelete = async () => {
        if (productToDelete === null) return
        
        setIsDeleting(true)
        const result = await deleteProduct(productToDelete)
        if (result.success === true) {
            await fetchProducts()
            setIsConfirmModalOpen(false)
            setProductToDelete(null)
        } else {
            setError(result.message || "Error al eliminar el producto")
        }
        setIsDeleting(false)
    }

    return (
        <div className="p-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Productos</h1>
                <Button
                    className="bg-black text-white hover:bg-gray-800 gap-2"
                    onClick={() => setIsUploadModalOpen(true)}
                >
                    <Plus className="w-4 h-4" />
                    Añadir Producto
                </Button>
            </div>

            {loading ? (
                <div className="flex justify-center p-12">
                    <LoadingSpinner />
                </div>
            ) : error ? (
                <div className="bg-red-50 text-red-500 p-4 rounded-md border border-red-200">
                    {error}
                </div>
            ) : (
                <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm text-gray-600">
                            <thead className="bg-gray-50 border-b border-gray-200 text-gray-900">
                                <tr>
                                    <th className="px-6 py-4 font-medium">Producto</th>
                                    <th className="px-6 py-4 font-medium">Categoría</th>
                                    <th className="px-6 py-4 font-medium">Precio</th>
                                    <th className="px-6 py-4 font-medium">Stock</th>
                                    <th className="px-6 py-4 font-medium">Estado</th>
                                    <th className="px-6 py-4 font-medium text-right">Acciones</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {products.length === 0 ? (
                                    <tr>
                                        <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                                            No hay productos registrados.
                                        </td>
                                    </tr>
                                ) : (
                                    products.map((product) => (
                                        <tr key={product.id_producto} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-12 h-12 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
                                                        {product.image_cover ? (
                                                            <img
                                                                src={product.image_cover}
                                                                alt={product.nombre_producto}
                                                                className="w-full h-full object-cover"
                                                            />
                                                        ) : (
                                                            <div className="w-full h-full flex items-center justify-center text-gray-400">
                                                                Sin img
                                                            </div>
                                                        )}
                                                    </div>
                                                    <span className="font-medium text-gray-900 line-clamp-2">
                                                        {product.nombre_producto}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 capitalize">
                                                {product.categoria}
                                            </td>
                                            <td className="px-6 py-4">
                                                €{product.precio.toFixed(2)}
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${product.stock > 10
                                                    ? "bg-green-100 text-green-800"
                                                    : product.stock > 0
                                                        ? "bg-yellow-100 text-yellow-800"
                                                        : "bg-red-100 text-red-800"
                                                    }`}>
                                                    {product.stock} unids.
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex gap-2">
                                                    {product.nuevo && (
                                                        <span className="px-2 py-1 bg-blue-50 text-blue-600 rounded text-xs">Nuevo</span>
                                                    )}
                                                    {product.oferta && (
                                                        <span className="px-2 py-1 bg-purple-50 text-purple-600 rounded text-xs">Oferta</span>
                                                    )}
                                                    {!product.nuevo && !product.oferta && (
                                                        <span className="text-gray-400">-</span>
                                                    )}
                                                    {product.personalizable && (
                                                        <span className="px-2 py-1 bg-green-50 text-green-600 rounded text-xs">Personalizable</span>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="h-8 w-8 text-gray-500 hover:text-gray-900"
                                                        onClick={() => setSelectedProductId(product.id_producto)}
                                                    >
                                                        <Eye className="h-4 w-4" />
                                                    </Button>
                                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500 hover:text-gray-900">
                                                        <Edit className="h-4 w-4" />
                                                    </Button>
                                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50" onClick={() => handleDeleteClick(product.id_producto)}>
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {selectedProductId && (
                <ProductInformationCard
                    productId={selectedProductId}
                    onClose={() => setSelectedProductId(null)}
                />
            )}

            {isUploadModalOpen && (
                <UploadModal
                    onClose={() => setIsUploadModalOpen(false)}
                    onSuccess={fetchProducts}
                />
            )}

            <ConfirmModal
                isOpen={isConfirmModalOpen}
                onClose={() => setIsConfirmModalOpen(false)}
                onConfirm={handleConfirmDelete}
                title="Eliminar Producto"
                description="¿Estás seguro de que deseas eliminar este producto? Esta acción no se puede deshacer y el producto desaparecerá del catálogo inmediatamente."
                confirmText="Eliminar"
                isLoading={isDeleting}
            />
        </div>
    )
}
