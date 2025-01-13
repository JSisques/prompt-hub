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
  Switch,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/';
import { toast } from '@/hooks/use-toast';
import { SettingsSection } from '@/components/settings/section';
import { FormFieldContext } from '@/types/form';
import { useTranslation } from 'react-i18next';

export default function PrivacyPage() {
  const { t } = useTranslation();

  const privacyFormSchema = z.object({
    profileVisibility: z.enum(['public', 'private']),
    activityVisibility: z.enum(['public', 'private']),
    dataCollection: z.boolean().default(true),
    cookies: z.boolean().default(true),
  });

  type PrivacyFormValues = z.infer<typeof privacyFormSchema>;

  const defaultValues: Partial<PrivacyFormValues> = {
    profileVisibility: 'public',
    activityVisibility: 'public',
    dataCollection: true,
    cookies: true,
  };

  const form = useForm<PrivacyFormValues>({
    resolver: zodResolver(privacyFormSchema),
    defaultValues,
  });

  function onSubmit(data: PrivacyFormValues) {
    toast({
      title: t('pages.settings.privacy.messages.success.title'),
      description: t('pages.settings.privacy.messages.success.description'),
    });
  }

  return (
    <div className="space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <SettingsSection
            title={t('pages.settings.privacy.sections.visibility.title')}
            description={t('pages.settings.privacy.sections.visibility.description')}
          >
            <FormField
              control={form.control}
              name="profileVisibility"
              render={({ field }: FormFieldContext<PrivacyFormValues>) => (
                <FormItem className="flex flex-col sm:flex-row items-start sm:items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5 mb-4 sm:mb-0">
                    <FormLabel className="text-base">{t('pages.settings.privacy.sections.visibility.fields.profileVisibility.label')}</FormLabel>
                    <FormDescription>{t('pages.settings.privacy.sections.visibility.fields.profileVisibility.description')}</FormDescription>
                  </div>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={t('pages.settings.privacy.sections.visibility.fields.profileVisibility.placeholder')} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="public">
                        {t('pages.settings.privacy.sections.visibility.fields.profileVisibility.options.public')}
                      </SelectItem>
                      <SelectItem value="private">
                        {t('pages.settings.privacy.sections.visibility.fields.profileVisibility.options.private')}
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="activityVisibility"
              render={({ field }: FormFieldContext<PrivacyFormValues>) => (
                <FormItem className="flex flex-col sm:flex-row items-start sm:items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5 mb-4 sm:mb-0">
                    <FormLabel className="text-base">{t('pages.settings.privacy.sections.visibility.fields.activityVisibility.label')}</FormLabel>
                    <FormDescription>{t('pages.settings.privacy.sections.visibility.fields.activityVisibility.description')}</FormDescription>
                  </div>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={t('pages.settings.privacy.sections.visibility.fields.activityVisibility.placeholder')} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="public">
                        {t('pages.settings.privacy.sections.visibility.fields.activityVisibility.options.public')}
                      </SelectItem>
                      <SelectItem value="private">
                        {t('pages.settings.privacy.sections.visibility.fields.activityVisibility.options.private')}
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
          </SettingsSection>

          <SettingsSection
            title={t('pages.settings.privacy.sections.data.title')}
            description={t('pages.settings.privacy.sections.data.description')}
          >
            <FormField
              control={form.control}
              name="cookies"
              render={({ field }: FormFieldContext<PrivacyFormValues>) => (
                <FormItem className="flex flex-col sm:flex-row items-start sm:items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5 mb-4 sm:mb-0">
                    <FormLabel className="text-base">{t('pages.settings.privacy.sections.data.fields.cookies.label')}</FormLabel>
                    <FormDescription>{t('pages.settings.privacy.sections.data.fields.cookies.description')}</FormDescription>
                  </div>
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
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
