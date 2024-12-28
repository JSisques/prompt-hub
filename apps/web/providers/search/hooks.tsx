import { useContext } from 'react';
import { SearchContext, SearchContextType } from './context';

export function useSearch(): SearchContextType {
  const context = useContext(SearchContext);

  if (context === undefined) {
    throw new Error('useSearch debe ser usado dentro de un SearchProvider');
  }

  return context;
}
