'use client';

import { Shield } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useTranslation } from 'react-i18next';

export default function PrivacyPage() {
  const { t } = useTranslation();

  const sections = Object.entries(t('pages.legal.privacy.sections', { returnObjects: true }));

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Shield className="h-8 w-8 text-primary" />
          {t('pages.legal.privacy.title')}
        </h1>
        <p className="text-muted-foreground mt-2">
          {t('pages.legal.lastUpdated', {
            date: new Date().toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' }),
          })}
        </p>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="prose prose-gray dark:prose-invert max-w-none">
            <p className="text-muted-foreground">{t('pages.legal.privacy.description')}</p>

            <div className="mt-8 space-y-8">
              {sections.map(([key, section], index) => (
                <div key={key}>
                  <h2 className="text-xl font-semibold mb-4">{section.title}</h2>
                  <p className="text-muted-foreground whitespace-pre-line">{section.content}</p>
                  {index < sections.length - 1 && <Separator className="mt-8" />}
                </div>
              ))}
            </div>

            <div className="mt-8">
              <p className="text-sm text-muted-foreground">
                {t('pages.legal.privacy.contact')}{' '}
                <a href="mailto:privacy@prompthub.es" className="text-primary hover:underline">
                  privacy@prompthub.es
                </a>
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
