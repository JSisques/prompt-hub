import { PromptCard } from '@/components/prompts/card';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Prompt Hub',
  description: 'Descubre, comparte y monetiza los mejores prompts para ChatGPT, Midjourney, DALL-E y más.',
};

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-8 sm:py-16 md:py-20">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="max-w-2xl mx-auto text-center space-y-4 sm:space-y-6">
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold leading-tight">Potencia tu Creatividad con IA</h1>

            <p className="text-base sm:text-xl text-muted-foreground">
              Descubre, comparte y monetiza los mejores prompts para ChatGPT, Midjourney, DALL-E y más.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-3 pt-2">
              <Link href="/prompts/create" className="w-full sm:w-auto">
                <Button size="lg" className="w-full bg-primary hover:bg-primary/90">
                  Crear mi Primer Prompt
                </Button>
              </Link>
              <Link href="/explore" className="w-full sm:w-auto">
                <Button variant="outline" size="lg" className="w-full">
                  Explorar Prompts →
                </Button>
              </Link>
            </div>
          </div>

          {/* Características */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mt-12 sm:mt-20">
            <div className="text-center space-y-2">
              <div className="text-4xl mb-2 sm:mb-3">🎯</div>
              <h3 className="text-lg font-semibold">Prompts Verificados</h3>
              <p className="text-muted-foreground text-sm">Todos los prompts son probados y validados por nuestra comunidad de expertos.</p>
            </div>
            <div className="text-center space-y-2">
              <div className="text-4xl mb-2 sm:mb-3">💡</div>
              <h3 className="text-lg font-semibold">Marketplace</h3>
              <p className="text-muted-foreground text-sm">Vende tus mejores prompts o encuentra joyas creadas por otros expertos.</p>
            </div>
            <div className="text-center space-y-2">
              <div className="text-4xl mb-2 sm:mb-3">🚀</div>
              <h3 className="text-lg font-semibold">Personalización Total</h3>
              <p className="text-muted-foreground text-sm">Adapta y personaliza los prompts según tus necesidades específicas.</p>
            </div>
          </div>

          {/* Call to Action Final */}
          <div className="mt-12 sm:mt-20 text-center">
            {/* Versión Desktop */}
            <div className="hidden sm:inline-flex items-center gap-2 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent rounded-2xl p-6 mb-10">
              <div className="flex items-center gap-12">
                <div className="flex flex-col items-center">
                  <div className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/70 text-transparent bg-clip-text mb-1">5,000+</div>
                  <div className="text-sm text-muted-foreground/80">Creadores</div>
                </div>
                <div className="w-px h-12 bg-border/60"></div>
                <div className="flex flex-col items-center">
                  <div className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/70 text-transparent bg-clip-text mb-1">15,000+</div>
                  <div className="text-sm text-muted-foreground/80">Prompts</div>
                </div>
                <div className="w-px h-12 bg-border/60"></div>
                <div className="flex flex-col items-center">
                  <div className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/70 text-transparent bg-clip-text mb-1">4.9</div>
                  <div className="text-sm text-muted-foreground/80">Valoración Media</div>
                </div>
              </div>
            </div>

            {/* Versión Mobile */}
            <div className="sm:hidden space-y-4">
              <div className="bg-primary/5 rounded-xl p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="bg-primary/10 rounded-full p-2">
                      <span className="text-xl">👥</span>
                    </div>
                    <div className="text-left">
                      <p className="text-2xl font-bold text-primary">5,000+</p>
                      <p className="text-xs text-muted-foreground">Creadores</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="bg-primary/10 rounded-full p-2">
                      <span className="text-xl">📝</span>
                    </div>
                    <div className="text-left">
                      <p className="text-2xl font-bold text-primary">15,000+</p>
                      <p className="text-xs text-muted-foreground">Prompts</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-center mt-4">
                  <div className="bg-primary/10 rounded-full p-2">
                    <span className="text-xl">⭐️</span>
                  </div>
                  <div className="text-left ml-3">
                    <p className="text-2xl font-bold text-primary">4.9</p>
                    <p className="text-xs text-muted-foreground">Valoración Media</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
