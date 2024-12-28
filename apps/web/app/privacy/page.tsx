'use client';

import { Shield } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

const sections = [
  {
    title: '1. Información que Recopilamos',
    content: `Recopilamos diferentes tipos de información cuando utilizas Prompt Hub:

    • Información de registro: nombre, dirección de correo electrónico y contraseña
    • Información del perfil: foto de perfil, biografía y enlaces a redes sociales
    • Datos de uso: interacciones con la plataforma, prompts creados y guardados
    • Información técnica: dirección IP, tipo de navegador, dispositivo y sistema operativo
    • Cookies y tecnologías similares: para mejorar tu experiencia y analizar el uso del servicio`,
  },
  {
    title: '2. Uso de la Información',
    content: `Utilizamos la información recopilada para:

    • Proporcionar y mantener nuestros servicios
    • Personalizar tu experiencia en la plataforma
    • Mejorar nuestros servicios y desarrollar nuevas funcionalidades
    • Comunicarnos contigo sobre actualizaciones y novedades
    • Detectar y prevenir actividades fraudulentas o abusivas
    • Cumplir con obligaciones legales`,
  },
  {
    title: '3. Compartir Información',
    content: `Podemos compartir tu información en las siguientes circunstancias:

    • Con otros usuarios según tus configuraciones de privacidad
    • Con proveedores de servicios que nos ayudan a operar la plataforma
    • En respuesta a requerimientos legales
    • En caso de fusión, venta o transferencia de activos
    • Con tu consentimiento explícito`,
  },
  {
    title: '4. Tus Derechos',
    content: `Como usuario, tienes derecho a:

    • Acceder a tu información personal
    • Rectificar datos inexactos
    • Solicitar la eliminación de tus datos
    • Oponerte al procesamiento de tus datos
    • Portar tus datos a otro servicio
    • Retirar tu consentimiento en cualquier momento

Puedes ejercer estos derechos contactando con nosotros a través de privacy@prompthub.es`,
  },
  {
    title: '5. Seguridad de Datos',
    content: `Implementamos medidas de seguridad técnicas y organizativas para proteger tu información:

    • Encriptación de datos sensibles
    • Acceso restringido a datos personales
    • Monitorización regular de sistemas
    • Copias de seguridad periódicas
    • Protocolos de respuesta ante incidentes`,
  },
  {
    title: '6. Retención de Datos',
    content: `Mantenemos tu información personal mientras tu cuenta esté activa o sea necesaria para proporcionarte servicios. Si solicitas la eliminación de tu cuenta, eliminaremos o anonimizaremos tu información personal, excepto cuando sea necesario mantenerla por motivos legales o de interés legítimo.`,
  },
  {
    title: '7. Menores de Edad',
    content: `Prompt Hub no está dirigido a menores de 16 años. No recopilamos intencionalmente información de menores. Si descubrimos que hemos recopilado información de un menor, tomaremos medidas para eliminar dicha información.`,
  },
  {
    title: '8. Transferencias Internacionales',
    content: `Tus datos pueden ser transferidos y procesados en países fuera del Espacio Económico Europeo (EEE). Cuando esto ocurra, nos aseguraremos de que se apliquen las salvaguardas adecuadas para proteger tus datos de acuerdo con el RGPD.`,
  },
  {
    title: '9. Cookies y Tecnologías Similares',
    content: `Utilizamos cookies y tecnologías similares para:

    • Mantener tu sesión activa
    • Recordar tus preferencias
    • Analizar el uso de nuestro servicio
    • Personalizar el contenido y la publicidad

Puedes gestionar tus preferencias de cookies a través de la configuración de tu navegador.`,
  },
  {
    title: '10. Cambios en esta Política',
    content: `Podemos actualizar esta política de privacidad periódicamente. Te notificaremos sobre cambios significativos a través de un aviso visible en nuestro sitio web o por correo electrónico. El uso continuado del servicio después de dichos cambios constituye tu aceptación de la política actualizada.`,
  },
];

export default function PrivacyPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Shield className="h-8 w-8 text-primary" />
          Política de Privacidad
        </h1>
        <p className="text-muted-foreground mt-2">
          Última actualización: {new Date().toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}
        </p>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="prose prose-gray dark:prose-invert max-w-none">
            <p className="text-muted-foreground">
              En Prompt Hub, nos tomamos muy en serio la privacidad de nuestros usuarios. Esta política describe cómo recopilamos, utilizamos y
              protegemos tu información personal cuando utilizas nuestra plataforma.
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
                Para cualquier consulta relacionada con la privacidad, contáctanos en{' '}
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
