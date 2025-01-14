'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { ContactIcon, Mail, MessageSquare, Phone } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const contactInfo = [
  {
    id: 'email',
    icon: Mail,
  },
  {
    id: 'chat',
    icon: MessageSquare,
  },
  {
    id: 'phone',
    icon: Phone,
  },
];

export default function ContactPage() {
  const { t } = useTranslation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí iría la lógica de envío del formulario
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <ContactIcon className="h-8 w-8 text-primary" />
          {t('pages.contact.title')}
        </h1>
        <p className="text-muted-foreground mt-2">{t('pages.contact.description')}</p>
      </div>

      <div className="grid gap-6">
        {contactInfo.map(item => (
          <Card key={item.id}>
            <CardContent className="flex items-center gap-4 p-6">
              <div className="p-3 rounded-full bg-primary/10">
                <item.icon className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">{t(`pages.contact.contactInfo.${item.id}.title`)}</h3>
                <p className="text-sm text-muted-foreground">{t(`pages.contact.contactInfo.${item.id}.description`)}</p>
                <p className="text-sm font-medium mt-1">{t(`pages.contact.contactInfo.${item.id}.value`)}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{t('pages.contact.faq.title')}</CardTitle>
          <CardDescription>{t('pages.contact.faq.description')}</CardDescription>
        </CardHeader>
        <CardContent>
          <Button variant="outline" className="w-full" asChild>
            <a href="/faq">{t('pages.contact.faq.button')}</a>
          </Button>
        </CardContent>
      </Card>

      {/* Formulario de Contacto */}
      <Card>
        <CardHeader>
          <CardTitle>{t('pages.contact.form.title')}</CardTitle>
          <CardDescription>{t('pages.contact.form.description')}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">{t('pages.contact.form.fields.firstName.label')}</Label>
                <Input id="firstName" placeholder={t('pages.contact.form.fields.firstName.placeholder')} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">{t('pages.contact.form.fields.lastName.label')}</Label>
                <Input id="lastName" placeholder={t('pages.contact.form.fields.lastName.placeholder')} />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">{t('pages.contact.form.fields.email.label')}</Label>
              <Input id="email" type="email" placeholder={t('pages.contact.form.fields.email.placeholder')} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="subject">{t('pages.contact.form.fields.subject.label')}</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder={t('pages.contact.form.fields.subject.placeholder')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="support">{t('pages.contact.form.fields.subject.options.support')}</SelectItem>
                  <SelectItem value="feedback">{t('pages.contact.form.fields.subject.options.feedback')}</SelectItem>
                  <SelectItem value="business">{t('pages.contact.form.fields.subject.options.business')}</SelectItem>
                  <SelectItem value="other">{t('pages.contact.form.fields.subject.options.other')}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">{t('pages.contact.form.fields.message.label')}</Label>
              <Textarea id="message" placeholder={t('pages.contact.form.fields.message.placeholder')} className="min-h-[150px]" />
            </div>

            <Button type="submit" className="w-full">
              {t('pages.contact.form.submit')}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
