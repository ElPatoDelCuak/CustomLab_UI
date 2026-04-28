"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { usePlatformStore } from "@/stores/platformStore"
import { Button } from "@/components/ui/button"
import { 
    User, 
    ShoppingBag, 
    Settings, 
    LogOut, 
    ChevronRight, 
    Mail, 
    Phone, 
    MapPin, 
    ShieldCheck,
    CreditCard,
    Calendar,
    Shield
} from "lucide-react"
import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation"
import { getMyUser } from "@/services/userService"


export default function ProfilePage() {
    const { usuario, clearAuth, setUsuario } = usePlatformStore()
    const [activeTab, setActiveTab] = useState("perfil")
    const router = useRouter()

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await getMyUser()
                if (response.success && response.data?.[0]) {
                    setUsuario(response.data[0])
                }
            } catch (error) {
                console.error("Error fetching user data:", error)
            }
        }

        fetchUserData()
    }, [setUsuario])

    const handleLogout = () => {
        clearAuth()
        router.push("/auth/login")
    }


    const menuItems = [
        { id: "perfil", label: "Mi Perfil", icon: User },
        { id: "pedidos", label: "Mis Pedidos", icon: ShoppingBag },
        { id: "direcciones", label: "Direcciones", icon: MapPin },
        { id: "pagos", label: "Métodos de Pago", icon: CreditCard },
        { id: "seguridad", label: "Seguridad", icon: ShieldCheck },
    ]

    return (
        <div className="min-h-screen bg-background">
            <Header />
            
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
                {/* Breadcrumbs */}
                <nav className="flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground mb-8">
                    <a href="/" className="hover:text-foreground transition-colors">Inicio</a>
                    <ChevronRight className="h-3 w-3" />
                    <span className="text-foreground font-medium">Mi Cuenta</span>
                </nav>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
                    {/* Sidebar */}
                    <aside className="lg:col-span-1 space-y-8">
                        <div className="flex flex-col items-center lg:items-start text-center lg:text-left mb-4">
                            <div className="w-20 h-20 rounded-full bg-foreground text-background flex items-center justify-center text-2xl font-serif mb-4 shadow-xl">
                                {usuario?.nombre?.[0]}{usuario?.apellidos?.[0]}
                            </div>
                            <h2 className="text-xl font-serif text-foreground">{usuario?.nombre} {usuario?.apellidos}</h2>
                            <p className="text-sm text-muted-foreground">{usuario?.email}</p>
                        </div>

                        <nav className="space-y-1">
                            {menuItems.map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => setActiveTab(item.id)}
                                    className={cn(
                                        "w-full flex items-center gap-3 px-4 py-3 text-sm font-medium transition-all rounded-lg group",
                                        activeTab === item.id 
                                            ? "bg-foreground text-background shadow-md" 
                                            : "text-muted-foreground hover:bg-white hover:text-foreground"
                                    )}
                                >
                                    <item.icon className={cn(
                                        "h-4 w-4 transition-colors",
                                        activeTab === item.id ? "text-background" : "text-muted-foreground group-hover:text-foreground"
                                    )} />
                                    {item.label}
                                </button>
                            ))}
                            <button 
                                onClick={handleLogout}

                                className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-destructive hover:bg-destructive/5 transition-all rounded-lg mt-4"
                            >
                                <LogOut className="h-4 w-4" />
                                Cerrar Sesión
                            </button>
                        </nav>
                    </aside>

                    {/* Content Area */}
                    <section className="lg:col-span-3">
                        <div className="bg-white rounded-2xl border border-border/50 shadow-sm overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
                            
                            {/* Tab: Perfil */}
                            {activeTab === "perfil" && (
                                <div className="p-8 lg:p-10">
                                    <div className="flex justify-between items-start mb-10">
                                        <div>
                                            <h3 className="text-2xl font-serif mb-1">Información Personal</h3>
                                            <p className="text-sm text-muted-foreground">Gestiona tus datos personales y cómo te contactamos.</p>
                                        </div>
                                        <Button className="rounded-full px-8 h-12 bg-foreground text-background hover:bg-foreground/90 text-xs uppercase tracking-widest transition-all">
                                            Editar Datos
                                        </Button>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="space-y-1.5">
                                            <label className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Nombre</label>
                                            <p className="text-sm font-medium border-b border-border pb-2">{usuario?.nombre || "—"}</p>
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Apellidos</label>
                                            <p className="text-sm font-medium border-b border-border pb-2">{usuario?.apellidos || "—"}</p>
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Email</label>
                                            <div className="flex items-center gap-2 border-b border-border pb-2">
                                                <Mail className="h-3 w-3 text-muted-foreground" />
                                                <p className="text-sm font-medium">{usuario?.email || "—"}</p>
                                            </div>
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Fecha de Nacimiento</label>
                                            <div className="flex items-center gap-2 border-b border-border pb-2">
                                                <Calendar className="h-3 w-3 text-muted-foreground" />
                                                <p className="text-sm font-medium">
                                                    {usuario?.fecha_nacimiento 
                                                        ? new Date(usuario.fecha_nacimiento).toLocaleDateString('es-ES', {
                                                            day: '2-digit',
                                                            month: 'long',
                                                            year: 'numeric'
                                                        })
                                                        : "No especificada"}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-12 p-6 bg-secondary/20 rounded-xl border border-secondary/30">
                                        <div className="flex gap-4">
                                            <div className="p-3 bg-white rounded-full shadow-sm shrink-0">
                                                <ShieldCheck className="h-6 w-6 text-foreground" />
                                            </div>
                                            <div>
                                                <h4 className="font-medium mb-1">Verificación de Cuenta</h4>
                                                <p className="text-sm text-muted-foreground mb-3">Tu cuenta está protegida con los estándares de seguridad de CustomLab.</p>
                                                
                                                <div className="flex flex-wrap gap-3">
                                                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-50 text-green-700 text-[10px] font-bold uppercase tracking-wider">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                                                        Cuenta Protegida
                                                    </span>

                                                    {usuario?.doble_factor ? (
                                                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-[10px] font-bold uppercase tracking-wider">
                                                            <Shield className="h-3 w-3" />
                                                            Doble Factor Activo
                                                        </span>
                                                    ) : (
                                                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-700 text-[10px] font-bold uppercase tracking-wider">
                                                            <Shield className="h-3 w-3 opacity-50" />
                                                            Doble Factor Inactivo
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Tab: Pedidos (Placeholder) */}
                            {activeTab === "pedidos" && (
                                <div className="p-8 lg:p-10">
                                    <h3 className="text-2xl font-serif mb-1">Mis Pedidos</h3>
                                    <p className="text-sm text-muted-foreground mb-10">Historial de todas tus compras en CustomLab.</p>
                                    
                                    <div className="flex flex-col items-center justify-center py-20 text-center border-2 border-dashed border-border rounded-2xl">
                                        <ShoppingBag className="h-12 w-12 text-muted-foreground mb-4 opacity-20" />
                                        <h4 className="text-lg font-medium mb-2">Aún no tienes pedidos</h4>
                                        <p className="text-sm text-muted-foreground max-w-xs mb-8">Cuando realices tu primera compra, aparecerá aquí con todo su seguimiento.</p>
                                        <Button asChild className="bg-foreground text-background hover:bg-foreground/90 px-8 h-12 rounded-full text-xs uppercase tracking-widest transition-all">
                                            <a href="/platform/catalog">Explorar Catálogo</a>
                                        </Button>
                                    </div>
                                </div>
                            )}

                            {/* Tab: Seguridad (Placeholder) */}
                            {activeTab === "seguridad" && (
                                <div className="p-8 lg:p-10">
                                    <h3 className="text-2xl font-serif mb-6">Seguridad</h3>
                                    
                                    <div className="space-y-6">
                                        <div className="flex items-center justify-between p-6 bg-[#fafafa] rounded-xl border border-border/50">
                                            <div>
                                                <h4 className="font-medium">Contraseña</h4>
                                                <p className="text-sm text-muted-foreground">Cambia tu contraseña para mantener tu cuenta segura.</p>
                                            </div>
                                            <Button className="rounded-full px-8 h-11 bg-foreground text-background hover:bg-foreground/90 text-xs uppercase tracking-widest transition-all">
                                                Actualizar
                                            </Button>
                                        </div>

                                        <div className="flex items-center justify-between p-6 bg-[#fafafa] rounded-xl border border-border/50">
                                            <div>
                                                <h4 className="font-medium text-destructive">Eliminar Cuenta</h4>
                                                <p className="text-sm text-muted-foreground">Esta acción borrará permanentemente todos tus datos.</p>
                                            </div>
                                            <Button 
                                                className="bg-transparent shadow-none hover:bg-destructive/10 text-destructive hover:text-destructive px-6 h-10 rounded-full text-xs uppercase tracking-widest font-bold transition-colors"
                                            >
                                                Eliminar
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Mensaje general para tabs no implementados aún */}
                            {["direcciones", "pagos"].includes(activeTab) && (
                                <div className="p-8 lg:p-10 text-center py-32">
                                    <Settings className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-20 animate-spin-slow" />
                                    <h4 className="text-xl font-serif mb-2">Sección en Construcción</h4>
                                    <p className="text-sm text-muted-foreground max-w-sm mx-auto">Estamos trabajando para ofrecerte la mejor experiencia en la gestión de tus datos.</p>
                                </div>
                            )}
                        </div>
                    </section>
                </div>
            </main>

            <Footer />

            <style jsx>{`
                @keyframes spin-slow {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                .animate-spin-slow {
                    animation: spin-slow 8s linear infinite;
                }
            `}</style>
        </div>
    )
}