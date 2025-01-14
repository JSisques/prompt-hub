'use client';

import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { cn } from '@/lib/utils';
import { useState } from 'react';

export interface Item {
  id: string;
  name: string;
}

interface CommandSelectProps {
  value: string;
  onValueChange: (value: string) => void;
  onSelect: (value: string) => void;
  items?: Item[];
  isLoading?: boolean;
  placeholder?: string;
  noResultsMessage?: string;
  loadingMessage?: string;
  createNewMessage?: string;
  onCreateNew?: (value: string) => void;
  className?: string;
}

export function CommandSelect({
  value,
  onValueChange,
  onSelect,
  items = [],
  isLoading = false,
  placeholder = 'Buscar...',
  noResultsMessage = 'No se encontraron resultados.',
  loadingMessage = 'Cargando...',
  createNewMessage = 'Crear',
  onCreateNew,
  className,
}: CommandSelectProps) {
  return (
    <Command className={cn('border rounded-md', className)}>
      <CommandInput placeholder={placeholder} value={value} onValueChange={onValueChange} />
      {value && value.length > 0 && (
        <CommandList>
          <CommandEmpty className="py-6 text-sm">
            <p className="text-muted-foreground text-left px-2">{noResultsMessage}</p>
            {value && onCreateNew && (
              <Button variant="link" className="mt-2 text-primary w-full justify-start px-2" onClick={() => onCreateNew(value)}>
                + {createNewMessage} "{value}"
              </Button>
            )}
          </CommandEmpty>
          <CommandGroup>
            {isLoading ? (
              <CommandItem disabled className="py-3">
                <span className="flex items-center gap-2">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                  {loadingMessage}
                </span>
              </CommandItem>
            ) : (
              items.map(item => (
                <CommandItem key={item.id} value={item.id} onSelect={() => onSelect(item.id)}>
                  {item.name}
                </CommandItem>
              ))
            )}
          </CommandGroup>
        </CommandList>
      )}
    </Command>
  );
}
