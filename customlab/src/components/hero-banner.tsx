import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import banner_image from "./../../public/img/spring-collection.jpg"

export function HeroBanner() {
  return (
    <section className="relative h-[50vh] md:h-[60vh] lg:h-[70vh] overflow-hidden">
      <Image
        src={banner_image}
        alt="Colección Primavera"
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-foreground/20" />
      
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center text-background space-y-6 px-4">
          <p className="text-sm uppercase tracking-[0.3em] animate-fade-in">
            Nueva Temporada
          </p>
          <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl font-semibold text-balance">
            Colección Primavera
          </h2>
          <p className="text-lg md:text-xl max-w-xl mx-auto text-background/90">
            Descubre piezas únicas que definen la elegancia contemporánea
          </p>
          <Link href="/platform/catalog" passHref>
            <Button 
              size="lg" 
              className="bg-background text-foreground hover:bg-background/90 group"
            >
              <span>Explorar colección</span>
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
