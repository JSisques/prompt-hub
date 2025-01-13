'use client';

import { useTranslation } from 'react-i18next';
import { Card, CardContent } from '@/components/ui/card';
import { Users, Sparkles, Shield, Clock, Target, Rocket, BookOpen, Key, LucideIcon } from 'lucide-react';

type FeatureKey = 'community' | 'innovation' | 'quality' | 'support';
type VisionKey = 'accessibility' | 'education' | 'empowerment';

const features: FeatureKey[] = ['community', 'innovation', 'quality', 'support'];
const visionItems: VisionKey[] = ['accessibility', 'education', 'empowerment'];

const featureIcons: Record<FeatureKey, LucideIcon> = {
  community: Users,
  innovation: Sparkles,
  quality: Shield,
  support: Clock,
};

const visionIcons: Record<VisionKey, LucideIcon> = {
  accessibility: Target,
  education: BookOpen,
  empowerment: Key,
};

export default function AboutPage() {
  const { t } = useTranslation();

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Users className="h-8 w-8 text-primary" />
          {t('pages.about.title')}
        </h1>
        <p className="text-muted-foreground mt-2">{t('pages.about.description')}</p>
      </div>

      {/* Historia */}
      <Card>
        <CardContent className="p-6">
          <div className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold">{t('pages.about.hero.title')}</h2>
              <p className="text-muted-foreground">{t('pages.about.hero.description')}</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
              <div className="p-4 rounded-lg bg-primary/5">
                <p className="text-3xl font-bold text-primary">{t('pages.about.stats.users.value')}</p>
                <p className="text-sm text-muted-foreground">{t('pages.about.stats.users.label')}</p>
              </div>
              <div className="p-4 rounded-lg bg-primary/5">
                <p className="text-3xl font-bold text-primary">{t('pages.about.stats.prompts.value')}</p>
                <p className="text-sm text-muted-foreground">{t('pages.about.stats.prompts.label')}</p>
              </div>
              <div className="p-4 rounded-lg bg-primary/5">
                <p className="text-3xl font-bold text-primary">{t('pages.about.stats.countries.value')}</p>
                <p className="text-sm text-muted-foreground">{t('pages.about.stats.countries.label')}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Features */}
      <Card>
        <CardContent className="p-6">
          <div className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold">{t('pages.about.features.title')}</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {features.map(feature => {
                const Icon = featureIcons[feature];
                return (
                  <div key={feature} className="flex gap-4">
                    <div className="p-2 h-fit rounded-lg bg-primary/10">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <div className="space-y-1.5">
                      <h3 className="font-medium">{t(`pages.about.features.items.${feature}.title`)}</h3>
                      <p className="text-sm text-muted-foreground">{t(`pages.about.features.items.${feature}.description`)}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Vision */}
      <Card>
        <CardContent className="p-6">
          <div className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold">{t('pages.about.vision.title')}</h2>
              <p className="text-muted-foreground">{t('pages.about.vision.description')}</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {visionItems.map(item => {
                const Icon = visionIcons[item];
                return (
                  <div key={item} className="flex gap-4">
                    <div className="p-2 h-fit rounded-lg bg-primary/10">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <div className="space-y-1.5">
                      <h3 className="font-medium">{t(`pages.about.vision.items.${item}.title`)}</h3>
                      <p className="text-sm text-muted-foreground">{t(`pages.about.vision.items.${item}.description`)}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Team */}
      <Card>
        <CardContent className="p-6">
          <div className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold">{t('pages.about.team.title')}</h2>
              <p className="text-muted-foreground">{t('pages.about.team.description')}</p>
            </div>
            <div className="flex items-center gap-4 bg-primary/5 p-4 rounded-lg">
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                <Rocket className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h3 className="font-medium text-lg">{t('pages.about.team.members.founder.name')}</h3>
                <p className="text-sm text-primary">{t('pages.about.team.members.founder.role')}</p>
                <p className="text-sm text-muted-foreground mt-1">{t('pages.about.team.members.founder.bio')}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
