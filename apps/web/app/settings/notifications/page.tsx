'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button, Form, FormControl, FormDescription, FormField, FormItem, FormLabel, Switch } from '@/components/ui/';
import { toast } from '@/hooks/use-toast';
import { SettingsSection } from '@/components/settings/section';
import { FormFieldContext } from '@/types/form';
import { useTranslation } from 'react-i18next';

export default function NotificationsPage() {
  const { t } = useTranslation();

  const notificationsFormSchema = z.object({
    prompts: z.boolean().default(true),
    comments: z.boolean().default(true),
    likes: z.boolean().default(true),
    reviews: z.boolean().default(true),
    marketing: z.boolean().default(true),
  });

  type NotificationsFormValues = z.infer<typeof notificationsFormSchema>;

  const defaultValues: Partial<NotificationsFormValues> = {
    prompts: true,
    comments: true,
    likes: true,
    reviews: true,
    marketing: true,
  };

  const form = useForm<NotificationsFormValues>({
    resolver: zodResolver(notificationsFormSchema),
    defaultValues,
  });

  function onSubmit(data: NotificationsFormValues) {
    toast({
      title: t('pages.settings.notifications.messages.success.title'),
      description: t('pages.settings.notifications.messages.success.description'),
    });
  }

  return (
    <div className="space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <SettingsSection
            title={t('pages.settings.notifications.sections.push.title')}
            description={t('pages.settings.notifications.sections.push.description')}
          >
            <FormField
              control={form.control}
              name="prompts"
              render={({ field }: FormFieldContext<NotificationsFormValues>) => (
                <FormItem className="flex flex-col sm:flex-row items-start sm:items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5 mb-4 sm:mb-0">
                    <FormLabel className="text-base">{t('pages.settings.notifications.sections.push.fields.prompts.label')}</FormLabel>
                    <FormDescription>{t('pages.settings.notifications.sections.push.fields.prompts.description')}</FormDescription>
                  </div>
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="comments"
              render={({ field }: FormFieldContext<NotificationsFormValues>) => (
                <FormItem className="flex flex-col sm:flex-row items-start sm:items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5 mb-4 sm:mb-0">
                    <FormLabel className="text-base">{t('pages.settings.notifications.sections.push.fields.comments.label')}</FormLabel>
                    <FormDescription>{t('pages.settings.notifications.sections.push.fields.comments.description')}</FormDescription>
                  </div>
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="likes"
              render={({ field }: FormFieldContext<NotificationsFormValues>) => (
                <FormItem className="flex flex-col sm:flex-row items-start sm:items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5 mb-4 sm:mb-0">
                    <FormLabel className="text-base">{t('pages.settings.notifications.sections.push.fields.likes.label')}</FormLabel>
                    <FormDescription>{t('pages.settings.notifications.sections.push.fields.likes.description')}</FormDescription>
                  </div>
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="reviews"
              render={({ field }: FormFieldContext<NotificationsFormValues>) => (
                <FormItem className="flex flex-col sm:flex-row items-start sm:items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5 mb-4 sm:mb-0">
                    <FormLabel className="text-base">{t('pages.settings.notifications.sections.push.fields.reviews.label')}</FormLabel>
                    <FormDescription>{t('pages.settings.notifications.sections.push.fields.reviews.description')}</FormDescription>
                  </div>
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                </FormItem>
              )}
            />
          </SettingsSection>

          <SettingsSection
            title={t('pages.settings.notifications.sections.marketing.title')}
            description={t('pages.settings.notifications.sections.marketing.description')}
          >
            <FormField
              control={form.control}
              name="marketing"
              render={({ field }: FormFieldContext<NotificationsFormValues>) => (
                <FormItem className="flex flex-col sm:flex-row items-start sm:items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5 mb-4 sm:mb-0">
                    <FormLabel className="text-base">{t('pages.settings.notifications.sections.marketing.fields.emails.label')}</FormLabel>
                    <FormDescription>{t('pages.settings.notifications.sections.marketing.fields.emails.description')}</FormDescription>
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
