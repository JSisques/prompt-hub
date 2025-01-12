'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useState } from 'react';
import { Plus } from 'lucide-react';
import { CREATE_PROMPT, GET_CATEGORIES, GET_LLMS } from '@/lib/graphql';
import { useMutation, useQuery } from '@apollo/client';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export default function CreatePromptPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    categoryId: '',
    llmId: '',
    content: '',
    example: '',
    tagIds: [] as string[],
    published: true,
  });
  const [step, setStep] = useState(1);
  const totalSteps = 3;

  const { data: categoriesData, loading: loadingCategories } = useQuery(GET_CATEGORIES);
  const { data: llmsData, loading: loadingLlms } = useQuery(GET_LLMS);

  const [createPrompt, { loading }] = useMutation(CREATE_PROMPT, {
    onCompleted: data => {
      toast.success('¡Prompt creado con éxito!');
      router.push(`/prompt/${data.createPrompt.id}`);
    },
    onError: error => {
      toast.error('Error al crear el prompt: ' + error.message);
    },
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCategoryChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      categoryId: value,
    }));
  };

  const handleLlmChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      llmId: value,
    }));
  };

  const handleNext = () => {
    if (step < totalSteps) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.categoryId) {
      toast.error('Por favor, selecciona una categoría');
      return;
    }

    if (!formData.llmId) {
      toast.error('Por favor, selecciona un modelo de IA');
      return;
    }

    // Convertir las etiquetas de string a array
    const tags =
      formData.tagIds.length > 0
        ? formData.tagIds
        : formData.tagIds
            .toString()
            .split(',')
            .map(tag => tag.trim());

    await createPrompt({
      variables: {
        input: {
          title: formData.title,
          description: formData.description,
          categoryId: formData.categoryId,
          llmId: formData.llmId,
          content: formData.content,
          example: formData.example,
          tagIds: tags,
          published: formData.published,
        },
      },
    });
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
            <CardContent className="p-6">
              <CardHeader className="px-0 pt-0">
                <CardTitle>Información Básica</CardTitle>
                <CardDescription>Comienza con los detalles esenciales de tu prompt.</CardDescription>
              </CardHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Título</Label>
                  <Input
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="Un título descriptivo para tu prompt"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Descripción</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Explica brevemente qué hace tu prompt"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Modelo de IA</Label>
                  <Select value={formData.llmId} onValueChange={handleLlmChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona un modelo de IA" />
                    </SelectTrigger>
                    <SelectContent>
                      {loadingLlms ? (
                        <SelectItem value="loading" disabled>
                          Cargando modelos...
                        </SelectItem>
                      ) : (
                        llmsData?.getLlms?.map((llm: { id: string; name: string }) => (
                          <SelectItem key={llm.id} value={llm.id}>
                            {llm.name}
                          </SelectItem>
                        ))
                      )}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          )}

          {step === 2 && (
            <CardContent className="p-6">
              <CardHeader className="px-0 pt-0">
                <CardTitle>Contenido del Prompt</CardTitle>
                <CardDescription>Escribe y formatea tu prompt.</CardDescription>
              </CardHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="content">Prompt</Label>
                  <Textarea
                    id="content"
                    name="content"
                    value={formData.content}
                    onChange={handleInputChange}
                    placeholder="Escribe tu prompt aquí..."
                    className="min-h-[200px] font-mono"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="example">Ejemplo de Uso</Label>
                  <Textarea
                    id="example"
                    name="example"
                    value={formData.example}
                    onChange={handleInputChange}
                    placeholder="Proporciona un ejemplo de cómo usar el prompt"
                    className="min-h-[100px]"
                  />
                </div>
              </div>
            </CardContent>
          )}

          {step === 3 && (
            <CardContent className="p-6">
              <CardHeader className="px-0 pt-0">
                <CardTitle>Detalles Finales</CardTitle>
                <CardDescription>Añade los últimos detalles antes de publicar.</CardDescription>
              </CardHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Categoría</Label>
                  <Select value={formData.categoryId} onValueChange={handleCategoryChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona una categoría" />
                    </SelectTrigger>
                    <SelectContent>
                      {loadingCategories ? (
                        <SelectItem value="loading" disabled>
                          Cargando categorías...
                        </SelectItem>
                      ) : (
                        categoriesData?.getCategories?.map((category: { id: string; name: string }) => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.name}
                          </SelectItem>
                        ))
                      )}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tagIds">Etiquetas</Label>
                  <Input
                    id="tagIds"
                    name="tagIds"
                    value={formData.tagIds}
                    onChange={handleInputChange}
                    placeholder="Separa las etiquetas con comas"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Visibilidad</Label>
                  <RadioGroup
                    value={formData.published ? 'public' : 'private'}
                    onValueChange={value => setFormData(prev => ({ ...prev, published: value === 'public' }))}
                  >
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
              <Button type="submit" disabled={loading}>
                {loading ? 'Publicando...' : 'Publicar Prompt'}
              </Button>
            )}
          </div>
        </Card>
      </form>
    </div>
  );
}
