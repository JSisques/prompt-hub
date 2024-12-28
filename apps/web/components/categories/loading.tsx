import { Skeleton } from '@/components/ui/skeleton';

export const CategoriesLoading = () => {
  return (
    <div className="space-y-8">
      {/* Header Skeleton */}
      <div className="space-y-4">
        <Skeleton className="h-12 w-64" />
        <Skeleton className="h-6 w-96" />
      </div>

      {/* Search Bar Skeleton */}
      <Skeleton className="h-12 w-full" />

      {/* Categories Grid Skeleton */}
      <div className="space-y-8">
        {[1, 2, 3].map(i => (
          <div key={i} className="p-6 rounded-lg border space-y-6">
            <div className="flex justify-between items-center">
              <div className="space-y-2">
                <Skeleton className="h-8 w-48" />
                <Skeleton className="h-4 w-72" />
              </div>
              <Skeleton className="h-10 w-24" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map(j => (
                <Skeleton key={j} className="h-64 w-full rounded-lg" />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
