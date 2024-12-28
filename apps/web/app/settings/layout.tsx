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

interface SettingsLayoutProps {
  children: React.ReactNode;
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  return (
    <div className="px-4 md:px-8 py-8 md:py-12">
      <div className="space-y-6">
        <div className="space-y-0.5">
          <h1 className="text-3xl font-bold tracking-tight">Configuración</h1>
          <p className="text-muted-foreground">Gestiona tu cuenta y configura tus preferencias.</p>
        </div>
        <Separator />
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <aside className="w-full overflow-x-auto lg:w-1/5">
            <nav className="flex lg:flex-col">
              <SidebarNav items={sidebarNavItems} className="w-full flex-none flex lg:flex-col gap-2" />
            </nav>
          </aside>
          <main className="flex-1 lg:max-w-3xl">{children}</main>
        </div>
      </div>
    </div>
  );
}
