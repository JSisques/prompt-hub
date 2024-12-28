'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, Lightbulb, Sparkles, Star, Target, Video } from 'lucide-react';
import Link from 'next/link';

const guides = [
  {
    title: 'Fundamentos de Prompts',
    description: 'Aprende los conceptos básicos para crear prompts efectivos.',
    icon: BookOpen,
    href: '/learn/basics',
    level: 'Principiante',
  },
  {
    title: 'Técnicas Avanzadas',
    description: 'Domina técnicas avanzadas para mejorar tus resultados.',
    icon: Target,
    href: '/learn/advanced',
    level: 'Avanzado',
  },
  {
    title: 'Mejores Prácticas',
    description: 'Descubre las mejores prácticas y consejos de expertos.',
    icon: Star,
    href: '/learn/best-practices',
    level: 'Intermedio',
  },
];

const featuredArticles = [
  {
    title: 'Cómo Escribir Prompts Claros y Efectivos',
    description: 'Guía paso a paso para mejorar la claridad de tus prompts.',
    category: 'Tutorial',
    readTime: '5 min',
    href: '/learn/articles/writing-clear-prompts',
  },
  {
    title: 'Optimización de Prompts para Diferentes IAs',
    description: 'Aprende a adaptar tus prompts según el modelo de IA.',
    category: 'Guía',
    readTime: '8 min',
    href: '/learn/articles/optimizing-prompts',
  },
  {
    title: 'Patrones Comunes en Prompts Exitosos',
    description: 'Análisis de los patrones más efectivos en prompts populares.',
    category: 'Análisis',
    readTime: '6 min',
    href: '/learn/articles/successful-patterns',
  },
];

const resources = [
  {
    title: 'Videotutoriales',
    description: 'Aprende visualmente con nuestros tutoriales en video.',
    icon: Video,
    href: '/learn/videos',
  },
  {
    title: 'Ejemplos Prácticos',
    description: 'Biblioteca de ejemplos reales y casos de estudio.',
    icon: Lightbulb,
    href: '/learn/examples',
  },
  {
    title: 'Ejercicios Interactivos',
    description: 'Practica y mejora tus habilidades con ejercicios.',
    icon: Sparkles,
    href: '/learn/exercises',
  },
];

export default function LearnPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <BookOpen className="h-8 w-8 text-primary" />
          Aprende
        </h1>
        <p className="text-muted-foreground mt-2">Domina el arte de crear prompts efectivos y aprovecha al máximo las capacidades de la IA.</p>
      </div>

      {/* Guías Principales */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        {guides.map(guide => (
          <Card key={guide.href} className="relative group hover:shadow-lg transition-all">
            <Link href={guide.href} className="absolute inset-0" />
            <CardHeader>
              <div className="flex items-center gap-4">
                <div className="p-2 rounded-lg bg-primary/10 text-primary">
                  <guide.icon className="h-6 w-6" />
                </div>
                <div>
                  <CardTitle className="group-hover:text-primary transition-colors">{guide.title}</CardTitle>
                  <CardDescription>{guide.level}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{guide.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Artículos Destacados */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Artículos Destacados</h2>
          <Button variant="outline">Ver todos</Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredArticles.map(article => (
            <Card key={article.href} className="relative group hover:shadow-lg transition-all">
              <Link href={article.href} className="absolute inset-0" />
              <CardHeader>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>{article.category}</span>
                    <span>•</span>
                    <span>{article.readTime}</span>
                  </div>
                  <CardTitle className="group-hover:text-primary transition-colors">{article.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{article.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
