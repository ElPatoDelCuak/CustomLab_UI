"use client"

import Image from "next/image"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { ProductCardProps } from "@/types/products"
import { usePlatformStore } from "@/stores/platformStore"
import { useRouter } from "next/navigation"

export interface ProductCardExtendedProps extends ProductCardProps {
  onClick?: () => void
}

export function ProductCard(props: ProductCardExtendedProps) {
  const {
    nombre_producto,
    precio,
    precio_original,
    image_cover,
    image_hover,
    categoria,
    personalizable,
    nuevo,
    oferta,
    onClick,
  } = props
  const [isHovered, setIsHovered] = useState(false)
  const { usuario } = usePlatformStore()
  const router = useRouter()

  return (
    <article
      className="group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => {
        if (!usuario) {
          router.push("/auth/login")
          return
        }
        onClick?.()
      }}
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-muted rounded-sm">
        <Image
          src={image_cover}
          alt={nombre_producto}
          fill
          className={cn(
            "object-cover transition-all duration-500",
            isHovered && image_hover ? "opacity-0" : "opacity-100"
          )}
        />
        {image_hover && (
          <Image
            src={image_hover}
            alt={`${nombre_producto} - vista alternativa`}
            fill
            className={cn(
              "object-cover transition-all duration-500",
              isHovered ? "opacity-100 scale-105" : "opacity-0 scale-100"
            )}
          />
        )}

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col items-start gap-2">
          {oferta && (
            <span className="px-2 py-1 text-xs uppercase tracking-wider bg-accent text-accent-foreground">
              Oferta
            </span>
          )}
          {nuevo && (
            <span className="px-2 py-1 text-xs uppercase tracking-wider bg-foreground text-background">
              Nuevo
            </span>
          )}
          {personalizable && (
            <span className="px-2 py-1 text-xs uppercase tracking-wider bg-foreground text-background">
              Personalizable
            </span>
          )}
        </div>

        {/* Quick add button */}
        <div className={cn(
          "absolute bottom-0 left-0 right-0 p-3 transition-all duration-300",
          isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        )}>
          <Button
            onClick={(e) => {
              e.stopPropagation()
              if (!usuario) {
                router.push("/auth/login")
                return
              }
              onClick?.()
            }}
            className="w-full bg-foreground text-background hover:bg-foreground/90 text-xs uppercase tracking-wider"
          >
            Ver más
          </Button>
        </div>
      </div>

      <div className="mt-4 space-y-1">
        <p className="text-xs text-muted-foreground uppercase tracking-wider">
          {categoria}
        </p>
        <h3 className="font-medium text-foreground group-hover:text-accent transition-colors">
          {nombre_producto}
        </h3>
        <div className="flex items-center gap-2">
          <span className={cn("font-medium", oferta && "text-accent")}>
            {precio.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}€
          </span>
          {precio_original && (
            <span className="text-sm text-muted-foreground line-through">
              {precio_original.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}€
            </span>
          )}
        </div>
      </div>
    </article>
  )
}
