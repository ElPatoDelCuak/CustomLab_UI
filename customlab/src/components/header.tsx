"use client"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { Menu, Search, ShoppingBag, User, X, LogOut, LayoutDashboard } from "lucide-react"
import { Button } from "@/components/ui/button"
import { usePlatformStore } from "@/stores/platformStore"
import { useRouter } from "next/navigation"
import { useCart } from "@/context/CartContext"
import { CartModal } from "@/components/cart-modal"
import logo from "./../../public/img/logo_black_white.png"


export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const { items, totalItems, updateQuantity, removeItem } = useCart()
  const { usuario, clearAuth } = usePlatformStore()
  const router = useRouter()

  const handleUpdateQuantity = (id_producto: number, id_talla: number, quantity: number) => {
    updateQuantity(id_producto, id_talla, quantity)
  }

  const handleRemoveItem = (id_producto: number, id_talla: number) => {
    removeItem(id_producto, id_talla)
  }

  function handleLogout() {
    clearAuth()
    router.push("/")
  }


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
            <Link href="/platform/catalog" className="text-sm uppercase tracking-wider hover:text-accent transition-colors">Catalogo</Link>
            <Link href="#" className="text-sm uppercase tracking-wider hover:text-accent transition-colors">Mujer</Link>
            <Link href="#" className="text-sm uppercase tracking-wider hover:text-accent transition-colors">Hombre</Link>
            <Link href="/auth/about" className="text-sm uppercase tracking-wider hover:text-accent transition-colors">Sobre Nosotros</Link>
          </nav>

          <Link href="/" className="absolute left-1/2 -translate-x-1/2">
            <Image src={logo} alt="CustomLab Logo" className="h-45 w-auto" />
          </Link>

          {/* Zona derecha — condicional según sesión */}
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="hidden sm:flex">
              <Search className="h-5 w-5" />
            </Button>

            {/* Cart button */}
            {usuario ? (
              // Usuario logueado
              <>
                <Button variant="ghost" size="icon" asChild>
                  <Link href="/platform/perfil">
                    <User className="h-5 w-5" />
                  </Link>
                </Button>
                {/* Cart button */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative"
                  onClick={() => setIsCartOpen(true)}
                >
                  <ShoppingBag className="h-5 w-5" />
                  {totalItems > 0 && (
                    <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-accent text-accent-foreground text-xs flex items-center justify-center font-medium">
                      {totalItems}
                    </span>
                  )}
                </Button>
                <Button
                  variant="ghost"
                  onClick={handleLogout}
                  className="text-sm uppercase tracking-wider gap-2"
                >
                  <LogOut className="h-4 w-4" />
                  <span className="hidden sm:inline">Salir</span>
                </Button>
                {usuario.rol === "admin" || usuario.rol === "manager" ? (
                  <Button
                    variant="ghost"
                    className="text-sm uppercase tracking-wider gap-2"
                    asChild
                  >
                    <Link href="/admin/panel">
                      <LayoutDashboard className="h-4 w-4" />
                      <span className="hidden sm:inline">Admin</span>
                    </Link>
                  </Button>
                ) : null}
              </>
            ) : (
              <>
                <Button variant="ghost" asChild className="hidden lg:flex text-sm uppercase tracking-wider">
                  <Link href="/auth/login">Iniciar sesion</Link>
                </Button>
                <Button asChild className="hidden lg:flex text-sm uppercase tracking-wider">
                  <Link href="/auth/register">Registro</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="lg:hidden border-t border-border bg-background">
          <nav className="flex flex-col py-4 px-4">
            <Link href="/platform/catalog" className="py-3 text-sm uppercase tracking-wider hover:text-accent transition-colors">Catalogo</Link>
            <Link href="#" className="py-3 text-sm uppercase tracking-wider hover:text-accent transition-colors">Mujer</Link>
            <Link href="#" className="py-3 text-sm uppercase tracking-wider hover:text-accent transition-colors">Hombre</Link>
            <Link href="#" className="py-3 text-sm uppercase tracking-wider hover:text-accent transition-colors">Accesorios</Link>
            {/* Opciones móvil según sesión */}
            {usuario ? (
              <button onClick={handleLogout} className="py-3 text-sm uppercase tracking-wider text-left hover:text-accent transition-colors">
                Cerrar sesión
              </button>
            ) : (
              <>
                <Link href="/auth/login" className="py-3 text-sm uppercase tracking-wider hover:text-accent transition-colors">Entrar</Link>
                <Link href="/auth/register" className="py-3 text-sm uppercase tracking-wider hover:text-accent transition-colors">Registro</Link>
              </>
            )}
          </nav>
        </div>
      )}
      {/* Cart Modal */}
      {usuario && (
        <CartModal
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          items={items}
          onUpdateQuantity={handleUpdateQuantity}
          onRemoveItem={handleRemoveItem}
        />
      )}
    </header>
  )
}