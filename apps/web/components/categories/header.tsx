import { SearchBar } from '@/components/ui/searchBar';

export const CategoriesHeader = () => {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold">Categorías</h1>
        <p className="text-muted-foreground text-lg">Explora nuestra colección de prompts organizados por categorías</p>
      </div>

      <SearchBar />
    </div>
  );
};
