'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Users, Heart, Target, Shield } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const values = [
  {
    id: 'community',
    icon: Heart,
  },
  {
    id: 'collaboration',
    icon: Users,
  },
  {
    id: 'innovation',
    icon: Target,
  },
  {
    id: 'trust',
    icon: Shield,
  },
];

const team = ['maria', 'carlos', 'ana'];

export default function AboutPage() {
  const { t } = useTranslation();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Users className="h-8 w-8 text-primary" />
          {t('pages.about.title')}
        </h1>
        <p className="text-muted-foreground mt-2 text-lg">{t('pages.about.description')}</p>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="prose prose-gray dark:prose-invert max-w-none space-y-8">
            {/* Misión */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">{t('pages.about.mission.title')}</h2>
              <p className="text-muted-foreground">{t('pages.about.mission.description')}</p>
            </div>

            {/* Valores */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">{t('pages.about.values.title')}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {values.map(value => (
                  <Card key={value.id}>
                    <CardContent className="pt-6">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 rounded-full bg-primary/10">
                          <value.icon className="h-6 w-6 text-primary" />
                        </div>
                        <h3 className="font-semibold">{t(`pages.about.values.items.${value.id}.title`)}</h3>
                      </div>
                      <p className="text-sm text-muted-foreground">{t(`pages.about.values.items.${value.id}.description`)}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Equipo */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">{t('pages.about.team.title')}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {team.map(member => (
                  <Card key={member}>
                    <CardContent className="pt-6">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                          <Users className="h-8 w-8 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg">{t(`pages.about.team.members.${member}.name`)}</h3>
                          <p className="text-sm text-primary">{t(`pages.about.team.members.${member}.role`)}</p>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">{t(`pages.about.team.members.${member}.bio`)}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
