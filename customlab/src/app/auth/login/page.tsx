"use client"

import { useState } from "react"
import Link from "next/link"
import { Eye, EyeOff } from "lucide-react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import backgroundImage from "@/../public/img/spring-collection.jpg"
import { loginService } from "@/services/loginService"


export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError("")
    setLoading(true)

    const result = await loginService(email, password)

    if (result.success) {
      router.push("/")
    } else {
      setError(result.message)
    }

    setLoading(false)
  }

  return (
    <div className="min-h-screen flex">
      {/* Imagen lateral - visible solo en desktop */}
      <div className="hidden lg:flex lg:w-1/2 relative">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${backgroundImage.src})`,
          }}
        />
        <div className="absolute inset-0 bg-foreground/30" />
        <div className="relative z-10 flex flex-col justify-end p-12 text-card">
          <h2 className="font-serif text-4xl mb-4">Bienvenido de nuevo</h2>
          <p className="text-card/80 text-lg max-w-md">
            Accede a tu cuenta para descubrir las últimas tendencias y gestionar tus pedidos.
          </p>
        </div>
      </div>

      {/* Formulario */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-background">
        <div className="w-full max-w-md">
          {/* Logo */}
          <Link href="/" className="block text-center mb-12">
            <img 
              src="/img/logo_black_white_horizontal.png" 
              alt="CUSTOMLAB logo" 
              style={{ display: 'inline-block', maxWidth: '320px', width: '100%', height: 'auto' }}
            />
          </Link>

          {/* Header */}
          <div className="text-center mb-10">
            <h2 className="font-serif text-2xl text-foreground mb-2">Iniciar Sesión</h2>
            <p className="text-muted-foreground">
              Ingresa tus credenciales para acceder a tu cuenta
            </p>
          </div>

          {/* Formulario */}
          <form className="space-y-6" onSubmit={handleLogin}>
            {/* Email */}
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-foreground">
                Correo electrónico
              </label>
              <Input
                id="email"
                type="email"
                placeholder="tu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12 bg-card border-border focus:border-accent focus:ring-accent"
              />
            </div>

            {/* Contraseña */}
            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium text-foreground">
                Contraseña
              </label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-12 bg-card border-border focus:border-accent focus:ring-accent pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Recordarme y Olvidé contraseña */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Checkbox id="remember" className="border-border data-[state=checked]:bg-accent data-[state=checked]:border-accent" />
                <label htmlFor="remember" className="text-sm text-muted-foreground cursor-pointer">
                  Recordarme
                </label>
              </div>
              <Link 
                href="/forgot-password" 
                className="text-sm text-accent hover:text-accent/80 transition-colors"
              >
                ¿Olvidaste tu contraseña?
              </Link>
            </div>

            {/* Error — añadir justo antes del botón */}
            {error && (
              <p className="text-sm text-accent text-center">{error}</p>
            )}

            {/* Botón de login */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full h-12 bg-foreground text-background hover:bg-foreground/90 font-medium tracking-wide"
            >
              {loading ? "Iniciando sesión..." : "Iniciar Sesión"}
            </Button>
          </form>

          {/* Link a registro */}
          <p className="text-center mt-8 text-muted-foreground">
            ¿No tienes una cuenta?{" "}
            <Link href="/auth/register" className="text-accent hover:text-accent/80 font-medium transition-colors">
              Regístrate
            </Link>
          </p>

          {/* Volver al inicio */}
          <div className="text-center mt-6">
            <Link 
              href="/" 
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              ← Volver a la tienda
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
