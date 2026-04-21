"use client"

import { useEffect, useState } from "react"
import { useFeaturesServices } from "@/services/featuresService"
import { CaracteristicsResponse } from "@/types/catalogFilters"
import { Button } from "@/components/ui/button"
import { Plus, Trash2 } from "lucide-react"
import FeaturesUploadModal from "./components/features-uploadModal"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { ConfirmModal } from "@/components/ui/confirm-modal"

export default function AdminFeaturesPage() {
    const { getCaracteristics, deleteCaracteristica } = useFeaturesServices()
    const [features, setFeatures] = useState<CaracteristicsResponse[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false)
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false)
    const [featureToDelete, setFeatureToDelete] = useState<number | null>(null)
    const [isDeleting, setIsDeleting] = useState(false)

    const fetchFeatures = async () => {
        setLoading(true)
        const result = await getCaracteristics()
        if (result.success && result.data) {
            setFeatures(result.data)
        } else {
            setError(result.message || "Error al cargar las características")
        }
        setLoading(false)
    }

    useEffect(() => {
        fetchFeatures()
    }, [])

    const handleDeleteClick = (id: number) => {
        setFeatureToDelete(id)
        setIsConfirmModalOpen(true)
    }

    const handleConfirmDelete = async () => {
        if (featureToDelete === null) return
        
        setIsDeleting(true)
        const result = await deleteCaracteristica(featureToDelete)
        if (result.success) {
            await fetchFeatures()
            setIsConfirmModalOpen(false)
            setFeatureToDelete(null)
        } else {
            setError(result.message || "Error al eliminar la característica")
        }
        setIsDeleting(false)
    }

    return (
        <div className="p-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Características</h1>
                <Button
                    className="bg-black text-white hover:bg-gray-800 gap-2"
                    onClick={() => setIsUploadModalOpen(true)}
                >
                    <Plus className="w-4 h-4" />
                    Añadir Característica
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
                                    <th className="px-6 py-4 font-medium w-20">ID</th>
                                    <th className="px-6 py-4 font-medium">Nombre de la Característica</th>
                                    <th className="px-6 py-4 font-medium text-right">Acciones</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {features.length === 0 ? (
                                    <tr>
                                        <td colSpan={3} className="px-6 py-8 text-center text-gray-500">
                                            No hay características registradas.
                                        </td>
                                    </tr>
                                ) : (
                                    features.map((feature) => (
                                        <tr key={feature.id_caracteristica} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4 font-mono text-xs text-gray-400">
                                                #{feature.id_caracteristica}
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="font-medium text-gray-900">
                                                    {feature.caracteristica}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <Button 
                                                        variant="ghost" 
                                                        size="icon" 
                                                        className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50" 
                                                        onClick={() => handleDeleteClick(feature.id_caracteristica)}
                                                    >
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

            {isUploadModalOpen && (
                <FeaturesUploadModal
                    onClose={() => setIsUploadModalOpen(false)}
                    onSuccess={fetchFeatures}
                />
            )}

            <ConfirmModal
                isOpen={isConfirmModalOpen}
                onClose={() => setIsConfirmModalOpen(false)}
                onConfirm={handleConfirmDelete}
                title="Eliminar Característica"
                description="¿Estás seguro de que deseas eliminar esta característica? Esta acción no se puede deshacer y puede afectar a los productos asociados."
                confirmText="Eliminar"
                isLoading={isDeleting}
            />
        </div>
    )
}
