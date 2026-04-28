"use client"

import { useState } from "react"
import { X, Eye, EyeOff, Shield, Loader2, CheckCircle2, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useUserServices } from "@/services/userServices"

interface ChangePasswordModalProps {
    userId: number
    onClose: () => void
}

export default function ChangePasswordModal({ userId, onClose }: ChangePasswordModalProps) {
    const [showOldPassword, setShowOldPassword] = useState(false)
    const [showNewPassword, setShowNewPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    
    const [oldPassword, setOldPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState(false)
    const { updatePassword } = useUserServices()

    // Password strength logic (from register page)
    const getPasswordStrength = (password: string) => {
        if (!password) return 0
        let score = 0
        if (password.length >= 8) score += 1
        if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score += 1
        if (/\d/.test(password)) score += 1
        if (/[^A-Za-z0-9]/.test(password)) score += 1
        if (score <= 1) return 1
        if (score <= 3) return 2
        return 3
    }

    const passwordStrength = getPasswordStrength(newPassword)
    const strengthWidth = `${(passwordStrength / 3) * 100}%`
    const strengthColorClass =
        passwordStrength === 1 ? "bg-red-400" :
        passwordStrength === 2 ? "bg-yellow-400" :
        passwordStrength === 3 ? "bg-green-500" : "bg-transparent"
    
    const strengthLabel =
        passwordStrength === 1 ? "Débil" :
        passwordStrength === 2 ? "Media" :
        passwordStrength === 3 ? "Fuerte" : "Mínimo 8 caracteres, mayúsculas, números y símbolos"

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError(null)

        if (newPassword !== confirmPassword) {
            setError("Las contraseñas no coinciden")
            return
        }

        if (newPassword === oldPassword) {
            setError("La nueva contraseña debe ser diferente a la actual")
            return
        }

        if (passwordStrength < 3) {
            setError("La nueva contraseña debe ser fuerte")
            return
        }

        setLoading(true)
        try {
            const result = await updatePassword(userId, oldPassword, newPassword)
            if (result.success) {
                setSuccess(true)
                setTimeout(() => onClose(), 2000)
            } else {
                setError(result.message || "Error al actualizar la contraseña")
            }
        } catch (err) {
            setError("Error inesperado. Inténtalo de nuevo.")
        } finally {
            setLoading(false)
        }
    }

    if (success) {
        return (
            <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-300">
                <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl p-10 text-center animate-in zoom-in-95 duration-300">
                    <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle2 className="h-10 w-10 text-green-500" />
                    </div>
                    <h3 className="text-2xl font-serif mb-2">Contraseña Actualizada</h3>
                    <p className="text-muted-foreground">Tu seguridad es nuestra prioridad. Tu nueva contraseña ya está activa.</p>
                </div>
            </div>
        )
    }

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-300">
            <div className="bg-white w-full max-w-md overflow-hidden rounded-2xl shadow-2xl flex flex-col animate-in zoom-in-95 duration-300">
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-5 border-b bg-gray-50/50">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-foreground text-background rounded-lg">
                            <Shield className="h-5 w-5" />
                        </div>
                        <h2 className="text-xl font-serif text-gray-900">Cambiar Contraseña</h2>
                    </div>
                    <button onClick={onClose} className="rounded-full p-2 hover:bg-gray-200 transition-colors">
                        <X className="h-5 w-5" />
                    </button>
                </div>

                {/* Body */}
                <div className="p-8">
                    {error && (
                        <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-xl flex items-start gap-3 animate-in slide-in-from-top-2">
                            <AlertCircle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
                            <p className="text-sm text-red-700 font-medium">{error}</p>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Old Password */}
                        <div className="space-y-2">
                            <label className="text-xs uppercase tracking-widest font-bold text-muted-foreground">Contraseña Actual</label>
                            <div className="relative">
                                <Input
                                    type={showOldPassword ? "text" : "password"}
                                    required
                                    value={oldPassword}
                                    onChange={(e) => setOldPassword(e.target.value)}
                                    className="h-12 rounded-xl border-gray-200 pr-12 focus:ring-2 focus:ring-foreground"
                                    placeholder="••••••••"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowOldPassword(!showOldPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                >
                                    {showOldPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                </button>
                            </div>
                        </div>

                        {/* New Password */}
                        <div className="space-y-2">
                            <label className="text-xs uppercase tracking-widest font-bold text-muted-foreground">Nueva Contraseña</label>
                            <div className="relative">
                                <Input
                                    type={showNewPassword ? "text" : "password"}
                                    required
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    className="h-12 rounded-xl border-gray-200 pr-12 focus:ring-2 focus:ring-foreground"
                                    placeholder="Min. 8 caracteres"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowNewPassword(!showNewPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                >
                                    {showNewPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                </button>
                            </div>
                            
                            {/* Strength Indicator */}
                            {newPassword && (
                                <div className="mt-3 space-y-2 animate-in fade-in duration-500">
                                    <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                                        <div 
                                            className={`h-full transition-all duration-500 ${strengthColorClass}`}
                                            style={{ width: strengthWidth }}
                                        />
                                    </div>
                                    <p className={`text-[10px] font-bold uppercase tracking-wider ${
                                        passwordStrength === 1 ? "text-red-500" :
                                        passwordStrength === 2 ? "text-yellow-600" :
                                        "text-green-600"
                                    }`}>
                                        Fuerza: {strengthLabel}
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Confirm Password */}
                        <div className="space-y-2">
                            <label className="text-xs uppercase tracking-widest font-bold text-muted-foreground">Confirmar Nueva Contraseña</label>
                            <div className="relative">
                                <Input
                                    type={showConfirmPassword ? "text" : "password"}
                                    required
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="h-12 rounded-xl border-gray-200 pr-12 focus:ring-2 focus:ring-foreground"
                                    placeholder="Repite tu nueva contraseña"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                >
                                    {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                </button>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="pt-4 flex gap-3">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={onClose}
                                disabled={loading}
                                className="flex-1 h-12 rounded-xl text-xs uppercase tracking-widest"
                            >
                                Cancelar
                            </Button>
                            <Button
                                type="submit"
                                disabled={loading || !oldPassword || !newPassword || !confirmPassword}
                                className="flex-1 h-12 bg-foreground text-background hover:bg-foreground/90 rounded-xl text-xs uppercase tracking-widest"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Actualizando...
                                    </>
                                ) : (
                                    "Actualizar"
                                )}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
