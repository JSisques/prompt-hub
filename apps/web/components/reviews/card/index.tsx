import { Card } from '@/components/ui/card';
import { Star, User } from 'lucide-react';
import { ReviewCardProps } from '@/types/review';

export function ReviewCard({ comment, rating, userId, createdAt }: ReviewCardProps) {
  return (
    <Card className="p-4">
      <div className="space-y-4">
        {/* Header: Usuario y Fecha */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="bg-muted rounded-full p-2">
              <User size={16} className="text-muted-foreground" />
            </div>
            <span className="font-medium">{userId}</span>
          </div>
          <span className="text-sm text-muted-foreground">
            {createdAt.toLocaleDateString('es-ES', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </span>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={16} className={i < rating ? 'fill-primary text-primary' : 'text-muted'} />
          ))}
        </div>

        {/* Comentario */}
        <p className="text-sm text-muted-foreground">{comment}</p>
      </div>
    </Card>
  );
}
