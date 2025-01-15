'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Copy, Share, FolderIcon, Heart, MessageSquare, Star, Bot, Clock, Info, Hash } from 'lucide-react';
import { useState } from 'react';
import { ReviewsSection } from '@/components/reviews/list';
import { CommentsSection } from '@/components/comments/list';
import moment from 'moment';
import 'moment/locale/es';
import { PromptDetailProps } from '@/types/prompt';
import { useTranslation } from 'react-i18next';

export function PromptDetail({
  id,
  title,
  content,
  description,
  category,
  tags,
  user,
  createdAt,
  likes = 0,
  reviews = [],
  comments = [],
  example,
  llm,
}: PromptDetailProps) {
  const [copied, setCopied] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(likes);
  const { t } = useTranslation();

  const handleCopy = async () => {
    await navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount((prev: number) => (isLiked ? prev - 1 : prev + 1));
  };

  const averageRating = reviews.length > 0 ? (reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length).toFixed(1) : '0.0';

  return (
    <div className="container">
      {/* Header */}
      <div className="space-y-8">
        {/* Título y Descripción */}
        <div className="space-y-4">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight break-words">{title}</h1>
          <p className="text-base sm:text-lg text-muted-foreground">{description}</p>
        </div>

        {/* Metadata y Acciones */}
        <div className="flex flex-col gap-6">
          {/* Botones de Acción */}
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <Share size={16} />
              {t('pages.promptDetail.actions.share')}
            </Button>
            <Button variant={isLiked ? 'default' : 'outline'} size="sm" onClick={handleLike} className="flex items-center gap-2">
              <Heart size={16} className={isLiked ? 'fill-current' : ''} />
              <span>{likeCount}</span>
            </Button>
          </div>

          {/* Metadata */}
          <div className="flex flex-wrap gap-3 items-center text-sm">
            <div className="flex items-center gap-2">
              <FolderIcon size={16} className="text-primary shrink-0" />
              <span className="font-medium">{category.name}</span>
            </div>
            {llm && (
              <div className="flex items-center gap-2">
                <Bot size={16} className="text-primary shrink-0" />
                <span className="font-medium">{llm.name}</span>
              </div>
            )}
            <div className="flex items-center gap-2">
              <Star size={16} className="text-primary shrink-0" />
              <span className="font-medium">
                {reviews.length} {t('pages.promptDetail.metadata.reviews')}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <MessageSquare size={16} className="text-primary shrink-0" />
              <span className="font-medium">
                {comments.length} {t('pages.promptDetail.metadata.comments')}
              </span>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {tags.map(tag => (
              <Badge key={tag.id} variant="secondary" className="px-3 py-1 text-sm rounded-full hover:bg-secondary/80 transition-colors">
                #{tag.name}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      {/* Contenido Principal */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
        {/* Columna Principal */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
              <CardTitle>{t('pages.promptDetail.content.prompt')}</CardTitle>
              <Button variant="outline" size="sm" onClick={handleCopy} className="flex items-center gap-2">
                <Copy size={16} />
                {copied ? t('pages.promptDetail.actions.copied') : t('pages.promptDetail.actions.copy')}
              </Button>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-muted rounded-lg p-6">
                <p className="whitespace-pre-wrap font-mono text-sm leading-relaxed">{content}</p>
              </div>
              {example && (
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold">{t('pages.promptDetail.content.example')}</h3>
                  <div className="bg-muted rounded-lg p-6">
                    <p className="whitespace-pre-wrap text-sm">{example}</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Tabs de Reviews y Comentarios */}
          <Tabs defaultValue="reviews" className="space-y-6">
            <TabsList className="grid grid-cols-2">
              <TabsTrigger value="reviews" className="flex items-center gap-2">
                <Star className="h-4 w-4" />
                {t('pages.promptDetail.tabs.reviews')} ({reviews.length})
              </TabsTrigger>
              <TabsTrigger value="comments" className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                {t('pages.promptDetail.tabs.comments')} ({comments.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="reviews">
              <ReviewsSection promptId={id} reviews={reviews} />
            </TabsContent>

            <TabsContent value="comments">
              <CommentsSection promptId={id} comments={comments} />
            </TabsContent>
          </Tabs>
        </div>

        {/* Barra Lateral - Información Adicional */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Info className="h-5 w-5" />
                {t('pages.promptDetail.additionalInfo.title')}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              {/* Información del Autor */}
              <div className="space-y-4">
                <h3 className="font-semibold flex items-center gap-2">{t('pages.promptDetail.additionalInfo.author.title')}</h3>
                <div className="flex items-center gap-4">
                  {user.avatar && <img src={user.avatar} alt={user.username} className="h-12 w-12 rounded-full" />}
                  <div>
                    <h4 className="font-medium">{user.username}</h4>
                    {user.bio && <p className="text-sm text-muted-foreground">{user.bio}</p>}
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>{t('pages.promptDetail.additionalInfo.author.publishedOn', { date: moment(createdAt).format('DD/MM/YYYY') })}</span>
                </div>
              </div>

              {/* Detalles del Prompt */}
              <div className="space-y-4">
                <h3 className="font-semibold flex items-center gap-2">
                  <Hash className="h-4 w-4" />
                  {t('pages.promptDetail.additionalInfo.details.title')}
                </h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-medium">{t('pages.promptDetail.additionalInfo.details.category')}</p>
                    <p className="text-sm text-muted-foreground">{category.description || category.name}</p>
                  </div>
                  {llm && (
                    <div>
                      <p className="text-sm font-medium">{t('pages.promptDetail.additionalInfo.details.aiModel')}</p>
                      <p className="text-sm text-muted-foreground">{llm.description || llm.name}</p>
                    </div>
                  )}
                  <div>
                    <p className="text-sm font-medium">{t('pages.promptDetail.additionalInfo.details.tags')}</p>
                    <p className="text-sm text-muted-foreground">{tags.map(t => t.name).join(', ')}</p>
                  </div>
                </div>
              </div>

              {/* Estadísticas */}
              <div className="space-y-4">
                <h3 className="font-semibold">{t('pages.promptDetail.additionalInfo.stats.title')}</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-2xl font-bold">{likeCount}</p>
                    <p className="text-sm text-muted-foreground">{t('pages.promptDetail.additionalInfo.stats.likes')}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-2xl font-bold">{averageRating}</p>
                    <p className="text-sm text-muted-foreground">{t('pages.promptDetail.additionalInfo.stats.averageRating')}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-2xl font-bold">{reviews.length}</p>
                    <p className="text-sm text-muted-foreground">{t('pages.promptDetail.additionalInfo.stats.reviews')}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-2xl font-bold">{comments.length}</p>
                    <p className="text-sm text-muted-foreground">{t('pages.promptDetail.additionalInfo.stats.comments')}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
