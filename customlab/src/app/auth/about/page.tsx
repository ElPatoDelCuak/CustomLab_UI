import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import logo from "@/../public/img/logo_black_white.png"
import { Footer } from "@/components/footer"
import { Header } from "@/components/header"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header simple */}
      <Header></Header>

      {/* Content */}
      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="font-serif text-4xl md:text-5xl mb-8 text-center">
          Sobre CustomLab
        </h1>
        
        <p className="text-muted-foreground mb-12 text-center text-lg">
          Descubre la historia, valores y pasión detrás de CustomLab
        </p>

        <div className="prose prose-neutral max-w-none space-y-8">
          {/* Nuestra Historia */}
          <section>
            <h2 className="font-serif text-2xl mb-4">Nuestra Historia</h2>
            <p className="text-foreground/80 leading-relaxed">
              CustomLab nació en 2020 con una visión simple pero poderosa: democratizar la moda permitiendo que cada persona pueda crear prendas únicas y personalizadas. Lo que comenzó como un pequeño proyecto en un garaje, hoy es una tienda de referencia en moda personalizada.
            </p>
            <p className="text-foreground/80 leading-relaxed mt-4">
              Nuestro viaje ha sido impulsado por la pasión de nuestro equipo y la confianza de nuestra comunidad. Cada día trabajamos para ofrecer productos de calidad que reflejen la personalidad única de nuestros clientes.
            </p>
          </section>

          {/* Nuestra Misión */}
          <section>
            <h2 className="font-serif text-2xl mb-4">Nuestra Misión</h2>
            <p className="text-foreground/80 leading-relaxed">
              En CustomLab, creemos que la moda debe ser personal y accesible. Nuestra misión es proporcionar a nuestros clientes una plataforma innovadora donde puedan expresar su creatividad a través de prendas de alta calidad, diseñadas exactamente como ellos desean.
            </p>
            <p className="text-foreground/80 leading-relaxed mt-4">
              Nos comprometemos a ofrecer no solo productos, sino experiencias memorables que empoderen a nuestros clientes para ser auténticos.
            </p>
          </section>

          {/* Nuestros Valores */}
          <section>
            <h2 className="font-serif text-2xl mb-4">Nuestros Valores</h2>
            <ul className="space-y-4">
              <li className="text-foreground/80">
                <strong className="text-foreground">Calidad:</strong> Utilizamos solo los mejores materiales y técnicas de producción para garantizar prendas duraderas.
              </li>
              <li className="text-foreground/80">
                <strong className="text-foreground">Creatividad:</strong> Fomentamos la innovación en diseño y personalizaciones sin límites.
              </li>
              <li className="text-foreground/80">
                <strong className="text-foreground">Sostenibilidad:</strong> Nos esforzamos por minimizar nuestro impacto ambiental en cada aspecto de nuestro negocio.
              </li>
              <li className="text-foreground/80">
                <strong className="text-foreground">Inclusión:</strong> Creemos que la moda es para todos, sin importar género, talla o estilo.
              </li>
              <li className="text-foreground/80">
                <strong className="text-foreground">Transparencia:</strong> Operamos con honestidad en todos nuestros procesos y relaciones.
              </li>
            </ul>
          </section>

          {/* Por Qué Elegirnos */}
          <section>
            <h2 className="font-serif text-2xl mb-4">¿Por Qué Elegirnos?</h2>
            <ul className="list-disc pl-6 space-y-3 text-foreground/80">
              <li><strong>Personalización sin límites:</strong> Diseña exactamente lo que imaginas con nuestras herramientas intuitivas.</li>
              <li><strong>Materiales premium:</strong> Trabajamos con proveedores seleccionados que garantizan la mejor calidad.</li>
              <li><strong>Soporte excepcional:</strong> Nuestro equipo está siempre disponible para ayudarte en tu proceso creativo.</li>
              <li><strong>Entregas rápidas:</strong> Producimos y enviamos tus prendas en los tiempos más cortos posibles.</li>
              <li><strong>Garantía de satisfacción:</strong> Si no estás completamente satisfecho, hacemos lo necesario para mejorar.</li>
              <li><strong>Comunidad vibrante:</strong> Forma parte de una comunidad de creadores y amantes de la moda personalizada.</li>
            </ul>
          </section>

          {/* Nuestro Proceso */}
          <section>
            <h2 className="font-serif text-2xl mb-4">Nuestro Proceso</h2>
            <p className="text-foreground/80 leading-relaxed mb-4">
              Cada prenda CustomLab es creada con cuidado y atención al detalle:
            </p>
            <ol className="space-y-3 text-foreground/80">
              <li><strong>1. Diseña:</strong> Personaliza cada aspecto de tu prenda usando nuestro editor intuitivo.</li>
              <li><strong>2. Revisa:</strong> Visualiza tu diseño en 3D antes de confirmar tu pedido.</li>
              <li><strong>3. Producimos:</strong> Tu prenda es fabricada por nuestro equipo de expertos con precisión.</li>
              <li><strong>4. Entregamos:</strong> Recibes tu creación única directamente en tu puerta.</li>
              <li><strong>5. Disfruta:</strong> Luce tu prenda personalizada con orgullo.</li>
            </ol>
          </section>

          {/* Compromiso Ambiental */}
          <section>
            <h2 className="font-serif text-2xl mb-4">Nuestro Compromiso con el Planeta</h2>
            <p className="text-foreground/80 leading-relaxed mb-4">
              En CustomLab, la sostenibilidad no es una opción, es una responsabilidad:
            </p>
            <ul className="space-y-2 text-foreground/80">
              <li>✓ Usamos materiales ecológicos y certificados cuando es posible</li>
              <li>✓ Minimizamos residuos en nuestros procesos de producción</li>
              <li>✓ Empaquetamos con materiales reciclables y biodegradables</li>
              <li>✓ Compensamos nuestras emisiones de carbono</li>
            </ul>
          </section>

          {/* Contacto */}
          <section id="contact">
            <h2 className="font-serif text-2xl mb-4">Conecta con Nosotros</h2>
            <p className="text-foreground/80 leading-relaxed mb-6">
              ¿Tienes preguntas o quieres saber más sobre CustomLab? ¡Nos encantaría escucharte!
            </p>

            <div className="p-6 bg-secondary rounded-lg space-y-3">
              <p className="text-foreground/80">
                <strong>CustomLab - Tienda de Moda Personalizada</strong>
              </p>
              <p className="text-foreground/80">
                📧 Email: <a href="mailto:hola@customlab.com" className="text-primary hover:underline">hola@customlab.com</a>
              </p>
              <p className="text-foreground/80">
                📞 Teléfono: <a href="tel:+34900123456" className="text-primary hover:underline">+34 900 123 456</a>
              </p>
              <p className="text-foreground/80">
                🕐 Horario: Lunes - Viernes: 9:00 - 18:00 | Sábado: 10:00 - 14:00
              </p>
            </div>
                                {/* Mapa */}
            <div className="w-full h-64 rounded-lg overflow-hidden mb-6">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3039.1457170166743!2d-3.7437376!3d40.4168!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd418eb08eb1fb1b%3A0x6bbb0b0e1b1b1b1b!2sCalle%20de%20la%20Creatividad%2042%2C%2028001%20Madrid!5e0!3m2!1ses!2ses!4v1"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </section>

          {/* Cierre */}
          <section className="bg-primary/10 p-6 rounded-lg text-center">
            <p className="text-foreground/80 leading-relaxed italic">
              "En CustomLab, no solo vendemos ropa, creamos historias. Cada prenda personalizada cuenta la historia única de quien la viste."
            </p>
            <p className="text-foreground/60 mt-4 text-sm">
              — El equipo de CustomLab
            </p>
            <br />
          </section>
        </div>

      </main>
      <Footer></Footer>
    </div>
  )
}