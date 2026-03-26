"use client"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { Menu, Search, ShoppingBag, User, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import logo from "./../../public/img/logo_black_white.png"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>

          <nav className="hidden lg:flex items-center gap-8">
            <Link href="/platform/catalog" className="text-sm uppercase tracking-wider hover:text-accent transition-colors">
              Catalogo
            </Link>
            <Link href="#" className="text-sm uppercase tracking-wider hover:text-accent transition-colors">
              Mujer
            </Link>
            <Link href="#" className="text-sm uppercase tracking-wider hover:text-accent transition-colors">
              Hombre
            </Link>
            <Link href="#" className="text-sm uppercase tracking-wider hover:text-accent transition-colors">
              Accesorios
            </Link>
          </nav>

          <Link href="/" className="absolute left-1/2 -translate-x-1/2">
            <Image src={logo} alt="CustomLab Logo" className="h-45 w-auto" />
          </Link>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="hidden sm:flex">
              <Search className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingBag className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-accent text-accent-foreground text-xs flex items-center justify-center">
                3
              </span>
            </Button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="lg:hidden border-t border-border bg-background">
          <nav className="flex flex-col py-4 px-4">
            <Link href="/platform/catalog" className="py-3 text-sm uppercase tracking-wider hover:text-accent transition-colors">
              Catalogo
            </Link>
            <Link href="#" className="py-3 text-sm uppercase tracking-wider hover:text-accent transition-colors">
              Mujer
            </Link>
            <Link href="#" className="py-3 text-sm uppercase tracking-wider hover:text-accent transition-colors">
              Hombre
            </Link>
            <Link href="#" className="py-3 text-sm uppercase tracking-wider hover:text-accent transition-colors">
              Accesorios
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
