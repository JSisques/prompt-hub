'use client';

import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Copy, Share, FolderIcon, Heart } from 'lucide-react';
import { useState } from 'react';
import { ReviewsSection } from '@/components/reviews/list';
import { CommentsSection } from '@/components/comments/list';
import moment from 'moment';
import 'moment/locale/es';
import { PromptDetailProps } from '@/types/prompt';

export function PromptDetail({
  id,
  title,
  prompt,
  category,
  tags,
  author,
  createdAt,
  likes = 0,
  reviews = [],
  promptComments = [],
}: PromptDetailProps) {
  const [copied, setCopied] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(likes);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount((prev: number) => (isLiked ? prev - 1 : prev + 1));
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Encabezado con título y metadata */}
      <div className="mb-8">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-2 text-muted-foreground">
            <FolderIcon size={16} className="text-primary" />
            <span className="text-sm">{category}</span>
          </div>
          <Button variant={isLiked ? 'default' : 'outline'} size="sm" onClick={handleLike} className="flex items-center gap-2">
            <Heart size={16} className={isLiked ? 'fill-current' : ''} />
            <span>{likeCount}</span>
          </Button>
        </div>
        <h1 className="text-4xl font-bold mb-4">{title}</h1>

        <div className="flex flex-col gap-2 mb-4">
          <div className="flex items-center gap-4 text-muted-foreground">
            <span className="flex items-center gap-2">{author.username}</span>
            <span>•</span>
            <span>{moment(createdAt).format('DD/MM/YYYY')}</span>
          </div>

          <div className="flex flex-wrap gap-2">
            {tags.map((tag: string) => (
              <Badge key={tag} variant="secondary" className="hover:bg-secondary/80">
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        {/* Contenedor del Prompt */}
        <Card className="mb-8">
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Prompt</h2>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={handleCopy} className="flex items-center gap-2">
                  <Copy size={16} />
                  {copied ? '¡Copiado!' : 'Copiar'}
                </Button>
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <Share size={16} />
                  Compartir
                </Button>
              </div>
            </div>
            <div className="bg-muted rounded-lg p-6">
              <p className="whitespace-pre-wrap font-mono text-sm">{prompt}</p>
            </div>
          </div>
        </Card>

        {/* Sección de Comentarios */}
        <div className="space-y-6 mt-8">
          <CommentsSection promptId={id} comments={promptComments} />
        </div>

        {/* Sección de Reviews */}
        <div className="mt-8">
          <ReviewsSection promptId={id} reviews={reviews} />
        </div>
      </div>
    </div>
  );
}
