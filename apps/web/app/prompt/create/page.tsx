'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useState } from 'react';
import { Plus } from 'lucide-react';
import { CREATE_PROMPT } from '@/lib/graphql';
import { useMutation } from '@apollo/client';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';
import { useSession } from 'next-auth/react';

export default function CreatePromptPage() {
  const { t } = useTranslation();
  const router = useRouter();

  const { data: session } = useSession();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    content: '',
    example: '',
    published: true,
  });
  const [step, setStep] = useState(1);
  const totalSteps = 2;

  const [createPrompt, { loading }] = useMutation(CREATE_PROMPT, {
    onCompleted: data => {
      toast.success(t('pages.createPrompt.messages.success'));
      router.push(`/prompt/${data.createPrompt.id}`);
    },
    onError: error => {
      toast.error(t('pages.createPrompt.messages.error', { message: error.message }));
    },
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
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

    await createPrompt({
      variables: {
        input: {
          userId: session?.user?.id,
          title: formData.title,
          description: formData.description,
          content: formData.content,
          example: formData.example,
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
          {t('pages.createPrompt.title')}
        </h1>
        <p className="text-muted-foreground mt-2">{t('pages.createPrompt.subtitle')}</p>
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
                <CardTitle>{t('pages.createPrompt.steps.basicInfo.title')}</CardTitle>
                <CardDescription>{t('pages.createPrompt.steps.basicInfo.description')}</CardDescription>
              </CardHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">{t('pages.createPrompt.steps.basicInfo.fields.title.label')}</Label>
                  <Input
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder={t('pages.createPrompt.steps.basicInfo.fields.title.placeholder')}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">{t('pages.createPrompt.steps.basicInfo.fields.description.label')}</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder={t('pages.createPrompt.steps.basicInfo.fields.description.placeholder')}
                  />
                </div>
              </div>
            </CardContent>
          )}

          {step === 2 && (
            <CardContent className="p-6">
              <CardHeader className="px-0 pt-0">
                <CardTitle>{t('pages.createPrompt.steps.content.title')}</CardTitle>
                <CardDescription>{t('pages.createPrompt.steps.content.description')}</CardDescription>
              </CardHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="content">{t('pages.createPrompt.steps.content.fields.content.label')}</Label>
                  <Textarea
                    id="content"
                    name="content"
                    value={formData.content}
                    onChange={handleInputChange}
                    placeholder={t('pages.createPrompt.steps.content.fields.content.placeholder')}
                    className="min-h-[200px] font-mono"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="example">{t('pages.createPrompt.steps.content.fields.example.label')}</Label>
                  <Textarea
                    id="example"
                    name="example"
                    value={formData.example}
                    onChange={handleInputChange}
                    placeholder={t('pages.createPrompt.steps.content.fields.example.placeholder')}
                    className="min-h-[100px]"
                  />
                </div>
                <div className="space-y-2">
                  <Label>{t('pages.createPrompt.steps.finalDetails.fields.visibility.label')}</Label>
                  <RadioGroup
                    value={formData.published ? 'public' : 'private'}
                    onValueChange={value => setFormData(prev => ({ ...prev, published: value === 'public' }))}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="public" id="public" />
                      <Label htmlFor="public">{t('pages.createPrompt.steps.finalDetails.fields.visibility.public')}</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="private" id="private" />
                      <Label htmlFor="private">{t('pages.createPrompt.steps.finalDetails.fields.visibility.private')}</Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
            </CardContent>
          )}

          <div className="p-6 border-t flex justify-between">
            <Button type="button" variant="outline" onClick={handleBack} disabled={step === 1}>
              {t('pages.createPrompt.navigation.back')}
            </Button>
            {step < totalSteps ? (
              <Button type="button" onClick={handleNext}>
                {t('pages.createPrompt.navigation.next')}
              </Button>
            ) : (
              <Button type="submit" disabled={loading}>
                {loading ? t('pages.createPrompt.navigation.publishing') : t('pages.createPrompt.navigation.publish')}
              </Button>
            )}
          </div>
        </Card>
      </form>
    </div>
  );
}
