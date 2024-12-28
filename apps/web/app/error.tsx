'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';

interface ErrorPageProps {
  error: Error;
  reset: () => void;
}

export default function Error({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    // Aquí podrías enviar el error a un servicio de logging
    console.error('Error:', error);
  }, [error]);

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="text-center space-y-12 max-w-2xl mx-auto">
        <div className="space-y-6">
          <h1 className="text-4xl font-bold text-red-500">¡Ups! Algo salió mal</h1>
          <p className="text-muted-foreground text-lg max-w-md mx-auto px-4">
            Ha ocurrido un error inesperado. Nuestro equipo ha sido notificado y estamos trabajando en solucionarlo.
          </p>
          {process.env.NODE_ENV === 'development' && (
            <div className="mt-4 p-6 bg-red-50 rounded-lg mx-4">
              <p className="text-red-700 text-sm font-mono break-words">{error.message}</p>
            </div>
          )}
        </div>

        <div className="flex items-center justify-center gap-4">
          <Button onClick={() => reset()} variant="default">
            Intentar de nuevo
          </Button>
          <Button onClick={() => (window.location.href = '/')} variant="outline">
            Volver al inicio
          </Button>
        </div>
      </div>
    </div>
  );
}
