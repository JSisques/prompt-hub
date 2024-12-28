import { PromptCard } from '@/components/prompts/card';
import { SearchBar } from '@/components/ui/searchBar';

// Datos de ejemplo - En producción vendrían de una API
const examplePrompts = [
  {
    id: '1',
    title: 'Asistente de Programación',
    description: 'Un prompt especializado para ayudarte con la programación y debugging de código...',
    tags: ['Programación', 'Desarrollo', 'Debugging'],
    author: 'María García',
    createdAt: new Date(),
    likes: 42,
    comments: 5,
  },
  {
    id: '2',
    title: 'Escritor Creativo',
    description: 'Genera historias creativas y contenido original con este prompt especializado...',
    tags: ['Escritura', 'Creatividad', 'Contenido'],
    author: 'Juan Pérez',
    createdAt: new Date(),
    likes: 38,
    comments: 7,
  },
  {
    id: '3',
    title: 'Análisis de Datos',
    description: 'Prompt optimizado para el análisis y visualización de datos complejos...',
    tags: ['Datos', 'Análisis', 'IA'],
    author: 'Ana Martínez',
    createdAt: new Date(),
    likes: 56,
    comments: 12,
  },
];

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <SearchBar />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {examplePrompts.map(prompt => (
          <PromptCard key={prompt.id} {...prompt} />
        ))}
      </div>
    </main>
  );
}
