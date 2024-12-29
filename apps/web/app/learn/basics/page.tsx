'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { BookOpen, MessageSquare, Brain, Lightbulb, ArrowRight, Code, Target, LucideIcon } from 'lucide-react';

interface SimpleExample {
  title: string;
  prompt: string;
  explanation: string;
}

interface ComplexExample {
  title: string;
  content: string;
  mejora: string;
  explicacion: string;
}

interface Subsection {
  title: string;
  content: string;
  example?: string;
  tips?: string[];
  examples?: string[];
  explanation?: string;
}

interface Section {
  title: string;
  icon: LucideIcon;
  content?: string;
  examples?: (SimpleExample | ComplexExample)[];
  subsections?: Subsection[];
}

function isSimpleExample(example: SimpleExample | ComplexExample): example is SimpleExample {
  return 'prompt' in example;
}

function isComplexExample(example: SimpleExample | ComplexExample): example is ComplexExample {
  return 'content' in example;
}

const sections: Section[] = [
  {
    title: '¿Qué es un Prompt?',
    icon: MessageSquare,
    content:
      'Un prompt es una instrucción o entrada que proporcionamos a un modelo de IA para obtener una respuesta específica. Es la forma en que nos comunicamos con la IA para obtener los resultados deseados.',
    examples: [
      {
        title: 'Ejemplo Simple',
        prompt: 'Explica el concepto de inteligencia artificial como si le hablaras a un niño de 10 años.',
        explanation: 'Este prompt es claro y específico sobre el tema y el nivel de explicación deseado.',
      },
      {
        title: 'Ejemplo Detallado',
        prompt:
          'Actúa como un experto en marketing digital y proporciona 3 estrategias efectivas para aumentar el engagement en redes sociales, incluyendo ejemplos prácticos para cada una.',
        explanation: 'Este prompt define un rol específico, cantidad de elementos y el tipo de información requerida.',
      },
    ],
  },
  {
    title: 'Estructura Básica',
    icon: Brain,
    content:
      'Un buen prompt debe ser claro, específico y estructurado. Los componentes esenciales incluyen: contexto relevante, la tarea específica que deseas que realice la IA, y el formato de salida esperado.',
    subsections: [
      {
        title: 'Contexto',
        content: 'Proporciona información de fondo necesaria para que la IA entienda el escenario.',
        example: 'Contexto: "Como profesor de matemáticas de secundaria..."',
      },
      {
        title: 'Instrucción',
        content: 'Define claramente la tarea o acción que deseas que realice la IA.',
        example: 'Instrucción: "Crea un plan de lección sobre..."',
      },
      {
        title: 'Formato',
        content: 'Especifica cómo quieres que se presente la respuesta.',
        example: 'Formato: "Organiza la respuesta en viñetas con ejemplos prácticos"',
      },
    ],
  },
  {
    title: 'Elementos Clave',
    icon: Lightbulb,
    subsections: [
      {
        title: 'Claridad',
        content: 'Usa un lenguaje simple y directo. Evita ambigüedades y sé específico en tus instrucciones.',
        tips: ['Utiliza palabras precisas y concretas', 'Evita jerga innecesaria', 'Define términos específicos cuando sea necesario'],
      },
      {
        title: 'Contexto',
        content: 'Proporciona la información necesaria para que la IA entienda el escenario o situación.',
        tips: [
          'Incluye información relevante sobre el público objetivo',
          'Especifica el nivel de conocimiento requerido',
          'Menciona restricciones o limitaciones importantes',
        ],
      },
      {
        title: 'Objetivo',
        content: 'Define claramente qué quieres lograr con tu prompt.',
        tips: ['Establece metas específicas y medibles', 'Indica el resultado esperado', 'Menciona criterios de éxito'],
      },
    ],
  },
  {
    title: 'Componentes Adicionales',
    icon: Target,
    subsections: [
      {
        title: 'Restricciones',
        content: 'Define límites y parámetros específicos para la respuesta.',
        examples: ['Límite de palabras o extensión', 'Formato específico (lista, párrafos, tabla)', 'Nivel de detalle requerido'],
      },
      {
        title: 'Ejemplos',
        content: 'Proporciona ejemplos del tipo de respuesta que esperas.',
        explanation: 'Los ejemplos ayudan a la IA a entender mejor el formato y estilo deseados.',
      },
      {
        title: 'Criterios de Calidad',
        content: 'Establece estándares para la respuesta.',
        examples: ['Precisión y exactitud', 'Nivel de detalle', 'Tono y estilo de comunicación'],
      },
    ],
  },
  {
    title: 'Ejemplos Prácticos',
    icon: Code,
    examples: [
      {
        title: 'Prompt Básico',
        content: 'Explica qué es el calentamiento global.',
        mejora:
          'Actúa como un científico climático y explica el calentamiento global de manera simple pero precisa, utilizando 3 ejemplos cotidianos y sus impactos. Limita la respuesta a 300 palabras.',
        explicacion: 'La versión mejorada incluye un rol específico, formato claro y restricciones concretas.',
      },
      {
        title: 'Prompt Intermedio',
        content: 'Dame ideas para mi negocio.',
        mejora:
          'Como consultor de negocios digitales, proporciona 5 ideas innovadoras para una tienda online de ropa sostenible, incluyendo para cada idea: descripción, recursos necesarios, y potencial ROI. Organiza la información en una estructura clara y prioriza las ideas según su viabilidad.',
        explicacion: 'La versión mejorada especifica el tipo de negocio, cantidad de ideas y estructura de la información requerida.',
      },
      {
        title: 'Prompt Avanzado',
        content: 'Ayúdame con mi código.',
        mejora:
          'Como experto en Python y optimización de código, revisa el siguiente fragmento de código que procesa grandes conjuntos de datos. Identifica posibles cuellos de botella y proporciona soluciones optimizadas. Incluye ejemplos de código, explicaciones de las mejoras y métricas de rendimiento esperadas.',
        explicacion: 'La versión mejorada especifica el lenguaje, el contexto específico y el tipo de mejoras requeridas.',
      },
    ],
  },
];

export default function BasicsPage() {
  return (
    <div className="container max-w-4xl mx-auto py-4 px-4 md:px-0">
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <BookOpen className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold">Fundamentos de Prompts</h1>
        </div>

        <p className="text-muted-foreground text-lg">
          Aprende los conceptos básicos para crear prompts efectivos y comenzar tu viaje en la ingeniería de prompts. Esta guía te proporcionará las
          bases necesarias para comunicarte eficazmente con modelos de IA.
        </p>

        <div className="grid gap-6">
          {sections.map((section, index) => (
            <Card key={index}>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10 text-primary">
                    <section.icon className="h-6 w-6" />
                  </div>
                  <CardTitle>{section.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                {section.content && <p className="text-muted-foreground mb-4">{section.content}</p>}

                {section.examples && (
                  <div className="space-y-4 mt-4">
                    {section.examples.map((example, i) => (
                      <div key={i} className="bg-muted/50 p-4 rounded-lg space-y-2">
                        <h3 className="font-medium">{example.title}</h3>
                        {isSimpleExample(example) && (
                          <div className="bg-background p-3 rounded border">
                            <p className="text-sm font-mono">{example.prompt}</p>
                          </div>
                        )}
                        {isSimpleExample(example) && <p className="text-sm text-muted-foreground">{example.explanation}</p>}
                        {isComplexExample(example) && (
                          <>
                            <div className="bg-background p-3 rounded border">
                              <p className="text-sm font-mono">{example.mejora}</p>
                            </div>
                            <p className="text-sm text-muted-foreground">{example.explicacion}</p>
                          </>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {section.subsections && (
                  <div className="mt-4 space-y-4">
                    {section.subsections.map((subsection, subIndex) => (
                      <div key={subIndex} className="space-y-2">
                        <div className="flex items-start gap-2">
                          <ArrowRight className="h-5 w-5 text-primary mt-0.5" />
                          <div>
                            <h3 className="font-medium">{subsection.title}</h3>
                            <p className="text-muted-foreground">{subsection.content}</p>

                            {subsection.example && (
                              <div className="mt-2 bg-muted/50 p-3 rounded-lg">
                                <p className="text-sm font-mono">{subsection.example}</p>
                              </div>
                            )}

                            {subsection.tips && (
                              <ul className="mt-2 space-y-1">
                                {subsection.tips.map((tip, i) => (
                                  <li key={i} className="text-sm text-muted-foreground">
                                    • {tip}
                                  </li>
                                ))}
                              </ul>
                            )}

                            {subsection.examples && (
                              <ul className="mt-2 space-y-1">
                                {subsection.examples.map((example, i) => (
                                  <li key={i} className="text-sm text-muted-foreground">
                                    • {example}
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
