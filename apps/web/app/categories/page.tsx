'use client';

import { SearchBar } from '@/components/ui/searchBar';
import { PromptCard } from '@/components/prompt-card';
import { useQuery } from '@apollo/client';
import { GET_CATEGORIES } from '@/lib/graphql/index';
import { Skeleton } from '@/components/ui/skeleton';
import { Category, GetCategoriesResponse } from '@/types/graphql';

const CategoriesPage = () => {
  const { data, loading, error } = useQuery<GetCategoriesResponse>(GET_CATEGORIES);

  if (loading) {
    return <LoadingSkeleton />;
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-red-500">Error al cargar las categorías: {error.message}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Categorías</h1>
        <p className="text-muted-foreground">Explora nuestra colección de prompts organizados por categorías</p>
      </div>

      <div className="mb-8">
        <SearchBar />
      </div>

      <div className="space-y-12">
        {data?.categories.map((category: Category) => (
          <section key={category.id} className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold">{category.title}</h2>
              <p className="text-muted-foreground">{category.description}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {category.prompts.map(prompt => (
                <PromptCard
                  key={prompt.id}
                  id={prompt.id}
                  title={prompt.title}
                  description={prompt.description}
                  tags={prompt.tags}
                  author={prompt.author.username}
                  createdAt={new Date(prompt.createdAt)}
                  likes={prompt.likes}
                  comments={prompt.comments}
                />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};

const LoadingSkeleton = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <Skeleton className="h-12 w-64 mb-4" />
        <Skeleton className="h-6 w-96" />
      </div>

      <div className="mb-8">
        <Skeleton className="h-12 w-full" />
      </div>

      <div className="space-y-12">
        {[1, 2].map(i => (
          <div key={i} className="space-y-6">
            <div className="space-y-2">
              <Skeleton className="h-8 w-48" />
              <Skeleton className="h-6 w-96" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map(j => (
                <Skeleton key={j} className="h-64 w-full" />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoriesPage;
