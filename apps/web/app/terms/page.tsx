'use client';

import { ScrollText } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

const sections = [
  {
    title: '1. Aceptación de los Términos',
    content: `Al acceder y utilizar Prompt Hub, aceptas estar legalmente vinculado por estos Términos y Condiciones. Si no estás de acuerdo con alguna parte de estos términos, no podrás acceder al servicio.`,
  },
  {
    title: '2. Descripción del Servicio',
    content: `Prompt Hub es una plataforma que permite a los usuarios crear, compartir y descubrir prompts para diferentes modelos de inteligencia artificial. Nos reservamos el derecho de modificar, suspender o discontinuar cualquier aspecto del servicio en cualquier momento.`,
  },
  {
    title: '3. Registro y Cuentas de Usuario',
    content: `Para acceder a ciertas funcionalidades de Prompt Hub, deberás crear una cuenta. Eres responsable de mantener la confidencialidad de tu cuenta y contraseña, así como de restringir el acceso a tu computadora. Aceptas asumir la responsabilidad de todas las actividades que ocurran bajo tu cuenta.`,
  },
  {
    title: '4. Contenido del Usuario',
    content: `Al publicar contenido en Prompt Hub, garantizas que tienes los derechos necesarios sobre dicho contenido y que no infringe derechos de terceros. Nos otorgas una licencia mundial, no exclusiva y libre de regalías para usar, modificar, ejecutar públicamente, mostrar públicamente y distribuir tu contenido en relación con el servicio.`,
  },
  {
    title: '5. Propiedad Intelectual',
    content: `Prompt Hub y su contenido original, características y funcionalidad son propiedad de Prompt Hub y están protegidos por leyes internacionales de derechos de autor, marcas registradas, patentes, secretos comerciales y otros derechos de propiedad intelectual.`,
  },
  {
    title: '6. Restricciones de Uso',
    content: `Te comprometes a no utilizar Prompt Hub para:
    • Publicar contenido ilegal, abusivo, difamatorio o fraudulento
    • Interferir con el funcionamiento normal del servicio
    • Intentar acceder a áreas restringidas del sistema
    • Recopilar información de usuarios sin su consentimiento
    • Promover actividades ilegales o dañinas`,
  },
  {
    title: '7. Privacidad y Protección de Datos',
    content: `Tu privacidad es importante para nosotros. Nuestra Política de Privacidad describe cómo recopilamos, usamos y protegemos tu información personal. Al usar nuestro servicio, aceptas nuestras prácticas de privacidad.`,
  },
  {
    title: '8. Limitación de Responsabilidad',
    content: `Prompt Hub se proporciona "tal cual" y "según disponibilidad". No garantizamos que el servicio será ininterrumpido, oportuno, seguro o libre de errores. No seremos responsables por daños indirectos, incidentales, especiales o consecuentes.`,
  },
  {
    title: '9. Modificaciones de los Términos',
    content: `Nos reservamos el derecho de modificar estos términos en cualquier momento. Te notificaremos sobre cambios significativos publicando un aviso en nuestro sitio web. El uso continuado del servicio después de dichos cambios constituye tu aceptación de los nuevos términos.`,
  },
  {
    title: '10. Ley Aplicable',
    content: `Estos términos se regirán e interpretarán de acuerdo con las leyes de España, sin tener en cuenta sus conflictos de disposiciones legales.`,
  },
];

export default function TermsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <ScrollText className="h-8 w-8 text-primary" />
          Términos y Condiciones
        </h1>
        <p className="text-muted-foreground mt-2">
          Última actualización: {new Date().toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}
        </p>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="prose prose-gray dark:prose-invert max-w-none">
            <p className="text-muted-foreground">
              Bienvenido a Prompt Hub. Estos términos y condiciones describen las reglas y regulaciones para el uso de nuestra plataforma.
            </p>

            <div className="mt-8 space-y-8">
              {sections.map((section, index) => (
                <div key={section.title}>
                  <h2 className="text-xl font-semibold mb-4">{section.title}</h2>
                  <p className="text-muted-foreground whitespace-pre-line">{section.content}</p>
                  {index < sections.length - 1 && <Separator className="mt-8" />}
                </div>
              ))}
            </div>

            <div className="mt-8">
              <p className="text-sm text-muted-foreground">
                Si tienes alguna pregunta sobre estos términos, por favor contáctanos a través de{' '}
                <a href="mailto:legal@prompthub.es" className="text-primary hover:underline">
                  legal@prompthub.es
                </a>
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
