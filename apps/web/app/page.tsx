'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';

export default function Home() {
  const { t } = useTranslation();
  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-8 sm:py-16 md:py-20">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="max-w-2xl mx-auto text-center space-y-4 sm:space-y-6">
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold leading-tight">{t('pages.home.title')}</h1>

            <p className="text-base sm:text-xl text-muted-foreground">{t('pages.home.description')}</p>

            <div className="flex flex-col sm:flex-row justify-center gap-3 pt-2">
              <Link href="/prompt/create" className="w-full sm:w-auto">
                <Button size="lg" className="w-full bg-primary hover:bg-primary/90">
                  {t('pages.home.createPrompt')}
                </Button>
              </Link>
              <Link href="/explore" className="w-full sm:w-auto">
                <Button variant="outline" size="lg" className="w-full">
                  {t('pages.home.explorePrompts')} →
                </Button>
              </Link>
            </div>
          </div>

          {/* Características */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mt-12 sm:mt-20">
            <div className="text-center space-y-2">
              <div className="text-4xl mb-2 sm:mb-3">🎯</div>
              <h3 className="text-lg font-semibold">{t('pages.home.features.verified.title')}</h3>
              <p className="text-muted-foreground text-sm">{t('pages.home.features.verified.description')}</p>
            </div>
            <div className="text-center space-y-2">
              <div className="text-4xl mb-2 sm:mb-3">💡</div>
              <h3 className="text-lg font-semibold">{t('pages.home.features.marketplace.title')}</h3>
              <p className="text-muted-foreground text-sm">{t('pages.home.features.marketplace.description')}</p>
            </div>
            <div className="text-center space-y-2">
              <div className="text-4xl mb-2 sm:mb-3">🚀</div>
              <h3 className="text-lg font-semibold">{t('pages.home.features.customization.title')}</h3>
              <p className="text-muted-foreground text-sm">{t('pages.home.features.customization.description')}</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
