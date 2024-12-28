'use client';

import { Menu, Plus, Heart, TrendingUp, BookOpen, Search, ShoppingBag, HelpCircle, Mail, Home } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { usePathname } from 'next/navigation';
import { Separator } from '@/components/ui/separator';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const menuItems = [
    { href: '/prompts', label: 'Explorar', icon: Search },
    { href: '/trending', label: 'Trending', icon: TrendingUp },
    { href: '/marketplace', label: 'Marketplace', icon: ShoppingBag },
  ];

  const userItems = [
    { href: '/prompts/create', label: 'Crear Prompt', icon: Plus },
    { href: '/favorites', label: 'Mis Favoritos', icon: Heart },
  ];

  const resourceItems = [
    { href: '/learn', label: 'Aprende', icon: BookOpen },
    { href: '/about', label: 'Sobre Nosotros', icon: HelpCircle },
    { href: '/contact', label: 'Contacto', icon: Mail },
  ];

  // Usuario de ejemplo - esto debería venir de tu sistema de autenticación
  const user = {
    name: 'John Doe',
    email: 'john@example.com',
    avatar: 'https://github.com/shadcn.png',
  };

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
        {menuItems.map(item => (
          <Link
            key={item.href}
            href={item.href}
            className={`text-sm font-medium transition-colors ${pathname.startsWith(item.href) ? 'text-primary' : 'hover:text-primary'}`}
          >
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
          <Button variant="ghost" size="icon">
            <Menu className="h-6 w-6" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-[300px] sm:w-[400px] p-0">
          <div className="flex flex-col h-full">
            {/* Header con información del usuario */}
            <div className="p-6 bg-muted/50">
              <div className="flex items-center gap-4">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback>{user.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="font-medium">{user.name}</span>
                  <span className="text-sm text-muted-foreground">{user.email}</span>
                </div>
              </div>
            </div>

            <Separator />

            {/* Navegación principal */}
            <nav className="flex-1 overflow-y-auto">
              <div className="flex flex-col gap-6 p-6">
                {/* Acciones principales */}
                <div className="space-y-1">
                  <Link
                    href="/"
                    className={`flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                      pathname === '/' ? 'bg-primary/10 text-primary hover:bg-primary/20' : 'hover:bg-muted'
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    <Home className="h-4 w-4" />
                    Inicio
                  </Link>
                </div>

                {/* Explorar */}
                <div className="space-y-1">
                  <span className="px-4 text-xs font-medium text-muted-foreground">Explorar</span>
                  {menuItems.map(item => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                        pathname.startsWith(item.href) ? 'bg-primary/10 text-primary hover:bg-primary/20' : 'hover:bg-muted'
                      }`}
                      onClick={() => setIsOpen(false)}
                    >
                      <item.icon className="h-4 w-4" />
                      {item.label}
                    </Link>
                  ))}
                </div>

                {/* Acciones de usuario */}
                <div className="space-y-1">
                  <span className="px-4 text-xs font-medium text-muted-foreground">Tu Espacio</span>
                  {userItems.map(item => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                        pathname.startsWith(item.href) ? 'bg-primary/10 text-primary hover:bg-primary/20' : 'hover:bg-muted'
                      }`}
                      onClick={() => setIsOpen(false)}
                    >
                      <item.icon className="h-4 w-4" />
                      {item.label}
                    </Link>
                  ))}
                </div>

                {/* Recursos */}
                <div className="space-y-1">
                  <span className="px-4 text-xs font-medium text-muted-foreground">Recursos</span>
                  {resourceItems.map(item => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                        pathname.startsWith(item.href) ? 'bg-primary/10 text-primary hover:bg-primary/20' : 'hover:bg-muted'
                      }`}
                      onClick={() => setIsOpen(false)}
                    >
                      <item.icon className="h-4 w-4" />
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
                className="flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors hover:bg-muted"
                onClick={() => setIsOpen(false)}
              >
                Configuración
              </Link>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Navbar;
