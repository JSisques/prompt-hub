'use client';

import * as React from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';

export interface ComboboxItem {
  id: string;
  name: string;
}

interface ComboboxProps {
  value: string;
  onValueChange: (value: string) => void;
  items?: ComboboxItem[];
  isLoading?: boolean;
  placeholder?: string;
  noResultsMessage?: string;
  loadingMessage?: string;
  createNewMessage?: string;
  onCreateNew?: (value: string) => void;
  className?: string;
}

export function Combobox({
  value,
  onValueChange,
  items = [],
  isLoading = false,
  placeholder = 'Seleccionar...',
  noResultsMessage = 'No se encontraron resultados.',
  loadingMessage = 'Cargando...',
  createNewMessage = 'Crear',
  onCreateNew,
  className,
}: ComboboxProps) {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [newItem, setNewItem] = React.useState<ComboboxItem | null>(null);

  const selectedItem = items.find(item => item.id === value);

  // Primero filtramos los items existentes
  const filteredExistingItems = items.filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()));

  // Luego añadimos el nuevo item si existe y coincide con la búsqueda
  const filteredItems = newItem?.name.toLowerCase().includes(searchQuery.toLowerCase()) ? [...filteredExistingItems, newItem] : filteredExistingItems;

  const handleCreateNew = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); // Prevenir el envío del formulario
    e.stopPropagation(); // Evitar que el evento se propague
    if (onCreateNew) {
      const tempItem = {
        id: 'new',
        name: searchQuery,
      };
      setNewItem(tempItem);
      onCreateNew(searchQuery);
      setSearchQuery(''); // Limpiamos la búsqueda después de crear
    }
  };

  // Limpiar el nuevo item cuando se selecciona un item existente
  React.useEffect(() => {
    if (value && items.some(item => item.id === value)) {
      setNewItem(null);
    }
  }, [value, items]);

  return (
    <Command className={cn('border rounded-md', className)}>
      <div className="flex items-center border-b px-3">
        <CommandInput
          placeholder={placeholder}
          value={searchQuery}
          onValueChange={setSearchQuery}
          className="flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
        />
      </div>
      <CommandList className="max-h-[132px] overflow-y-auto">
        <CommandEmpty className="py-6 text-sm">
          <p className="text-muted-foreground text-left px-2">{noResultsMessage}</p>
          {searchQuery && onCreateNew && (
            <Button type="button" variant="link" className="mt-2 text-primary w-full justify-start px-2" onClick={handleCreateNew}>
              + {createNewMessage} "{searchQuery}"
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
            filteredItems.map(item => (
              <CommandItem
                key={item.id}
                value={item.id}
                onSelect={value => {
                  onValueChange(value);
                  setSearchQuery(''); // Limpiamos la búsqueda después de seleccionar
                }}
                className="flex items-center gap-2 px-2 py-1.5 cursor-pointer aria-selected:bg-accent aria-selected:text-accent-foreground"
              >
                <Check
                  className={cn('h-4 w-4', value === item.id || (item.id === 'new' && newItem?.name === item.name) ? 'opacity-100' : 'opacity-0')}
                />
                {item.name}
              </CommandItem>
            ))
          )}
        </CommandGroup>
      </CommandList>
    </Command>
  );
}
