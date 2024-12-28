'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, Heart, MessageSquare } from 'lucide-react';
import { useState, useEffect } from 'react';

interface PromptCardProps {
  id: string;
  title: string;
  description: string;
  tags: string[];
  author: string;
  createdAt: Date;
  likes?: number;
  comments?: number;
}

export function PromptCard({ id, title, description, tags, author, createdAt, likes, comments }: PromptCardProps) {
  const [formattedDate, setFormattedDate] = useState<string>('');

  useEffect(() => {
    setFormattedDate(new Date(createdAt).toLocaleDateString());
  }, [createdAt]);

  return (
    <Card className="w-full hover:shadow-lg transition-all">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {tags.map(tag => (
              <span key={tag} className="px-2 py-1 bg-primary/10 text-primary rounded-full text-sm">
                {tag}
              </span>
            ))}
          </div>
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div>
              <span>Por {author}</span>
            </div>
            <div className="flex items-center gap-4">
              {likes !== undefined && (
                <div className="flex items-center gap-1">
                  <Heart className="h-4 w-4" />
                  <span>{likes}</span>
                </div>
              )}
              {comments !== undefined && (
                <div className="flex items-center gap-1">
                  <MessageSquare className="h-4 w-4" />
                  <span>{comments}</span>
                </div>
              )}
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{formattedDate}</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
