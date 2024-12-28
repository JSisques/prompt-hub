export interface Review {
  id: string;
  comment: string;
  rating: number;
  userId: string;
  promptId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ReviewCardProps {
  comment: string;
  rating: number;
  userId: string;
  createdAt: Date;
}

export interface ReviewsSectionProps {
  promptId: string;
  reviews: Review[];
}
