import { FAQ } from '@/types/faq';
import { FAQCategory } from './faq-category';

interface FAQSectionProps {
  title: string;
  description?: string;
  faqs: FAQ[];
}

export function FAQSection({ title, description, faqs }: FAQSectionProps) {
  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-8 text-center">
        <h1 className="mb-2 text-3xl font-bold">{title}</h1>
        {description && <p className="text-muted-foreground">{description}</p>}
      </div>

      <div className="space-y-8">
        {faqs.map(category => (
          <FAQCategory key={category.category} category={category} />
        ))}
      </div>
    </div>
  );
}
