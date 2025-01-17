export interface User {
  id: string;
  username: string;
  avatar?: string;
}

export interface Comment {
  id: string;
  content: string;
  user: User;
  promptId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CommentCardProps {
  content: string;
  user: User;
  createdAt: Date;
}

export interface CommentsSectionProps {
  promptId: string;
  comments: Comment[];
  onCommentAdded?: (comment: Comment) => void;
}
