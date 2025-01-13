'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import {
  Button,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui';
import { toast } from '@/hooks/use-toast';
import { SettingsSection } from '@/components/settings/section';
import { FormFieldContext } from '@/types/form';
import { useTranslation } from 'react-i18next';

export default function AppearancePage() {
  const { t } = useTranslation();

  const appearanceFormSchema = z.object({
    theme: z.enum(['light', 'dark', 'system'], {
      required_error: t('pages.settings.appearance.validation.theme'),
    }),
  });

  type AppearanceFormValues = z.infer<typeof appearanceFormSchema>;

  const defaultValues: Partial<AppearanceFormValues> = {
    theme: 'system',
  };

  const form = useForm<AppearanceFormValues>({
    resolver: zodResolver(appearanceFormSchema),
    defaultValues,
  });

  function onSubmit(data: AppearanceFormValues) {
    toast({
      title: t('pages.settings.appearance.messages.success.title'),
      description: t('pages.settings.appearance.messages.success.description'),
    });
  }

  return (
    <div className="space-y-10">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <SettingsSection
            title={t('pages.settings.appearance.sections.theme.title')}
            description={t('pages.settings.appearance.sections.theme.description')}
          >
            <FormField
              control={form.control}
              name="theme"
              render={({ field }: FormFieldContext<AppearanceFormValues>) => (
                <FormItem>
                  <FormLabel>{t('pages.settings.appearance.sections.theme.fields.theme.label')}</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={t('pages.settings.appearance.sections.theme.fields.theme.placeholder')} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="light">{t('pages.settings.appearance.sections.theme.fields.theme.options.light')}</SelectItem>
                      <SelectItem value="dark">{t('pages.settings.appearance.sections.theme.fields.theme.options.dark')}</SelectItem>
                      <SelectItem value="system">{t('pages.settings.appearance.sections.theme.fields.theme.options.system')}</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>{t('pages.settings.appearance.sections.theme.fields.theme.description')}</FormDescription>
                </FormItem>
              )}
            />
          </SettingsSection>

          <Button type="submit" className="w-full sm:w-auto mt-6">
            {t('pages.settings.common.buttons.save')}
          </Button>
        </form>
      </Form>
    </div>
  );
}
