'use client';

import { useQuery } from '@apollo/client';
import { GET_CATEGORIES } from '@/lib/graphql/index';
import { GetCategoriesResponse } from '@/types/graphql';
import { CategoriesHeader } from '@/components/categories/header';
import { CategoryCard } from '@/components/categories/category-card';
import { CategoriesLoading } from '@/components/categories/loading';
import { mockCategories } from '@/mock/categories';
import { MockCategory } from '@/types/mock';

export function CategoriesContent() {
  // Comentamos la llamada real a la API por ahora
  // const { data, loading, error } = useQuery<GetCategoriesResponse>(GET_CATEGORIES);

  const loading = false;
  const error = { message: '' };
  const data: { categories: MockCategory[] } = { categories: mockCategories };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <CategoriesLoading />
      </div>
    );
  }

  if (error.message) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-500 mb-2">Error</h2>
          <p className="text-muted-foreground">{error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <CategoriesHeader />
      <div className="mt-12 space-y-8">{data?.categories.map(category => <CategoryCard key={category.id} category={category} />)}</div>
    </div>
  );
}
