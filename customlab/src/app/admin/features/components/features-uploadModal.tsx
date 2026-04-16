"use client"

import { useState } from "react"
import { X, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useFeaturesServices } from "@/services/featuresService"
import { UploadModalProps } from "@/types/products"

export default function FeaturesUploadModal({ onClose, onSuccess }: UploadModalProps) {
    const { createCaracteristica } = useFeaturesServices()
    const [nombre, setNombre] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError(null)

        try {
            const response = await createCaracteristica(nombre)

            if (response.success) {
                onSuccess()
                onClose()
            } else {
                setError(response.message || "Error al crear la característica")
            }
        } catch (err) {
            setError("Ocurrió un error inesperado")
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-300">
            <div className="bg-white w-full max-w-md overflow-hidden rounded-2xl shadow-2xl flex flex-col animate-in zoom-in-95 duration-300">
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b">
                    <h2 className="text-xl font-bold text-gray-900">Añadir Característica</h2>
                    <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full hover:bg-gray-100 hover:text-black">
                        <X className="h-5 w-5" />
                    </Button>
                </div>

                {/* Form Body */}
                <div className="p-6">
                    {error && (
                        <div className="bg-red-50 text-red-600 p-4 rounded-xl border border-red-100 mb-4 flex items-center gap-3">
                            <X className="h-5 w-5 shrink-0" />
                            <p className="text-sm font-medium">{error}</p>
                        </div>
                    )}

                    <form id="feature-form" onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700">Nombre de la Característica *</label>
                            <Input
                                required
                                placeholder="Ej: Algodón Orgánico, Impermeable..."
                                value={nombre}
                                onChange={(e) => setNombre(e.target.value)}
                                className="rounded-lg border-gray-200 focus:ring-2 focus:ring-black"
                            />
                        </div>
                    </form>
                </div>

                {/* Footer Actions */}
                <div className="px-6 py-4 border-t bg-gray-50 flex justify-end gap-3">
                    <Button variant="outline" onClick={onClose} disabled={loading} className="rounded-lg hover:bg-white">
                        Cancelar
                    </Button>
                    <Button
                        form="feature-form"
                        disabled={loading}
                        className="bg-black text-white hover:bg-gray-800 min-w-[100px] rounded-lg h-10"
                    >
                        {loading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Guardando...
                            </>
                        ) : (
                            "Guardar"
                        )}
                    </Button>
                </div>
            </div>
        </div>
    )
}
