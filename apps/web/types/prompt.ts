import { Review } from './review';
import { Comment } from './comment';

export interface Prompt {
  id: string;
  title: string;
  description: string;
  prompt: string;
  category: string;
  tags: string[];
  author: {
    id: string;
    username: string;
  };
  createdAt: Date;
  updatedAt: Date;
  likes: number;
  comments: number;
}

export interface PromptCardProps {
  id: string;
  title: string;
  description: string;
  tags: string[];
  author?: string;
  createdAt?: Date;
  likes?: number;
  comments?: number;
}

export interface PromptDetailProps extends Prompt {
  reviews?: Review[];
  promptComments?: Comment[];
}
