'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, Heart, MessageSquare } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { Prompt, User, Tag, Like, Comment, Category } from '@/lib/types';
import { Badge } from '@/components/ui/badge';

interface PromptCardProps {
  id: string;
  title: string;
  description: string;
  tags: Tag[];
  user: User;
  category: Category;
  createdAt: Date;
  likes?: Like[];
  comments?: number;
}

export function PromptCard({ id, title, description, tags, user, category, createdAt, likes, comments }: PromptCardProps) {
  const [formattedDate, setFormattedDate] = useState<string>('');
  const [visibleTags, setVisibleTags] = useState<Tag[]>([]);
  const [hiddenTagsCount, setHiddenTagsCount] = useState(0);
  const tagsContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setFormattedDate(
      new Date(createdAt).toLocaleDateString(undefined, {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      }),
    );
  }, [createdAt]);

  useEffect(() => {
    const calculateVisibleTags = () => {
      if (!tagsContainerRef.current) return;

      let totalWidth = 0;
      const containerWidth = tagsContainerRef.current.offsetWidth;
      const tempDiv = document.createElement('div');
      tempDiv.style.visibility = 'hidden';
      tempDiv.style.position = 'absolute';
      document.body.appendChild(tempDiv);

      const visibleTags: Tag[] = [];
      let remainingTags = 0;

      for (const tag of tags) {
        tempDiv.innerHTML = `<span class="px-2 py-1 text-sm">${tag.name}</span>`;
        const element = tempDiv.firstElementChild as HTMLElement;
        if (!element) continue;

        const tagWidth = element.getBoundingClientRect().width;

        if (totalWidth + tagWidth + (visibleTags.length > 0 ? 8 : 0) <= containerWidth - 60) {
          totalWidth += tagWidth + (visibleTags.length > 0 ? 8 : 0);
          visibleTags.push(tag);
        } else {
          remainingTags = tags.length - visibleTags.length;
          break;
        }
      }

      document.body.removeChild(tempDiv);
      setVisibleTags(visibleTags);
      setHiddenTagsCount(remainingTags);
    };

    calculateVisibleTags();
    window.addEventListener('resize', calculateVisibleTags);

    return () => {
      window.removeEventListener('resize', calculateVisibleTags);
    };
  }, [tags]);

  return (
    <Card className="w-full hover:shadow-lg transition-all h-60 flex flex-col">
      <CardHeader className="flex-none">
        <CardTitle className="line-clamp-1">{title}</CardTitle>
        <CardDescription className="line-clamp-3 break-words whitespace-pre-wrap min-h-[3rem] text-sm">{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col justify-end">
        <div className="space-y-4">
          <div ref={tagsContainerRef} className="flex flex-wrap gap-2 items-center">
            {visibleTags.map(tag => (
              <Badge key={tag.id} variant="secondary" className="text-xs">
                {tag.name}
              </Badge>
            ))}
            {hiddenTagsCount > 0 && (
              <Badge variant="outline" className="text-xs">
                +{hiddenTagsCount} más
              </Badge>
            )}
          </div>
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div>
              <span>@{user.username}</span>
            </div>
            <div className="flex items-center gap-4">
              {likes && (
                <div className="flex items-center gap-1">
                  <Heart className="h-4 w-4" />
                  <span>{likes.length}</span>
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
