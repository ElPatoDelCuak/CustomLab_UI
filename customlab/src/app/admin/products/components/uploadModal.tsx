"use client"

import { useState, useEffect, useRef } from "react"
import { X, Plus, Trash2, Upload, Loader2, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { useProductsServices } from "@/services/productsServices"
import { useFiltersServices } from "@/services/filtersService"
import { CaracteristicsResponse } from "@/types/catalogFilters"

interface UploadModalProps {
    onClose: () => void
    onSuccess: () => void
}

interface TallaItem {
    talla: string
    stock: number
}

export default function UploadModal({ onClose, onSuccess }: UploadModalProps) {
    const { postProductFormData } = useProductsServices()
    const { getCaracteristics } = useFiltersServices()

    // Form State
    const [nombre, setNombre] = useState("")
    const [precioVenta, setPrecioVenta] = useState("")
    const [precioOriginal, setPrecioOriginal] = useState("")
    const [precioCosto, setPrecioCosto] = useState("")
    const [stockTotal, setStockTotal] = useState("")
    const [categoria, setCategoria] = useState("")
    const [isNuevo, setIsNuevo] = useState(true)
    const [isOferta, setIsOferta] = useState(false)
    const [isPersonalizable, setIsPersonalizable] = useState(false)

    // Images
    const [selectedImages, setSelectedImages] = useState<File[]>([])
    const [previews, setPreviews] = useState<string[]>([])

    // Tallas
    const [tallas, setTallas] = useState<TallaItem[]>([])
    const [newTalla, setNewTalla] = useState("")
    const [newTallaStock, setNewTallaStock] = useState("")

    // Characteristics
    const [availableChars, setAvailableChars] = useState<CaracteristicsResponse[]>([])
    const [selectedChars, setSelectedChars] = useState<number[]>([])

    // UI state
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const fileInputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        const fetchChars = async () => {
            const result = await getCaracteristics()
            if (result.success && result.data) {
                setAvailableChars(result.data)
            }
        }
        fetchChars()
    }, [])

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const files = Array.from(e.target.files)
            setSelectedImages(prev => [...prev, ...files])

            const newPreviews = files.map(file => URL.createObjectURL(file))
            setPreviews(prev => [...prev, ...newPreviews])
        }
    }

    const removeImage = (index: number) => {
        setSelectedImages(prev => prev.filter((_, i) => i !== index))
        setPreviews(prev => {
            URL.revokeObjectURL(prev[index])
            return prev.filter((_, i) => i !== index)
        })
    }

    const addTalla = () => {
        if (newTalla.trim() && newTallaStock.trim()) {
            setTallas([...tallas, { talla: newTalla, stock: parseInt(newTallaStock) }])
            setNewTalla("")
            setNewTallaStock("")
        }
    }

    const removeTalla = (index: number) => {
        setTallas(tallas.filter((_, i) => i !== index))
    }

    const toggleChar = (id: number) => {
        setSelectedChars(prev =>
            prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
        )
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setLoading(true)
        setError(null)

        if (selectedImages.length === 0) {
            setError("Debes seleccionar al menos una imagen para el producto.")
            setLoading(false)
            // Scroll to top
            const modalBody = document.querySelector(".overflow-y-auto")
            if (modalBody) modalBody.scrollTo({ top: 0, behavior: "smooth" })
            return
        }

        try {
            const formData = new FormData()
            formData.append("nombre_producto", nombre)
            formData.append("precio_venta", precioVenta)
            formData.append("precio_original", precioOriginal || "0")
            formData.append("precio_costo", precioCosto || "0")
            formData.append("stock", stockTotal || "0")
            formData.append("categoria", categoria)
            formData.append("nuevo", isNuevo ? "1" : "0")
            formData.append("oferta", isOferta ? "1" : "0")
            formData.append("personalizable", isPersonalizable ? "1" : "0")

            selectedImages.forEach((image) => {
                formData.append("images[]", image)
            })

            tallas.forEach((t) => {
                formData.append("tallas", JSON.stringify({ talla: t.talla, stock: t.stock }))
            })

            selectedChars.forEach((charId) => {
                formData.append("caracteristicas", JSON.stringify({ id_caracteristica: charId }))
            })

            const response = await postProductFormData(formData)

            if (response.success) {
                onSuccess()
                onClose()
            } else {
                setError(response.message || "Error al subir el producto")
                // Scroll to top to see error
                const modalBody = document.querySelector(".overflow-y-auto")
                if (modalBody) modalBody.scrollTo({ top: 0, behavior: "smooth" })
            }
        } catch (err) {
            setError("Ocurrió un error inesperado")
            console.error(err)
            // Scroll to top
            const modalBody = document.querySelector(".overflow-y-auto")
            if (modalBody) modalBody.scrollTo({ top: 0, behavior: "smooth" })
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-300">
            <div className="bg-white w-full max-w-4xl max-h-[90vh] overflow-hidden rounded-2xl shadow-2xl flex flex-col animate-in zoom-in-95 duration-300">
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b">
                    <h2 className="text-xl font-bold text-gray-900">Crear Nuevo Producto</h2>
                    <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full hover:bg-gray-100 hover:text-black-500">
                        <X className="h-5 w-5" />
                    </Button>
                </div>

                {/* Form Body */}
                <div className="flex-1 overflow-y-auto p-6 space-y-8">
                    {error && (
                        <div className="bg-red-50 text-red-600 p-4 rounded-xl border border-red-100 flex items-center gap-3">
                            <X className="h-5 w-5 shrink-0" />
                            <p className="text-sm font-medium">{error}</p>
                        </div>
                    )}

                    <form id="upload-form" onSubmit={handleSubmit} className="space-y-8">
                        {/* Basic Info Section */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-700">Nombre del Producto *</label>
                                <Input
                                    required
                                    placeholder="Ej: Camiseta Algodón Premium"
                                    value={nombre}
                                    onChange={(e) => setNombre(e.target.value)}
                                    className="rounded-lg border-gray-200 focus:ring-2 focus:ring-black"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-700">Categoría *</label>
                                <Input
                                    required
                                    placeholder="Ej: Ropa, Accesorios..."
                                    value={categoria}
                                    onChange={(e) => setCategoria(e.target.value)}
                                    className="rounded-lg border-gray-200"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-700">Precio de Venta (€) *</label>
                                <Input
                                    required
                                    type="number"
                                    step="0.01"
                                    placeholder="0.00"
                                    value={precioVenta}
                                    onChange={(e) => setPrecioVenta(e.target.value)}
                                    className="rounded-lg border-gray-200"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-700">Precio Original (€)</label>
                                <Input
                                    type="number"
                                    step="0.01"
                                    placeholder="0.00"
                                    value={precioOriginal}
                                    onChange={(e) => setPrecioOriginal(e.target.value)}
                                    className="rounded-lg border-gray-200"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-700">Precio de Coste (€)</label>
                                <Input
                                    type="number"
                                    step="0.01"
                                    placeholder="0.00"
                                    value={precioCosto}
                                    onChange={(e) => setPrecioCosto(e.target.value)}
                                    className="rounded-lg border-gray-200"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-700">Stock Inicial Total</label>
                                <Input
                                    type="number"
                                    placeholder="0"
                                    value={stockTotal}
                                    onChange={(e) => setStockTotal(e.target.value)}
                                    className="rounded-lg border-gray-200"
                                />
                            </div>
                        </div>

                        {/* Toggles */}
                        <div className="flex flex-wrap gap-6 p-4 bg-gray-50 rounded-xl border border-gray-100">
                            <label className="flex items-center gap-3 cursor-pointer group">
                                <Checkbox
                                    id="nuevo"
                                    checked={isNuevo}
                                    onCheckedChange={(val) => setIsNuevo(!!val)}
                                />
                                <span className="text-sm font-medium text-gray-700 group-hover:text-black transition-colors">Marcar como Nuevo</span>
                            </label>
                            <label className="flex items-center gap-3 cursor-pointer group">
                                <Checkbox
                                    id="oferta"
                                    checked={isOferta}
                                    onCheckedChange={(val) => setIsOferta(!!val)}
                                />
                                <span className="text-sm font-medium text-gray-700 group-hover:text-black transition-colors">En Oferta</span>
                            </label>
                            <label className="flex items-center gap-3 cursor-pointer group">
                                <Checkbox
                                    id="personalizable"
                                    checked={isPersonalizable}
                                    onCheckedChange={(val) => setIsPersonalizable(!!val)}
                                />
                                <span className="text-sm font-medium text-gray-700 group-hover:text-black transition-colors">Personalizable</span>
                            </label>
                        </div>

                        {/* Images Section */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-bold text-gray-900 border-l-4 border-black pl-3 flex items-center gap-2">
                                <Upload className="h-5 w-5" /> Imágenes del Producto
                            </h3>
                            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4">
                                {previews.map((src, idx) => (
                                    <div key={idx} className="relative aspect-square rounded-xl overflow-hidden group border border-gray-200 sm:hover:scale-105 transition-transform duration-200 shadow-sm">
                                        <img src={src} className="w-full h-full object-cover" alt="Preview" />
                                        <button
                                            type="button"
                                            onClick={() => removeImage(idx)}
                                            className="absolute top-1 right-1 bg-white/90 hover:bg-white text-red-500 rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </button>
                                    </div>
                                ))}
                                <button
                                    type="button"
                                    onClick={() => fileInputRef.current?.click()}
                                    className="aspect-square rounded-xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center gap-2 text-gray-400 hover:border-black hover:text-black transition-all bg-gray-50/50"
                                >
                                    <Plus className="h-6 w-6" />
                                    <span className="text-xs font-semibold">Añadir</span>
                                </button>
                            </div>
                            <input
                                type="file"
                                multiple
                                accept="image/*"
                                className="hidden"
                                ref={fileInputRef}
                                onChange={handleImageChange}
                            />
                        </div>

                        {/* Tallas Section */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-bold text-gray-900 border-l-4 border-black pl-3">Tallas y Stock Individual</h3>
                            <div className="flex gap-4 items-end bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                                <div className="space-y-2 flex-1">
                                    <label className="text-xs font-bold text-gray-500">Talla</label>
                                    <Input
                                        placeholder="Ej: L, 42, XL..."
                                        value={newTalla}
                                        onChange={e => setNewTalla(e.target.value)}
                                        className="h-10"
                                    />
                                </div>
                                <div className="space-y-2 flex-1">
                                    <label className="text-xs font-bold text-gray-500">Stock</label>
                                    <Input
                                        type="number"
                                        placeholder="0"
                                        value={newTallaStock}
                                        onChange={e => setNewTallaStock(e.target.value)}
                                        className="h-10"
                                    />
                                </div>
                                <Button type="button" onClick={addTalla} className="h-10 bg-black text-white hover:bg-gray-800">
                                    Añadir
                                </Button>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {tallas.map((t, idx) => (
                                    <div key={idx} className="flex items-center gap-2 bg-gray-100 px-3 py-1.5 rounded-full border border-gray-200">
                                        <span className="text-sm font-bold">{t.talla}</span>
                                        <span className="text-sm text-gray-500">({t.stock})</span>
                                        <button type="button" onClick={() => removeTalla(idx)} className="text-gray-400 hover:text-red-500">
                                            <X className="h-4 w-4" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Características Section */}
                        <div className="space-y-4 pb-4">
                            <h3 className="text-lg font-bold text-gray-900 border-l-4 border-black pl-3">Características</h3>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                {availableChars.map(char => (
                                    <button
                                        key={char.id_caracteristica}
                                        type="button"
                                        onClick={() => toggleChar(char.id_caracteristica)}
                                        className={`flex items-center justify-between px-4 py-2.5 rounded-xl border text-left transition-all duration-200 group ${selectedChars.includes(char.id_caracteristica)
                                                ? "bg-black text-white border-black ring-2 ring-black ring-offset-2"
                                                : "bg-white text-gray-700 border-gray-200 hover:border-black"
                                            }`}
                                    >
                                        <span className="text-sm font-medium">{char.caracteristica}</span>
                                        {selectedChars.includes(char.id_caracteristica) && (
                                            <Check className="h-4 w-4" />
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </form>
                </div>

                {/* Footer Actions */}
                <div className="px-6 py-4 border-t bg-gray-50 flex justify-end gap-3 rounded-b-2xl">
                    <Button variant="outline" onClick={onClose} disabled={loading} className="rounded-lg hover:bg-white">
                        Cancelar
                    </Button>
                    <Button
                        form="upload-form"
                        disabled={loading}
                        className="bg-black text-white hover:bg-gray-800 min-w-[140px] rounded-lg h-11"
                    >
                        {loading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Subiendo...
                            </>
                        ) : (
                            "Guardar Producto"
                        )}
                    </Button>
                </div>
            </div>
        </div>
    )
}
