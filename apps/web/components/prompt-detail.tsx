'use client';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { ThumbsUp, MessageSquare, Copy, Share, FolderIcon } from 'lucide-react';
import { useState } from 'react';
import { ReviewsSection } from './reviews-section';

interface Review {
  id: string;
  comment: string;
  rating: number;
  userId: string;
  promptId: string;
  createdAt: Date;
  updatedAt: Date;
}

interface PromptDetailProps {
  id: string;
  title: string;
  prompt: string;
  category: string;
  tags: string[];
  author: string;
  createdAt: Date;
  likes?: number;
  comments?: number;
  reviews?: Review[];
}

export function PromptDetail({ id, title, prompt, category, tags, author, createdAt, likes = 0, comments = 0, reviews = [] }: PromptDetailProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Encabezado con título y metadata */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-muted-foreground mb-2">
          <FolderIcon size={16} className="text-primary" />
          <span className="text-sm">{category}</span>
        </div>
        <h1 className="text-4xl font-bold mb-4">{title}</h1>
        <div className="flex items-center gap-4 text-muted-foreground mb-4">
          <span>Por {author}</span>
          <span>•</span>
          <span>
            {createdAt.toLocaleDateString('es-ES', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          {tags.map(tag => (
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

      {/* Sección de Estadísticas */}
      <div className="flex items-center gap-6 mb-8">
        <div className="flex items-center gap-2">
          <ThumbsUp className="text-primary" size={20} />
          <span className="text-lg font-semibold">{likes}</span>
          <span className="text-muted-foreground">likes</span>
        </div>
        <div className="flex items-center gap-2">
          <MessageSquare className="text-primary" size={20} />
          <span className="text-lg font-semibold">{comments}</span>
          <span className="text-muted-foreground">comentarios</span>
        </div>
      </div>

      {/* Sección de Reviews */}
      <ReviewsSection promptId={id} reviews={reviews} />
    </div>
  );
}
