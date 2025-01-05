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
import { SettingsHeader } from '@/components/settings/header';
import { SettingsSection } from '@/components/settings/section';
import { FormFieldContext } from '@/types/form';

const accountFormSchema = z.object({
  language: z.string({
    required_error: 'Por favor selecciona un idioma.',
  }),
  timezone: z.string({
    required_error: 'Por favor selecciona una zona horaria.',
  }),
  password: z
    .string()
    .min(8, {
      message: 'La contraseña debe tener al menos 8 caracteres.',
    })
    .optional(),
  newPassword: z
    .string()
    .min(8, {
      message: 'La contraseña debe tener al menos 8 caracteres.',
    })
    .optional(),
});

type AccountFormValues = z.infer<typeof accountFormSchema>;

export default function AccountPage() {
  const form = useForm<AccountFormValues>({
    resolver: zodResolver(accountFormSchema),
    defaultValues: {
      language: 'es',
      timezone: 'Europe/Madrid',
    },
  });

  function onSubmit(data: AccountFormValues) {
    toast({
      title: 'Has actualizado tu cuenta',
      description: 'Los cambios han sido guardados correctamente.',
    });
  }

  return (
    <div className="space-y-6">
      <SettingsHeader title="Cuenta" description="Gestiona la configuración de tu cuenta." />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <SettingsSection title="Preferencias" description="Configura el idioma y la zona horaria de tu cuenta.">
            <FormField
              control={form.control}
              name="language"
              render={({ field }: FormFieldContext<AccountFormValues>) => (
                <FormItem>
                  <FormLabel>Idioma</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona un idioma" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="es">Español</SelectItem>
                      <SelectItem value="en">English</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>El idioma que se usará en la interfaz.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </SettingsSection>

          <SettingsSection title="Contraseña" description="Cambia tu contraseña actual.">
            <FormField
              control={form.control}
              name="password"
              render={({ field }: FormFieldContext<AccountFormValues>) => (
                <FormItem>
                  <FormLabel>Contraseña actual</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="••••••••" {...field} />
                  </FormControl>
                  <FormDescription>Introduce tu contraseña actual.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }: FormFieldContext<AccountFormValues>) => (
                <FormItem>
                  <FormLabel>Nueva contraseña</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="••••••••" {...field} />
                  </FormControl>
                  <FormDescription>Introduce tu nueva contraseña.</FormDescription>
                  <FormMessage />
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
