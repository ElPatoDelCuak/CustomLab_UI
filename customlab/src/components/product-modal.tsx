"use client"

import Image from "next/image"
import { useState, useEffect } from "react"
import { useCart } from "@/context/CartContext"
import { Minus, Plus, X, Check, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogTitle,
} from "@/components/ui/dialog"

import { ProductCardProps } from "@/types/products"

interface ProductModalProps {
    isOpen: boolean
    onClose: () => void
    product: ProductCardProps | null
    onAddToCart: (product: ProductCardProps, size: string, quantity: number) => void
}

export function ProductModal({ isOpen, onClose, product, onAddToCart }: ProductModalProps) {
    const [selectedSize, setSelectedSize] = useState<string | null>(null)
    const [quantity, setQuantity] = useState(1)
    const [currentImageIndex, setCurrentImageIndex] = useState(0)
    const { items: cartItems } = useCart()

    // Reset selection when modal opens
    useEffect(() => {
        if (isOpen) {
            setSelectedSize(null)
            setQuantity(1)
            setCurrentImageIndex(0)
        }
    }, [isOpen])

    if (!product) return null

    // Map Backend fields to modal logic
    const images = product.images.map(img => img.url)
    // If no images in the array, fallback to image_cover
    if (images.length === 0 && product.image_cover) {
        images.push(product.image_cover)
    }
    const totalStock = product.tallas.reduce((acc, s) => acc + s.stock, 0)
    const selectedTallaObj = product.tallas.find(s => s.talla === selectedSize)
    const selectedSizeStock = selectedTallaObj?.stock || 0
    const selectedSizeId = selectedTallaObj?.id_talla

    // Check quantity in cart for this specific product and size
    const cartItem = cartItems.find(item =>
        item.id_producto === product.id_producto && item.id_talla === selectedSizeId
    )
    const quantityInCart = cartItem?.cantidad || 0
    const availableStockForSelection = selectedSizeStock - quantityInCart
    const discount = product.precio_original
        ? Math.round((1 - product.precio / product.precio_original) * 100)
        : 0

    const features = product.caracteristicas?.map(c => c.caracteristica) || []

    const handleQuantityChange = (delta: number) => {
        const newQuantity = quantity + delta
        if (newQuantity >= 1 && newQuantity <= availableStockForSelection) {
            setQuantity(newQuantity)
        }
    }

    const handleAddToCart = () => {
        if (selectedSize && availableStockForSelection > 0) {
            onAddToCart(product, selectedSize, quantity)
            onClose()
        }
    }

    const resetSelection = () => {
        setSelectedSize(null)
        setQuantity(1)
        setCurrentImageIndex(0)
    }

    return (
        <Dialog open={isOpen} onOpenChange={(open) => { if (!open) { resetSelection(); onClose(); } }}>
            <DialogContent className="!w-[95vw] !max-w-[1400px] !h-[85vh] p-0 gap-0 overflow-hidden" showCloseButton={false}>
                <DialogTitle className="sr-only">{product.nombre_producto}</DialogTitle>

                {/* Close button */}
                <button
                    onClick={() => { resetSelection(); onClose(); }}
                    className="absolute right-4 top-4 z-10 p-2 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background transition-colors"
                >
                    <X className="h-4 w-4" />
                </button>

                <div className="flex h-full w-full">
                    {/* Left: Images */}
                    <div className="relative bg-neutral-100 flex-1 min-w-0 flex flex-col">
                        {/* Main Image Container */}
                        <div className="flex-1 relative overflow-hidden">
                            {/* Main Image */}
                            <Image
                                src={images[currentImageIndex]}
                                alt={product.nombre_producto}
                                fill
                                className="object-cover"
                                sizes="50vw"
                                priority
                            />

                            {/* Badges - Top Left over image */}
                            <div className="absolute top-4 left-4 flex flex-col items-start gap-2 z-10">
                                {product.oferta && (
                                    <span className="px-2 py-1 text-xs uppercase tracking-wider bg-accent text-accent-foreground">
                                        -{discount}%
                                    </span>
                                )}
                                {product.nuevo && (
                                    <span className="px-2 py-1 text-xs uppercase tracking-wider bg-foreground text-background">
                                        Nuevo
                                    </span>
                                )}
                                {product.personalizable && (
                                    <span className="px-2 py-1 text-xs uppercase tracking-wider bg-foreground text-background">
                                        Personalizable
                                    </span>
                                )}
                            </div>

                            {/* Navigation Arrows - Centered vertically on image */}
                            {images.length > 1 && (
                                <>
                                    <button
                                        onClick={() => setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))}
                                        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/90 backdrop-blur-sm shadow-lg flex items-center justify-center hover:bg-background transition-colors z-10"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                        </svg>
                                    </button>
                                    <button
                                        onClick={() => setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/90 backdrop-blur-sm shadow-lg flex items-center justify-center hover:bg-background transition-colors z-10"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </button>
                                </>
                            )}

                            {/* Image Counter - Bottom center over image */}
                            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-background/80 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-medium z-10">
                                {currentImageIndex + 1} / {images.length}
                            </div>
                        </div>

                        {/* Thumbnails - Horizontal bar below image */}
                        {images.length > 1 && (
                            <div className="h-24 bg-neutral-50 p-3 flex gap-3 justify-center items-center overflow-x-auto flex-shrink-0">
                                {images.map((img, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setCurrentImageIndex(index)}
                                        className={`relative h-full aspect-[9/16] rounded-md overflow-hidden transition-all flex-shrink-0 ${index === currentImageIndex
                                            ? "ring-2 ring-foreground ring-offset-2"
                                            : "opacity-60 hover:opacity-100"
                                            }`}
                                    >
                                        <Image src={img} alt="" fill className="object-cover" />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Right: Info */}
                    <div className="p-8 flex flex-col justify-between h-full overflow-y-auto flex-1 min-w-0">
                        {/* Top Section */}
                        <div>
                            {/* Header */}
                            <div className="mb-6">
                                <span className="text-xs uppercase tracking-wider text-muted-foreground">
                                    {product.categoria}
                                </span>
                                <h2 className="font-serif text-2xl font-medium mt-1">{product.nombre_producto}</h2>

                                <div className="flex items-baseline gap-3 mt-3">
                                    <span className="text-2xl font-medium">{product.precio.toFixed(2)} &euro;</span>
                                    {product.precio_original && (
                                        <span className="text-base text-muted-foreground line-through">
                                            {product.precio_original.toFixed(2)} &euro;
                                        </span>
                                    )}
                                </div>
                            </div>

                            {/* Description */}
                            <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                                Esta exclusiva pieza de la categoría {product.categoria} ha sido diseñada pensando en la calidad y el estilo contemporáneo.
                            </p>

                            {/* Features */}
                            <div className="mb-6">
                                <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Caracteristicas</span>
                                <div className="grid grid-cols-2 gap-x-4 gap-y-2 mt-3">
                                    {features.map((feature, index) => (
                                        <span key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                                            <Check className="h-4 w-4 text-foreground flex-shrink-0" />
                                            {feature}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Bottom Section - Purchase Controls */}
                        <div className="border-t border-border pt-6">
                            {/* Stock Indicator */}
                            <div className="mb-5">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Disponibilidad</span>
                                    <div className="flex items-center gap-2">
                                        <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-2 py-1 rounded-full ${totalStock > 20
                                            ? "bg-green-100 text-green-700"
                                            : totalStock > 5
                                                ? "bg-yellow-100 text-yellow-700"
                                                : totalStock > 0
                                                    ? "bg-red-100 text-red-700"
                                                    : "bg-neutral-100 text-neutral-500"
                                            }`}>
                                            <span className={`w-2 h-2 rounded-full ${totalStock > 20
                                                ? "bg-green-500"
                                                : totalStock > 5
                                                    ? "bg-yellow-500"
                                                    : totalStock > 0
                                                        ? "bg-red-500"
                                                        : "bg-neutral-400"
                                                }`} />
                                            {totalStock > 20
                                                ? "En stock"
                                                : totalStock > 5
                                                    ? "Stock limitado"
                                                    : totalStock > 0
                                                        ? `Ultimas ${totalStock} uds`
                                                        : "Agotado"}
                                        </span>
                                    </div>
                                </div>
                                {/* Stock bar */}
                                <div className="h-1.5 bg-neutral-200 rounded-full overflow-hidden">
                                    <div
                                        className={`h-full rounded-full transition-all ${totalStock > 20
                                            ? "bg-green-500"
                                            : totalStock > 5
                                                ? "bg-yellow-500"
                                                : totalStock > 0
                                                    ? "bg-red-500"
                                                    : "bg-neutral-400"
                                            }`}
                                        style={{ width: `${Math.min((totalStock / 50) * 100, 100)}%` }}
                                    />
                                </div>
                            </div>

                            {/* Sizes with individual stock */}
                            <div className="mb-5">
                                <div className="flex items-center justify-between mb-3">
                                    <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Talla</span>
                                    {selectedSize && availableStockForSelection <= 3 && availableStockForSelection > 0 && (
                                        <span className="text-xs text-red-600 flex items-center gap-1 font-medium">
                                            <AlertCircle className="h-3 w-3" />
                                            Ultimas {availableStockForSelection} unidades
                                        </span>
                                    )}
                                    {selectedSize && availableStockForSelection <= 0 && (
                                        <span className="text-xs text-red-600 flex items-center gap-1 font-medium">
                                            <AlertCircle className="h-3 w-3" />
                                            Sin stock disponible (ya en carrito)
                                        </span>
                                    )}
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {product.tallas.map((sizeStock) => {
                                        const sizeInCart = cartItems.find(item =>
                                            item.id_producto === product.id_producto && item.id_talla === sizeStock.id_talla
                                        )?.cantidad || 0
                                        const actualAvailable = sizeStock.stock - sizeInCart
                                        const isAvailable = actualAvailable > 0
                                        const isSelected = selectedSize === sizeStock.talla
                                        const isLowStock = actualAvailable > 0 && actualAvailable <= 3

                                        return (
                                            <button
                                                key={sizeStock.id_talla}
                                                onClick={() => {
                                                    if (isAvailable) {
                                                        setSelectedSize(sizeStock.talla)
                                                        setQuantity(1)
                                                    }
                                                }}
                                                disabled={!isAvailable}
                                                className={`relative flex flex-col items-center min-w-[56px] px-3 py-2 text-sm font-medium rounded-lg border transition-all ${isSelected
                                                    ? "bg-foreground text-background border-foreground"
                                                    : isAvailable
                                                        ? "bg-background border-border hover:border-foreground"
                                                        : "bg-muted text-muted-foreground border-muted cursor-not-allowed opacity-50"
                                                    }`}
                                            >
                                                <span className={!isAvailable ? "line-through" : ""}>{sizeStock.talla}</span>
                                                <span className={`text-[10px] mt-0.5 ${isSelected
                                                    ? "text-background/70"
                                                    : isAvailable
                                                        ? isLowStock
                                                            ? "text-red-500"
                                                            : "text-muted-foreground"
                                                        : "text-muted-foreground"
                                                    }`}>
                                                    {actualAvailable > 0 ? `${actualAvailable} uds` : "Sin stock"}
                                                    {sizeInCart > 0 && ` (${sizeInCart} en cesta)`}
                                                </span>
                                                {isLowStock && isAvailable && !isSelected && (
                                                    <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse" />
                                                )}
                                            </button>
                                        )
                                    })}
                                </div>
                            </div>

                            {/* Quantity & Add to Cart */}
                            <div className="flex items-center gap-4">
                                <div className="flex items-center border border-border rounded">
                                    <button
                                        onClick={() => handleQuantityChange(-1)}
                                        disabled={quantity <= 1 || !selectedSize}
                                        className="p-3 hover:bg-secondary disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                                    >
                                        <Minus className="h-4 w-4" />
                                    </button>
                                    <span className="w-12 text-center text-sm font-medium">{quantity}</span>
                                    <button
                                        onClick={() => handleQuantityChange(1)}
                                        disabled={quantity >= availableStockForSelection || !selectedSize}
                                        className="p-3 hover:bg-secondary disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                                    >
                                        <Plus className="h-4 w-4" />
                                    </button>
                                </div>

                                <Button
                                    onClick={handleAddToCart}
                                    disabled={!selectedSize}
                                    className="flex-1 h-12 text-sm uppercase tracking-wider"
                                >
                                    {selectedSize
                                        ? availableStockForSelection > 0
                                            ? `Anadir - ${(product.precio * quantity).toFixed(2)} \u20AC`
                                            : "Sin stock disponible"
                                        : "Selecciona talla"}
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
