'use client';

import { Menu, Plus, Heart, TrendingUp, BookOpen, Search, ShoppingBag, HelpCircle, Mail, Home, Settings } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { usePathname } from 'next/navigation';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const menuItems = [
    { href: '/explore', label: 'Explorar', icon: Search },
    { href: '/trending', label: 'Trending', icon: TrendingUp },
    { href: '/marketplace', label: 'Marketplace', icon: ShoppingBag },
    { href: '/learn', label: 'Aprende', icon: BookOpen },
  ];

  const userItems = [
    { href: '/prompts/create', label: 'Crear Prompt', icon: Plus },
    { href: '/favorites', label: 'Mis Favoritos', icon: Heart },
  ];

  const resourceItems = [
    { href: '/about', label: 'Sobre Nosotros', icon: HelpCircle },
    { href: '/contact', label: 'Contacto', icon: Mail },
  ];

  // Usuario de ejemplo - esto debería venir de tu sistema de autenticación
  const user = {
    name: 'John Doe',
    email: 'john@example.com',
    avatar: 'https://github.com/shadcn.png',
  };

  // Combinamos los elementos para la navegación desktop
  const desktopNavItems = [
    ...menuItems,
    { href: '/favorites', label: 'Favoritos', icon: Heart },
    { href: '/prompts/create', label: 'Crear', icon: Plus },
  ];

  return (
    <div className="w-full flex justify-between items-center p-4 border-b">
      <div className="flex items-center gap-2">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">PH</div>
          <span className="font-semibold text-lg">Prompt Hub</span>
        </Link>
      </div>

      {/* Navigation Links for Desktop */}
      <div className="hidden md:flex items-center gap-6">
        {desktopNavItems.map(item => (
          <Link
            key={item.href}
            href={item.href}
            className={`text-sm font-medium transition-colors hover:text-primary flex items-center gap-2 ${
              pathname.startsWith(item.href) ? 'text-primary' : ''
            }`}
          >
            <item.icon className="h-4 w-4" />
            {item.label}
          </Link>
        ))}
        <Link href="/settings" className="flex items-center gap-2 ml-4">
          <Avatar className="h-8 w-8">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback>{user.name.slice(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
        </Link>
      </div>

      {/* Menu Button for Mobile Only */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild className="md:hidden">
          <Button variant="ghost" size="icon" className="rounded-full">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-full sm:w-[400px] p-0">
          <ScrollArea className="h-full">
            <div className="flex flex-col h-full">
              {/* Header */}
              <SheetHeader className="p-6">
                <SheetTitle className="sr-only">Menú de navegación</SheetTitle>
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback>{user.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="font-semibold text-lg">{user.name}</span>
                    <span className="text-sm text-muted-foreground">{user.email}</span>
                  </div>
                </div>
              </SheetHeader>

              <Separator />

              {/* Navegación principal */}
              <nav className="flex-1">
                <div className="flex flex-col gap-6 p-6">
                  {/* Acciones principales */}
                  <div className="space-y-3">
                    <Link
                      href="/"
                      className={`flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-colors ${
                        pathname === '/' ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'
                      }`}
                      onClick={() => setIsOpen(false)}
                    >
                      <Home className="h-5 w-5" />
                      Inicio
                    </Link>
                  </div>

                  {/* Explorar */}
                  <div className="space-y-3">
                    <span className="px-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Explorar</span>
                    {menuItems.map(item => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={`flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-colors ${
                          pathname.startsWith(item.href) ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'
                        }`}
                        onClick={() => setIsOpen(false)}
                      >
                        <item.icon className="h-5 w-5" />
                        {item.label}
                      </Link>
                    ))}
                  </div>

                  {/* Acciones de usuario */}
                  <div className="space-y-3">
                    <span className="px-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Tu Espacio</span>
                    {userItems.map(item => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={`flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-colors ${
                          pathname.startsWith(item.href) ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'
                        }`}
                        onClick={() => setIsOpen(false)}
                      >
                        <item.icon className="h-5 w-5" />
                        {item.label}
                      </Link>
                    ))}
                  </div>

                  {/* Recursos */}
                  <div className="space-y-3">
                    <span className="px-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Recursos</span>
                    {resourceItems.map(item => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={`flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-colors ${
                          pathname.startsWith(item.href) ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'
                        }`}
                        onClick={() => setIsOpen(false)}
                      >
                        <item.icon className="h-5 w-5" />
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </nav>

              <Separator />

              {/* Footer con acciones adicionales */}
              <div className="p-6">
                <Link
                  href="/settings"
                  className="flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-colors hover:bg-muted"
                  onClick={() => setIsOpen(false)}
                >
                  <Settings className="h-5 w-5" />
                  Configuración
                </Link>
              </div>
            </div>
          </ScrollArea>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Navbar;
