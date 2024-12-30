'use client';

import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/navbar';
import { Footer } from '@/components/footer';
import { Providers } from '@/providers/providers';
import { usePathname } from 'next/navigation';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAuthPage = pathname?.startsWith('/auth');

  return (
    <html lang="es" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <div className="flex min-h-screen flex-col bg-background">
            {!isAuthPage && <Navbar />}
            <main className={`flex-1 ${!isAuthPage ? 'container mx-auto px-4 py-8 md:px-6 md:py-10' : ''}`}>{children}</main>
            {!isAuthPage && <Footer />}
          </div>
        </Providers>
      </body>
    </html>
  );
}
