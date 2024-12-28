'use client';

import { createContext, useContext, useEffect, useState } from 'react';

interface SidebarContextType {
  isMobile: boolean;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [isMobile, setIsMobile] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Función para actualizar el estado de isMobile
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // 768px es el breakpoint md de Tailwind
    };

    // Configuración inicial
    handleResize();

    // Agregar listener para cambios de tamaño de ventana
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return <SidebarContext.Provider value={{ isMobile, isOpen, setIsOpen }}>{children}</SidebarContext.Provider>;
}

export function useSidebar() {
  const context = useContext(SidebarContext);
  if (context === undefined) {
    throw new Error('useSidebar must be used within a SidebarProvider');
  }
  return context;
}
