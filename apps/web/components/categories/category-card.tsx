import { MockCategory } from '@/types/mock';
import { PromptCard } from '@/components/prompts/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface CategoryCardProps {
  category: MockCategory;
}

export const CategoryCard = ({ category }: CategoryCardProps) => {
  const displayedPrompts = category.prompts.slice(0, 3);
  const hasMorePrompts = category.prompts.length > 3;

  return (
    <section className="space-y-6 p-6 rounded-lg border bg-card">
      <div className="flex justify-between items-center">
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold tracking-tight">{category.title}</h2>
          <p className="text-muted-foreground">{category.description}</p>
        </div>

        {hasMorePrompts && (
          <Link href={`/categories/${category.id}`}>
            <Button variant="outline">Ver más</Button>
          </Link>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayedPrompts.map(prompt => (
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
  );
};
