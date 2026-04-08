"use client"

import { useState } from "react"
import Link from "next/link"
import { Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"

export default function RegistroPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [formData, setFormData] = useState({
    nombre: "",
    apellidos: "",
    email: "",
    password: "",
    confirmPassword: "",
    fechaNacimiento: "",
    dobleFactor: false,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }
  

  return (
    <div className="min-h-screen flex">
      {/* Imagen lateral - visible solo en desktop */}
      <div className="hidden lg:flex lg:w-1/2 relative">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1200&q=80')`,
          }}
        />
        <div className="absolute inset-0 bg-foreground/30" />
        <div className="relative z-10 flex flex-col justify-end p-12 text-card">
          <h2 className="font-serif text-4xl mb-4">Únete a nosotros</h2>
          <p className="text-card/80 text-lg max-w-md">
            Crea tu cuenta y accede a ofertas exclusivas, seguimiento de pedidos y mucho más.
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
          <div className="text-center mb-8">
            <h2 className="font-serif text-2xl text-foreground mb-2">Crear Cuenta</h2>
            <p className="text-muted-foreground">
              Completa tus datos para registrarte
            </p>
          </div>

          {/* Formulario */}
          <form className="space-y-5">
            {/* Nombre y Apellido */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="nombre" className="block text-sm font-medium text-foreground">
                  Nombre <span className="text-destructive">*</span>
                </label>
                <Input
                  id="nombre"
                  name="nombre"
                  type="text"
                  placeholder="Juan"
                  value={formData.nombre}
                  onChange={handleChange}
                  className="h-12 bg-card border-border focus:border-accent focus:ring-accent"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="apellidos" className="block text-sm font-medium text-foreground">
                  Apellidos <span className="text-destructive">*</span>
                </label>
                <Input
                  id="apellidos"
                  name="apellidos"
                  type="text"
                  placeholder="Pérez"
                  value={formData.apellidos}
                  onChange={handleChange}
                  className="h-12 bg-card border-border focus:border-accent focus:ring-accent"
                />
              </div>
            </div>
            {/* Fecha de nacimiento (opcional) */}
            <div className="space-y-2">
                <label htmlFor="fechaNacimiento" className="block text-sm font-medium text-foreground">
                Fecha de nacimiento <span className="text-muted-foreground text-xs">(opcional)</span>
                </label>
                <Input
                id="fechaNacimiento"
                name="fechaNacimiento"
                type="date"
                value={formData.fechaNacimiento}
                onChange={handleChange}
                className="h-12 bg-card border-border focus:border-accent focus:ring-accent"
                />
            </div>
            {/* Email */}
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-foreground">
                Correo electrónico <span className="text-destructive">*</span>
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="tu@email.com"
                value={formData.email}
                onChange={handleChange}
                className="h-12 bg-card border-border focus:border-accent focus:ring-accent"
              />
            </div>

            {/* Contraseña */}
            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium text-foreground">
                Contraseña <span className="text-destructive">*</span>
              </label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Contraseña"
                  value={formData.password}
                  onChange={handleChange}
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

            {/* Confirmar Contraseña */}
            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-foreground">
                Confirmar contraseña <span className="text-destructive">*</span>
              </label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirmar contraseña"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="h-12 bg-card border-border focus:border-accent focus:ring-accent pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showConfirmPassword ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Doble factor de autenticación */}
            <div className="flex items-start gap-3">
              <Checkbox 
                id="dobleFactor" 
                className="mt-0.5 border-border data-[state=checked]:bg-accent data-[state=checked]:border-accent" 
              />
              <label htmlFor="dobleFactor" className="text-sm text-muted-foreground cursor-pointer leading-relaxed">
                Activar doble Factor de autenticación
              </label>
            </div>

            {/* Términos y condiciones */}
            <div className="flex items-start gap-3">
              <Checkbox 
                id="terms" 
                className="mt-0.5 border-border data-[state=checked]:bg-accent data-[state=checked]:border-accent" 
              />
              <label htmlFor="terms" className="text-sm text-muted-foreground cursor-pointer leading-relaxed">
                Acepto los{" "}
                <Link href="/auth/terms_privacy/terms" className="text-accent hover:text-accent/80 transition-colors">
                  términos y condiciones
                </Link>{" "}
                y la{" "}
                <Link href="/auth/terms_privacy/privacy" className="text-accent hover:text-accent/80 transition-colors">
                  política de privacidad
                </Link>
              </label>
            </div>

            {/* Botón de registro */}
            <Button 
              type="submit" 
              className="w-full h-12 bg-foreground text-background hover:bg-foreground/90 font-medium tracking-wide"
            >
              Crear Cuenta
            </Button>
          </form>

          {/* Link a login */}
          <p className="text-center mt-8 text-muted-foreground">
            ¿Ya tienes una cuenta?{" "}
            <Link href="/auth/login" className="text-accent hover:text-accent/80 font-medium transition-colors">
              Inicia sesión
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