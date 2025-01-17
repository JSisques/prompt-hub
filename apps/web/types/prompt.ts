import { Review } from './review';
import { Comment } from './comment';
import { Like, User } from '@/lib/types';

export interface Category {
  id: string;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Tag {
  id: string;
  name: string;
  slug: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface LLM {
  id: string;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Prompt {
  id: string;
  title: string;
  slug: string;
  description: string;
  content: string;
  example?: string;
  published: boolean;
  category: Category;
  tags: Tag[];
  user: User;
  llm: LLM;
  createdAt: Date;
  updatedAt: Date;
  likes: Like[];
  comments: Comment[];
  reviews: Review[];
}

export interface PromptCardProps {
  id: string;
  title: string;
  description: string;
  tags: Tag[];
  user: User;
  category: Category;
  createdAt?: Date;
  likes?: Like[];
  comments?: number;
}

export interface PromptDetailProps {
  id: string;
  title: string;
  slug: string;
  description: string;
  content: string;
  example?: string;
  published: boolean;
  category: Category;
  tags: Tag[];
  user: User;
  llm: LLM;
  createdAt: Date;
  updatedAt: Date;
  likes: Like[];
  reviews: Review[];
  comments: Comment[];
}
