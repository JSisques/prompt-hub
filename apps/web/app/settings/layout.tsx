import { Separator } from '@/components/ui/separator';
import { SidebarNav } from '@/components/settings/sidebar-nav';

const sidebarNavItems = [
  {
    title: 'Perfil',
    href: '/settings',
  },
  {
    title: 'Cuenta',
    href: '/settings/account',
  },
  {
    title: 'Apariencia',
    href: '/settings/appearance',
  },
  {
    title: 'Notificaciones',
    href: '/settings/notifications',
  },
  {
    title: 'Privacidad',
    href: '/settings/privacy',
  },
];

const user = {
  name: 'John Doe',
  email: 'john@example.com',
  avatar: 'https://github.com/shadcn.png',
};

interface SettingsLayoutProps {
  children: React.ReactNode;
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  return (
    <div className="container mx-auto px-4 py-6 md:py-8 lg:py-10">
      <div className="space-y-6">
        <div className="space-y-1">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Configuración</h1>
          <p className="text-sm md:text-base text-muted-foreground">Gestiona tu cuenta y configura tus preferencias.</p>
        </div>
        <Separator className="my-4 md:my-6" />
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <aside className="-mx-4 lg:mx-0 lg:w-1/4 xl:w-1/5">
            <SidebarNav items={sidebarNavItems} user={user} className="lg:sticky lg:top-8" />
          </aside>
          <div className="flex-1 lg:max-w-2xl xl:max-w-3xl">{children}</div>
        </div>
      </div>
    </div>
  );
}
