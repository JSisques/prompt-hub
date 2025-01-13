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
import { useTranslation } from 'react-i18next';

export default function CreatePromptPage() {
  const { t } = useTranslation();
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
      toast.error(t('pages.createPrompt.messages.validation.categoryRequired'));
      return;
    }

    if (!formData.llmId) {
      toast.error(t('pages.createPrompt.messages.validation.llmRequired'));
      return;
    }

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
                <div className="space-y-2">
                  <Label>{t('pages.createPrompt.steps.basicInfo.fields.llm.label')}</Label>
                  <Select value={formData.llmId} onValueChange={handleLlmChange}>
                    <SelectTrigger>
                      <SelectValue placeholder={t('pages.createPrompt.steps.basicInfo.fields.llm.placeholder')} />
                    </SelectTrigger>
                    <SelectContent>
                      {loadingLlms ? (
                        <SelectItem value="loading" disabled>
                          {t('pages.createPrompt.steps.basicInfo.fields.llm.loading')}
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
              </div>
            </CardContent>
          )}

          {step === 3 && (
            <CardContent className="p-6">
              <CardHeader className="px-0 pt-0">
                <CardTitle>{t('pages.createPrompt.steps.finalDetails.title')}</CardTitle>
                <CardDescription>{t('pages.createPrompt.steps.finalDetails.description')}</CardDescription>
              </CardHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="category">{t('pages.createPrompt.steps.finalDetails.fields.category.label')}</Label>
                  <Select value={formData.categoryId} onValueChange={handleCategoryChange}>
                    <SelectTrigger>
                      <SelectValue placeholder={t('pages.createPrompt.steps.finalDetails.fields.category.placeholder')} />
                    </SelectTrigger>
                    <SelectContent>
                      {loadingCategories ? (
                        <SelectItem value="loading" disabled>
                          {t('pages.createPrompt.steps.finalDetails.fields.category.loading')}
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
                  <Label htmlFor="tagIds">{t('pages.createPrompt.steps.finalDetails.fields.tags.label')}</Label>
                  <Input
                    id="tagIds"
                    name="tagIds"
                    value={formData.tagIds}
                    onChange={handleInputChange}
                    placeholder={t('pages.createPrompt.steps.finalDetails.fields.tags.placeholder')}
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
