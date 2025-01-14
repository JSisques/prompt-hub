export interface User {
  id: string;
  email: string;
  username?: string;
  name?: string;
  avatar?: string;
  bio?: string;
  active?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Comment {
  id: string;
  content: string;
  author: User;
  promptId?: string;
  postId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Review {
  id: string;
  comment: string;
  rating: number;
  likes: number;
  comments?: Comment[];
  author: User;
  promptId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Category {
  id: string;
  name: string;
  description: string;
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

export interface Tag {
  id: string;
  name: string;
  slug: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Prompt {
  id: string;
  slug: string;
  title: string;
  description: string;
  content: string;
  example: string;
  published: boolean;
  user: User;
  category: Category;
  llm: LLM;
  tags: Tag[];
  comments?: Comment[];
  reviews?: Review[];
  likes?: string[];
  createdAt: Date;
  updatedAt: Date;
}
