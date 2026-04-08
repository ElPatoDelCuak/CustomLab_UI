import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import logo from "@/../public/img/logo_black_white.png"

export default function TerminosPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header simple */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Button variant="ghost" asChild className="gap-2">
            <Link href="/">
              <ArrowLeft className="h-4 w-4" />
              Volver a la tienda
            </Link>
          </Button>
          <Link href="/" className="absolute left-1/2 -translate-x-1/2">
            <Image src={logo} alt="CustomLab Logo" className="h-45 w-auto" />
          </Link>
          <div className="w-[140px]" />
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="font-serif text-4xl md:text-5xl mb-8 text-center">
          Términos y Condiciones
        </h1>
        
        <p className="text-muted-foreground mb-8 text-center">
          Última actualización: 8 de abril de 2026
        </p>

        <div className="prose prose-neutral max-w-none space-y-8">
          <section>
            <h2 className="font-serif text-2xl mb-4">1. Aceptación de los Términos</h2>
            <p className="text-foreground/80 leading-relaxed">
              Al acceder y utilizar el sitio web de CustomLab, usted acepta estar sujeto a estos términos y condiciones de uso. Si no está de acuerdo con alguna parte de estos términos, le rogamos que no utilice nuestro sitio web ni nuestros servicios.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl mb-4">2. Uso del Sitio</h2>
            <p className="text-foreground/80 leading-relaxed mb-4">
              El contenido de este sitio web es únicamente para su información general y uso personal. Está sujeto a cambios sin previo aviso.
            </p>
            <ul className="list-disc pl-6 space-y-2 text-foreground/80">
              <li>No debe usar este sitio web de ninguna manera que cause o pueda causar daños al sitio.</li>
              <li>No debe usar este sitio web para copiar, almacenar, alojar, transmitir, enviar, usar, publicar o distribuir cualquier material que consista en software malicioso.</li>
              <li>No debe realizar ninguna actividad de recopilación de datos sistemática o automatizada sin nuestro consentimiento expreso por escrito.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-2xl mb-4">3. Productos y Precios</h2>
            <p className="text-foreground/80 leading-relaxed mb-4">
              Todos los productos mostrados en nuestro sitio web están sujetos a disponibilidad. Nos reservamos el derecho de descontinuar cualquier producto en cualquier momento.
            </p>
            <p className="text-foreground/80 leading-relaxed">
              Los precios de nuestros productos están sujetos a cambios sin previo aviso. Nos reservamos el derecho de modificar o descontinuar el servicio sin previo aviso en cualquier momento. No seremos responsables ante usted ni ante terceros por cualquier modificación, cambio de precio, suspensión o interrupción del servicio.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl mb-4">4. Pedidos y Pagos</h2>
            <p className="text-foreground/80 leading-relaxed mb-4">
              Al realizar un pedido, usted declara que:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-foreground/80">
              <li>Es mayor de 18 años o cuenta con el consentimiento de un tutor legal.</li>
              <li>La información proporcionada es verdadera, precisa, actual y completa.</li>
              <li>Tiene la autoridad legal para usar el método de pago seleccionado.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-2xl mb-4">5. Envíos y Entregas</h2>
            <p className="text-foreground/80 leading-relaxed">
              Los tiempos de entrega estimados son aproximados y pueden variar según la ubicación y disponibilidad del producto. CustomLab no se hace responsable de retrasos causados por circunstancias fuera de nuestro control, incluyendo pero no limitado a condiciones climáticas, huelgas o problemas con el servicio de mensajería.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl mb-4">6. Devoluciones y Reembolsos</h2>
            <p className="text-foreground/80 leading-relaxed mb-4">
              Aceptamos devoluciones dentro de los 30 días posteriores a la recepción del pedido, siempre que:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-foreground/80">
              <li>El producto esté en su estado original, sin usar y con todas las etiquetas.</li>
              <li>Se presente el comprobante de compra original.</li>
              <li>El producto no sea de la categoría de artículos no retornables (ropa interior, trajes de baño, accesorios personalizados).</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-2xl mb-4">7. Propiedad Intelectual</h2>
            <p className="text-foreground/80 leading-relaxed">
              Todo el contenido incluido en este sitio, como textos, gráficos, logotipos, imágenes, clips de audio, descargas digitales y compilaciones de datos, es propiedad de CustomLab o de sus proveedores de contenido y está protegido por las leyes internacionales de derechos de autor.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl mb-4">8. Limitación de Responsabilidad</h2>
            <p className="text-foreground/80 leading-relaxed">
              En ningún caso CustomLab, sus directores, empleados o agentes serán responsables de cualquier daño directo, indirecto, incidental, especial o consecuente que resulte del uso o la imposibilidad de usar nuestros productos o servicios.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl mb-4">9. Modificaciones</h2>
            <p className="text-foreground/80 leading-relaxed">
              Nos reservamos el derecho de actualizar o modificar estos términos y condiciones en cualquier momento sin previo aviso. Su uso continuado del sitio web después de cualquier cambio constituye su aceptación de los nuevos términos.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl mb-4">10. Contacto</h2>
            <p className="text-foreground/80 leading-relaxed">
              Si tiene alguna pregunta sobre estos términos y condiciones, puede contactarnos en:
            </p>
            <div className="mt-4 p-6 bg-secondary rounded-lg">
              <p className="text-foreground/80">
                <strong>CustomLab</strong><br />
                Email: legal@customlab.com<br />
                Teléfono: +34 900 123 456<br />
                Dirección: Calle de la Moda 123, 28001 Madrid, España
              </p>
            </div>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="outline" asChild>
            <Link href="/auth/terms_privacy/privacy">Política de Privacidad</Link>
          </Button>
          <Button asChild>
            <Link href="/">Volver a la tienda</Link>
          </Button>
        </div>
      </main>
    </div>
  )
}