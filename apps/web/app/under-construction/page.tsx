'use client';

import { Button } from '@/components/ui/button';
import { Construction, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function UnderConstructionPage() {
  return (
    <div className="container max-w-4xl mx-auto py-8 px-4 md:px-0">
      <div className="flex flex-col items-center justify-center min-h-[70vh] text-center space-y-8">
        <div className="relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-primary to-primary/50 rounded-full blur-md opacity-75" />
          <div className="relative bg-background rounded-full p-4">
            <Construction className="h-16 w-16 text-primary" />
          </div>
        </div>

        <div className="space-y-4">
          <h1 className="text-4xl font-bold">En Construcción</h1>
          <p className="text-muted-foreground text-lg max-w-lg">
            Esta página estará disponible próximamente. Estamos trabajando para ofrecerte la mejor experiencia posible.
          </p>
        </div>

        <Link href="/" className="inline-block">
          <Button variant="outline" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Volver al Inicio
          </Button>
        </Link>
      </div>
    </div>
  );
}
