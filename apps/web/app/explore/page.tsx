'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Link, Loader2, Search, SlidersHorizontal } from 'lucide-react';
import { useEffect, useState, useCallback } from 'react';
import { PromptCard } from '@/components/prompts/card';
import { t } from 'i18next';
import { useTranslation } from 'react-i18next';
import { graphqlClient } from '@/lib/apollo-client';
import { GET_CATEGORIES, GET_LLMS, GET_PROMPTS, GET_PROMPTS_BY_NAME } from '@/lib/graphql';
import { Category, LLM, Prompt } from '@/lib/types';
import debounce from 'lodash/debounce';

export default function ExplorePage() {
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [prompts, setPrompts] = useState<Prompt[]>([]);

  const [isLoadingFilters, setIsLoadingFilters] = useState(false);
  const [models, setModels] = useState<LLM[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  const { t } = useTranslation();

  const fetchPrompts = async (query?: string) => {
    setLoading(true);
    try {
      if (query) {
        const { data } = await graphqlClient.query({
          query: GET_PROMPTS_BY_NAME,
          variables: {
            name: query,
          },
        });
        setPrompts(data.getPromptsByName);
      } else {
        const { data } = await graphqlClient.query({
          query: GET_PROMPTS,
        });
        setPrompts(data.getPrompts);
      }
    } catch (error) {
      console.error('Error fetching prompts:', error);
    } finally {
      setLoading(false);
    }
  };

  // Debounced search function
  const debouncedSearch = useCallback(
    debounce((query: string) => {
      fetchPrompts(query);
    }, 300),
    [],
  );

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    debouncedSearch(query);
  };

  const fetchModels = async () => {
    setIsLoadingFilters(true);
    const { data } = await graphqlClient.query({
      query: GET_LLMS,
    });
    setModels(data.getLlms);
    setIsLoadingFilters(false);
  };

  const fetchCategories = async () => {
    setIsLoadingFilters(true);
    const { data } = await graphqlClient.query({
      query: GET_CATEGORIES,
    });
    setCategories(data.getCategories);
    setIsLoadingFilters(false);
  };

  useEffect(() => {
    fetchPrompts();
    fetchModels();
    fetchCategories();
  }, []);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Search className="h-8 w-8 text-primary" />
          {t('pages.explore.title')}
        </h1>
        <p className="text-muted-foreground mt-2">{t('pages.explore.subtitle')}</p>
      </div>

      {/* Búsqueda y Filtros */}
      <div className="space-y-4">
        <div className="flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder={t('pages.explore.search')} className="pl-9" value={searchQuery} onChange={handleSearchChange} />
          </div>
          <Button variant="outline" className="flex items-center gap-2" onClick={() => setShowFilters(!showFilters)}>
            <SlidersHorizontal className="h-4 w-4" />
            {t('pages.explore.filters')}
          </Button>
        </div>

        {/* Filtros expandibles */}
        {showFilters && (
          <Card className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {isLoadingFilters ? (
                <div className="flex justify-center items-center h-screen">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : (
                <>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">{t('pages.explore.filterOptions.model.label')}</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder={t('pages.explore.select.placeholder', { field: t('pages.explore.filterOptions.model.label') })} />
                      </SelectTrigger>
                      <SelectContent>
                        {models?.map(model => (
                          <SelectItem key={model.id} value={model.id}>
                            {model.name}
                          </SelectItem>
                        )) || []}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">{t('pages.explore.filterOptions.category.label')}</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue
                          placeholder={t('pages.explore.select.placeholder', { field: t('pages.explore.filterOptions.category.label') })}
                        />
                      </SelectTrigger>
                      <SelectContent>
                        {categories?.map(category => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.name}
                          </SelectItem>
                        )) || []}
                      </SelectContent>
                    </Select>
                  </div>
                </>
              )}
            </div>
          </Card>
        )}
      </div>

      {/* Resultados */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {loading ? (
          <div className="flex justify-center items-center h-screen">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : prompts.length > 0 ? (
          prompts.map((prompt: Prompt) => (
            <a href={`/prompt/${prompt.id}`} key={prompt.id}>
              <PromptCard key={prompt.id} {...prompt} />
            </a>
          ))
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
            <Search className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold">{t('pages.explore.noResults.title')}</h3>
            <p className="text-muted-foreground mt-2">{t('pages.explore.noResults.description')}</p>
          </div>
        )}
      </div>
    </div>
  );
}
