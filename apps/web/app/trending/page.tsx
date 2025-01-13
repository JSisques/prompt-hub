'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PromptCard } from '@/components/prompts/card';
import { Clock, Flame, Star, TrendingUp } from 'lucide-react';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <TrendingUp className="h-8 w-8 text-primary" />
          {t('pages.trending.title')}
        </h1>
        <p className="text-muted-foreground mt-2">{t('pages.trending.subtitle')}</p>
      </div>

      {/* Categorías */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map(category => (
          <Button key={category.id} variant="outline" className="flex items-center gap-2 whitespace-nowrap">
            <category.icon className="h-4 w-4" />
            {t(`pages.trending.categories.${category.id}`)}
          </Button>
        ))}
      </div>

      {/* Períodos de tiempo */}
      <Tabs defaultValue="today" className="space-y-6">
        <TabsList className="w-full grid grid-cols-3">
          <TabsTrigger value="today" className="flex-1 flex items-center justify-center gap-2">
            <Clock className="h-4 w-4" />
            {t('pages.trending.timePeriods.today')}
          </TabsTrigger>
          <TabsTrigger value="week" className="flex-1 flex items-center justify-center gap-2">
            <TrendingUp className="h-4 w-4" />
            {t('pages.trending.timePeriods.week')}
          </TabsTrigger>
          <TabsTrigger value="month" className="flex-1 flex items-center justify-center gap-2">
            <Star className="h-4 w-4" />
            {t('pages.trending.timePeriods.month')}
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
            <CardTitle className="text-lg">{t('pages.trending.stats.popularPrompts.title')}</CardTitle>
            <CardDescription>{t('pages.trending.stats.popularPrompts.description')}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary">1,234</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">{t('pages.trending.stats.interactions.title')}</CardTitle>
            <CardDescription>{t('pages.trending.stats.interactions.description')}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary">5,678</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">{t('pages.trending.stats.activeUsers.title')}</CardTitle>
            <CardDescription>{t('pages.trending.stats.activeUsers.description')}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary">890</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
