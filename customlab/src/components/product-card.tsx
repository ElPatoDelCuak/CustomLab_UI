"use client"

import Image from "next/image"
import { useState } from "react"
import { Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { ProductCardProps } from "@/types/products"

export function ProductCard({
  nombre_producto,
  precio,
  image_cover,
  image_hover,
  categoria,
  personalizable,
}: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)

  return (
    <article 
      className="group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
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
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {personalizable && (
            <span className="px-2 py-1 text-xs uppercase tracking-wider bg-foreground text-background">
              Personalizable
            </span>
          )}
        </div>

        {/* Favorite button */}
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "absolute top-3 right-3 bg-background/80 backdrop-blur-sm hover:bg-background transition-all duration-300",
            isHovered ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"
          )}
          onClick={(e) => {
            e.stopPropagation()
            setIsFavorite(!isFavorite)
          }}
        >
          <Heart 
            className={cn(
              "h-4 w-4 transition-colors",
              isFavorite ? "fill-accent text-accent" : "text-foreground"
            )} 
          />
        </Button>

        {/* Quick add button */}
        <div className={cn(
          "absolute bottom-0 left-0 right-0 p-3 transition-all duration-300",
          isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        )}>
          <Button 
            className="w-full bg-foreground text-background hover:bg-foreground/90 text-xs uppercase tracking-wider"
          >
            Agregar al carrito
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
          <span className="font-medium">
            {precio.toLocaleString()}€
          </span>
        </div>
      </div>
    </article>
  )
}
