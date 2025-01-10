'use client';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { graphqlClient } from '@/lib/apollo-client';
import { LOGIN, REGISTER } from '@/lib/graphql/index';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';

const signupFormSchema = z.object({
  email: z
    .string({
      required_error: 'El email es requerido',
    })
    .email({
      message: 'Introduce un email válido',
    }),
  username: z
    .string({
      required_error: 'El nombre de usuario es requerido',
    })
    .min(2, {
      message: 'El nombre de usuario debe tener al menos 2 caracteres',
    })
    .max(30, {
      message: 'El nombre de usuario no puede tener más de 30 caracteres',
    }),
  password: z
    .string({
      required_error: 'La contraseña es requerida',
    })
    .min(8, {
      message: 'La contraseña debe tener al menos 8 caracteres',
    })
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, {
      message: 'La contraseña debe contener al menos una mayúscula, una minúscula y un número',
    }),
});

type SignupFormValues = z.infer<typeof signupFormSchema>;

export function SignupForm({ className, ...props }: React.ComponentPropsWithoutRef<'div'>) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupFormSchema),
    defaultValues: {
      email: '',
      username: '',
      password: '',
    },
  });

  async function onSubmit(data: SignupFormValues) {
    setIsLoading(true);
    setError('');

    try {
      // Hacer trim de email y username, pero no de la contraseña
      const trimmedData = {
        ...data,
        email: data.email.trim(),
        username: data.username.trim(),
      };

      // Intentar registrar al usuario
      const registerResponse = await graphqlClient.mutate({
        mutation: REGISTER,
        variables: {
          input: trimmedData,
        },
      });

      if (!registerResponse.data?.register) {
        throw new Error('Error al crear la cuenta');
      }

      // Si el registro fue exitoso, intentar hacer login
      const loginResponse = await signIn('credentials', {
        email: trimmedData.email, // Usar el email con trim
        password: data.password,
        redirect: false,
      });

      if (loginResponse?.error) {
        throw new Error('Error al iniciar sesión automáticamente');
      }

      router.push('/');
    } catch (error: any) {
      // Manejar errores específicos del backend
      if (error.message.includes('email ya está registrado')) {
        setError('Este email ya está registrado');
      } else if (error.message.includes('nombre de usuario ya está en uso')) {
        setError('Este nombre de usuario ya está en uso');
      } else {
        setError(error.message || 'Ha ocurrido un error al crear la cuenta');
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-6">
            <div className="flex flex-col items-center gap-2">
              <Link href="/" className="flex items-center gap-2 font-medium">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">PH</div>
                <span className="text-xl font-semibold">Prompt Hub</span>
              </Link>
              <h1 className="text-2xl font-bold">Crea tu cuenta</h1>
              <div className="text-center text-sm text-muted-foreground">
                ¿Ya tienes una cuenta?{' '}
                <Link href="/auth/login" className="text-primary hover:underline underline-offset-4">
                  Inicia sesión
                </Link>
              </div>
            </div>
            {error && <div className="rounded-md bg-destructive/15 p-3 text-sm text-destructive">{error}</div>}
            <div className="flex flex-col gap-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <Label htmlFor="email">Email</Label>
                    <FormControl>
                      <Input {...field} id="email" type="email" placeholder="tu@email.com" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <Label htmlFor="username">Nombre de usuario</Label>
                    <FormControl>
                      <Input {...field} id="username" type="text" placeholder="tu_usuario" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <Label htmlFor="password">Contraseña</Label>
                    <FormControl>
                      <Input {...field} id="password" type="password" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Creando cuenta...' : 'Crear Cuenta'}
              </Button>
            </div>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">O continúa con</span>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={() => signIn('google', { callbackUrl: '/dashboard' })}
                disabled={isLoading}
              >
                <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                  <path
                    d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                    fill="currentColor"
                  />
                </svg>
                Google
              </Button>
              <Button type="button" variant="outline" className="w-full" disabled={isLoading}>
                <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                  <path
                    d="M16.365 1.43c0 1.14-.493 2.27-1.177 3.08-.744.9-1.99 1.57-2.987 1.57-.12 0-.23-.02-.3-.03-.01-.06-.04-.22-.04-.39 0-1.15.572-2.27 1.206-2.98.804-.94 2.142-1.64 3.248-1.68.03.13.05.28.05.43zm4.565 15.71c-.03.07-.463 1.58-1.518 3.12-.945 1.34-1.94 2.71-3.43 2.71-1.517 0-1.9-.88-3.63-.88-1.698 0-2.302.91-3.67.91-1.377 0-2.332-1.26-3.428-2.8-1.287-1.82-2.323-4.63-2.323-7.28 0-4.28 2.797-6.55 5.552-6.55 1.448 0 2.675.95 3.6.95.865 0 2.222-1.01 3.902-1.01.613 0 2.886.06 4.374 2.19-.13.09-2.383 1.37-2.383 4.19 0 3.26 2.854 4.42 2.955 4.45z"
                    fill="currentColor"
                  />
                </svg>
                Apple
              </Button>
            </div>
          </div>
        </form>
      </Form>
      <div className="text-balance text-center text-xs text-muted-foreground">
        Al continuar, aceptas nuestros{' '}
        <Link href="/terms" className="hover:text-primary underline underline-offset-4">
          Términos de Servicio
        </Link>{' '}
        y{' '}
        <Link href="/privacy" className="hover:text-primary underline underline-offset-4">
          Política de Privacidad
        </Link>
        .
      </div>
    </div>
  );
}
