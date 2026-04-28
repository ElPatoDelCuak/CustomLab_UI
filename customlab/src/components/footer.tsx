import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Instagram, Facebook, Twitter } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-foreground text-background mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="font-serif text-2xl font-semibold">CustomLab</h3>
            <p className="text-background/70 text-sm leading-relaxed">
              Moda contemporánea que celebra la individualidad y el estilo atemporal.
            </p>
            <div className="flex gap-4">
              <Link href="#" className="hover:text-accent transition-colors">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="#" className="hover:text-accent transition-colors">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="hover:text-accent transition-colors">
                <Twitter className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Links */}
          <div className="space-y-4">
            <h4 className="text-sm uppercase tracking-wider font-medium">Tienda</h4>
            <nav className="flex flex-col gap-3">
              <Link href="/information/coming-soon" className="text-sm text-background/70 hover:text-background transition-colors">
                Novedades
              </Link>
              <Link href="/information/coming-soon" className="text-sm text-background/70 hover:text-background transition-colors">
                Mujer
              </Link>
              <Link href="/information/coming-soon" className="text-sm text-background/70 hover:text-background transition-colors">
                Hombre
              </Link>
              <Link href="/information/coming-soon" className="text-sm text-background/70 hover:text-background transition-colors">
                Accesorios
              </Link>
            </nav>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm uppercase tracking-wider font-medium">Ayuda</h4>
            <nav className="flex flex-col gap-3">
              <Link href="/information/about#contact" className="text-sm text-background/70 hover:text-background transition-colors">
                Contacto
              </Link>
              <Link href="/information/coming-soon" className="text-sm text-background/70 hover:text-background transition-colors">
                Envíos
              </Link>
              <Link href="/information/coming-soon" className="text-sm text-background/70 hover:text-background transition-colors">
                Devoluciones
              </Link>
              <Link href="/information/coming-soon" className="text-sm text-background/70 hover:text-background transition-colors">
                Guía de tallas
              </Link>
            </nav>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h4 className="text-sm uppercase tracking-wider font-medium">Newsletter</h4>
            <p className="text-sm text-background/70">
              Suscríbete para recibir las últimas novedades y ofertas exclusivas.
            </p>
            <div className="flex gap-2">
              <Input
                type="email"
                placeholder="Tu email"
                className="bg-transparent border-background/30 placeholder:text-background/50 text-background"
              />
              <Button className="bg-background text-foreground hover:bg-background/90 shrink-0">
                Enviar
              </Button>
            </div>
          </div>
        </div>

        <div className="border-t border-background/20 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-background/60">
            2026 CustomLab. Todos los derechos reservados.
          </p>
          <div className="flex gap-6">
            <Link href="/information/terms_privacy/privacy" className="text-sm text-background/60 hover:text-background transition-colors">
              Privacidad
            </Link>
            <Link href="/information/terms_privacy/terms" className="text-sm text-background/60 hover:text-background transition-colors">
              Términos
            </Link>
            <Link href="#" className="text-sm text-background/60 hover:text-background transition-colors">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
