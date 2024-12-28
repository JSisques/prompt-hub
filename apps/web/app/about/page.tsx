'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, Users, Target, Shield } from 'lucide-react';
import Link from 'next/link';

const values = [
  {
    icon: Heart,
    title: 'Comunidad',
    description: 'Creemos en el poder de compartir conocimiento y experiencias para crecer juntos.',
  },
  {
    icon: Users,
    title: 'Colaboración',
    description: 'Fomentamos un ambiente de colaboración donde todos pueden contribuir y aprender.',
  },
  {
    icon: Target,
    title: 'Innovación',
    description: 'Buscamos constantemente nuevas formas de mejorar la interacción con la IA.',
  },
  {
    icon: Shield,
    title: 'Confianza',
    description: 'Priorizamos la seguridad y privacidad de nuestra comunidad en todo momento.',
  },
];

const team = [
  {
    name: 'María García',
    role: 'Fundadora & CEO',
    bio: 'Experta en IA con más de 10 años de experiencia en el sector tecnológico.',
    image: '/team/maria.jpg',
  },
  {
    name: 'Carlos Ruiz',
    role: 'CTO',
    bio: 'Desarrollador full-stack con pasión por crear herramientas que mejoren la productividad.',
    image: '/team/carlos.jpg',
  },
  {
    name: 'Ana López',
    role: 'Directora de Producto',
    bio: 'Especialista en UX/UI con enfoque en crear experiencias intuitivas y accesibles.',
    image: '/team/ana.jpg',
  },
];

export default function AboutPage() {
  return (
    <div className="container px-4 md:px-6 py-8">
      <div className="space-y-12">
        {/* Hero Section */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold">Sobre Nosotros</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Somos una plataforma dedicada a democratizar el acceso a prompts de calidad para IA, facilitando la colaboración y el aprendizaje en la
            comunidad.
          </p>
        </div>

        {/* Misión */}
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <h2 className="text-2xl font-bold">Nuestra Misión</h2>
          <p className="text-muted-foreground">
            Nuestra misión es crear un ecosistema donde los usuarios puedan compartir, descubrir y aprender a crear prompts efectivos para diferentes
            modelos de IA, fomentando la innovación y el crecimiento colectivo.
          </p>
        </div>

        {/* Valores */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-center">Nuestros Valores</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card key={index} className="text-center">
                <CardContent className="pt-6">
                  <div className="flex justify-center mb-4">
                    <div className="p-3 rounded-full bg-primary/10">
                      <value.icon className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                  <h3 className="font-semibold mb-2">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Equipo */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-center">Nuestro Equipo</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {team.map((member, index) => (
              <Card key={index}>
                <CardContent className="pt-6 text-center">
                  <div className="w-24 h-24 rounded-full bg-primary/10 mx-auto mb-4" />
                  <h3 className="font-semibold">{member.name}</h3>
                  <p className="text-sm text-primary mb-2">{member.role}</p>
                  <p className="text-sm text-muted-foreground">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold">Únete a Nuestra Comunidad</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Sé parte de una comunidad vibrante de creadores y usuarios de prompts. Juntos podemos mejorar la forma en que interactuamos con la IA.
          </p>
          <Button asChild size="lg">
            <Link href="/auth/register">Comenzar Ahora</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
