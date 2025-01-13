'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button, Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, Input, Textarea } from '@/components/ui';
import { toast } from '@/hooks/use-toast';
import { SettingsSection } from '@/components/settings/section';
import { FormFieldContext } from '@/types/form';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ImageIcon } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { graphqlClient } from '@/lib/apollo-client';
import { UPDATE_USER } from '@/lib/graphql';
import { useTranslation } from 'react-i18next';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

export default function SettingsPage() {
  const { t } = useTranslation();
  const { data: session, update } = useSession();

  const profileFormSchema = z.object({
    name: z
      .string()
      .min(2, {
        message: t('pages.settings.profile.validation.name.min'),
      })
      .max(30, {
        message: t('pages.settings.profile.validation.name.max'),
      }),
    username: z
      .string()
      .min(2, {
        message: t('pages.settings.profile.validation.username.min'),
      })
      .max(30, {
        message: t('pages.settings.profile.validation.username.max'),
      }),
    bio: z.string().max(160, {
      message: t('pages.settings.profile.validation.bio.max'),
    }),
    avatar: z
      .any()
      .refine(files => files?.length !== 0, t('pages.settings.profile.validation.avatar.required'))
      .refine(files => files?.[0]?.size <= MAX_FILE_SIZE, t('pages.settings.profile.validation.avatar.size'))
      .refine(files => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type), t('pages.settings.profile.validation.avatar.type'))
      .optional(),
  });

  type ProfileFormValues = z.infer<typeof profileFormSchema>;

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
          title: t('pages.settings.profile.messages.success.title'),
          description: t('pages.settings.profile.messages.success.description'),
        });
      }
    } catch (error) {
      console.error(error);
      toast({
        title: t('pages.settings.profile.messages.error.title'),
        description: t('pages.settings.profile.messages.error.description'),
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
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <SettingsSection
            title={t('pages.settings.profile.sections.avatar.title')}
            description={t('pages.settings.profile.sections.avatar.description')}
          >
            <FormField
              control={form.control}
              name="avatar"
              render={({ field: { value, onChange, ...field } }: FormFieldContext<ProfileFormValues>) => (
                <FormItem>
                  <FormLabel>{t('pages.settings.profile.sections.avatar.fields.profilePicture.label')}</FormLabel>
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
                  <FormDescription>{t('pages.settings.profile.sections.avatar.fields.profilePicture.description')}</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </SettingsSection>

          <SettingsSection
            title={t('pages.settings.profile.sections.generalInfo.title')}
            description={t('pages.settings.profile.sections.generalInfo.description')}
          >
            <FormField
              control={form.control}
              name="username"
              render={({ field }: FormFieldContext<ProfileFormValues>) => (
                <FormItem>
                  <FormLabel>{t('pages.settings.profile.sections.generalInfo.fields.username.label')}</FormLabel>
                  <FormControl>
                    <Input placeholder={t('pages.settings.profile.sections.generalInfo.fields.username.placeholder')} {...field} />
                  </FormControl>
                  <FormDescription>{t('pages.settings.profile.sections.generalInfo.fields.username.description')}</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-2">
              <FormLabel>{t('pages.settings.profile.sections.generalInfo.fields.email.label')}</FormLabel>
              <Input
                type="email"
                value={(session?.user?.email || '').charAt(0).toUpperCase() + (session?.user?.email || '').slice(1).toLowerCase()}
                disabled
                className="bg-muted"
              />
              <FormDescription>{t('pages.settings.profile.sections.generalInfo.fields.email.description')}</FormDescription>
            </div>

            <FormField
              control={form.control}
              name="name"
              render={({ field }: FormFieldContext<ProfileFormValues>) => (
                <FormItem>
                  <FormLabel>{t('pages.settings.profile.sections.generalInfo.fields.name.label')}</FormLabel>
                  <FormControl>
                    <Input placeholder={t('pages.settings.profile.sections.generalInfo.fields.name.placeholder')} {...field} />
                  </FormControl>
                  <FormDescription>{t('pages.settings.profile.sections.generalInfo.fields.name.description')}</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="bio"
              render={({ field }: FormFieldContext<ProfileFormValues>) => (
                <FormItem>
                  <FormLabel>{t('pages.settings.profile.sections.generalInfo.fields.bio.label')}</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder={t('pages.settings.profile.sections.generalInfo.fields.bio.placeholder')}
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>{t('pages.settings.profile.sections.generalInfo.fields.bio.description')}</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </SettingsSection>

          <Button type="submit" className="w-full sm:w-auto mt-6">
            {t('pages.settings.profile.buttons.save')}
          </Button>
        </form>
      </Form>
    </div>
  );
}
