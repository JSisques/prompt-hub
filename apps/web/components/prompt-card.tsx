'use client';

import * as React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from './ui/card';
import { Badge } from './ui/badge';
import { Clock, User, MessageSquare, ThumbsUp } from 'lucide-react';
import { useRouter } from 'next/navigation';

export interface PromptCardProps {
  id: string;
  title: string;
  description: string;
  tags: string[];
  author?: string;
  createdAt?: Date;
  likes?: number;
  comments?: number;
}

export function PromptCard({ id, title, description, tags, author, createdAt, likes = 0, comments = 0 }: PromptCardProps) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/prompt/${id}`);
  };

  return (
    <Card
      className="w-full hover:shadow-lg transition-all duration-300 cursor-pointer border-muted/20 hover:border-primary/20 group"
      onClick={handleClick}
    >
      <CardHeader className="space-y-2">
        <div className="flex items-start justify-between">
          <CardTitle className="text-xl group-hover:text-primary transition-colors">{title}</CardTitle>
          <div className="flex items-center space-x-4 text-muted-foreground text-sm">
            <div className="flex items-center space-x-1">
              <ThumbsUp size={14} />
              <span>{likes}</span>
            </div>
            <div className="flex items-center space-x-1">
              <MessageSquare size={14} />
              <span>{comments}</span>
            </div>
          </div>
        </div>
        <CardDescription className="line-clamp-2">{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-wrap gap-2">
          {tags.map(tag => (
            <Badge key={tag} variant="secondary" className="hover:bg-primary hover:text-primary-foreground transition-colors">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      {(author || createdAt) && (
        <CardFooter className="text-sm text-muted-foreground border-t pt-4">
          {author && (
            <div className="flex items-center gap-2">
              <User size={14} />
              <span>{author}</span>
            </div>
          )}
          {createdAt && (
            <div className="flex items-center gap-2 ml-auto">
              <Clock size={14} />
              <span>{createdAt.toLocaleDateString()}</span>
            </div>
          )}
        </CardFooter>
      )}
    </Card>
  );
}
