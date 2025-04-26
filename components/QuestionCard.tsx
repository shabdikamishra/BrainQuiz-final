import React from 'react';
import { QuizQuestion } from '../types/quiz';

interface QuestionCardProps {
  question: QuizQuestion;
  selectedAnswer: number | null;
  onSelectAnswer: (index: number) => void;
  showFeedback: boolean;
  isCorrect: boolean | null;
}

const QuestionCard: React.FC<QuestionCardProps> = ({ 
  question, 
  selectedAnswer, 
  onSelectAnswer,
  showFeedback,
  isCorrect
}) => {
  const getOptionClass = (index: number) => {
    const baseClass = "p-4 border rounded-lg mb-3 transition-all duration-300 flex items-center";
    
    if (selectedAnswer === null) {
      return `${baseClass} border-gray-200 hover:border-indigo-300 hover:bg-indigo-50 cursor-pointer`;
    }
    
    if (showFeedback) {
      if (index === question.correctAnswer) {
        return `${baseClass} border-emerald-500 bg-emerald-50 text-emerald-800`;
      } else if (index === selectedAnswer) {
        return `${baseClass} border-rose-500 bg-rose-50 text-rose-800`;
      }
    }
    
    if (index === selectedAnswer) {
      return `${baseClass} border-indigo-500 bg-indigo-50`;
    }
    
    return `${baseClass} border-gray-200 opacity-50`;
  };

  return (
    <div className="animate-fadeIn">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">{question.question}</h2>
      <div className="space-y-2">
        {question.options.map((option, index) => (
          <button
            key={index}
            className={getOptionClass(index)}
            onClick={() => !showFeedback && onSelectAnswer(index)}
            disabled={showFeedback}
          >
            <span className="w-6 h-6 flex items-center justify-center rounded-full bg-gray-100 text-gray-800 mr-3">
              {String.fromCharCode(65 + index)}
            </span>
            <span>{option}</span>
            {showFeedback && index === question.correctAnswer && (
              <span className="ml-auto text-emerald-600">✓</span>
            )}
            {showFeedback && index === selectedAnswer && index !== question.correctAnswer && (
              <span className="ml-auto text-rose-600">✗</span>
            )}
          </button>
        ))}
      </div>
      
      {showFeedback && (
        <div className={`mt-6 p-4 rounded-lg ${isCorrect ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-rose-50 text-rose-800 border border-rose-200'}`}>
          <p className="font-medium">
            {isCorrect 
              ? 'Correct! Well done.' 
              : `Incorrect. The correct answer is ${question.options[question.correctAnswer]}.`
            }
          </p>
        </div>
      )}
    </div>
  );
};

export default QuestionCard;