import React from 'react';
import { QuizQuestion } from '../types/quiz';
import { Trophy } from 'lucide-react';

interface QuizResultsProps {
  score: number;
  totalQuestions: number;
  onRestart: () => void;
  answers: (number | null)[];
  questions: QuizQuestion[];
}

const QuizResults: React.FC<QuizResultsProps> = ({ 
  score, 
  totalQuestions, 
  onRestart,
  answers,
  questions
}) => {
  const percentage = Math.round((score / totalQuestions) * 100);
  
  const getResultMessage = () => {
    if (percentage === 100) return "Perfect score! Amazing job!";
    if (percentage >= 80) return "Excellent work! You know your stuff!";
    if (percentage >= 60) return "Good job! You did well!";
    if (percentage >= 40) return "Not bad! Room for improvement.";
    return "Keep practicing! You'll get better.";
  };
  
  const getResultColor = () => {
    if (percentage >= 80) return "text-emerald-600";
    if (percentage >= 60) return "text-amber-600";
    return "text-rose-600";
  };

  return (
    <div className="text-center animate-fadeIn">
      <div className="flex justify-center mb-6">
        <div className="w-20 h-20 rounded-full bg-indigo-100 flex items-center justify-center">
          <Trophy size={40} className="text-indigo-600" />
        </div>
      </div>
      
      <h2 className="text-3xl font-bold mb-2">Quiz Completed!</h2>
      <p className="text-gray-600 mb-6">Here's how you did:</p>
      
      <div className="mb-8">
        <div className="relative w-40 h-40 mx-auto">
          <div className="w-full h-full rounded-full bg-gray-100 flex items-center justify-center">
            <div className={`text-4xl font-bold ${getResultColor()}`}>{percentage}%</div>
          </div>
          <svg className="absolute top-0 left-0" width="160" height="160" viewBox="0 0 160 160">
            <circle
              cx="80"
              cy="80"
              r="70"
              fill="none"
              stroke="#e2e8f0"
              strokeWidth="12"
            />
            <circle
              cx="80"
              cy="80"
              r="70"
              fill="none"
              stroke={percentage >= 80 ? '#10b981' : percentage >= 60 ? '#f59e0b' : '#f43f5e'}
              strokeWidth="12"
              strokeDasharray="439.6"
              strokeDashoffset={439.6 - (439.6 * percentage) / 100}
              strokeLinecap="round"
              transform="rotate(-90 80 80)"
            />
          </svg>
        </div>
        <p className="mt-4 text-xl font-medium">{getResultMessage()}</p>
        <p className="text-gray-600 mt-2">
          You scored {score} out of {totalQuestions} questions correctly.
        </p>
      </div>
      
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4 text-left">Question Summary</h3>
        <div className="space-y-3">
          {questions.map((question, index) => {
            const answer = answers[index];
            const isCorrect = answer === question.correctAnswer;
            
            return (
              <div
                key={question.id}
                className={`p-3 rounded-lg flex items-center text-left ${
                  isCorrect ? 'bg-emerald-50 border-l-4 border-emerald-500' : 'bg-rose-50 border-l-4 border-rose-500'
                }`}
              >
                <div className="flex-1">
                  <p className="font-medium text-gray-800">{question.question}</p>
                  <p className="text-sm text-gray-600 mt-1">
                    {isCorrect 
                      ? `Correct: ${question.options[question.correctAnswer]}` 
                      : `Your answer: ${answer !== null ? question.options[answer] : 'Not answered'} | Correct: ${question.options[question.correctAnswer]}`
                    }
                  </p>
                </div>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  isCorrect ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'
                }`}>
                  {isCorrect ? '✓' : '✗'}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
      <button
        onClick={onRestart}
        className="bg-indigo-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-indigo-700 transition-colors duration-300"
      >
        Try Again
      </button>
    </div>
  );
};

export default QuizResults;