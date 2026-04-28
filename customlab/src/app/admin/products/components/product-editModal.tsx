"use client"

import { useState, useEffect, useRef } from "react"
import { X, Plus, Trash2, Upload, Loader2, Check, Info, Settings, Tag, Image as ImageIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { useProductsServices } from "@/services/productsServices"
import { useFeaturesServices } from "@/services/featuresService"
import { CaracteristicsResponse } from "@/types/catalogFilters"
import { ProductCardProps } from "@/types/products"
import { cn } from "@/lib/utils"

interface EditModalProps {
    product: ProductCardProps
    onClose: () => void
    onSuccess: () => void
}

export default function ProductEditModal({ product, onClose, onSuccess }: EditModalProps) {
    const { updateProductFormData } = useProductsServices()
    const { getCaracteristics } = useFeaturesServices()

    // Tab State
    const [activeTab, setActiveTab] = useState<"general" | "tallas" | "features" | "images">("general")

    // Form State - General
    const [nombre, setNombre] = useState(product.nombre_producto)
    const [precioVenta, setPrecioVenta] = useState(product.precio.toString())
    const [precioOriginal, setPrecioOriginal] = useState(product.precio_original?.toString() || "")
    const [precioCosto, setPrecioCosto] = useState(product.precio_costo?.toString() || "")
    const [stockTotal, setStockTotal] = useState(product.stock.toString())
    const [categoria, setCategoria] = useState(product.categoria)
    const [isNuevo, setIsNuevo] = useState(product.nuevo)
    const [isOferta, setIsOferta] = useState(product.oferta)
    const [isPersonalizable, setIsPersonalizable] = useState(product.personalizable)

    // State - Images
    const [existingImages, setExistingImages] = useState(product.images)
    const [imagesToDelete, setImagesToDelete] = useState<number[]>([])
    const [newImages, setNewImages] = useState<File[]>([])
    const [newImagePreviews, setNewImagePreviews] = useState<string[]>([])
    const fileInputRef = useRef<HTMLInputElement>(null)

    // State - Tallas
    const [currentTallas, setCurrentTallas] = useState(product.tallas)
    const [tallasToDelete, setTallasToDelete] = useState<number[]>([])
    const [newTalla, setNewTalla] = useState("")
    const [newTallaStock, setNewTallaStock] = useState("")

    // State - Characteristics
    const [availableChars, setAvailableChars] = useState<CaracteristicsResponse[]>([])
    const [selectedChars, setSelectedChars] = useState<number[]>(
        product.caracteristicas?.map(c => c.id_caracteristica) || []
    )

    // UI state
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchChars = async () => {
            const result = await getCaracteristics()
            if (result.success && result.data) {
                setAvailableChars(result.data)
            }
        }
        fetchChars()
        
        // If we need to fetch full product details (like description/cost)
        // const fetchDetails = async () => { ... }
    }, [])

    // --- Image Handlers ---
    const handleNewImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const files = Array.from(e.target.files)
            setNewImages(prev => [...prev, ...files])
            const newPreviews = files.map(file => URL.createObjectURL(file))
            setNewImagePreviews(prev => [...prev, ...newPreviews])
        }
    }

    const removeExistingImage = (id: number) => {
        setExistingImages(prev => prev.filter(img => img.id_imagen !== id))
        setImagesToDelete(prev => [...prev, id])
    }

    const removeNewImage = (index: number) => {
        setNewImages(prev => prev.filter((_, i) => i !== index))
        setNewImagePreviews(prev => {
            URL.revokeObjectURL(prev[index])
            return prev.filter((_, i) => i !== index)
        })
    }

    // --- Talla Handlers ---
    const addTalla = () => {
        if (newTalla.trim() && newTallaStock.trim()) {
            // We'll treat ones without id_talla as "to_upload"
            const nTalla = {
                id_talla: -1, // Temporary flag for new ones
                talla: newTalla,
                stock: parseInt(newTallaStock),
                id_producto: product.id_producto
            }
            setCurrentTallas([...currentTallas, nTalla])
            setNewTalla("")
            setNewTallaStock("")
        }
    }

    const removeTalla = (index: number) => {
        const talla = currentTallas[index]
        if (talla.id_talla !== -1) {
            setTallasToDelete(prev => [...prev, talla.id_talla])
        }
        setCurrentTallas(currentTallas.filter((_, i) => i !== index))
    }

    const updateTallaStock = (index: number, newStock: string) => {
        const updated = [...currentTallas]
        updated[index].stock = parseInt(newStock) || 0
        setCurrentTallas(updated)
    }

    // --- Characteristic Handlers ---
    const toggleChar = (id: number) => {
        setSelectedChars(prev =>
            prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
        )
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError(null)

        try {
            // --- VALIDATIONS ---
            
            // 1. Validate Tallas: Must have at least one (either existing or new)
            if (currentTallas.length === 0) {
                setError("El producto debe tener al menos una talla configurada.")
                setActiveTab("tallas")
                setLoading(false)
                return
            }

            // 2. Validate Features: Must have at least one
            if (selectedChars.length === 0) {
                setError("El producto debe tener al menos una característica seleccionada.")
                setActiveTab("features")
                setLoading(false)
                return
            }

            // 3. Validate Images: Must have at least one (either existing or new)
            const totalImagesRemaining = existingImages.length + newImages.length
            if (totalImagesRemaining === 0) {
                setError("El producto debe tener al menos una imagen.")
                setActiveTab("images")
                setLoading(false)
                return
            }

            // 4. Validate Price: Original must be > Venta
            const pVenta = parseFloat(precioVenta)
            const pOriginal = precioOriginal ? parseFloat(precioOriginal) : null

            if (pOriginal !== null) {
                if (pOriginal <= 0) {
                    setError("El precio original no puede ser 0.")
                    setActiveTab("general")
                    setLoading(false)
                    return
                }
                if (pOriginal <= pVenta) {
                    setError("El precio original debe ser mayor que el precio de venta.")
                    setActiveTab("general")
                    setLoading(false)
                    return
                }
            }

            // --- DATA PREPARATION ---
            const tallas_to_delete = tallasToDelete
            const tallas_to_upload = currentTallas
                .filter(t => t.id_talla === -1)
                .map(t => ({ talla: t.talla, stock: t.stock }))
            const tallas_to_modify = currentTallas
                .filter(t => t.id_talla !== -1)
                // We could optimize by only sending if changed, but sending all existing ones is safer
                .map(t => ({ id_talla: t.id_talla, talla: t.talla, stock: t.stock }))

            // 2. Prepare Characteristics
            const originalCharIds = product.caracteristicas?.map(c => c.id_caracteristica) || []
            const caracteristicas_to_delete = originalCharIds.filter(id => !selectedChars.includes(id))
            const caracteristicas_to_upload = selectedChars.filter(id => !originalCharIds.includes(id))

            // 3. Prepare JSON Data
            const jsonData = {
                producto: {
                    nombre_producto: nombre,
                    precio_venta: pVenta,
                    precio_original: pOriginal,
                    precio_costo: precioCosto ? parseFloat(precioCosto) : 0,
                    stock: parseInt(stockTotal),
                    categoria: categoria,
                    nuevo: isNuevo,
                    oferta: isOferta,
                    personalizable: isPersonalizable
                },
                tallas: {
                    tallas_to_delete,
                    tallas_to_upload,
                    tallas_to_modify
                },
                caracteristicas: {
                    caracteristicas_to_delete,
                    caracteristicas_to_upload
                },
                imagenes: {
                    imagenes_to_delete: imagesToDelete
                }
            }

            // 4. Construct FormData
            const formData = new FormData()
            formData.append("data", JSON.stringify(jsonData))
            
            newImages.forEach((image) => {
                formData.append("new_images", image)
            })

            const response = await updateProductFormData(product.id_producto, formData)

            if (response.success) {
                onSuccess()
                onClose()
            } else {
                setError(response.message || "Error al actualizar el producto")
            }
        } catch (err) {
            setError("Ocurrió un error inesperado")
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    const tabs = [
        { id: "general", label: "General", icon: Info },
        { id: "tallas", label: "Tallas & Stock", icon: Settings },
        { id: "features", label: "Características", icon: Tag },
        { id: "images", label: "Imágenes", icon: ImageIcon },
    ]

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-300">
            <div className="bg-white w-full max-w-5xl max-h-[90vh] overflow-hidden rounded-2xl shadow-2xl flex flex-col animate-in zoom-in-95 duration-300">
                {/* Header */}
                <div className="flex items-center justify-between px-8 py-5 border-b bg-gray-50/50">
                    <div className="flex items-center gap-4">
                        <div className="p-2.5 bg-foreground text-background rounded-xl shadow-sm">
                            <Settings className="h-5 w-5" />
                        </div>
                        <div>
                            <h2 className="text-xl font-serif text-gray-900">Editar Producto</h2>
                            <p className="text-xs text-muted-foreground uppercase tracking-widest font-bold mt-0.5">ID: #{product.id_producto}</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="rounded-full p-2 hover:bg-gray-200 transition-colors">
                        <X className="h-5 w-5" />
                    </button>
                </div>

                {/* Tabs Navigation */}
                <div className="flex border-b px-8 bg-white">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id as any)}
                            className={cn(
                                "flex items-center gap-2 px-6 py-4 text-xs uppercase tracking-widest font-bold transition-all border-b-2 -mb-[2px]",
                                activeTab === tab.id 
                                    ? "border-foreground text-foreground" 
                                    : "border-transparent text-muted-foreground hover:text-foreground hover:border-gray-300"
                            )}
                        >
                            <tab.icon className="h-4 w-4" />
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Form Body */}
                <div className="flex-1 overflow-y-auto p-8 space-y-8">
                    {error && (
                        <div className="bg-red-50 text-red-600 p-4 rounded-xl border border-red-100 flex items-center gap-3">
                            <X className="h-5 w-5 shrink-0" />
                            <p className="text-sm font-medium">{error}</p>
                        </div>
                    )}

                    <form id="edit-product-form" onSubmit={handleSubmit} className="space-y-10">
                        
                        {/* TAB: GENERAL */}
                        {activeTab === "general" && (
                            <div className="space-y-8 animate-in fade-in slide-in-from-left-4 duration-300">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-2">
                                        <label className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground ml-1">Nombre del Producto</label>
                                        <Input
                                            required
                                            value={nombre}
                                            onChange={(e) => setNombre(e.target.value)}
                                            className="h-12 rounded-xl border-gray-200 focus:ring-2 focus:ring-foreground"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground ml-1">Categoría</label>
                                        <Input
                                            required
                                            value={categoria}
                                            onChange={(e) => setCategoria(e.target.value)}
                                            className="h-12 rounded-xl border-gray-200 focus:ring-2 focus:ring-foreground"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground ml-1">Precio de Venta (€)</label>
                                        <Input
                                            required
                                            type="number"
                                            step="0.01"
                                            value={precioVenta}
                                            onChange={(e) => setPrecioVenta(e.target.value)}
                                            className="h-12 rounded-xl border-gray-200 focus:ring-2 focus:ring-foreground"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground ml-1">Precio Original (€)</label>
                                        <Input
                                            type="number"
                                            step="0.01"
                                            value={precioOriginal}
                                            onChange={(e) => setPrecioOriginal(e.target.value)}
                                            className="h-12 rounded-xl border-gray-200 focus:ring-2 focus:ring-foreground"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground ml-1">Precio de Coste (€)</label>
                                        <Input
                                            type="number"
                                            step="0.01"
                                            value={precioCosto}
                                            onChange={(e) => setPrecioCosto(e.target.value)}
                                            className="h-12 rounded-xl border-gray-200 focus:ring-2 focus:ring-foreground"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground ml-1">Stock Base</label>
                                        <Input
                                            type="number"
                                            value={stockTotal}
                                            onChange={(e) => setStockTotal(e.target.value)}
                                            className="h-12 rounded-xl border-gray-200 focus:ring-2 focus:ring-foreground"
                                        />
                                    </div>
                                </div>

                                <div className="flex flex-wrap gap-6 p-6 bg-gray-50 rounded-2xl border border-gray-100">
                                    <label className="flex items-center gap-3 cursor-pointer group">
                                        <Checkbox
                                            checked={isNuevo}
                                            onCheckedChange={(val) => setIsNuevo(!!val)}
                                            className="border-gray-300 data-[state=checked]:bg-foreground data-[state=checked]:border-foreground"
                                        />
                                        <span className="text-sm font-bold text-gray-700 group-hover:text-black transition-colors">Marcar como Nuevo</span>
                                    </label>
                                    <label className="flex items-center gap-3 cursor-pointer group">
                                        <Checkbox
                                            checked={isOferta}
                                            onCheckedChange={(val) => setIsOferta(!!val)}
                                            className="border-gray-300 data-[state=checked]:bg-foreground data-[state=checked]:border-foreground"
                                        />
                                        <span className="text-sm font-bold text-gray-700 group-hover:text-black transition-colors">En Oferta</span>
                                    </label>
                                    <label className="flex items-center gap-3 cursor-pointer group">
                                        <Checkbox
                                            checked={isPersonalizable}
                                            onCheckedChange={(val) => setIsPersonalizable(!!val)}
                                            className="border-gray-300 data-[state=checked]:bg-foreground data-[state=checked]:border-foreground"
                                        />
                                        <span className="text-sm font-bold text-gray-700 group-hover:text-black transition-colors">Personalizable</span>
                                    </label>
                                </div>
                            </div>
                        )}

                        {/* TAB: TALLAS */}
                        {activeTab === "tallas" && (
                            <div className="space-y-8 animate-in fade-in slide-in-from-left-4 duration-300">
                                <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100 space-y-4">
                                    <h4 className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground">Añadir Nueva Talla</h4>
                                    <div className="flex gap-4 items-end">
                                        <div className="flex-1 space-y-2">
                                            <Input
                                                placeholder="Talla (S, M, 42...)"
                                                value={newTalla}
                                                onChange={e => setNewTalla(e.target.value)}
                                                className="h-11 rounded-xl"
                                            />
                                        </div>
                                        <div className="flex-1 space-y-2">
                                            <Input
                                                type="number"
                                                placeholder="Stock"
                                                value={newTallaStock}
                                                onChange={e => setNewTallaStock(e.target.value)}
                                                className="h-11 rounded-xl"
                                            />
                                        </div>
                                        <Button type="button" onClick={addTalla} className="h-11 px-6 bg-foreground text-background hover:bg-foreground/90 rounded-xl">
                                            <Plus className="h-4 w-4 mr-2" /> Añadir
                                        </Button>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <h4 className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground">Listado de Tallas</h4>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        {currentTallas.map((t, idx) => (
                                            <div key={idx} className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-xl shadow-sm group hover:border-foreground transition-colors">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center font-bold text-sm">
                                                        {t.talla}
                                                    </div>
                                                    <div className="space-y-1">
                                                        <span className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground block leading-none">Stock Actual</span>
                                                        <input 
                                                            type="number"
                                                            value={t.stock}
                                                            onChange={(e) => updateTallaStock(idx, e.target.value)}
                                                            className="w-20 font-bold focus:outline-none focus:ring-1 focus:ring-foreground rounded px-1"
                                                        />
                                                    </div>
                                                </div>
                                                <button 
                                                    type="button" 
                                                    onClick={() => removeTalla(idx)} 
                                                    className="p-2 text-muted-foreground hover:text-destructive hover:bg-destructive/5 rounded-lg transition-all"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                    {currentTallas.length === 0 && (
                                        <div className="text-center py-10 text-muted-foreground italic border-2 border-dashed border-gray-100 rounded-2xl">
                                            No hay tallas configuradas para este producto.
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* TAB: FEATURES */}
                        {activeTab === "features" && (
                            <div className="space-y-6 animate-in fade-in slide-in-from-left-4 duration-300">
                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                                    {availableChars.map(char => (
                                        <button
                                            key={char.id_caracteristica}
                                            type="button"
                                            onClick={() => toggleChar(char.id_caracteristica)}
                                            className={cn(
                                                "flex items-center justify-between px-5 py-4 rounded-xl border text-left transition-all duration-200",
                                                selectedChars.includes(char.id_caracteristica)
                                                    ? "bg-foreground text-background border-foreground shadow-lg shadow-foreground/10"
                                                    : "bg-white text-gray-700 border-gray-200 hover:border-foreground"
                                            )}
                                        >
                                            <span className="text-xs font-bold uppercase tracking-wider">{char.caracteristica}</span>
                                            {selectedChars.includes(char.id_caracteristica) && (
                                                <Check className="h-4 w-4" />
                                            )}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* TAB: IMAGES */}
                        {activeTab === "images" && (
                            <div className="space-y-10 animate-in fade-in slide-in-from-left-4 duration-300">
                                {/* Existing Images */}
                                <div className="space-y-4">
                                    <h4 className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground">Imágenes Actuales</h4>
                                    <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4">
                                        {existingImages.map((img) => (
                                            <div key={img.id_imagen} className="relative aspect-square rounded-2xl overflow-hidden group border border-gray-100 shadow-sm">
                                                <img src={img.url} className="w-full h-full object-cover" alt="Product" />
                                                <button
                                                    type="button"
                                                    onClick={() => removeExistingImage(img.id_imagen)}
                                                    className="absolute top-2 right-2 bg-white/95 hover:bg-white text-destructive rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* New Images */}
                                <div className="space-y-4">
                                    <h4 className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground">Subir Nuevas Imágenes</h4>
                                    <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4">
                                        {newImagePreviews.map((src, idx) => (
                                            <div key={idx} className="relative aspect-square rounded-2xl overflow-hidden group border-2 border-dashed border-foreground/30 animate-in zoom-in-50 duration-300">
                                                <img src={src} className="w-full h-full object-cover" alt="Preview" />
                                                <button
                                                    type="button"
                                                    onClick={() => removeNewImage(idx)}
                                                    className="absolute top-2 right-2 bg-white/95 hover:bg-white text-destructive rounded-full p-1.5 shadow-lg"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </button>
                                            </div>
                                        ))}
                                        <button
                                            type="button"
                                            onClick={() => fileInputRef.current?.click()}
                                            className="aspect-square rounded-2xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center gap-3 text-muted-foreground hover:border-foreground hover:text-foreground transition-all bg-gray-50/50"
                                        >
                                            <Plus className="h-6 w-6" />
                                            <span className="text-[10px] font-bold uppercase tracking-widest">Añadir</span>
                                        </button>
                                    </div>
                                    <input
                                        type="file"
                                        multiple
                                        accept="image/*"
                                        className="hidden"
                                        ref={fileInputRef}
                                        onChange={handleNewImageChange}
                                    />
                                </div>
                            </div>
                        )}
                    </form>
                </div>

                {/* Footer Actions */}
                <div className="px-8 py-5 border-t bg-gray-50 flex justify-end gap-3 rounded-b-2xl">
                    <Button 
                        variant="outline" 
                        onClick={onClose} 
                        disabled={loading} 
                        className="h-11 px-8 rounded-xl text-xs uppercase tracking-widest font-bold hover:bg-white transition-all"
                    >
                        Cancelar
                    </Button>
                    <Button
                        form="edit-product-form"
                        disabled={loading}
                        className="bg-foreground text-background hover:bg-foreground/90 h-11 px-10 rounded-xl text-xs uppercase tracking-widest font-bold shadow-lg shadow-foreground/10 transition-all active:scale-95"
                    >
                        {loading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Guardando...
                            </>
                        ) : (
                            "Guardar Cambios"
                        )}
                    </Button>
                </div>
            </div>
        </div>
    )
}
