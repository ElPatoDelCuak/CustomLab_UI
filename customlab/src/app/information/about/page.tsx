import { Mail, Phone, MapPin, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function SobreNosotrosPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header simple */}
      <Header></Header>

      <main>
        {/* Hero section */}
        <section className="relative h-[400px] overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: "url('/img/about/about_banner.jpeg')"
            }}
          />
          <div className="absolute inset-0 bg-foreground/50" />
          <div className="relative h-full flex items-center justify-center text-center px-4">
            <div>
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white mb-4">
                Sobre Nosotros
              </h1>
              <p className="text-white/90 text-lg max-w-xl mx-auto">
                Descubre la historia detrás de nuestra pasión por la moda
              </p>
            </div>
          </div>
        </section>

        {/* Nuestra historia */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="font-serif text-3xl md:text-4xl mb-6">Nuestra Historia</h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    CustomLab nació con una visión clara: crear experiencias digitales que combinen
                    diseño elegante con funcionalidad intuitiva. Lo que comenzó como un pequeño
                    estudio de desarrollo se ha convertido en una plataforma reconocida por su
                    compromiso con la calidad y la innovación.
                  </p>
                  <p>
                    Cada proyecto en CustomLab es cuidadosamente planificado y ejecutado,
                    utilizando las mejores prácticas de diseño y desarrollo para ofrecer soluciones
                    confiables y escalables. Creemos en el valor de la tecnología responsable.
                  </p>
                  <p>
                    Hoy, seguimos fieles a nuestros valores fundacionales: creatividad colaborativa,
                    atención al detalle y un profundo respeto por nuestros clientes y su experiencia.
                  </p>
                </div>
              </div>
              <div className="relative">
                <div
                  className="aspect-[4/5] rounded-lg bg-cover bg-center"
                  style={{
                    backgroundImage: "url('/img/about/history.jpeg')"
                  }}
                />
                <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-accent rounded-lg hidden lg:block" />
              </div>
            </div>
          </div>
        </section>

        {/* Valores */}
        <section className="py-16 bg-secondary">
          <div className="container mx-auto px-4">
            <h2 className="font-serif text-3xl md:text-4xl text-center mb-12">Nuestros Valores</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-card p-8 rounded-lg text-center">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="font-serif text-2xl text-accent">01</span>
                </div>
                <h3 className="font-serif text-xl mb-3">Calidad</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Seleccionamos los mejores materiales y trabajamos con artesanos expertos
                  para garantizar prendas que perduran en el tiempo.
                </p>
              </div>
              <div className="bg-card p-8 rounded-lg text-center">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="font-serif text-2xl text-accent">02</span>
                </div>
                <h3 className="font-serif text-xl mb-3">Sostenibilidad</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Nos comprometemos con prácticas responsables, desde la producción
                  hasta el empaque, minimizando nuestro impacto ambiental.
                </p>
              </div>
              <div className="bg-card p-8 rounded-lg text-center">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="font-serif text-2xl text-accent">03</span>
                </div>
                <h3 className="font-serif text-xl mb-3">Diseño</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Creamos piezas atemporales que trascienden tendencias,
                  combinando elegancia clásica con toques modernos.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Equipo */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <h2 className="font-serif text-3xl md:text-4xl text-center mb-4">Nuestro Equipo</h2>
            <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
              Un grupo apasionado de diseñadores, artesanos y profesionales dedicados a crear
              experiencias únicas para nuestros clientes.
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-8">
              {[
                { name: "Moussa Boudhafri", role: "Desarrollador Web", image: "/img/team/team1.jpg" },
                { name: "David Juncosa", role: "Desarollador/a Web", image: "/img/team/david.jpeg" },
              ].map((member) => (
                <div key={member.name} className="text-center">
                  <div
                    className="aspect-square rounded-lg bg-cover bg-center mb-4"
                    style={{
                      backgroundImage: `url('${member.image}')`
                    }}
                  />
                  <h3 className="font-serif text-lg">{member.name}</h3>
                  <p className="text-muted-foreground text-sm">{member.role}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contacto y Mapa */}
        <section className="py-16 bg-secondary">
          <div className="container mx-auto px-4">
            <h2 className="font-serif text-3xl md:text-4xl text-center mb-4">Contacto</h2>
            <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
              Estamos aquí para ayudarte. Visítanos en nuestra tienda o ponte en contacto con nosotros.
            </p>

            <div>
              {/* Información de contacto */}
              <div className="bg-card p-8 rounded-lg text-center mx-auto max-w-md">
                <h3 className="font-serif text-xl mb-6">Información de contacto</h3>
                <div className="space-y-4 text-center">
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <MapPin className="h-5 w-5 text-accent" />
                    </div>
                    <div className="text-center">
                      <p className="font-medium">Dirección</p>
                      <p className="text-muted-foreground text-sm">
                        Calle Gran Vía 42, 28013<br />Madrid, España
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Phone className="h-5 w-5 text-accent" />
                    </div>
                    <div className="text-center">
                      <p className="font-medium">Teléfono</p>
                      <p className="text-muted-foreground text-sm">+34 91 123 45 67</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Mail className="h-5 w-5 text-accent" />
                    </div>
                    <div className="text-center">
                      <p className="font-medium">Email</p>
                      <p className="text-muted-foreground text-sm">info@customlab.com</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Clock className="h-5 w-5 text-accent" />
                    </div>
                    <div className="text-center">
                      <p className="font-medium">Horario</p>
                      <p className="text-muted-foreground text-sm">
                        Lunes - Sábado: 10:00 - 21:00<br />
                        Domingo: 11:00 - 20:00
                      </p>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* Mapa */}
            <div className="mt-12">
              <div className="bg-card p-2 rounded-lg">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3037.2234066575397!2d-3.7056636!3d40.4203679!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd42287d4e9e4feb%3A0x6e8f8c0c8c8c8c8c!2sGran%20V%C3%ADa%2C%2042%2C%2028013%20Madrid!5e0!3m2!1ses!2ses!4v1699999999999!5m2!1ses!2ses"
                  width="100%"
                  height="400"
                  style={{ border: 0, borderRadius: "0.5rem" }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Ubicación de ATELIER"
                />
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer simple */}
      <Footer></Footer>
    </div>
  )
}