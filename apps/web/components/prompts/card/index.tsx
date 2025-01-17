'use client';

import * as React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, User, MessageSquare, ThumbsUp } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Tag, User as UserType, Like, Comment } from '@/lib/types';

interface PromptCardProps {
  id: string;
  title: string;
  description: string;
  tags: Tag[];
  user: UserType;
  createdAt: Date;
  likes: Like[];
  comments: Comment[];
}

export function PromptCard({ id, title, description, tags, user, createdAt, likes = [], comments = [] }: PromptCardProps) {
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
              <span>{likes.length}</span>
            </div>
            <div className="flex items-center space-x-1">
              <MessageSquare size={14} />
              <span>{comments.length}</span>
            </div>
          </div>
        </div>
        <CardDescription className="line-clamp-2">{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-wrap gap-2">
          {tags.map((tag: Tag) => (
            <Badge key={tag.id} variant="secondary" className="hover:bg-primary hover:text-primary-foreground transition-colors">
              {tag.name}
            </Badge>
          ))}
        </div>
      </CardContent>
      {(user || createdAt) && (
        <CardFooter className="text-sm text-muted-foreground border-t pt-4">
          {user && (
            <div className="flex items-center gap-2">
              <User size={14} />
              <span>{user.username}</span>
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
