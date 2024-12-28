import { Card } from '@/components/ui/card';
import { CommentCard } from '../card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';
import { CommentsSectionProps } from '@/types/comment';

export function CommentsSection({ promptId, comments }: CommentsSectionProps) {
  const [newComment, setNewComment] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implementar la llamada a la API para crear el comentario
    console.log({ content: newComment, promptId });
    setNewComment('');
  };

  return (
    <div className="space-y-6">
      {/* Título y contador */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Comentarios</h2>
        <span className="text-muted-foreground">
          {comments.length} {comments.length === 1 ? 'comentario' : 'comentarios'}
        </span>
      </div>

      {/* Formulario de Comentario */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Añadir Comentario</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Textarea
              value={newComment}
              onChange={e => setNewComment(e.target.value)}
              placeholder="Escribe tu comentario..."
              className="resize-none"
              rows={4}
            />
          </div>
          <Button type="submit" className="w-full">
            Publicar Comentario
          </Button>
        </form>
      </Card>

      {/* Lista de Comentarios */}
      <div className="space-y-4">
        {comments.length > 0 ? (
          <div className="space-y-4">
            {comments.map(comment => (
              <CommentCard key={comment.id} content={comment.content} userId={comment.userId} createdAt={comment.createdAt} />
            ))}
          </div>
        ) : (
          <Card className="p-6">
            <p className="text-center text-muted-foreground">Sé el primero en comentar</p>
          </Card>
        )}
      </div>
    </div>
  );
}
