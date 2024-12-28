'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FAQ } from '@/types/faq';
import { FAQItem } from './faq-item';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FAQCategoryProps {
  category: FAQ;
}

export function FAQCategory({ category }: FAQCategoryProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <Card className="overflow-hidden transition-colors duration-200 hover:bg-muted/5">
      <CardHeader
        onClick={() => setIsExpanded(!isExpanded)}
        className="cursor-pointer select-none bg-muted/30 hover:bg-muted/50 transition-colors duration-200"
      >
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl">{category.category}</CardTitle>
            <CardDescription className="mt-1.5">Preguntas frecuentes sobre {category.category.toLowerCase()}</CardDescription>
          </div>
          <ChevronDown className={cn('h-6 w-6 shrink-0 text-muted-foreground transition-transform duration-200', isExpanded && 'rotate-180')} />
        </div>
      </CardHeader>
      <div className={cn('transition-all duration-300 ease-in-out', isExpanded ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0')}>
        <CardContent className="divide-y divide-muted/30">
          {category.questions.map((question, index) => (
            <FAQItem key={index} faq={question} />
          ))}
        </CardContent>
      </div>
    </Card>
  );
}
