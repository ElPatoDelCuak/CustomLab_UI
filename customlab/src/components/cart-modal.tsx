"use client"
import { useState } from "react"
import Image from "next/image"
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetFooter,
} from "@/components/ui/sheet"
import { CartModalProps } from "@/types/cartTypes"
import { ConfirmModal } from "@/components/ui/confirm-modal"

export function CartModal({
    isOpen,
    onClose,
    items,
    //CARRITO - Funciones importadas desde header
    onUpdateQuantity,
    onRemoveItem,
    onClearCart
}: CartModalProps) {
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false)
    const total = items.filter(i => i.stock > 0).reduce((acc, item) => acc + item.precio_total, 0)
    const totalOriginal = items.filter(i => i.stock > 0).reduce((acc, item) => acc + (item.precio_total_original || item.precio_total), 0)
    const totalItems = items.reduce((acc, item) => acc + item.cantidad, 0)
    const hasDiscount = totalOriginal > total;

    const handleClearCart = async () => {
        onClearCart()
        setIsConfirmModalOpen(false)
    }

    return (
        <>
            <Sheet open={isOpen} onOpenChange={onClose}>
                <SheetContent side="right" className="w-full sm:max-w-lg flex flex-col p-0">
                    <SheetHeader className="px-6 py-4 border-b border-border">
                        <div className="flex flex-col gap-2">
                            <SheetTitle className="text-left">
                                Carrito <span className="text-muted-foreground font-normal">({totalItems} artículos)</span>
                            </SheetTitle>
                            {items.length > 0 && (
                                <button
                                    onClick={() => setIsConfirmModalOpen(true)}
                                    className="text-xs text-muted-foreground hover:text-destructive transition-colors flex items-center gap-1.5 w-fit"
                                >
                                    <Trash2 className="h-3.5 w-3.5" />
                                    Vaciar carrito
                                </button>
                            )}
                        </div>
                    </SheetHeader>

                    {items.length === 0 ? (
                        <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
                            <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-4">
                                <svg className="w-10 h-10 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                </svg>
                            </div>
                            <p className="text-muted-foreground mb-6">Tu carrito está vacío</p>
                            <Button onClick={onClose} variant="outline">
                                Explorar tienda
                            </Button>
                        </div>
                    ) : (
                        <>
                            <div className="flex-1 overflow-y-auto px-6 py-4">
                                <div className="space-y-6">
                                    {/*CARRITO - recorremos los items*/}
                                    {items.map((item) => {
                                        const isOutOfStock = item.stock === 0;
                                        const isInsufficientStock = item.cantidad > item.stock && item.stock > 0;
                                        return (
                                            <div key={`${item.id_producto}-${item.id_talla}`} className="flex gap-4 transition-all">
                                                <div className={`w-20 h-24 relative bg-muted rounded overflow-hidden shrink-0 ${isOutOfStock ? "opacity-40 grayscale" : ""}`}>
                                                    {item.image ? (
                                                        <Image
                                                            src={item.image}
                                                            alt={item.nombre}
                                                            fill
                                                            className="object-cover"
                                                        />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center bg-secondary/20">
                                                            <ShoppingBag className="h-8 w-8 text-muted-foreground" />
                                                        </div>
                                                    )}
                                                </div>
                                                {/*CARRITO - SI EL PRODUCTO ESTA AGOTADO O SI HAY INSUFICIENTE STOCK, SE MUESTRA UN MENSAJE*/}
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex justify-between items-start gap-2">
                                                        <h3 className={`font-medium text-sm leading-tight line-clamp-2 ${isOutOfStock ? "text-muted-foreground opacity-60" : ""}`}>
                                                            {item.nombre}
                                                        </h3>
                                                        <div className="flex flex-col items-end gap-1.5 shrink-0">
                                                            <button
                                                                onClick={() => onRemoveItem(item.id_producto, item.id_talla)}
                                                                className="p-1.5 text-muted-foreground hover:text-destructive transition-colors"
                                                                aria-label="Eliminar producto"
                                                            >
                                                                <Trash2 className="h-4 w-4" />
                                                            </button>
                                                            {item.oferta && !isOutOfStock && (
                                                                <span className="px-2 py-0.5 text-[9px] uppercase tracking-wider bg-accent text-accent-foreground font-semibold">
                                                                    Oferta
                                                                </span>
                                                            )}
                                                        </div>
                                                    </div>

                                                    <p className={`text-xs text-muted-foreground mt-1 ${isOutOfStock ? "opacity-50" : ""}`}>
                                                        Talla - {item.talla}
                                                    </p>
                                                    {/*CARRITO - MENSAJE SI EL PRODUCTO ESTA AGOTADO*/}
                                                    {isOutOfStock && (
                                                        <p className="text-[10px] text-destructive font-bold uppercase tracking-tight mt-1 animate-pulse">
                                                            ¡Agotado! Ya no disponible
                                                        </p>
                                                    )}

                                                    {/*CARRITO - MENSAJE SI EL PRODUCTO ES INSUFICIENTE*/}
                                                    {isInsufficientStock && (
                                                        <div className="mt-1 space-y-1">
                                                            <p className="text-[10px] text-amber-600 font-bold uppercase tracking-tight">
                                                                Stock insuficiente (Máx: {item.stock})
                                                            </p>
                                                            <button
                                                                onClick={() => onUpdateQuantity(item.id_producto, item.id_talla, item.stock)}
                                                                className="text-[14px] underline text-amber-700 hover:text-amber-800 cursor-pointer"
                                                            >
                                                                Ajustar a {item.stock} unidades
                                                            </button>
                                                        </div>
                                                    )}
                                                    {/*CARRITO - BOTON PARA AUMENTAR O DISMINUIR LA CANTIDAD*/}
                                                    <div className="flex items-center justify-between mt-3">
                                                        {/*CARRITO - DEPENDIENDO DEL STOCK, SE DESHABILITARA, CAMBIARA DE COLOR Y MOSTRARA MENSAJE*/}
                                                        <div className={`flex items-center border border-border rounded ${isOutOfStock ? "pointer-events-none opacity-50" : ""} ${isInsufficientStock ? "border-amber-500 bg-amber-50" : ""}`}>
                                                            <button
                                                                onClick={() => onUpdateQuantity(item.id_producto, item.id_talla, Math.max(1, item.cantidad - 1))}
                                                                disabled={item.cantidad <= 1 || isOutOfStock}
                                                                className="w-8 h-8 flex items-center justify-center hover:bg-muted transition-colors disabled:opacity-40"
                                                                aria-label="Reducir cantidad"
                                                            >
                                                                <Minus className="h-3 w-3" />
                                                            </button>
                                                            <span className="w-8 text-center text-sm">
                                                                {item.cantidad}
                                                            </span>
                                                            <button
                                                                onClick={() => onUpdateQuantity(item.id_producto, item.id_talla, item.cantidad + 1)}
                                                                disabled={item.cantidad >= item.stock || isOutOfStock}
                                                                className="w-8 h-8 flex items-center justify-center hover:bg-muted transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                                                                aria-label="Aumentar cantidad"
                                                                title={item.cantidad >= item.stock ? "Stock máximo alcanzado" : ""}
                                                            >
                                                                <Plus className={`h-3 w-3 ${item.cantidad >= item.stock ? "text-muted-foreground" : ""}`} />
                                                            </button>
                                                        </div>

                                                        <div className="text-right flex flex-col justify-end">
                                                            {item.oferta && item.precio_total_original && (
                                                                <p className="text-[11px] text-muted-foreground line-through decoration-muted-foreground/50 leading-none mb-0.5">
                                                                    {item.precio_total_original.toFixed(2)} &euro;
                                                                </p>
                                                            )}
                                                            <p className={`font-semibold ${item.oferta ? "text-accent" : ""}`}>
                                                                {item.precio_total.toFixed(2)} &euro;
                                                            </p>
                                                            {item.cantidad > 1 && (
                                                                <div className="mt-0.5">
                                                                    {item.oferta && item.precio_original && (
                                                                        <span className="text-[9px] text-muted-foreground/60 line-through mr-1">
                                                                            {item.precio_original.toFixed(2)} &euro;
                                                                        </span>
                                                                    )}
                                                                    <span className="text-[10px] text-muted-foreground font-medium">
                                                                        {item.precio_unitario.toFixed(2)} &euro;/ud
                                                                    </span>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                            {/*CARRITO - PIE DEL CARRITO*/}
                            <SheetFooter className="border-t border-border px-6 py-5 block bg-muted/5">
                                {hasDiscount && (
                                    <div className="flex justify-between text-xs text-muted-foreground mb-1.5 px-0.5">
                                        <span>Subtotal original</span>
                                        <span className="line-through">{totalOriginal.toFixed(2)} &euro;</span>
                                    </div>
                                )}
                                <div className="flex justify-between font-bold text-lg mb-1 px-0.5">
                                    <span>Total</span>
                                    <span className={hasDiscount ? "text-accent" : ""}>{total.toFixed(2)} &euro;</span>
                                </div>
                                {hasDiscount && (
                                    <div className="bg-accent/10 text-accent text-[11px] font-bold py-1.5 px-3 rounded-md flex justify-between items-center mb-4 border border-accent/20">
                                        <span>Ahorras en esta compra</span>
                                        <span className="text-xs">-{ (totalOriginal - total).toFixed(2) } &euro;</span>
                                    </div>
                                )}

                                <Button
                                    className="w-full mt-4"
                                    size="lg"
                                    disabled={items.some(item => item.stock === 0 || item.cantidad > item.stock)}
                                >
                                    {/*CARRITO - BOTON FINALIZAR COMPRA DINAMICO SEGUN STOCK*/}
                                    {items.some(item => item.stock === 0)
                                        ? "Elimina los productos agotados"
                                        : items.some(item => item.cantidad > item.stock)
                                            ? "Ajusta las cantidades"
                                            : "Finalizar compra"}
                                </Button>

                                <button
                                    onClick={onClose}
                                    className="w-full mt-3 text-sm text-muted-foreground hover:text-foreground transition-colors py-2"
                                >
                                    Seguir comprando
                                </button>
                            </SheetFooter>
                        </>
                    )}
                </SheetContent>
            </Sheet>

            <ConfirmModal
                isOpen={isConfirmModalOpen}
                onClose={() => setIsConfirmModalOpen(false)}
                onConfirm={handleClearCart}
                title="¿Vaciar el carrito?"
                description="Se eliminarán todos los productos que has añadido. Esta acción no se puede deshacer."
                confirmText="Vaciar carrito"
                cancelText="Cancelar"
                variant="danger"
            />
        </>
    )
}
