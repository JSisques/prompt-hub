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
  FormMessage,
  Input,
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

export default function AccountPage() {
  const { t } = useTranslation();

  const accountFormSchema = z.object({
    language: z.string({
      required_error: t('pages.settings.account.validation.language'),
    }),
    timezone: z.string({
      required_error: t('pages.settings.account.validation.timezone'),
    }),
    password: z
      .string()
      .min(8, {
        message: t('pages.settings.account.validation.password'),
      })
      .optional(),
    newPassword: z
      .string()
      .min(8, {
        message: t('pages.settings.account.validation.password'),
      })
      .optional(),
  });

  type AccountFormValues = z.infer<typeof accountFormSchema>;

  const form = useForm<AccountFormValues>({
    resolver: zodResolver(accountFormSchema),
    defaultValues: {
      language: 'es',
      timezone: 'Europe/Madrid',
    },
  });

  function onSubmit(data: AccountFormValues) {
    toast({
      title: t('pages.settings.account.messages.success.title'),
      description: t('pages.settings.account.messages.success.description'),
    });
  }

  return (
    <div className="space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <SettingsSection
            title={t('pages.settings.account.sections.preferences.title')}
            description={t('pages.settings.account.sections.preferences.description')}
          >
            <FormField
              control={form.control}
              name="language"
              render={({ field }: FormFieldContext<AccountFormValues>) => (
                <FormItem>
                  <FormLabel>{t('pages.settings.account.sections.preferences.fields.language.label')}</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={t('pages.settings.account.sections.preferences.fields.language.placeholder')} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="es">{t('pages.settings.account.sections.preferences.fields.language.options.es')}</SelectItem>
                      <SelectItem value="en">{t('pages.settings.account.sections.preferences.fields.language.options.en')}</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>{t('pages.settings.account.sections.preferences.fields.language.description')}</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </SettingsSection>

          <SettingsSection
            title={t('pages.settings.account.sections.password.title')}
            description={t('pages.settings.account.sections.password.description')}
          >
            <FormField
              control={form.control}
              name="password"
              render={({ field }: FormFieldContext<AccountFormValues>) => (
                <FormItem>
                  <FormLabel>{t('pages.settings.account.sections.password.fields.current.label')}</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder={t('pages.settings.account.sections.password.fields.current.placeholder')} {...field} />
                  </FormControl>
                  <FormDescription>{t('pages.settings.account.sections.password.fields.current.description')}</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }: FormFieldContext<AccountFormValues>) => (
                <FormItem>
                  <FormLabel>{t('pages.settings.account.sections.password.fields.new.label')}</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder={t('pages.settings.account.sections.password.fields.new.placeholder')} {...field} />
                  </FormControl>
                  <FormDescription>{t('pages.settings.account.sections.password.fields.new.description')}</FormDescription>
                  <FormMessage />
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
