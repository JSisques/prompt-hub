export interface Question {
  question: string;
  answer: string;
}

export interface FAQ {
  category: string;
  questions: Question[];
}
