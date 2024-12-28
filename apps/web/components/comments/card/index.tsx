import { Card } from '@/components/ui/card';
import { User } from 'lucide-react';
import { CommentCardProps } from '@/types/comment';
import moment from 'moment';

export function CommentCard({ content, userId, createdAt }: CommentCardProps) {
  return (
    <Card className="p-4">
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="bg-muted rounded-full p-2">
              <User size={16} className="text-muted-foreground" />
            </div>
            <span className="font-medium">{userId}</span>
          </div>
          <span className="text-sm text-muted-foreground">{moment(createdAt).format('DD/MM/YYYY')}</span>
        </div>
        <p className="text-sm text-muted-foreground">{content}</p>
      </div>
    </Card>
  );
}
