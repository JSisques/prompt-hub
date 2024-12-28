'use client';

import { Search } from 'lucide-react';
import { Input } from './input';
import { useSearch } from '@/providers/search';
import { useEffect } from 'react';
import { useDebounce } from '@/hooks/useDebounce';
interface SearchBarProps {
  placeholder?: string;
  className?: string;
  debounceMs?: number;
}

export function SearchBar({ placeholder = 'Buscar...', className = '', debounceMs = 300 }: SearchBarProps) {
  const { searchQuery, setSearchQuery, setIsSearching } = useSearch();
  const debouncedSearch = useDebounce(searchQuery, debounceMs);

  useEffect(() => {
    setIsSearching(true);
    // Aquí podrías realizar la búsqueda con el valor debounced
    const timer = setTimeout(() => {
      setIsSearching(false);
    }, 100);

    return () => clearTimeout(timer);
  }, [debouncedSearch, setIsSearching]);

  return (
    <div className={`relative flex items-center ${className}`}>
      <Search className="absolute left-3 h-4 w-4 text-muted-foreground" />
      <Input
        type="text"
        placeholder={placeholder}
        onChange={e => setSearchQuery(e.target.value)}
        className="pl-9 pr-4 w-full focus-visible:ring-primary"
        value={searchQuery}
      />
    </div>
  );
}
