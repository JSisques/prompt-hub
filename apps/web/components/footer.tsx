'use client';

import Link from 'next/link';
import { GitHubLogoIcon, TwitterLogoIcon, InstagramLogoIcon, LinkedInLogoIcon, DiscordLogoIcon } from '@radix-ui/react-icons';
import { useState, useEffect } from 'react';

const footerLinks = [
  {
    title: 'Producto',
    links: [
      { label: 'Prompts', href: '/prompts' },
      { label: 'Explorar', href: '/explore' },
      { label: 'Novedades', href: '#' },
    ],
  },
  {
    title: 'Recursos',
    links: [
      { label: 'Guía', href: '/guide' },
      { label: 'Blog', href: '/blog' },
      { label: 'FAQ', href: '/faq' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacidad', href: '/privacy' },
      { label: 'Términos', href: '/terms' },
      { label: 'Cookies', href: '/cookies' },
    ],
  },
];

const mobileLinks = [
  { label: 'Prompts', href: '/prompts' },
  { label: 'Explorar', href: '/explore' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Blog', href: '#' },
];

const socialLinks = [
  {
    label: 'GitHub',
    href: 'https://github.com/jsisques',
    icon: GitHubLogoIcon,
  },
  {
    label: 'Twitter',
    href: 'https://twitter.com/jsisques',
    icon: TwitterLogoIcon,
  },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/jsisques',
    icon: LinkedInLogoIcon,
  },
  {
    label: 'Instagram',
    href: 'https://instagram.com/jsisques',
    icon: InstagramLogoIcon,
  },
  {
    label: 'Discord',
    href: 'https://discord.gg/jsisques',
    icon: DiscordLogoIcon,
  },
];

export function Footer() {
  const [currentYear, setCurrentYear] = useState(2024);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="w-full border-t bg-background">
      {/* Versión Mobile */}
      <div className="container flex flex-col items-center gap-6 py-8 md:hidden">
        <div className="flex flex-col items-center gap-6">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">PH</div>
            <span className="font-semibold">Prompt Hub</span>
          </Link>

          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {mobileLinks.map(link => (
              <Link key={link.label} href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex flex-col items-center gap-6">
          <div className="flex items-center gap-4">
            {socialLinks.map(link => (
              <Link
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <link.icon className="h-5 w-5" />
                <span className="sr-only">{link.label}</span>
              </Link>
            ))}
          </div>
          <p className="text-sm text-muted-foreground">© {currentYear} Prompt Hub</p>
        </div>
      </div>

      {/* Versión Desktop */}
      <div className="hidden md:block">
        <div className="container max-w-none px-8 py-12">
          <div className="flex gap-24">
            {/* Logo y descripción */}
            <div className="flex flex-col gap-4 md:max-w-xs">
              <Link href="/" className="flex items-center gap-2">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">PH</div>
                <span className="font-semibold">Prompt Hub</span>
              </Link>
              <p className="text-sm text-muted-foreground">Crea, comparte y descubre los mejores prompts para IA.</p>
              <div className="flex items-center gap-4">
                {socialLinks.map(link => (
                  <Link
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    <link.icon className="h-5 w-5" />
                    <span className="sr-only">{link.label}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Enlaces */}
            <div className="flex flex-1 justify-between">
              {footerLinks.map(group => (
                <div key={group.title} className="flex flex-col gap-3">
                  <h3 className="font-semibold text-sm">{group.title}</h3>
                  <ul className="flex flex-col gap-2">
                    {group.links.map(link => (
                      <li key={link.label}>
                        <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-12 flex items-center justify-between border-t pt-8 text-sm text-muted-foreground">
            <p>© {currentYear} Prompt Hub. Todos los derechos reservados.</p>
            <p className="flex items-center gap-1">
              Hecho con 🖤 por{' '}
              <Link
                href="https://github.com/jsisques"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-foreground hover:text-primary"
              >
                JSisques
              </Link>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
