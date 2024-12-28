import { Suspense } from 'react';
import { CategoriesContent } from '@/components/categories/content';
import { CategoriesLoading } from '@/components/categories/loading';

export default function CategoriesPage() {
  return (
    <Suspense fallback={<CategoriesLoading />}>
      <CategoriesContent />
    </Suspense>
  );
}
