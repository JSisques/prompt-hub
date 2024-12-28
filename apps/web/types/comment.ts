export interface Comment {
  id: string;
  content: string;
  userId: string;
  promptId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CommentCardProps {
  content: string;
  userId: string;
  createdAt: Date;
}

export interface CommentsSectionProps {
  promptId: string;
  comments: Comment[];
}
