'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Star, Shield, AlertTriangle, CheckCircle2, XCircle, BookOpen, LucideIcon } from 'lucide-react';

interface Example {
  bad: string;
  good: string;
  explanation: string;
}

interface ProcessStep {
  step: string;
  description: string;
}

interface BaseItem {
  title: string;
  description: string;
}

interface ExampleItem extends BaseItem {
  examples: Example[];
  tips?: string[];
}

interface ChecklistItem extends BaseItem {
  checklist: string[];
}

interface GuidelinesItem extends BaseItem {
  guidelines: string[];
}

interface ConsiderationsItem extends BaseItem {
  considerations: string[];
}

interface ProcessItem extends BaseItem {
  process: ProcessStep[];
}

interface BestPracticesItem extends BaseItem {
  bestPractices: string[];
}

interface MethodologyItem extends BaseItem {
  methodology: string[];
}

type PracticeItem = ExampleItem | ChecklistItem | GuidelinesItem | ConsiderationsItem | ProcessItem | BestPracticesItem | MethodologyItem;

interface Practice {
  title: string;
  icon: LucideIcon;
  description: string;
  items: PracticeItem[];
}

const practices: Practice[] = [
  {
    title: 'Prácticas Recomendadas',
    icon: CheckCircle2,
    description: 'Implementa estas prácticas probadas para maximizar la efectividad de tus prompts.',
    items: [
      {
        title: 'Ser específico y claro',
        description: 'Utiliza un lenguaje preciso y evita ambigüedades. Cuanto más específico seas, mejores resultados obtendrás.',
        examples: [
          {
            bad: 'Escribe sobre perros.',
            good: 'Escribe una guía detallada sobre el cuidado diario de un perro labrador, incluyendo alimentación, ejercicio y cuidados veterinarios básicos.',
            explanation: 'El segundo prompt especifica el tema exacto, el tipo de contenido y los aspectos a cubrir.',
          },
        ],
        tips: ['Usa términos precisos y concretos', 'Especifica el formato deseado', 'Define el alcance del contenido'],
      },
      {
        title: 'Proporcionar contexto suficiente',
        description: 'Incluye toda la información relevante que la IA necesita para entender completamente la tarea.',
        examples: [
          {
            bad: 'Explica cómo mejorar el rendimiento.',
            good: 'Como entrenador profesional de atletismo, explica cómo mejorar el rendimiento en carreras de media distancia (5-10km) para un corredor intermedio que entrena 3 veces por semana y quiere prepararse para una competencia en 3 meses.',
            explanation: 'El segundo prompt proporciona contexto específico sobre el nivel, objetivos y restricciones.',
          },
        ],
        tips: [
          'Incluye información sobre el público objetivo',
          'Especifica el nivel de experiencia requerido',
          'Menciona limitaciones o requisitos importantes',
        ],
      },
      {
        title: 'Estructurar la información',
        description: 'Organiza tus prompts de manera lógica y utiliza formatos consistentes para mejorar la comprensión.',
        examples: [
          {
            bad: 'Dame ideas de marketing.',
            good: `Necesito ideas de marketing digital para una pequeña pastelería:

Requisitos:
- Presupuesto mensual: 500€
- Público objetivo: 25-45 años
- Ubicación: Centro de Madrid
- Objetivos: Aumentar ventas en un 30%

Por favor, proporciona:
1. 3 estrategias principales
2. Costos estimados
3. Cronograma de implementación
4. Métricas de éxito`,
            explanation: 'El segundo prompt está claramente estructurado con secciones definidas y requisitos específicos.',
          },
        ],
        tips: [
          'Usa listas y viñetas para organizar la información',
          'Separa claramente diferentes secciones',
          'Mantén un orden lógico en las instrucciones',
        ],
      },
    ],
  },
  {
    title: 'Prácticas a Evitar',
    icon: XCircle,
    description: 'Evita estos errores comunes que pueden llevar a resultados subóptimos.',
    items: [
      {
        title: 'Instrucciones vagas',
        description: 'Evita prompts genéricos o poco claros que puedan llevar a respuestas imprecisas.',
        examples: [
          {
            bad: 'Ayúdame con mi presentación.',
            good: 'Revisa mi presentación de ventas de 10 diapositivas para una startup de tecnología, enfocándote en: claridad del mensaje principal, estructura lógica, impacto visual y llamadas a la acción efectivas.',
            explanation: 'El segundo prompt especifica exactamente qué aspectos necesitan revisión.',
          },
        ],
      },
      {
        title: 'Sobrecarga de información',
        description: 'No incluyas información irrelevante que pueda confundir o distraer al modelo.',
        examples: [
          {
            bad: 'Necesito ayuda con mi proyecto de Python que estoy desarrollando desde hace 2 años cuando empecé a programar después de cambiar de carrera desde marketing, y ahora estoy tratando de implementar un nuevo feature pero no sé si debería usar una clase o una función...',
            good: 'Necesito ayuda para decidir entre usar una clase o una función en Python para implementar un sistema de caché. Los requisitos principales son: almacenamiento temporal de datos, límite de memoria y expiración automática.',
            explanation: 'El segundo prompt se centra solo en la información relevante para la decisión técnica.',
          },
        ],
      },
      {
        title: 'Falta de estructura',
        description: 'Evita prompts desordenados o sin un objetivo claro.',
        examples: [
          {
            bad: 'Quiero hacer un blog y necesito contenido y también SEO y marketing y monetización y no sé por dónde empezar con todo esto...',
            good: `Necesito un plan paso a paso para lanzar un blog:

1. Primero, enfócate en la estrategia de contenido:
   - Temas principales
   - Calendario editorial
   - Estructura de los posts

2. Luego, proporciona recomendaciones para:
   - Optimización SEO básica
   - Estrategia de marketing inicial
   - Opciones de monetización

Por favor, prioriza las acciones por importancia y tiempo de implementación.`,
            explanation: 'El segundo prompt organiza las necesidades en un plan estructurado y priorizado.',
          },
        ],
      },
    ],
  },
  {
    title: 'Consideraciones de Seguridad',
    icon: Shield,
    description: 'Protege tu información y mantén un uso seguro de la IA.',
    items: [
      {
        title: 'Validación de salidas',
        description: 'Verifica siempre las respuestas generadas antes de utilizarlas en producción.',
        checklist: [
          'Revisa la precisión técnica del contenido',
          'Verifica que no haya sesgos o contenido inapropiado',
          'Comprueba la coherencia con tus requisitos',
          'Valida las fuentes y referencias cuando sea posible',
        ],
      },
      {
        title: 'Datos sensibles',
        description: 'No incluyas información personal o confidencial en tus prompts.',
        guidelines: [
          'Nunca incluyas contraseñas o credenciales',
          'Evita información personal identificable',
          'No compartas datos comerciales sensibles',
          'Usa datos de ejemplo en lugar de datos reales',
        ],
      },
      {
        title: 'Límites del modelo',
        description: 'Sé consciente de las limitaciones del modelo y no confíes ciegamente en sus respuestas.',
        considerations: [
          'Los modelos pueden generar información incorrecta',
          'Las respuestas pueden contener sesgos',
          'El conocimiento del modelo tiene una fecha de corte',
          'Algunas tareas requieren supervisión humana',
        ],
      },
    ],
  },
  {
    title: 'Consejos de Optimización',
    icon: Star,
    description: 'Mejora continuamente tus prompts para obtener mejores resultados.',
    items: [
      {
        title: 'Iteración y refinamiento',
        description: 'Prueba diferentes versiones de tus prompts y refina basándote en los resultados.',
        process: [
          {
            step: 'Versión inicial',
            description: 'Comienza con un prompt básico que cubra los requisitos principales.',
          },
          {
            step: 'Análisis de resultados',
            description: 'Evalúa la calidad y relevancia de las respuestas obtenidas.',
          },
          {
            step: 'Identificación de mejoras',
            description: 'Detecta áreas específicas que necesitan clarificación o ajuste.',
          },
          {
            step: 'Refinamiento',
            description: 'Ajusta el prompt basándote en el análisis y vuelve a probar.',
          },
        ],
      },
      {
        title: 'Documentación',
        description: 'Mantén un registro de los prompts efectivos y sus casos de uso específicos.',
        bestPractices: [
          'Documenta la versión final de los prompts exitosos',
          'Registra el contexto y objetivo de cada prompt',
          'Anota patrones que funcionan bien',
          'Comparte conocimientos con tu equipo',
        ],
      },
      {
        title: 'Feedback loop',
        description: 'Implementa un sistema para evaluar y mejorar continuamente tus prompts.',
        methodology: [
          'Establece métricas de éxito claras',
          'Recopila feedback de usuarios finales',
          'Analiza patrones en respuestas exitosas',
          'Adapta los prompts según los resultados',
        ],
      },
    ],
  },
];

function isExampleItem(item: PracticeItem): item is ExampleItem {
  return 'examples' in item;
}

function isChecklistItem(item: PracticeItem): item is ChecklistItem {
  return 'checklist' in item;
}

function isGuidelinesItem(item: PracticeItem): item is GuidelinesItem {
  return 'guidelines' in item;
}

function isConsiderationsItem(item: PracticeItem): item is ConsiderationsItem {
  return 'considerations' in item;
}

function isProcessItem(item: PracticeItem): item is ProcessItem {
  return 'process' in item;
}

function isBestPracticesItem(item: PracticeItem): item is BestPracticesItem {
  return 'bestPractices' in item;
}

function isMethodologyItem(item: PracticeItem): item is MethodologyItem {
  return 'methodology' in item;
}

export default function BestPracticesPage() {
  return (
    <div className="container max-w-4xl mx-auto py-4 px-4 md:px-0">
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <BookOpen className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold">Mejores Prácticas</h1>
        </div>

        <p className="text-muted-foreground text-lg">
          Descubre las mejores prácticas y recomendaciones para crear prompts efectivos y seguros. Aprende a evitar errores comunes y optimiza tus
          interacciones con IA.
        </p>

        <div className="grid gap-6">
          {practices.map((section, index) => (
            <Card key={index}>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10 text-primary">
                    <section.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <CardTitle>{section.title}</CardTitle>
                    {section.description && <p className="text-sm text-muted-foreground mt-1">{section.description}</p>}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6">
                  {section.items.map((item, i) => (
                    <div key={i} className="space-y-3">
                      <h3 className="font-medium">{item.title}</h3>
                      <p className="text-muted-foreground">{item.description}</p>

                      {isExampleItem(item) && item.examples && (
                        <div className="space-y-3">
                          {item.examples.map((example, j) => (
                            <div key={j} className="bg-muted/50 p-4 rounded-lg space-y-3">
                              <div className="space-y-2">
                                <div>
                                  <p className="text-sm font-medium text-red-500">❌ No recomendado:</p>
                                  <div className="bg-background p-3 rounded border mt-1">
                                    <p className="text-sm font-mono">{example.bad}</p>
                                  </div>
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-green-500">✅ Recomendado:</p>
                                  <div className="bg-background p-3 rounded border mt-1">
                                    <p className="text-sm font-mono whitespace-pre-wrap">{example.good}</p>
                                  </div>
                                </div>
                              </div>
                              <p className="text-sm text-muted-foreground">{example.explanation}</p>
                            </div>
                          ))}
                        </div>
                      )}

                      {isExampleItem(item) && item.tips && (
                        <ul className="space-y-1 pl-4 border-l-2 border-primary/20">
                          {item.tips.map((tip, j) => (
                            <li key={j} className="text-sm text-muted-foreground">
                              • {tip}
                            </li>
                          ))}
                        </ul>
                      )}

                      {isChecklistItem(item) && (
                        <ul className="space-y-1 pl-4 border-l-2 border-primary/20">
                          {item.checklist.map((check, j) => (
                            <li key={j} className="text-sm text-muted-foreground">
                              ✓ {check}
                            </li>
                          ))}
                        </ul>
                      )}

                      {isGuidelinesItem(item) && (
                        <ul className="space-y-1 pl-4 border-l-2 border-primary/20">
                          {item.guidelines.map((guideline, j) => (
                            <li key={j} className="text-sm text-muted-foreground">
                              • {guideline}
                            </li>
                          ))}
                        </ul>
                      )}

                      {isConsiderationsItem(item) && (
                        <ul className="space-y-1 pl-4 border-l-2 border-primary/20">
                          {item.considerations.map((consideration, j) => (
                            <li key={j} className="text-sm text-muted-foreground">
                              • {consideration}
                            </li>
                          ))}
                        </ul>
                      )}

                      {isProcessItem(item) && (
                        <div className="space-y-3 pl-4 border-l-2 border-primary/20">
                          {item.process.map((step, j) => (
                            <div key={j}>
                              <p className="font-medium text-sm">{step.step}</p>
                              <p className="text-sm text-muted-foreground">{step.description}</p>
                            </div>
                          ))}
                        </div>
                      )}

                      {isBestPracticesItem(item) && (
                        <ul className="space-y-1 pl-4 border-l-2 border-primary/20">
                          {item.bestPractices.map((practice, j) => (
                            <li key={j} className="text-sm text-muted-foreground">
                              • {practice}
                            </li>
                          ))}
                        </ul>
                      )}

                      {isMethodologyItem(item) && (
                        <ul className="space-y-1 pl-4 border-l-2 border-primary/20">
                          {item.methodology.map((method, j) => (
                            <li key={j} className="text-sm text-muted-foreground">
                              • {method}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
