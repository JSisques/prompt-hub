'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button, Form, FormControl, FormDescription, FormField, FormItem, FormLabel, Switch, RadioGroup, RadioGroupItem } from '@/components/ui/';
import { toast } from '@/hooks/use-toast';
import { SettingsHeader } from '@/components/settings/header';
import { SettingsSection } from '@/components/settings/section';
import { FormFieldContext } from '@/types/form';

const notificationsFormSchema = z.object({
  emailDigest: z.enum(['daily', 'weekly', 'never'], {
    required_error: 'Por favor selecciona una frecuencia.',
  }),
  marketing: z.boolean().default(true),
  security: z.boolean().default(true),
  prompts: z.boolean().default(true),
  comments: z.boolean().default(true),
  mentions: z.boolean().default(true),
});

type NotificationsFormValues = z.infer<typeof notificationsFormSchema>;

const defaultValues: Partial<NotificationsFormValues> = {
  emailDigest: 'weekly',
  marketing: true,
  security: true,
  prompts: true,
  comments: true,
  mentions: true,
};

export default function NotificationsPage() {
  const form = useForm<NotificationsFormValues>({
    resolver: zodResolver(notificationsFormSchema),
    defaultValues,
  });

  function onSubmit(data: NotificationsFormValues) {
    toast({
      title: 'Has actualizado las notificaciones',
      description: 'Las preferencias se han guardado correctamente.',
    });
  }

  return (
    <div className="space-y-6">
      <SettingsHeader title="Notificaciones" description="Configura cómo y cuándo quieres recibir notificaciones." />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <SettingsSection title="Notificaciones Push" description="Selecciona los tipos de notificaciones que quieres recibir.">
            <FormField
              control={form.control}
              name="prompts"
              render={({ field }: FormFieldContext<NotificationsFormValues>) => (
                <FormItem className="flex flex-col sm:flex-row items-start sm:items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5 mb-4 sm:mb-0">
                    <FormLabel className="text-base">Nuevos prompts</FormLabel>
                    <FormDescription>Notificaciones sobre nuevos prompts en tus categorías favoritas.</FormDescription>
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
                    <FormLabel className="text-base">Comentarios</FormLabel>
                    <FormDescription>Notificaciones cuando alguien comenta en tus prompts.</FormDescription>
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
                    <FormLabel className="text-base">Likes</FormLabel>
                    <FormDescription>Notificaciones cuando alguien te da like a tus prompts.</FormDescription>
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
                    <FormLabel className="text-base">Reviews</FormLabel>
                    <FormDescription>Notificaciones cuando alguien escribe una review a tus prompts.</FormDescription>
                  </div>
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                </FormItem>
              )}
            />
          </SettingsSection>

          <SettingsSection title="Marketing" description="Gestiona tus preferencias de comunicación marketing.">
            <FormField
              control={form.control}
              name="marketing"
              render={({ field }: FormFieldContext<NotificationsFormValues>) => (
                <FormItem className="flex flex-col sm:flex-row items-start sm:items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5 mb-4 sm:mb-0">
                    <FormLabel className="text-base">Emails de marketing</FormLabel>
                    <FormDescription>Recibe noticias sobre nuevas características y ofertas especiales.</FormDescription>
                  </div>
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                </FormItem>
              )}
            />
          </SettingsSection>

          <Button type="submit" className="w-full sm:w-auto mt-6">
            Guardar cambios
          </Button>
        </form>
      </Form>
    </div>
  );
}
