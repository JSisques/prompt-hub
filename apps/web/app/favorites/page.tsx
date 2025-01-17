'use client';

import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Grid2X2, List, Heart, Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { PromptCard } from '@/components/prompts/card';
import { useTranslation } from 'react-i18next';
import { graphqlClient } from '@/lib/apollo-client';
import { GET_FAVORITES_BY_USER_ID } from '@/lib/graphql';
import { useSession } from 'next-auth/react';
import { Prompt } from '@/types/prompt';

export default function FavoritesPage() {
  const { t } = useTranslation();
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [favorites, setFavorites] = useState<Prompt[]>([]);

  const { data: session } = useSession();

  const fetchFavorites = async () => {
    if (!session?.user?.id) return;
    setIsLoading(true);
    const { data } = await graphqlClient.query({
      query: GET_FAVORITES_BY_USER_ID,
      variables: { userId: session?.user?.id },
    });
    setFavorites(data.getFavoritesByUserId);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchFavorites();
  }, [session]);

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

      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : favorites.length === 0 ? (
        <Card className="p-8 text-center">
          <p className="text-muted-foreground">{t('pages.favorites.empty')}</p>
        </Card>
      ) : (
        <div className={view === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
          {favorites.map(prompt => (
            <PromptCard
              key={prompt.id}
              id={prompt.id}
              title={prompt.title}
              description={prompt.description}
              tags={prompt.tags}
              user={prompt.user}
              category={prompt.category}
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
