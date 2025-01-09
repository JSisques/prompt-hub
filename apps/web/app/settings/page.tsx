'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button, Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, Input, Textarea } from '@/components/ui';
import { toast } from '@/hooks/use-toast';
import { SettingsHeader } from '@/components/settings/header';
import { SettingsSection } from '@/components/settings/section';
import { FormFieldContext } from '@/types/form';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ImageIcon } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { graphqlClient } from '@/lib/apollo-client';
import { UPDATE_USER } from '@/lib/graphql';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

const profileFormSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: 'El nombre debe tener al menos 2 caracteres.',
    })
    .max(30, {
      message: 'El nombre no puede tener más de 30 caracteres.',
    }),
  username: z
    .string()
    .min(2, {
      message: 'El nombre de usuario debe tener al menos 2 caracteres.',
    })
    .max(30, {
      message: 'El nombre de usuario no puede tener más de 30 caracteres.',
    }),
  bio: z.string().max(160, {
    message: 'La bio no puede tener más de 160 caracteres.',
  }),
  avatar: z
    .any()
    .refine(files => files?.length !== 0, 'La imagen es requerida.')
    .refine(files => files?.[0]?.size <= MAX_FILE_SIZE, 'El tamaño máximo es 5MB.')
    .refine(files => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type), 'Solo se aceptan archivos .jpg, .jpeg, .png y .webp.')
    .optional(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

export default function SettingsPage() {
  const { data: session, update } = useSession();

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: session?.user?.name || '',
      username: session?.user?.username || '',
      bio: session?.user?.bio || '',
    },
    mode: 'onChange',
  });

  useEffect(() => {
    if (session?.user) {
      form.reset({
        name: session.user.name || '',
        username: session.user.username || '',
        bio: session.user.bio || '',
      });
    }
  }, [session, form]);

  async function onSubmit(data: ProfileFormValues) {
    try {
      const { data: responseData } = await graphqlClient.mutate({
        mutation: UPDATE_USER,
        variables: {
          id: session?.user?.id,
          input: {
            ...data,
          },
        },
      });

      if (responseData?.updateUser) {
        const updatedUser = responseData.updateUser;

        await update({
          ...session,
          user: {
            ...session?.user,
            name: updatedUser.name,
            username: updatedUser.username,
            bio: updatedUser.bio,
            avatar: updatedUser.avatar,
          },
        });

        toast({
          title: 'Has actualizado tu perfil',
          description: 'Los cambios han sido guardados correctamente.',
        });
      }
    } catch (error) {
      console.error(error);
      toast({
        title: 'Error',
        description: 'Ha ocurrido un error al actualizar tu perfil.',
      });
    }
  }

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        update({
          ...session,
          user: {
            ...session?.user,
            avatar: reader.result as string,
          },
        });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-6">
      <SettingsHeader title="Perfil" description="Gestiona la información de tu perfil público." />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <SettingsSection title="Avatar" description="Sube una foto para tu perfil.">
            <FormField
              control={form.control}
              name="avatar"
              render={({ field: { value, onChange, ...field } }: FormFieldContext<ProfileFormValues>) => (
                <FormItem>
                  <FormLabel>Foto de perfil</FormLabel>
                  <FormControl>
                    <div className="flex items-center gap-4">
                      <Avatar className="h-24 w-24">
                        <AvatarImage src={session?.user?.avatar || ''} />
                        <AvatarFallback>
                          <ImageIcon className="h-12 w-12 text-muted-foreground" />
                        </AvatarFallback>
                      </Avatar>
                      <Input
                        type="file"
                        accept={ACCEPTED_IMAGE_TYPES.join(',')}
                        onChange={e => {
                          onChange(e.target.files);
                          handleAvatarChange(e);
                        }}
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormDescription>Sube una imagen de perfil. Debe ser menor a 5MB y en formato JPG, PNG o WebP.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </SettingsSection>

          <SettingsSection title="Información General" description="Actualiza tu información personal básica.">
            <FormField
              control={form.control}
              name="username"
              render={({ field }: FormFieldContext<ProfileFormValues>) => (
                <FormItem>
                  <FormLabel>Nombre de usuario</FormLabel>
                  <FormControl>
                    <Input placeholder="Tu nombre de usuario" {...field} />
                  </FormControl>
                  <FormDescription>Este es tu nombre de usuario visible en tu perfil.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-2">
              <FormLabel>Email</FormLabel>
              <Input type="email" value={session?.user?.email || ''} disabled className="bg-muted" />
              <FormDescription>Tu dirección de email no se puede cambiar.</FormDescription>
            </div>

            <FormField
              control={form.control}
              name="name"
              render={({ field }: FormFieldContext<ProfileFormValues>) => (
                <FormItem>
                  <FormLabel>Nombre</FormLabel>
                  <FormControl>
                    <Input placeholder="Tu nombre" {...field} />
                  </FormControl>
                  <FormDescription>Este es tu nombre completo visible en tu perfil.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

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
