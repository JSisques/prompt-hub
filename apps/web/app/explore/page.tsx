'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, SlidersHorizontal } from 'lucide-react';
import { useState } from 'react';
import { PromptCard } from '@/components/prompts/card';

// Datos de ejemplo - esto vendría de una API
const mockPrompts = [
  {
    id: '1',
    title: 'Asistente de Escritura Creativa',
    description: 'Un prompt inteligente que te ayuda a superar el bloqueo del escritor y generar ideas creativas.',
    tags: ['escritura', 'creatividad', 'storytelling'],
    author: 'Ana Martínez',
    createdAt: new Date('2024-02-01'),
    likes: 523,
    comments: 45,
  },
  {
    id: '2',
    title: 'Generador de Código Clean',
    description: 'Mejora la calidad de tu código con este prompt que aplica principios de clean code.',
    tags: ['programación', 'clean-code', 'desarrollo'],
    author: 'David López',
    createdAt: new Date('2024-01-28'),
    likes: 892,
    comments: 67,
  },
  {
    id: '3',
    title: 'Prompt para Diseño UI/UX',
    description: 'Obtén sugerencias expertas para mejorar tus diseños de interfaz de usuario.',
    tags: ['diseño', 'ui', 'ux'],
    author: 'Laura Sánchez',
    createdAt: new Date('2024-01-15'),
    likes: 1247,
    comments: 89,
  },
];

const filters = [
  {
    id: 'model',
    label: 'Modelo',
    options: [
      { value: 'all', label: 'Todos' },
      { value: 'gpt-4', label: 'GPT-4' },
      { value: 'gpt-3.5', label: 'GPT-3.5' },
      { value: 'claude', label: 'Claude' },
    ],
  },
  {
    id: 'language',
    label: 'Idioma',
    options: [
      { value: 'all', label: 'Todos' },
      { value: 'es', label: 'Español' },
      { value: 'en', label: 'Inglés' },
    ],
  },
  {
    id: 'category',
    label: 'Categoría',
    options: [
      { value: 'all', label: 'Todas' },
      { value: 'writing', label: 'Escritura' },
      { value: 'programming', label: 'Programación' },
      { value: 'design', label: 'Diseño' },
    ],
  },
];

export default function ExplorePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="container px-4 md:px-6 py-8">
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold">Explorar Prompts</h1>
          <p className="text-muted-foreground mt-2">Descubre prompts útiles para diferentes propósitos y modelos de IA.</p>
        </div>

        {/* Búsqueda y Filtros */}
        <div className="space-y-4">
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Buscar prompts..." className="pl-9" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
            </div>
            <Button variant="outline" className="flex items-center gap-2" onClick={() => setShowFilters(!showFilters)}>
              <SlidersHorizontal className="h-4 w-4" />
              Filtros
            </Button>
          </div>

          {/* Filtros expandibles */}
          {showFilters && (
            <Card className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {filters.map(filter => (
                  <div key={filter.id} className="space-y-2">
                    <label className="text-sm font-medium">{filter.label}</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder={`Seleccionar ${filter.label.toLowerCase()}`} />
                      </SelectTrigger>
                      <SelectContent>
                        {filter.options.map(option => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                ))}
              </div>
            </Card>
          )}
        </div>

        {/* Resultados */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {mockPrompts.map(prompt => (
            <PromptCard key={prompt.id} {...prompt} />
          ))}
        </div>
      </div>
    </div>
  );
}
