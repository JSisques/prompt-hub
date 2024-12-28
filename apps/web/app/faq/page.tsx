'use client';

import { FAQSection } from '@/components/faq/faq-section';
import { FAQ } from '@/types/faq';

const faqs: FAQ[] = [
  {
    category: 'General',
    questions: [
      {
        question: '¿Qué es Prompt Hub?',
        answer:
          'Prompt Hub es una plataforma que te permite crear, compartir y descubrir los mejores prompts para Inteligencia Artificial. Nuestra misión es ayudar a la comunidad a aprovechar al máximo las capacidades de la IA.',
      },
      {
        question: '¿Es gratis usar Prompt Hub?',
        answer:
          'Sí, Prompt Hub es completamente gratuito para uso básico. Ofrecemos funcionalidades premium para usuarios que necesitan características avanzadas.',
      },
      {
        question: '¿Necesito una cuenta para usar Prompt Hub?',
        answer:
          'Puedes explorar los prompts públicos sin una cuenta, pero necesitarás registrarte para guardar tus prompts favoritos, crear nuevos prompts o interactuar con la comunidad.',
      },
    ],
  },
  {
    category: 'Prompts',
    questions: [
      {
        question: '¿Qué es un prompt?',
        answer:
          'Un prompt es una instrucción o pregunta que se da a un modelo de IA para obtener una respuesta específica. Un buen prompt puede ayudarte a obtener mejores resultados de la IA.',
      },
      {
        question: '¿Cómo puedo crear un buen prompt?',
        answer:
          'Un buen prompt debe ser claro, específico y proporcionar contexto suficiente. Recomendamos seguir nuestra guía de mejores prácticas y estudiar ejemplos exitosos de la comunidad.',
      },
      {
        question: '¿Puedo compartir mis prompts?',
        answer:
          'Sí, puedes compartir tus prompts con la comunidad. También puedes elegir mantenerlos privados o compartirlos solo con usuarios específicos.',
      },
    ],
  },
  {
    category: 'Cuenta y Privacidad',
    questions: [
      {
        question: '¿Cómo puedo cambiar mi contraseña?',
        answer: 'Puedes cambiar tu contraseña en la sección de Configuración > Seguridad de tu cuenta.',
      },
      {
        question: '¿Qué datos recopilan sobre mí?',
        answer:
          'Solo recopilamos la información necesaria para proporcionar nuestros servicios. Puedes revisar nuestra política de privacidad para más detalles.',
      },
      {
        question: '¿Cómo puedo eliminar mi cuenta?',
        answer:
          'Puedes solicitar la eliminación de tu cuenta en la sección de Configuración > Cuenta. Ten en cuenta que esta acción es irreversible.',
      },
    ],
  },
];

export default function FAQPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <FAQSection title="Preguntas Frecuentes" description="Encuentra respuestas a las preguntas más comunes sobre Prompt Hub" faqs={faqs} />
    </div>
  );
}
