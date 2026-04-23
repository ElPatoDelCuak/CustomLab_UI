import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import logo from "@/../public/img/logo_black_white.png"
import { Footer } from "@/components/footer"
import { Header } from "@/components/header"

export default function PrivacidadPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header simple */}
      <Header></Header>

      {/* Content */}
      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="font-serif text-4xl md:text-5xl mb-8 text-center">
          Política de Privacidad
        </h1>
        
        <p className="text-muted-foreground mb-8 text-center">
          Última actualización: 8 de abril de 2026
        </p>

        <div className="prose prose-neutral max-w-none space-y-8">
          <section>
            <h2 className="font-serif text-2xl mb-4">1. Información que Recopilamos</h2>
            <p className="text-foreground/80 leading-relaxed mb-4">
              En CustomLab, recopilamos información que usted nos proporciona directamente cuando:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-foreground/80">
              <li>Crea una cuenta en nuestro sitio web</li>
              <li>Realiza una compra o pedido</li>
              <li>Se suscribe a nuestro boletín de noticias</li>
              <li>Participa en encuestas o promociones</li>
              <li>Se comunica con nuestro servicio de atención al cliente</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-2xl mb-4">2. Tipos de Datos Personales</h2>
            <p className="text-foreground/80 leading-relaxed mb-4">
              Los datos personales que podemos recopilar incluyen:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 bg-secondary rounded-lg">
                <h3 className="font-medium mb-2">Datos de identificación</h3>
                <ul className="text-sm text-foreground/70 space-y-1">
                  <li>Nombre y apellidos</li>
                  <li>Dirección de correo electrónico</li>
                  <li>Número de teléfono</li>
                  <li>Dirección postal</li>
                </ul>
              </div>
              <div className="p-4 bg-secondary rounded-lg">
                <h3 className="font-medium mb-2">Datos de transacción</h3>
                <ul className="text-sm text-foreground/70 space-y-1">
                  <li>Historial de compras</li>
                  <li>Información de pago</li>
                  <li>Preferencias de productos</li>
                  <li>Lista de deseos</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="font-serif text-2xl mb-4">3. Uso de la Información</h2>
            <p className="text-foreground/80 leading-relaxed mb-4">
              Utilizamos la información recopilada para:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-foreground/80">
              <li>Procesar y gestionar sus pedidos y transacciones</li>
              <li>Enviar confirmaciones de pedidos y actualizaciones de envío</li>
              <li>Responder a sus consultas y solicitudes de atención al cliente</li>
              <li>Enviar comunicaciones de marketing (con su consentimiento)</li>
              <li>Personalizar su experiencia de compra</li>
              <li>Mejorar nuestros productos y servicios</li>
              <li>Cumplir con nuestras obligaciones legales</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-2xl mb-4">4. Cookies y Tecnologías Similares</h2>
            <p className="text-foreground/80 leading-relaxed mb-4">
              Utilizamos cookies y tecnologías similares para mejorar su experiencia en nuestro sitio web. Estas nos permiten:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-foreground/80">
              <li>Recordar sus preferencias y configuración</li>
              <li>Mantener su sesión iniciada</li>
              <li>Analizar el tráfico y uso del sitio web</li>
              <li>Personalizar contenido y anuncios</li>
            </ul>
            <p className="text-foreground/80 leading-relaxed mt-4">
              Puede configurar su navegador para rechazar todas las cookies o para indicar cuándo se envía una cookie. Sin embargo, si no acepta cookies, es posible que no pueda utilizar algunas partes de nuestro sitio web.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl mb-4">5. Compartir Información</h2>
            <p className="text-foreground/80 leading-relaxed mb-4">
              No vendemos ni alquilamos su información personal a terceros. Podemos compartir su información únicamente con:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-foreground/80">
              <li><strong>Proveedores de servicios:</strong> empresas que nos ayudan a procesar pagos, enviar pedidos y proporcionar atención al cliente.</li>
              <li><strong>Socios comerciales:</strong> con su consentimiento, para ofrecerle productos o servicios que puedan interesarle.</li>
              <li><strong>Autoridades legales:</strong> cuando sea requerido por ley o para proteger nuestros derechos legales.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-2xl mb-4">6. Seguridad de los Datos</h2>
            <p className="text-foreground/80 leading-relaxed">
              Implementamos medidas de seguridad técnicas y organizativas apropiadas para proteger sus datos personales contra el acceso no autorizado, la alteración, divulgación o destrucción. Esto incluye el uso de cifrado SSL para todas las transacciones y el almacenamiento seguro de datos en servidores protegidos.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl mb-4">7. Sus Derechos</h2>
            <p className="text-foreground/80 leading-relaxed mb-4">
              De acuerdo con el Reglamento General de Protección de Datos (RGPD), usted tiene derecho a:
            </p>
            <div className="grid gap-3">
              <div className="flex items-start gap-3 p-4 bg-secondary rounded-lg">
                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium shrink-0">1</div>
                <div>
                  <h3 className="font-medium">Derecho de acceso</h3>
                  <p className="text-sm text-foreground/70">Solicitar una copia de sus datos personales.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-secondary rounded-lg">
                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium shrink-0">2</div>
                <div>
                  <h3 className="font-medium">Derecho de rectificación</h3>
                  <p className="text-sm text-foreground/70">Corregir datos inexactos o incompletos.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-secondary rounded-lg">
                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium shrink-0">3</div>
                <div>
                  <h3 className="font-medium">Derecho de supresión</h3>
                  <p className="text-sm text-foreground/70">Solicitar la eliminación de sus datos personales.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-secondary rounded-lg">
                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium shrink-0">4</div>
                <div>
                  <h3 className="font-medium">Derecho de portabilidad</h3>
                  <p className="text-sm text-foreground/70">Recibir sus datos en un formato estructurado y legible.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-secondary rounded-lg">
                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium shrink-0">5</div>
                <div>
                  <h3 className="font-medium">Derecho de oposición</h3>
                  <p className="text-sm text-foreground/70">Oponerse al procesamiento de sus datos para fines de marketing.</p>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="font-serif text-2xl mb-4">8. Retención de Datos</h2>
            <p className="text-foreground/80 leading-relaxed">
              Conservamos sus datos personales solo durante el tiempo necesario para cumplir con los fines para los que fueron recopilados, incluyendo el cumplimiento de requisitos legales, contables o de informes. El período de retención puede variar según el contexto y nuestras obligaciones legales.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl mb-4">9. Menores de Edad</h2>
            <p className="text-foreground/80 leading-relaxed">
              Nuestro sitio web no está dirigido a menores de 16 años. No recopilamos conscientemente información personal de menores. Si descubrimos que hemos recopilado datos de un menor sin el consentimiento parental verificable, tomaremos medidas para eliminar esa información.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl mb-4">10. Cambios en esta Política</h2>
            <p className="text-foreground/80 leading-relaxed">
              Podemos actualizar esta política de privacidad periódicamente. Le notificaremos sobre cualquier cambio publicando la nueva política en esta página y actualizando la fecha de {"\"última actualización\""}. Le recomendamos revisar esta política regularmente para estar informado sobre cómo protegemos su información.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl mb-4">11. Contacto</h2>
            <p className="text-foreground/80 leading-relaxed">
              Si tiene preguntas sobre esta política de privacidad o desea ejercer sus derechos, puede contactarnos en:
            </p>
            <div className="mt-4 p-6 bg-secondary rounded-lg">
              <p className="text-foreground/80">
                <strong>CustomLab - Delegado de Protección de Datos</strong><br />
                Email: privacidad@customlab.com<br />
                Teléfono: +34 900 123 456<br />
                Dirección: Calle de la Moda 123, 28001 Madrid, España
              </p>
            </div>
          </section>
        </div>

        
      </main>
      <Footer></Footer>
    </div>
    
  )
}