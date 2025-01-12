'use client';

import { BookOpen } from 'lucide-react';
import { BlogCard } from '@/components/blog/card';
import { FeaturedPost } from '@/components/blog/featured-post';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { redirect } from 'next/navigation';

// Datos de ejemplo - esto vendría de una API o CMS
const featuredPost = {
  slug: 'mejores-practicas-prompt-engineering',
  title: 'Las Mejores Prácticas para el Prompt Engineering en 2024',
  excerpt: 'Descubre las técnicas más efectivas para crear prompts que maximicen el rendimiento de los modelos de IA más avanzados.',
  coverImage: '/blog/featured-post.jpg',
  date: '2024-03-15',
  author: {
    name: 'María García',
    avatar: 'https://github.com/shadcn.png',
  },
  category: 'Guías',
  estimatedReadTime: 8,
};

const posts = [
  {
    slug: 'introduccion-chatgpt',
    title: 'Introducción a ChatGPT: Todo lo que Necesitas Saber',
    excerpt: 'Una guía completa para principiantes sobre cómo aprovechar al máximo ChatGPT en tu día a día.',
    coverImage: '/blog/chatgpt-intro.jpg',
    date: '2024-03-10',
    author: {
      name: 'Carlos Ruiz',
      avatar: 'https://github.com/shadcn.png',
    },
    category: 'Tutoriales',
    estimatedReadTime: 5,
  },
  {
    slug: 'dall-e-3-novedades',
    title: 'DALL-E 3: Las Nuevas Funcionalidades que Debes Conocer',
    excerpt: 'Explora las últimas actualizaciones de DALL-E 3 y cómo pueden mejorar tus creaciones artísticas.',
    coverImage: '/blog/dalle-3.jpg',
    date: '2024-03-08',
    author: {
      name: 'Ana López',
      avatar: 'https://github.com/shadcn.png',
    },
    category: 'Noticias',
    estimatedReadTime: 6,
  },
  {
    slug: 'prompts-creativos',
    title: '10 Prompts Creativos para Generar Historias Únicas',
    excerpt: 'Una colección de prompts probados que te ayudarán a generar historias fascinantes con IA.',
    coverImage: '/blog/creative-prompts.jpg',
    date: '2024-03-05',
    author: {
      name: 'David Martínez',
      avatar: 'https://github.com/shadcn.png',
    },
    category: 'Creatividad',
    estimatedReadTime: 7,
  },
];

const categories = ['Todos', 'Tutoriales', 'Guías', 'Noticias', 'Creatividad', 'Casos de Uso', 'Mejores Prácticas'];

export default function BlogPage() {
  // TODO: Remove this redirect and implement the blog page
  redirect('/under-construction');

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <BookOpen className="h-8 w-8 text-primary" />
          Blog
        </h1>
        <p className="text-muted-foreground mt-2">Explora artículos, tutoriales y guías sobre prompt engineering e inteligencia artificial.</p>
      </div>

      {/* Búsqueda y Categorías */}
      <div className="space-y-6">
        <Input type="search" placeholder="Buscar artículos..." className="max-w-md" />
        <div className="flex flex-wrap gap-2">
          {categories.map(category => (
            <Badge
              key={category}
              variant={category === 'Todos' ? 'default' : 'secondary'}
              className="rounded-full cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              {category}
            </Badge>
          ))}
        </div>
      </div>

      {/* Artículo Destacado */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Destacado</h2>
        <FeaturedPost {...featuredPost} />
      </section>

      {/* Lista de Artículos */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Últimos Artículos</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map(post => (
            <BlogCard key={post.slug} {...post} />
          ))}
        </div>
      </section>
    </div>
  );
}
