import { ReactNode } from 'react';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

interface SettingsSectionProps {
  title: string;
  description: string;
  children: ReactNode;
  className?: string;
}

export function SettingsSection({ title, description, children, className }: SettingsSectionProps) {
  return (
    <div className={cn('rounded-lg bg-card', className)}>
      <div className="">
        <div className="space-y-2.5">
          <h3 className="text-lg font-medium tracking-tight md:text-xl">{title}</h3>
          <p className="text-sm text-muted-foreground md:text-base">{description}</p>
        </div>
        <Separator className="my-6" />
        <div className="space-y-6">{children}</div>
      </div>
    </div>
  );
}
