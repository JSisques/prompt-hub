'use client';

import { FAQSection } from '@/components/faq/faq-section';
import { FAQ } from '@/types/faq';
import { useTranslation } from 'react-i18next';

const faqCategories = ['general', 'prompts', 'accountAndPrivacy', 'marketplace', 'technical'];

export default function FAQPage() {
  const { t } = useTranslation();

  const faqs: FAQ[] = faqCategories.map(categoryId => {
    const questions = Object.entries(t(`pages.faq.categories.${categoryId}.questions`, { returnObjects: true })).map(
      ([id, content]: [string, any]) => ({
        question: content.question,
        answer: content.answer,
      }),
    );

    return {
      category: t(`pages.faq.categories.${categoryId}.title`),
      questions,
    };
  });

  return (
    <div className="space-y-8">
      <FAQSection title={t('pages.faq.title')} description={t('pages.faq.description')} faqs={faqs} />
    </div>
  );
}
