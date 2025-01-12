'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Target, Zap, Workflow, Settings, Code, BookOpen, LucideIcon } from 'lucide-react';

interface Example {
  prompt: string;
  improved: string;
  explanation: string;
}

interface Template {
  name: string;
  template: string;
  useCase: string;
}

interface Technique {
  title: string;
  icon: LucideIcon;
  description: string;
  details: string[];
  example?: Example;
  templates?: Template[];
}

const techniques: Technique[] = [
  {
    title: 'Chain of Thought',
    icon: Workflow,
    description: 'Técnica que consiste en guiar a la IA a través de un proceso de pensamiento paso a paso para resolver problemas complejos.',
    details: [
      'Permite resolver problemas complejos dividiéndolos en pasos más pequeños y manejables',
      'Mejora la precisión al hacer explícito el proceso de razonamiento',
      'Facilita la detección y corrección de errores en el proceso',
    ],
    example: {
      prompt:
        'Resuelve este problema matemático: Si tengo 3 cajas, cada una con 4 paquetes, y cada paquete contiene 6 chocolates, ¿cuántos chocolates hay en total?',
      improved: `Vamos a resolver esto paso a paso:
1. Primero, calcula cuántos chocolates hay en un paquete
2. Luego, calcula cuántos chocolates hay en una caja
3. Finalmente, calcula el total de chocolates en todas las cajas
Muestra tus cálculos en cada paso.`,
      explanation: 'El prompt mejorado guía a la IA a través de un proceso de pensamiento estructurado.',
    },
  },
  {
    title: 'Role Prompting',
    icon: Target,
    description: 'Asignar un rol específico a la IA para obtener respuestas más contextualizadas y expertas en un campo determinado.',
    details: [
      'Permite obtener respuestas desde perspectivas específicas',
      'Mejora la calidad y relevancia del contenido generado',
      'Facilita la adaptación del tono y nivel técnico',
    ],
    example: {
      prompt: 'Explica cómo funciona la fotosíntesis.',
      improved:
        'Actúa como un profesor de biología de secundaria y explica la fotosíntesis de manera clara y entretenida, usando analogías cotidianas y ejemplos visuales que los estudiantes puedan relacionar con su vida diaria.',
      explanation: 'El prompt mejorado especifica un rol y contexto educativo específico.',
    },
  },
  {
    title: 'Few-Shot Learning',
    icon: Zap,
    description: 'Proporcionar ejemplos específicos dentro del prompt para que la IA comprenda mejor el patrón o formato deseado.',
    details: [
      'Mejora la precisión al mostrar ejemplos del resultado esperado',
      'Reduce la ambigüedad en el formato de salida',
      'Permite personalizar el estilo de las respuestas',
    ],
    example: {
      prompt: 'Genera títulos para artículos de blog sobre productividad.',
      improved: `Genera 5 títulos para artículos de blog sobre productividad siguiendo este formato:
Ejemplo 1: "10 Técnicas Comprobadas para Duplicar tu Productividad en 30 Días"
Ejemplo 2: "Cómo Logré Completar mi Lista de Tareas en la Mitad del Tiempo"

Ahora genera 5 títulos similares manteniendo el estilo persuasivo y específico.`,
      explanation: 'El prompt mejorado proporciona ejemplos concretos del formato y estilo deseados.',
    },
  },
  {
    title: 'Control de Parámetros',
    icon: Settings,
    description: 'Ajustar específicamente aspectos como el tono, longitud y formato de la respuesta para obtener resultados más precisos.',
    details: [
      'Permite controlar la extensión y profundidad de las respuestas',
      'Facilita la personalización del tono y estilo',
      'Mejora la consistencia en las salidas',
    ],
    example: {
      prompt: 'Escribe sobre inteligencia artificial.',
      improved: `Escribe un artículo sobre inteligencia artificial con las siguientes especificaciones:
- Longitud: 500 palabras
- Tono: Profesional pero accesible
- Estructura: Introducción, 3 puntos principales, conclusión
- Incluye: 2-3 ejemplos prácticos de aplicación
- Nivel técnico: Intermedio
- Audiencia: Profesionales de negocios`,
      explanation: 'El prompt mejorado especifica parámetros claros para controlar el resultado.',
    },
  },
  {
    title: 'Prompt Templates',
    icon: Code,
    description: 'Utilizar estructuras predefinidas y probadas para diferentes tipos de tareas, mejorando la consistencia y eficacia.',
    details: [
      'Garantiza consistencia en las respuestas',
      'Ahorra tiempo al reutilizar estructuras efectivas',
      'Facilita la optimización iterativa de prompts',
    ],
    templates: [
      {
        name: 'Análisis de Contenido',
        template: `Actúa como [ROL] y analiza el siguiente [TIPO_CONTENIDO]:
[CONTENIDO]

Proporciona:
1. Resumen principal (2-3 oraciones)
2. Puntos clave (3-5 puntos)
3. Análisis detallado
4. Recomendaciones
5. Conclusión`,
        useCase: 'Ideal para análisis de textos, artículos o documentos',
      },
      {
        name: 'Generación de Contenido',
        template: `Crea [TIPO_CONTENIDO] sobre [TEMA] con las siguientes especificaciones:
- Audiencia: [AUDIENCIA]
- Tono: [TONO]
- Longitud: [LONGITUD]
- Estructura: [ESTRUCTURA]
- Elementos clave a incluir: [ELEMENTOS]
- Llamada a la acción: [CTA]`,
        useCase: 'Perfecto para crear contenido estructurado y orientado a objetivos',
      },
    ],
  },
];

export default function AdvancedPage() {
  return (
    <div className="container max-w-4xl mx-auto py-4 px-4 md:px-0">
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <BookOpen className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold">Técnicas Avanzadas</h1>
        </div>

        <p className="text-muted-foreground text-lg">
          Domina técnicas avanzadas de prompt engineering para obtener resultados más precisos y efectivos en tus interacciones con IA. Estas técnicas
          te permitirán crear prompts más sofisticados y obtener mejores resultados.
        </p>

        <div className="grid gap-6">
          {techniques.map((technique, index) => (
            <Card key={index}>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10 text-primary">
                    <technique.icon className="h-6 w-6" />
                  </div>
                  <CardTitle>{technique.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-muted-foreground">{technique.description}</p>

                  {technique.details && (
                    <div className="pl-4 border-l-2 border-primary/20">
                      <h3 className="font-medium mb-2">Características principales:</h3>
                      <ul className="space-y-2">
                        {technique.details.map((detail, i) => (
                          <li key={i} className="text-muted-foreground">
                            • {detail}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {technique.example && (
                    <div className="bg-muted/50 p-4 rounded-lg space-y-3">
                      <h3 className="font-medium">Ejemplo de Aplicación</h3>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Prompt básico:</p>
                        <div className="bg-background p-3 rounded border mt-1">
                          <p className="text-sm font-mono">{technique.example.prompt}</p>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Prompt mejorado:</p>
                        <div className="bg-background p-3 rounded border mt-1">
                          <p className="text-sm font-mono whitespace-pre-wrap">{technique.example.improved}</p>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">{technique.example.explanation}</p>
                    </div>
                  )}

                  {technique.templates && (
                    <div className="space-y-4">
                      <h3 className="font-medium">Plantillas de Ejemplo</h3>
                      {technique.templates.map((template, i) => (
                        <div key={i} className="bg-muted/50 p-4 rounded-lg space-y-2">
                          <h4 className="font-medium">{template.name}</h4>
                          <div className="bg-background p-3 rounded border">
                            <p className="text-sm font-mono whitespace-pre-wrap">{template.template}</p>
                          </div>
                          <p className="text-sm text-muted-foreground">{template.useCase}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
