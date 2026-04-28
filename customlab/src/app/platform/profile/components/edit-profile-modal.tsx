"use client"

import { useState } from "react"
import { X, User, Mail, Calendar, Shield, Loader2, CheckCircle2, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { useUserServices } from "@/services/userServices"
import { Usuario } from "@/types/authenticationResponse"

interface EditProfileModalProps {
    usuario: Usuario
    onClose: () => void
    onSuccess: (updatedUser: Usuario) => void
}

export default function EditProfileModal({ usuario, onClose, onSuccess }: EditProfileModalProps) {
    const { updateUser } = useUserServices()
    
    // Form State
    const [nombre, setNombre] = useState(usuario.nombre)
    const [apellidos, setApellidos] = useState(usuario.apellidos)
    const [email, setEmail] = useState(usuario.email)
    const [fechaNacimiento, setFechaNacimiento] = useState(usuario.fecha_nacimiento || "")
    const [dobleFactor, setDobleFactor] = useState(!!usuario.doble_factor)
    
    // UI state
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError(null)

        try {
            const payload = {
                nombre,
                apellidos,
                email,
                fecha_nacimiento: fechaNacimiento || null,
                doble_factor: dobleFactor
            }

            const result = await updateUser(usuario.id_usuario, payload)

            if (result.success) {
                setSuccess(true)
                // The backend usually returns the updated user in result.data or similar
                // If not, we construct it
                const updatedUser: Usuario = {
                    ...usuario,
                    ...payload
                }
                
                setTimeout(() => {
                    onSuccess(updatedUser)
                    onClose()
                }, 1500)
            } else {
                setError(result.message || "Error al actualizar el perfil")
            }
        } catch (err) {
            setError("Ocurrió un error inesperado")
            console.error(err)
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
                    <h3 className="text-2xl font-serif mb-2">Perfil Actualizado</h3>
                    <p className="text-muted-foreground">Tus datos han sido guardados correctamente.</p>
                </div>
            </div>
        )
    }

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-300">
            <div className="bg-white w-full max-w-2xl max-h-[90vh] overflow-hidden rounded-2xl shadow-2xl flex flex-col animate-in zoom-in-95 duration-300">
                {/* Header */}
                <div className="flex items-center justify-between px-8 py-5 border-b bg-gray-50/50">
                    <div className="flex items-center gap-4">
                        <div className="p-2.5 bg-foreground text-background rounded-xl shadow-sm">
                            <User className="h-5 w-5" />
                        </div>
                        <div>
                            <h2 className="text-xl font-serif text-gray-900">Editar Información Personal</h2>
                            <p className="text-xs text-muted-foreground uppercase tracking-widest font-bold mt-0.5">Actualiza tus datos de contacto</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="rounded-full p-2 hover:bg-gray-200 transition-colors">
                        <X className="h-5 w-5" />
                    </button>
                </div>

                {/* Form Body */}
                <div className="flex-1 overflow-y-auto p-8 space-y-8">
                    {error && (
                        <div className="bg-red-50 text-red-600 p-4 rounded-xl border border-red-100 flex items-center gap-3 animate-in slide-in-from-top-2">
                            <AlertCircle className="h-5 w-5 shrink-0" />
                            <p className="text-sm font-medium">{error}</p>
                        </div>
                    )}

                    <form id="edit-profile-form" onSubmit={handleSubmit} className="space-y-8">
                        {/* Name Section */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground ml-1">Nombre</label>
                                <div className="relative">
                                    <Input
                                        required
                                        value={nombre}
                                        onChange={(e) => setNombre(e.target.value)}
                                        className="h-12 rounded-xl border-gray-200 focus:ring-2 focus:ring-foreground pl-11"
                                    />
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground ml-1">Apellidos</label>
                                <Input
                                    required
                                    value={apellidos}
                                    onChange={(e) => setApellidos(e.target.value)}
                                    className="h-12 rounded-xl border-gray-200 focus:ring-2 focus:ring-foreground"
                                />
                            </div>
                        </div>

                        {/* Email Section */}
                        <div className="space-y-2">
                            <label className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground ml-1">Correo Electrónico</label>
                            <div className="relative">
                                <Input
                                    required
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="h-12 rounded-xl border-gray-200 focus:ring-2 focus:ring-foreground pl-11"
                                />
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            </div>
                        </div>

                        {/* Birthday Section */}
                        <div className="space-y-2">
                            <label className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground ml-1">Fecha de Nacimiento</label>
                            <div className="relative">
                                <Input
                                    type="date"
                                    value={fechaNacimiento}
                                    onChange={(e) => setFechaNacimiento(e.target.value)}
                                    className="h-12 rounded-xl border-gray-200 focus:ring-2 focus:ring-foreground pl-11"
                                />
                                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            </div>
                        </div>

                        {/* Security Section */}
                        <div className="space-y-4">
                            <h3 className="text-sm font-bold text-gray-900 border-l-4 border-foreground pl-3 flex items-center gap-2 uppercase tracking-wider">
                                <Shield className="h-4 w-4" /> Seguridad
                            </h3>
                            <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100">
                                <label className="flex items-start gap-4 cursor-pointer group">
                                    <div className="mt-1">
                                        <Checkbox
                                            id="doble_factor"
                                            checked={dobleFactor}
                                            onCheckedChange={(val) => setDobleFactor(!!val)}
                                            className="border-gray-300 data-[state=checked]:bg-foreground data-[state=checked]:border-foreground"
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <span className="text-sm font-bold text-gray-800 group-hover:text-black transition-colors">Doble Factor de Autenticación (2FA)</span>
                                        <p className="text-xs text-muted-foreground leading-relaxed">
                                            Añade una capa extra de seguridad a tu cuenta. Se te solicitará un código de verificación cada vez que inicies sesión.
                                        </p>
                                    </div>
                                </label>
                            </div>
                        </div>
                    </form>
                </div>

                {/* Footer Actions */}
                <div className="px-8 py-5 border-t bg-gray-50 flex justify-end gap-3 rounded-b-2xl">
                    <Button 
                        variant="outline" 
                        onClick={onClose} 
                        disabled={loading} 
                        className="h-11 px-8 rounded-xl text-xs uppercase tracking-widest font-bold hover:bg-white transition-all"
                    >
                        Cancelar
                    </Button>
                    <Button
                        form="edit-profile-form"
                        disabled={loading}
                        className="bg-foreground text-background hover:bg-foreground/90 h-11 px-10 rounded-xl text-xs uppercase tracking-widest font-bold shadow-lg shadow-foreground/10 transition-all active:scale-95"
                    >
                        {loading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Guardando...
                            </>
                        ) : (
                            "Guardar Cambios"
                        )}
                    </Button>
                </div>
            </div>
        </div>
    )
}
