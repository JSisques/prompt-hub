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
  Switch,
} from '@/components/ui';
import { toast } from '@/hooks/use-toast';
import { SettingsHeader } from '@/components/settings/header';
import { SettingsSection } from '@/components/settings/section';
import { FormFieldContext } from '@/types/form';

const appearanceFormSchema = z.object({
  theme: z.enum(['light', 'dark', 'system'], {
    required_error: 'Por favor selecciona un tema.',
  }),
});

type AppearanceFormValues = z.infer<typeof appearanceFormSchema>;

const defaultValues: Partial<AppearanceFormValues> = {
  theme: 'system',
};

export default function AppearancePage() {
  const form = useForm<AppearanceFormValues>({
    resolver: zodResolver(appearanceFormSchema),
    defaultValues,
  });

  function onSubmit(data: AppearanceFormValues) {
    toast({
      title: 'Has actualizado la apariencia',
      description: 'Los cambios se aplicarán inmediatamente.',
    });
  }

  return (
    <div className="space-y-10">
      <SettingsHeader title="Apariencia" description="Personaliza la apariencia de la aplicación." />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <SettingsSection title="Tema" description="Selecciona el tema de la aplicación.">
            <FormField
              control={form.control}
              name="theme"
              render={({ field }: FormFieldContext<AppearanceFormValues>) => (
                <FormItem>
                  <FormLabel>Tema</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona un tema" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="light">Claro</SelectItem>
                      <SelectItem value="dark">Oscuro</SelectItem>
                      <SelectItem value="system">Sistema</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>El tema del sistema se adaptará automáticamente a tus preferencias.</FormDescription>
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
