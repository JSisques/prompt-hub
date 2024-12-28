'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  items: {
    href: string;
    title: string;
  }[];
  user?: {
    name: string;
    email: string;
    avatar?: string;
  };
}

export function SidebarNav({ className, items, user, ...props }: SidebarNavProps) {
  const pathname = usePathname();

  return (
    <nav className={cn('flex flex-col space-y-4', className)} {...props}>
      {user && (
        <div className="hidden lg:flex items-center space-x-4 p-4 rounded-lg bg-card">
          <Avatar className="h-10 w-10">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback>{user.name.slice(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <p className="text-sm font-medium leading-none">{user.name}</p>
            <p className="text-sm text-muted-foreground">{user.email}</p>
          </div>
        </div>
      )}

      <div className="flex lg:flex-col gap-2 overflow-x-auto pb-4 lg:pb-0 scrollbar-none">
        {items.map(item => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              buttonVariants({ variant: 'ghost' }),
              pathname === item.href ? 'bg-muted hover:bg-muted' : 'hover:bg-transparent hover:underline',
              'justify-start whitespace-nowrap px-6 py-4 lg:py-2 text-base lg:text-sm flex-none lg:flex-initial',
            )}
          >
            {item.title}
          </Link>
        ))}
      </div>
    </nav>
  );
}
