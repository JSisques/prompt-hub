'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useState } from 'react';
import { Plus } from 'lucide-react';

export default function CreatePromptPage() {
  const [step, setStep] = useState(1);
  const totalSteps = 3;

  const handleNext = () => {
    if (step < totalSteps) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí iría la lógica de envío del formulario
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Plus className="h-8 w-8 text-primary" />
          Crear Prompt
        </h1>
        <p className="text-muted-foreground mt-2">Comparte tu prompt con la comunidad. Te guiaremos paso a paso en el proceso.</p>
      </div>

      {/* Indicador de progreso */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-muted" />
        </div>
        <div className="relative flex justify-between">
          {Array.from({ length: totalSteps }).map((_, i) => (
            <div
              key={i}
              className={`flex h-8 w-8 items-center justify-center rounded-full ${
                i + 1 <= step ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
              }`}
            >
              {i + 1}
            </div>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <Card>
          {step === 1 && (
            <CardContent className="p-6 space-y-6">
              <CardHeader className="px-0 pt-0">
                <CardTitle>Información Básica</CardTitle>
                <CardDescription>Comienza con los detalles esenciales de tu prompt.</CardDescription>
              </CardHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Título</Label>
                  <Input id="title" placeholder="Un título descriptivo para tu prompt" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Descripción</Label>
                  <Textarea id="description" placeholder="Explica brevemente qué hace tu prompt" />
                </div>
                <div className="space-y-2">
                  <Label>Modelo de IA</Label>
                  <RadioGroup defaultValue="chatgpt">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="chatgpt" id="chatgpt" />
                      <Label htmlFor="chatgpt">ChatGPT</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="dalle" id="dalle" />
                      <Label htmlFor="dalle">DALL·E</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="other" id="other" />
                      <Label htmlFor="other">Otro</Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
            </CardContent>
          )}

          {step === 2 && (
            <CardContent className="p-6 space-y-6">
              <CardHeader className="px-0 pt-0">
                <CardTitle>Contenido del Prompt</CardTitle>
                <CardDescription>Escribe y formatea tu prompt.</CardDescription>
              </CardHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="prompt">Prompt</Label>
                  <Textarea id="prompt" placeholder="Escribe tu prompt aquí..." className="min-h-[200px] font-mono" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="example">Ejemplo de Uso</Label>
                  <Textarea id="example" placeholder="Proporciona un ejemplo de cómo usar el prompt" className="min-h-[100px]" />
                </div>
              </div>
            </CardContent>
          )}

          {step === 3 && (
            <CardContent className="p-6 space-y-6">
              <CardHeader className="px-0 pt-0">
                <CardTitle>Detalles Finales</CardTitle>
                <CardDescription>Añade los últimos detalles antes de publicar.</CardDescription>
              </CardHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="tags">Etiquetas</Label>
                  <Input id="tags" placeholder="Separa las etiquetas con comas" />
                </div>
                <div className="space-y-2">
                  <Label>Visibilidad</Label>
                  <RadioGroup defaultValue="public">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="public" id="public" />
                      <Label htmlFor="public">Público</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="private" id="private" />
                      <Label htmlFor="private">Privado</Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
            </CardContent>
          )}

          <div className="p-6 border-t flex justify-between">
            <Button type="button" variant="outline" onClick={handleBack} disabled={step === 1}>
              Anterior
            </Button>
            {step < totalSteps ? (
              <Button type="button" onClick={handleNext}>
                Siguiente
              </Button>
            ) : (
              <Button type="submit">Publicar Prompt</Button>
            )}
          </div>
        </Card>
      </form>
    </div>
  );
}
