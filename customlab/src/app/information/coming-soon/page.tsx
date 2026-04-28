"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Hammer, ArrowLeft, Settings, Sparkles } from "lucide-react"
import Link from "next/link"

export default function ComingSoonPage() {
    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Header />
            
            <main className="flex-grow flex items-center justify-center p-6 relative overflow-hidden">
                {/* Decorative background elements */}
                <div className="absolute top-1/4 -left-20 w-96 h-96 bg-foreground/5 rounded-full blur-3xl opacity-50" />
                <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-foreground/5 rounded-full blur-3xl opacity-50" />
                
                <div className="max-w-2xl w-full text-center space-y-10 relative z-10">
                    {/* Icon container */}
                    <div className="flex justify-center mb-20">
                        <div className="relative">
                            <div className="w-24 h-24 bg-foreground text-background rounded-3xl rotate-12 flex items-center justify-center shadow-2xl animate-float">
                                <Hammer className="h-10 w-10 -rotate-12" />
                            </div>
                            <div className="absolute -top-4 -right-4 w-12 h-12 bg-white border border-border rounded-2xl flex items-center justify-center shadow-lg animate-float-reverse">
                                <Settings className="h-5 w-5 text-muted-foreground animate-spin-slow" />
                            </div>
                            <div className="absolute -bottom-14 left-1/2 -translate-x-1/2 flex items-center justify-center gap-3 bg-foreground/5 backdrop-blur-sm px-10 py-2 rounded-full border border-foreground/10 min-w-[200px]">
                                <Sparkles className="h-3 w-3 text-foreground" />
                                <span className="text-[10px] font-bold uppercase tracking-widest">En Progreso</span>
                            </div>
                        </div>
                    </div>

                    {/* Text content */}
                    <div className="space-y-6">
                        <h1 className="text-4xl md:text-6xl font-serif text-foreground tracking-tight animate-in slide-in-from-bottom-8 duration-700 delay-100 fill-mode-both">
                            Estamos perfeccionando <br />
                            <span className="italic">esta sección</span>
                        </h1>
                        <p className="text-muted-foreground text-sm md:text-base max-w-lg mx-auto leading-relaxed animate-in slide-in-from-bottom-8 duration-700 delay-300 fill-mode-both">
                            Estamos trabajando arduamente para ofrecerte la mejor experiencia posible. 
                            Muy pronto esta funcionalidad estará disponible con toda la calidad que define a CustomLab.
                        </p>
                    </div>

                    {/* Action buttons */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 animate-in slide-in-from-bottom-8 duration-700 delay-500 fill-mode-both">
                        <Button asChild className="bg-foreground text-background hover:bg-foreground/90 h-12 px-8 rounded-full text-xs uppercase tracking-widest font-bold shadow-xl shadow-foreground/10 transition-all active:scale-95">
                            <Link href="/">
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Volver al Inicio
                            </Link>
                        </Button>
                        <Button variant="outline" asChild className="h-12 px-8 rounded-full text-xs uppercase tracking-widest font-bold border-black hover:bg-black hover:text-white transition-all duration-300">
                            <Link href="/platform/catalog">
                                Explorar Catálogo
                            </Link>
                        </Button>
                    </div>

                    {/* Footer note */}
                    <p className="text-[10px] text-muted-foreground uppercase tracking-[0.2em] font-medium pt-8 animate-in fade-in duration-1000 delay-700 fill-mode-both">
                        CustomLab &copy; {new Date().getFullYear()} &bull; Próximamente
                    </p>
                </div>
            </main>

            <Footer />

            <style jsx>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0) rotate(12deg); }
                    50% { transform: translateY(-15px) rotate(15deg); }
                }
                @keyframes float-reverse {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(10px); }
                }
                @keyframes spin-slow {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                .animate-float {
                    animation: float 5s ease-in-out infinite;
                }
                .animate-float-reverse {
                    animation: float-reverse 4s ease-in-out infinite;
                }
                .animate-spin-slow {
                    animation: spin-slow 12s linear infinite;
                }
            `}</style>
        </div>
    )
}
