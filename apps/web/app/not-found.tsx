import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="text-center space-y-12 max-w-2xl mx-auto">
        <div className="space-y-6">
          <h1 className="text-9xl font-bold text-primary">404</h1>
          <h2 className="text-2xl font-semibold">Página no encontrada</h2>
          <p className="text-muted-foreground text-lg max-w-md mx-auto px-4">Lo sentimos, la página que estás buscando no existe o ha sido movida.</p>
        </div>

        <div className="flex items-center justify-center gap-4">
          <Button asChild variant="default">
            <Link href="/">Volver al inicio</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/categories">Ver categorías</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
