'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, Lightbulb, Sparkles, Star, Target, Video, Code, Brain, Palette, Briefcase, Wrench, LineChart } from 'lucide-react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';

const guides = [
  {
    id: 'basics',
    icon: BookOpen,
    href: '/learn/basics',
  },
  {
    id: 'bestPractices',
    icon: Star,
    href: '/learn/best-practices',
  },
  {
    id: 'advanced',
    icon: Target,
    href: '/learn/advanced',
  },
  {
    id: 'promptEngineering',
    icon: Code,
    href: '/learn/prompt-engineering',
  },
  {
    id: 'aiModels',
    icon: Brain,
    href: '/learn/ai-models',
  },
  {
    id: 'creativity',
    icon: Palette,
    href: '/learn/creativity',
  },
  {
    id: 'businessCases',
    icon: Briefcase,
    href: '/learn/business-cases',
  },
  {
    id: 'troubleshooting',
    icon: Wrench,
    href: '/learn/troubleshooting',
  },
  {
    id: 'evaluation',
    icon: LineChart,
    href: '/learn/evaluation',
  },
];

const featuredArticles = [
  {
    id: 'writingClearPrompts',
    href: '/learn/articles/writing-clear-prompts',
  },
  {
    id: 'optimizingPrompts',
    href: '/learn/articles/optimizing-prompts',
  },
  {
    id: 'successfulPatterns',
    href: '/learn/articles/successful-patterns',
  },
];

const resources = [
  {
    id: 'videos',
    icon: Video,
    href: '/learn/videos',
  },
  {
    id: 'examples',
    icon: Lightbulb,
    href: '/learn/examples',
  },
  {
    id: 'exercises',
    icon: Sparkles,
    href: '/learn/exercises',
  },
];

export default function LearnPage() {
  const { t } = useTranslation();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <BookOpen className="h-8 w-8 text-primary" />
          {t('pages.learn.title')}
        </h1>
        <p className="text-muted-foreground mt-2">{t('pages.learn.subtitle')}</p>
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
                  <CardTitle className="group-hover:text-primary transition-colors">{t(`pages.learn.guides.${guide.id}.title`)}</CardTitle>
                  <CardDescription>{t(`pages.learn.guides.${guide.id}.level`)}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{t(`pages.learn.guides.${guide.id}.description`)}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
