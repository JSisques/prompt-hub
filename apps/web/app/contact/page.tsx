'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Mail, MessageSquare, Phone } from 'lucide-react';

const contactInfo = [
  {
    icon: Mail,
    title: 'Email',
    description: 'Nuestro equipo responderá en 24-48 horas',
    value: 'soporte@prompthub.es',
  },
  {
    icon: MessageSquare,
    title: 'Chat en Vivo',
    description: 'Disponible de Lunes a Viernes',
    value: '9:00 AM - 6:00 PM (CET)',
  },
  {
    icon: Phone,
    title: 'Teléfono',
    description: 'Llámanos para soporte inmediato',
    value: '+34 900 123 456',
  },
];

export default function ContactPage() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí iría la lógica de envío del formulario
  };

  return (
    <div className="container px-4 md:px-6 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Información de Contacto */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">Contacto</h1>
            <p className="text-muted-foreground mt-2">¿Tienes alguna pregunta o sugerencia? Nos encantaría escucharte.</p>
          </div>

          <div className="grid gap-6">
            {contactInfo.map((item, index) => (
              <Card key={index}>
                <CardContent className="flex items-center gap-4 p-6">
                  <div className="p-3 rounded-full bg-primary/10">
                    <item.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                    <p className="text-sm font-medium mt-1">{item.value}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>FAQ</CardTitle>
              <CardDescription>Consulta nuestra sección de preguntas frecuentes para respuestas rápidas.</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full" asChild>
                <a href="/faq">Ver Preguntas Frecuentes</a>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Formulario de Contacto */}
        <Card>
          <CardHeader>
            <CardTitle>Envíanos un Mensaje</CardTitle>
            <CardDescription>Completa el formulario y te responderemos lo antes posible.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">Nombre</Label>
                  <Input id="firstName" placeholder="Tu nombre" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Apellidos</Label>
                  <Input id="lastName" placeholder="Tus apellidos" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="tu@email.com" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject">Asunto</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona un asunto" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="support">Soporte Técnico</SelectItem>
                    <SelectItem value="feedback">Sugerencias</SelectItem>
                    <SelectItem value="business">Colaboraciones</SelectItem>
                    <SelectItem value="other">Otro</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Mensaje</Label>
                <Textarea id="message" placeholder="Escribe tu mensaje aquí..." className="min-h-[150px]" />
              </div>

              <Button type="submit" className="w-full">
                Enviar Mensaje
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
