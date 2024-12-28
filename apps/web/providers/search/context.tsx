import { createContext } from 'react';

export interface SearchContextType {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  isSearching: boolean;
  setIsSearching: (isSearching: boolean) => void;
}

export const SearchContext = createContext<SearchContextType | undefined>(undefined);
