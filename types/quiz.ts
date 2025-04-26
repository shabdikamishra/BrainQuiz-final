export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
}

export interface QuizState {
  currentQuestionIndex: number;
  score: number;
  answers: (number | null)[];
  quizComplete: boolean;
  showFeedback: boolean;
  isCorrect: boolean | null;
}