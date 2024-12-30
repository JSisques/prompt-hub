'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button, Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, Switch } from '@/components/ui';
import { toast } from '@/hooks/use-toast';
import { SettingsHeader } from '@/components/settings/header';
import { SettingsSection } from '@/components/settings/section';
import { FormFieldContext } from '@/types/form';

const privacyFormSchema = z.object({
  profileVisibility: z.boolean().default(true),
  showEmail: z.boolean().default(false),
});

type PrivacyFormValues = z.infer<typeof privacyFormSchema>;

export default function PrivacyPage() {
  const form = useForm<PrivacyFormValues>({
    resolver: zodResolver(privacyFormSchema),
    defaultValues: {
      profileVisibility: true,
      showEmail: false,
    },
  });

  function onSubmit(data: PrivacyFormValues) {
    toast({
      title: 'Has actualizado tu privacidad',
      description: 'Los cambios han sido guardados correctamente.',
    });
  }

  return (
    <div className="space-y-6">
      <SettingsHeader title="Privacidad" description="Gestiona la privacidad de tu cuenta y tus datos." />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <SettingsSection title="Visibilidad" description="Controla quién puede ver tu perfil y tus datos.">
            <FormField
              control={form.control}
              name="profileVisibility"
              render={({ field }: FormFieldContext<PrivacyFormValues>) => (
                <FormItem className="flex flex-col sm:flex-row items-start sm:items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5 mb-4 sm:mb-0">
                    <FormLabel className="text-base">Perfil público</FormLabel>
                    <FormDescription>Permite que otros usuarios vean tu perfil y tus prompts.</FormDescription>
                  </div>
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="showEmail"
              render={({ field }: FormFieldContext<PrivacyFormValues>) => (
                <FormItem className="flex flex-col sm:flex-row items-start sm:items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5 mb-4 sm:mb-0">
                    <FormLabel className="text-base">Mostrar email</FormLabel>
                    <FormDescription>Permite que otros usuarios vean tu dirección de email.</FormDescription>
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
