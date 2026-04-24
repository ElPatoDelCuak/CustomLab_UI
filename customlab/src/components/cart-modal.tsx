"use client"

import Image from "next/image"
import { Minus, Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetFooter,
} from "@/components/ui/sheet"
import { ShoppingBag } from "lucide-react"
import { CartModalProps } from "@/types/cartTypes"

export function CartModal({
    isOpen,
    onClose,
    items,
    //CARRITO - Funciones importadas desde header
    onUpdateQuantity,
    onRemoveItem
}: CartModalProps) {
    const total = items.filter(i => i.stock > 0).reduce((acc, item) => acc + item.precio_total, 0)
    const totalItems = items.reduce((acc, item) => acc + item.cantidad, 0)

    return (
        <Sheet open={isOpen} onOpenChange={onClose}>
            <SheetContent side="right" className="w-full sm:max-w-lg flex flex-col p-0">
                <SheetHeader className="px-6 py-4 border-b border-border">
                    <SheetTitle className="text-left">
                        Carrito <span className="text-muted-foreground font-normal">({totalItems} articulos)</span>
                    </SheetTitle>
                </SheetHeader>

                {items.length === 0 ? (
                    <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
                        <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-4">
                            <svg className="w-10 h-10 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                            </svg>
                        </div>
                        <p className="text-muted-foreground mb-6">Tu carrito esta vacio</p>
                        <Button onClick={onClose} variant="outline">
                            Explorar tienda
                        </Button>
                    </div>
                ) : (
                    <>
                        <div className="flex-1 overflow-y-auto px-6 py-4">
                            <div className="space-y-6">
                                {/*CARRITO - recoremos los items*/}
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
                                                    <button
                                                        onClick={() => onRemoveItem(item.id_producto, item.id_talla)}
                                                        className="p-1.5 text-muted-foreground hover:text-destructive transition-colors shrink-0"
                                                        aria-label="Eliminar producto"
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </button>
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
                                                            title={item.cantidad >= item.stock ? "Stock maximo alcanzado" : ""}
                                                        >
                                                            <Plus className={`h-3 w-3 ${item.cantidad >= item.stock ? "text-muted-foreground" : ""}`} />
                                                        </button>
                                                    </div>

                                                    <div className="text-right">
                                                        <p className="font-medium">{item.precio_total.toFixed(2)} &euro;</p>
                                                        {item.cantidad > 1 && (
                                                            <p className="text-xs text-muted-foreground">{item.precio_unitario.toFixed(2)} &euro;/ud</p>
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
                        <SheetFooter className="border-t border-border px-6 py-4 block">
                            <div className="flex justify-between font-semibold text-base">
                                <span>Total</span>
                                <span>{total.toFixed(2)} &euro;</span>
                            </div>

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
    )
}
