'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Star, TrendingUp, Filter, Tag } from 'lucide-react';

// Datos de ejemplo - esto vendría de una API
const mockPrompts = {
  featured: [
    {
      id: '1',
      title: 'Pack de Prompts para Marketing Digital',
      description: 'Una colección curada de prompts para optimizar tu estrategia de marketing digital.',
      tags: ['marketing', 'seo', 'redes-sociales'],
      author: 'Marketing Pro',
      price: 29.99,
      rating: 4.8,
      reviews: 156,
      createdAt: new Date('2024-02-01'),
    },
    {
      id: '2',
      title: 'Prompts para Desarrollo Web',
      description: 'Mejora tu productividad como desarrollador con estos prompts especializados.',
      tags: ['desarrollo', 'programación', 'web'],
      author: 'Dev Master',
      price: 39.99,
      rating: 4.9,
      reviews: 203,
      createdAt: new Date('2024-01-28'),
    },
  ],
  new: [
    {
      id: '3',
      title: 'Asistente de Escritura Creativa Pro',
      description: 'Supera el bloqueo del escritor con prompts avanzados de storytelling.',
      tags: ['escritura', 'creatividad', 'storytelling'],
      author: 'Write Expert',
      price: 24.99,
      rating: 4.7,
      reviews: 89,
      createdAt: new Date('2024-02-05'),
    },
  ],
  trending: [
    {
      id: '4',
      title: 'Pack Premium de Diseño UI/UX',
      description: 'Prompts especializados para diseñadores de interfaces y experiencia de usuario.',
      tags: ['diseño', 'ui', 'ux'],
      author: 'Design Pro',
      price: 49.99,
      rating: 5.0,
      reviews: 178,
      createdAt: new Date('2024-01-20'),
    },
  ],
};

const categories = [
  { id: 'all', label: 'Todo', icon: Star },
  { id: 'business', label: 'Negocios', icon: TrendingUp },
  { id: 'development', label: 'Desarrollo', icon: TrendingUp },
  { id: 'design', label: 'Diseño', icon: TrendingUp },
  { id: 'writing', label: 'Escritura', icon: TrendingUp },
];

const priceRanges = [
  { value: 'all', label: 'Todos los precios' },
  { value: 'under-20', label: 'Menos de 20€' },
  { value: '20-50', label: '20€ - 50€' },
  { value: 'over-50', label: 'Más de 50€' },
];

export default function MarketplacePage() {
  return (
    <div className="container px-4 md:px-6 py-8">
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold">Marketplace</h1>
          <p className="text-muted-foreground mt-2">Descubre y adquiere prompts premium creados por expertos.</p>
        </div>

        {/* Búsqueda y Filtros */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Buscar prompts premium..." className="pl-9" />
          </div>
          <Button variant="outline" className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            Filtros
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <Tag className="h-4 w-4" />
            Categorías
          </Button>
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

        {/* Contenido Principal */}
        <Tabs defaultValue="featured" className="space-y-8">
          <TabsList>
            <TabsTrigger value="featured">Destacados</TabsTrigger>
            <TabsTrigger value="new">Nuevos</TabsTrigger>
            <TabsTrigger value="trending">Tendencias</TabsTrigger>
          </TabsList>

          <TabsContent value="featured" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockPrompts.featured.map(prompt => (
                <Card key={prompt.id} className="flex flex-col">
                  <CardHeader>
                    <CardTitle>{prompt.title}</CardTitle>
                    <CardDescription>{prompt.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                        <span className="font-medium">{prompt.rating}</span>
                        <span className="text-muted-foreground">({prompt.reviews} reseñas)</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {prompt.tags.map(tag => (
                          <span key={tag} className="px-2 py-1 bg-primary/10 text-primary rounded-full text-sm">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold">{prompt.price}€</span>
                        <Button>Comprar Ahora</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="new" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockPrompts.new.map(prompt => (
                <Card key={prompt.id} className="flex flex-col">
                  <CardHeader>
                    <CardTitle>{prompt.title}</CardTitle>
                    <CardDescription>{prompt.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                        <span className="font-medium">{prompt.rating}</span>
                        <span className="text-muted-foreground">({prompt.reviews} reseñas)</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {prompt.tags.map(tag => (
                          <span key={tag} className="px-2 py-1 bg-primary/10 text-primary rounded-full text-sm">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold">{prompt.price}€</span>
                        <Button>Comprar Ahora</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="trending" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockPrompts.trending.map(prompt => (
                <Card key={prompt.id} className="flex flex-col">
                  <CardHeader>
                    <CardTitle>{prompt.title}</CardTitle>
                    <CardDescription>{prompt.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                        <span className="font-medium">{prompt.rating}</span>
                        <span className="text-muted-foreground">({prompt.reviews} reseñas)</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {prompt.tags.map(tag => (
                          <span key={tag} className="px-2 py-1 bg-primary/10 text-primary rounded-full text-sm">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold">{prompt.price}€</span>
                        <Button>Comprar Ahora</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
