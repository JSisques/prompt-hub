'use client';

import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Grid2X2, List, Heart } from 'lucide-react';
import { useState } from 'react';
import { PromptCard } from '@/components/prompts/card';
import { useTranslation } from 'react-i18next';

// Datos de ejemplo - esto vendría de una API
const mockFavorites = [
  {
    id: '1',
    title: 'Generador de Historias Creativas',
    description: 'Un prompt que ayuda a crear historias originales con personajes únicos y tramas interesantes.',
    tags: ['creatividad', 'escritura', 'historias'],
    author: 'María García',
    createdAt: new Date('2024-01-15'),
    likes: 245,
    comments: 18,
  },
  {
    id: '2',
    title: 'Optimizador de Código Python',
    description: 'Mejora tu código Python haciéndolo más eficiente y legible con este prompt especializado.',
    tags: ['programación', 'python', 'optimización'],
    author: 'Carlos Ruiz',
    createdAt: new Date('2024-01-20'),
    likes: 189,
    comments: 12,
  },
  // Añade más prompts de ejemplo aquí
];

export default function FavoritesPage() {
  const { t } = useTranslation();
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFavorites = mockFavorites.filter(
    prompt =>
      prompt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prompt.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prompt.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())),
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Heart className="h-8 w-8 text-primary" />
            {t('pages.favorites.title')}
          </h1>
          <p className="text-muted-foreground mt-2">{t('pages.favorites.subtitle')}</p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant={view === 'grid' ? 'default' : 'outline'} size="icon" onClick={() => setView('grid')}>
            <Grid2X2 className="h-4 w-4" />
            <span className="sr-only">{t('pages.favorites.views.grid')}</span>
          </Button>
          <Button variant={view === 'list' ? 'default' : 'outline'} size="icon" onClick={() => setView('list')}>
            <List className="h-4 w-4" />
            <span className="sr-only">{t('pages.favorites.views.list')}</span>
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder={t('pages.favorites.search.placeholder')}
            className="pl-9"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {filteredFavorites.length === 0 ? (
        <Card className="p-8 text-center">
          <p className="text-muted-foreground">{t('pages.favorites.empty')}</p>
        </Card>
      ) : (
        <div className={view === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
          {filteredFavorites.map(prompt => (
            <PromptCard
              key={prompt.id}
              id={prompt.id}
              title={prompt.title}
              description={prompt.description}
              tags={prompt.tags}
              author={prompt.author}
              createdAt={prompt.createdAt}
              likes={prompt.likes}
              comments={prompt.comments}
            />
          ))}
        </div>
      )}
    </div>
  );
}
