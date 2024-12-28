'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button, Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, Input, Textarea } from '@/components/ui';
import { toast } from '@/hooks/use-toast';
import { SettingsHeader } from '@/components/settings/header';
import { SettingsSection } from '@/components/settings/section';
import { FormFieldContext } from '@/types/form';

const profileFormSchema = z.object({
  username: z
    .string()
    .min(2, {
      message: 'El nombre de usuario debe tener al menos 2 caracteres.',
    })
    .max(30, {
      message: 'El nombre de usuario no puede tener más de 30 caracteres.',
    }),
  email: z.string().min(1, { message: 'Este campo es requerido' }).email('Dirección de email inválida'),
  bio: z.string().max(160, {
    message: 'La bio no puede tener más de 160 caracteres.',
  }),
  urls: z
    .array(
      z.object({
        value: z.string().url({ message: 'Por favor introduce una URL válida' }),
      }),
    )
    .optional(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

export default function SettingsPage() {
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      username: '',
      email: '',
      bio: '',
    },
    mode: 'onChange',
  });

  function onSubmit(data: ProfileFormValues) {
    toast({
      title: 'Has actualizado tu perfil',
      description: 'Los cambios han sido guardados correctamente.',
    });
  }

  return (
    <div className="space-y-6">
      <SettingsHeader title="Perfil" description="Gestiona la información de tu perfil público." />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <SettingsSection title="Información General" description="Actualiza tu información personal básica.">
            <FormField
              control={form.control}
              name="username"
              render={({ field }: FormFieldContext<ProfileFormValues>) => (
                <FormItem>
                  <FormLabel>Nombre de usuario</FormLabel>
                  <FormControl>
                    <Input placeholder="tu-nombre" {...field} />
                  </FormControl>
                  <FormDescription>Este es tu nombre público que aparecerá en tu perfil.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }: FormFieldContext<ProfileFormValues>) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="ejemplo@email.com" {...field} />
                  </FormControl>
                  <FormDescription>Tu dirección de email principal.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </SettingsSection>

          <SettingsSection title="Bio" description="Cuéntanos un poco sobre ti.">
            <FormField
              control={form.control}
              name="bio"
              render={({ field }: FormFieldContext<ProfileFormValues>) => (
                <FormItem>
                  <FormLabel>Bio</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Cuéntanos sobre ti..." className="resize-none" {...field} />
                  </FormControl>
                  <FormDescription>Puedes usar hasta 160 caracteres.</FormDescription>
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
