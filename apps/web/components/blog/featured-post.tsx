import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { CalendarDays } from 'lucide-react';

interface FeaturedPostProps {
  slug: string;
  title: string;
  excerpt: string;
  coverImage: string;
  date: string;
  author: {
    name: string;
    avatar: string;
  };
  category: string;
  estimatedReadTime: number;
}

export function FeaturedPost({ slug, title, excerpt, coverImage, date, author, category, estimatedReadTime }: FeaturedPostProps) {
  return (
    <Link href={`/blog/${slug}`}>
      <Card className="overflow-hidden hover:shadow-lg transition-shadow">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="relative aspect-[16/9] md:aspect-square overflow-hidden">
            <Image
              src={coverImage}
              alt={title}
              fill
              className="object-cover transition-transform hover:scale-105"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>
          <CardContent className="p-6 flex flex-col justify-center">
            <div className="flex items-center gap-2 mb-4">
              <Badge variant="secondary" className="rounded-full">
                {category}
              </Badge>
              <span className="text-sm text-muted-foreground">{estimatedReadTime} min de lectura</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">{title}</h2>
            <p className="text-muted-foreground mb-6">{excerpt}</p>
            <div className="flex items-center justify-between mt-auto">
              <div className="flex items-center gap-2">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={author.avatar} alt={author.name} />
                  <AvatarFallback>{author.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <span className="font-medium">{author.name}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CalendarDays className="h-4 w-4" />
                <time dateTime={date}>{new Date(date).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}</time>
              </div>
            </div>
          </CardContent>
        </div>
      </Card>
    </Link>
  );
}
