'use client';

import { Menu } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useState } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { href: '/prompts', label: 'Prompts' },
    { href: '/categories', label: 'Categories' },
    { href: '/settings', label: 'Settings' },
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
        {menuItems.map(item => (
          <Link key={item.href} href={item.href} className="text-sm font-medium hover:text-primary transition-colors">
            {item.label}
          </Link>
        ))}
      </div>

      {/* Menu Button for Both Mobile and Desktop */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon">
            <Menu className="h-6 w-6" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-[300px] sm:w-[400px]">
          <nav className="flex flex-col gap-4 mt-8">
            {menuItems.map(item => (
              <Link
                key={item.href}
                href={item.href}
                className="block px-2 py-1 text-lg hover:text-primary transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Navbar;
