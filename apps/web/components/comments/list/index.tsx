import { Card } from '@/components/ui/card';
import { CommentCard } from '../card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useEffect, useState } from 'react';
import { CommentsSectionProps } from '@/types/comment';
import { graphqlClient } from '@/lib/apollo-client';
import { CREATE_COMMENT } from '@/lib/graphql/comment/mutations';
import { useSession } from 'next-auth/react';

export function CommentsSection({ promptId, comments: initialComments, onCommentAdded }: CommentsSectionProps) {
  const { data: session } = useSession();
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState(initialComments);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { data } = await graphqlClient.mutate({
      mutation: CREATE_COMMENT,
      variables: {
        input: {
          content: newComment,
          promptId,
          userId: session?.user?.id,
        },
      },
    });
    const newCommentData = data.createComment;
    setComments(prevComments => [...prevComments, newCommentData]);
    onCommentAdded?.(newCommentData);
    setNewComment('');
  };

  useEffect(() => {
    console.log({ comments });
  }, [comments]);

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
              <CommentCard key={comment.id} content={comment.content} user={comment.user} createdAt={comment.createdAt} />
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
