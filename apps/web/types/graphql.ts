export interface Author {
  id: string;
  username: string;
}

export interface Prompt {
  id: string;
  title: string;
  description: string;
  prompt: string;
  category: string;
  tags: string[];
  author: Author;
  createdAt: string;
  likes: number;
  comments: number;
}

export interface Category {
  id: string;
  title: string;
  description: string;
  prompts: Prompt[];
}

export interface Review {
  id: string;
  comment: string;
  rating: number;
  user: Author;
  promptId: string;
  createdAt: string;
  updatedAt: string;
}

export interface GetCategoriesResponse {
  categories: Category[];
}

export interface GetPromptResponse {
  prompt: Prompt & {
    reviews: Review[];
  };
}
