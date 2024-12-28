'use client';

import { Cookie } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

const sections = [
  {
    title: '1. ¿Qué son las Cookies?',
    content: `Las cookies son pequeños archivos de texto que los sitios web colocan en tu dispositivo para almacenar información sobre tus preferencias, mejorar tu experiencia y proporcionar datos anónimos a los propietarios del sitio.`,
  },
  {
    title: '2. Tipos de Cookies que Utilizamos',
    content: `En Prompt Hub utilizamos los siguientes tipos de cookies:

    • Cookies Esenciales
      - Necesarias para el funcionamiento básico del sitio
      - Mantienen tu sesión activa
      - Guardan tus preferencias de privacidad

    • Cookies de Rendimiento
      - Recopilan información anónima sobre cómo usas el sitio
      - Ayudan a identificar posibles problemas técnicos
      - Miden el rendimiento del sitio web

    • Cookies de Funcionalidad
      - Recuerdan tus preferencias de idioma
      - Personalizan tu experiencia
      - Mantienen tus preferencias de visualización

    • Cookies de Publicidad
      - Muestran anuncios relevantes
      - Miden la efectividad de las campañas publicitarias
      - Limitan la frecuencia de los anuncios`,
  },
  {
    title: '3. Cookies de Terceros',
    content: `Trabajamos con proveedores de servicios que pueden establecer cookies en tu dispositivo cuando visitas Prompt Hub:

    • Google Analytics: análisis de uso del sitio
    • Redes sociales: botones de compartir y contenido integrado
    • Proveedores de publicidad: anuncios personalizados
    • Servicios de seguridad: prevención de fraude y protección`,
  },
  {
    title: '4. Duración de las Cookies',
    content: `Utilizamos dos tipos de cookies según su duración:

    • Cookies de Sesión
      - Temporales
      - Se eliminan cuando cierras el navegador
      - Usadas para mantener tu sesión activa

    • Cookies Persistentes
      - Permanecen en tu dispositivo por un tiempo determinado
      - Ayudan a recordar tus preferencias
      - Caducan después de un período específico`,
  },
  {
    title: '5. Control de Cookies',
    content: `Puedes controlar y gestionar las cookies de varias formas:

    • Configuración del Navegador
      - Bloquear todas las cookies
      - Aceptar solo cookies esenciales
      - Eliminar cookies existentes

    • Preferencias en Prompt Hub
      - Panel de preferencias de privacidad
      - Opciones de personalización
      - Configuración de publicidad

    • Herramientas de Terceros
      - Complementos del navegador
      - Plataformas de gestión de consentimiento
      - Servicios de opt-out`,
  },
  {
    title: '6. Cookies Esenciales',
    content: `Las cookies esenciales son necesarias para el funcionamiento básico de Prompt Hub y no pueden ser desactivadas en nuestros sistemas. Generalmente se establecen solo en respuesta a acciones realizadas por ti, como establecer tus preferencias de privacidad, iniciar sesión o completar formularios.`,
  },
  {
    title: '7. Impacto en la Experiencia de Usuario',
    content: `La desactivación de cookies puede afectar a tu experiencia en Prompt Hub:

    • Algunas funciones pueden no estar disponibles
    • Tus preferencias no se guardarán entre sesiones
    • Tendrás que iniciar sesión con más frecuencia
    • Los contenidos personalizados no estarán disponibles`,
  },
  {
    title: '8. Actualizaciones de la Política',
    content: `Podemos actualizar esta política de cookies periódicamente para reflejar cambios en nuestras prácticas o por otros motivos operativos, legales o regulatorios. Te recomendamos revisarla regularmente para estar informado sobre cómo utilizamos las cookies.`,
  },
  {
    title: '9. Cookies y Privacidad',
    content: `Nuestra política de cookies forma parte de nuestra política de privacidad. Te recomendamos leer ambas para comprender completamente cómo protegemos tu información y respetamos tu privacidad.`,
  },
  {
    title: '10. Contacto',
    content: `Si tienes preguntas sobre nuestro uso de cookies o necesitas ayuda para gestionarlas, puedes:

    • Enviarnos un email a privacy@prompthub.es
    • Usar nuestro formulario de contacto
    • Consultar nuestra sección de ayuda`,
  },
];

export default function CookiesPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Cookie className="h-8 w-8 text-primary" />
          Política de Cookies
        </h1>
        <p className="text-muted-foreground mt-2">
          Última actualización: {new Date().toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}
        </p>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="prose prose-gray dark:prose-invert max-w-none">
            <p className="text-muted-foreground">
              Esta política explica cómo Prompt Hub utiliza cookies y tecnologías similares para mejorar tu experiencia en nuestra plataforma. Te
              recomendamos leer esta política para comprender qué son las cookies, cómo las usamos y cómo puedes controlarlas.
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
                Para más información sobre cookies y privacidad, contáctanos en{' '}
                <a href="mailto:privacy@prompthub.es" className="text-primary hover:underline">
                  privacy@prompthub.es
                </a>
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
