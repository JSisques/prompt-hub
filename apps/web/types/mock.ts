export interface MockPrompt {
  id: string;
  title: string;
  description: string;
  tags: string[];
  author: {
    id: string;
    username: string;
  };
  createdAt: string;
  likes: number;
  comments: number;
}

export interface MockCategory {
  id: string;
  title: string;
  description: string;
  prompts: MockPrompt[];
}
