import { FAQ } from '@/types/faq';
import { FAQCategory } from './faq-category';
import { QuestionMarkCircledIcon } from '@radix-ui/react-icons';

interface FAQSectionProps {
  title: string;
  description?: string;
  faqs: FAQ[];
}

export function FAQSection({ title, description, faqs }: FAQSectionProps) {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <QuestionMarkCircledIcon className="h-8 w-8 text-primary" />
          Preguntas Frecuentes
        </h1>
        {description && <p className="text-muted-foreground mt-2">{description}</p>}
      </div>

      <div className="space-y-8">
        {faqs.map(category => (
          <FAQCategory key={category.category} category={category} />
        ))}
      </div>
    </div>
  );
}
