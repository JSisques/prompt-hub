'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PromptCard } from '@/components/prompts/card';
import { Clock, Flame, Star, TrendingUp } from 'lucide-react';

// Datos de ejemplo - esto vendría de una API
const mockTrendingPrompts = {
  today: [
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
    // Añade más prompts
  ],
  week: [
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
    // Añade más prompts
  ],
  month: [
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
    // Añade más prompts
  ],
};

const categories = [
  { id: 'all', label: 'Todo', icon: Star },
  { id: 'ai', label: 'Inteligencia Artificial', icon: TrendingUp },
  { id: 'development', label: 'Desarrollo', icon: TrendingUp },
  { id: 'design', label: 'Diseño', icon: TrendingUp },
  { id: 'writing', label: 'Escritura', icon: TrendingUp },
];

export default function TrendingPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <TrendingUp className="h-8 w-8 text-primary" />
          Trending
        </h1>
        <p className="text-muted-foreground mt-2">Descubre los prompts más populares y tendencias actuales.</p>
      </div>

      {/* Categorías */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map(category => (
          <Button key={category.id} variant="outline" className="flex items-center gap-2 whitespace-nowrap">
            <category.icon className="h-4 w-4" />
            {category.label}
          </Button>
        ))}
      </div>

      {/* Períodos de tiempo */}
      <Tabs defaultValue="today" className="space-y-6">
        <TabsList className="w-full grid grid-cols-3">
          <TabsTrigger value="today" className="flex-1 flex items-center justify-center gap-2">
            <Clock className="h-4 w-4" />
            Hoy
          </TabsTrigger>
          <TabsTrigger value="week" className="flex-1 flex items-center justify-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Esta Semana
          </TabsTrigger>
          <TabsTrigger value="month" className="flex-1 flex items-center justify-center gap-2">
            <Star className="h-4 w-4" />
            Este Mes
          </TabsTrigger>
        </TabsList>

        <TabsContent value="today" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockTrendingPrompts.today.map(prompt => (
              <PromptCard key={prompt.id} {...prompt} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="week" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockTrendingPrompts.week.map(prompt => (
              <PromptCard key={prompt.id} {...prompt} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="month" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockTrendingPrompts.month.map(prompt => (
              <PromptCard key={prompt.id} {...prompt} />
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Prompts Populares</CardTitle>
            <CardDescription>En las últimas 24 horas</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary">1,234</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Interacciones</CardTitle>
            <CardDescription>Likes y comentarios</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary">5,678</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Usuarios Activos</CardTitle>
            <CardDescription>Creadores de contenido</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary">890</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
