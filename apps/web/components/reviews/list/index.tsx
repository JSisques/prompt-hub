import { Card } from '@/components/ui/card';
import { ReviewCard } from '../card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';
import { Star } from 'lucide-react';
import { ReviewsSectionProps } from '@/types/review';

export function ReviewsSection({ promptId, reviews }: ReviewsSectionProps) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [hoveredRating, setHoveredRating] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implementar la llamada a la API para crear la review
    console.log({ rating, comment, promptId });
  };

  return (
    <div className="space-y-6">
      {/* Título y contador */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Reviews</h2>
        <span className="text-muted-foreground">
          {reviews.length} {reviews.length === 1 ? 'review' : 'reviews'}
        </span>
      </div>

      {/* Formulario de Review */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Añadir Review</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Rating Selector */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Valoración</label>
            <div className="flex justify-between w-full">
              {[1, 2, 3, 4, 5].map(value => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setRating(value)}
                  onMouseEnter={() => setHoveredRating(value)}
                  onMouseLeave={() => setHoveredRating(0)}
                  className="p-2 hover:scale-110 transition-transform"
                >
                  <Star
                    size={28}
                    className={`${value <= (hoveredRating || rating) ? 'fill-primary text-primary' : 'text-muted'} transition-colors`}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Comentario */}
          <div className="space-y-2">
            <label htmlFor="comment" className="text-sm font-medium">
              Comentario
            </label>
            <Textarea
              id="comment"
              value={comment}
              onChange={e => setComment(e.target.value)}
              placeholder="Escribe tu opinión sobre este prompt..."
              className="resize-none"
              rows={4}
            />
          </div>

          <Button type="submit" className="w-full">
            Publicar Review
          </Button>
        </form>
      </Card>

      {/* Lista de Reviews */}
      <div className="space-y-4">
        {reviews.length > 0 ? (
          <div className="space-y-4">
            {reviews.map(review => (
              <ReviewCard key={review.id} {...review} />
            ))}
          </div>
        ) : (
          <Card className="p-6">
            <p className="text-center text-muted-foreground">Sé el primero en dejar una review</p>
          </Card>
        )}
      </div>
    </div>
  );
}
