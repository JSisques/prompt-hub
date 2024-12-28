'use client';

import { useState } from 'react';
import { Question } from '@/types/faq';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FAQItemProps {
  faq: Question;
}

export function FAQItem({ faq }: FAQItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="transition-colors duration-200 first:pt-0 last:pb-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between py-4 text-left hover:text-primary transition-colors duration-200"
      >
        <h3 className="font-medium pr-4">{faq.question}</h3>
        <ChevronDown
          className={cn('h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200', isOpen && 'rotate-180 text-primary')}
        />
      </button>
      <div className={cn('grid transition-all duration-200 ease-in-out', isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0')}>
        <div className="overflow-hidden">
          <p className="pb-4 text-sm text-muted-foreground">{faq.answer}</p>
        </div>
      </div>
    </div>
  );
}
