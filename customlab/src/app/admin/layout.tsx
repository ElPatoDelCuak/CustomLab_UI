"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, Users, ShoppingBag, Tag, LogOut, Store } from "lucide-react"
import { usePlatformStore } from "@/stores/platformStore"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const router = useRouter()
  const clearAuth = usePlatformStore((state) => state.clearAuth)
  const usuario = usePlatformStore((state) => state.usuario)
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    setIsHydrated(true)
  }, [])

  useEffect(() => {
    if (!isHydrated) return

    if (!usuario) {
      router.push("/auth/login")
      return
    }

    const rol = usuario.rol?.toLowerCase() || ""
    if (rol !== "admin" && rol !== "manager") {
      router.push("/")
    }
  }, [usuario, router, isHydrated])

  const navigation = [
    { name: "Panel", href: "/admin/panel", icon: LayoutDashboard },
    { name: "Usuarios", href: "/information/coming-soon", icon: Users },
    { name: "Productos", href: "/admin/products", icon: ShoppingBag },
    { name: "Características", href: "/admin/features", icon: Tag },
    { name: "Tienda", href: "/", icon: Store },
  ]

  const handleLogout = () => {
    clearAuth()
    router.push("/auth/login")
  }

  // Prevenir mostrar información parpadeando a usuarios no autorizados
  if (!isHydrated || !usuario) return null
  const rol = usuario.rol?.toLowerCase() || ""
  if (rol !== "admin" && rol !== "manager") return null

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex-shrink-0">
        <div className="h-full flex flex-col">
          {/* Logo */}
          <div className="flex h-20 items-center justify-between px-20 border-b border-gray-200">
            <Link href="/" className="flex items-center gap-2">
              <img
                src="/img/logo_black_white_horizontal.png"
                alt="Logo"
                className="h-16 object-contain"
              />
            </Link>
          </div>

          {/* Nav links */}
          <nav className="flex-1 overflow-y-auto py-4">
            <ul className="space-y-1 px-3">
              {navigation.map((item) => {
                const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`)
                return (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className={`
                        flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors
                        ${isActive
                          ? "bg-black text-white"
                          : "text-gray-700 hover:bg-gray-100"}
                      `}
                    >
                      <item.icon className={`h-5 w-5 ${isActive ? "text-white" : "text-gray-400"}`} />
                      {item.name}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>

          {/* User info & Logout */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-bold">
                {usuario?.nombre?.charAt(0)}{usuario?.apellidos?.charAt(0)}
              </div>
              <div className="overflow-hidden">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {usuario?.nombre}
                </p>
                <p className="text-xs text-gray-500 truncate">
                  {usuario?.rol}
                </p>
              </div>
            </div>
            <Button
              variant="outline"
              className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
              onClick={handleLogout}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Cerrar Sesión
            </Button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Page content */}
        <div className="flex-1 overflow-auto">
          {children}
        </div>
      </main>
    </div>
  )
}
