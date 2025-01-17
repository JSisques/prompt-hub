'use client';

import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PromptCard } from '@/components/prompts/card';
import { Clock, Star, TrendingUp } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { graphqlClient } from '@/lib/apollo-client';
import { GET_TRENDING_CATEGORIES, GET_TRENDING_PROMPTS } from '@/lib/graphql';
import { Category, Prompt } from '@/lib/types';
import { useQuery } from '@tanstack/react-query';

export default function TrendingPage() {
  const { t } = useTranslation();
  const [timePeriod, setTimePeriod] = useState<'today' | 'week' | 'month'>('today');
  const [categoryId, setCategoryId] = useState<string | undefined>(undefined);

  const { data: prompts = [], isLoading: isLoadingPrompts } = useQuery({
    queryKey: ['trending-prompts', timePeriod, categoryId],
    queryFn: async () => {
      const { data } = await graphqlClient.query({
        query: GET_TRENDING_PROMPTS,
        variables: { timePeriod, categoryId },
      });
      return data.getTrendingPrompts;
    },
  });

  const { data: categories = [], isLoading: isLoadingCategories } = useQuery({
    queryKey: ['trending-categories', timePeriod],
    queryFn: async () => {
      const { data } = await graphqlClient.query({
        query: GET_TRENDING_CATEGORIES,
        variables: { timePeriod },
      });
      return data.getTrendingCategories;
    },
  });

  const isLoading = isLoadingPrompts || isLoadingCategories;

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
        {categories.map((category: Category) => (
          <Button
            key={category.id}
            variant={categoryId === category.id ? 'secondary' : 'outline'}
            className="flex items-center gap-2 whitespace-nowrap"
            onClick={() => setCategoryId(categoryId === category.id ? undefined : category.id)}
          >
            <TrendingUp className="h-4 w-4" />
            {category.name}
          </Button>
        ))}
      </div>

      {/* Períodos de tiempo */}
      <Tabs defaultValue="today" className="space-y-6">
        <TabsList className="w-full grid grid-cols-3">
          <TabsTrigger value="today" className="flex-1 flex items-center justify-center gap-2" onClick={() => setTimePeriod('today')}>
            <Clock className="h-4 w-4" />
            {t('pages.trending.timePeriods.today')}
          </TabsTrigger>
          <TabsTrigger value="week" className="flex-1 flex items-center justify-center gap-2" onClick={() => setTimePeriod('week')}>
            <TrendingUp className="h-4 w-4" />
            {t('pages.trending.timePeriods.week')}
          </TabsTrigger>
          <TabsTrigger value="month" className="flex-1 flex items-center justify-center gap-2" onClick={() => setTimePeriod('month')}>
            <Star className="h-4 w-4" />
            {t('pages.trending.timePeriods.month')}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="today" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {prompts.map((prompt: Prompt) => (
              <PromptCard key={prompt.id} {...prompt} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="week" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {prompts.map((prompt: Prompt) => (
              <PromptCard key={prompt.id} {...prompt} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="month" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {prompts.map((prompt: Prompt) => (
              <PromptCard key={prompt.id} {...prompt} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
