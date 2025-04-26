import React, { useState, useEffect } from 'react';
import { QuizQuestion, QuizState } from '../types/quiz';
import QuestionCard from './QuestionCard';
import ProgressBar from './ProgressBar';
import QuizResults from './QuizResults';
import { ChevronRight } from 'lucide-react';

interface QuizProps {
  questions: QuizQuestion[];
}

const Quiz: React.FC<QuizProps> = ({ questions }) => {
  const initialState: QuizState = {
    currentQuestionIndex: 0,
    score: 0,
    answers: Array(questions.length).fill(null),
    quizComplete: false,
    showFeedback: false,
    isCorrect: null
  };

  const [state, setState] = useState<QuizState>(initialState);
  const [fadeIn, setFadeIn] = useState(true);
  
  const currentQuestion = questions[state.currentQuestionIndex];
  
  const handleSelectAnswer = (selectedIndex: number) => {
    const isCorrect = selectedIndex === currentQuestion.correctAnswer;
    
    const newAnswers = [...state.answers];
    newAnswers[state.currentQuestionIndex] = selectedIndex;
    
    setState({
      ...state,
      answers: newAnswers,
      showFeedback: true,
      isCorrect
    });
  };
  
  const handleNextQuestion = () => {
    const isLastQuestion = state.currentQuestionIndex === questions.length - 1;
    
    // Start fade out
    setFadeIn(false);
    
    setTimeout(() => {
      if (isLastQuestion) {
        const finalScore = state.answers.reduce((score, answer, index) => {
          return answer === questions[index].correctAnswer ? score + 1 : score;
        }, 0);
        
        setState({
          ...state,
          quizComplete: true,
          score: finalScore,
          showFeedback: false
        });
      } else {
        setState({
          ...state,
          currentQuestionIndex: state.currentQuestionIndex + 1,
          showFeedback: false,
          isCorrect: null
        });
      }
      
      // Start fade in after state update
      setFadeIn(true);
    }, 300);
  };
  
  const handleRestart = () => {
    setFadeIn(false);
    
    setTimeout(() => {
      setState(initialState);
      setFadeIn(true);
    }, 300);
  };
  
  return (
    <div className={`max-w-2xl mx-auto p-6 transition-opacity duration-300 ${fadeIn ? 'opacity-100' : 'opacity-0'}`}>
      {!state.quizComplete ? (
        <>
          <div className="mb-6 flex justify-between items-center">
            <div>
              <span className="text-sm font-medium text-gray-500">Question {state.currentQuestionIndex + 1} of {questions.length}</span>
            </div>
            <div>
              <span className="text-sm font-medium text-indigo-600">Score: {state.score}</span>
            </div>
          </div>
          
          <ProgressBar 
            current={state.currentQuestionIndex + 1} 
            total={questions.length} 
          />
          
          <QuestionCard 
            question={currentQuestion}
            selectedAnswer={state.answers[state.currentQuestionIndex]}
            onSelectAnswer={handleSelectAnswer}
            showFeedback={state.showFeedback}
            isCorrect={state.isCorrect}
          />
          
          {state.showFeedback && (
            <div className="mt-8 flex justify-center">
              <button
                onClick={handleNextQuestion}
                className="bg-indigo-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-indigo-700 transition-colors duration-300 flex items-center"
              >
                {state.currentQuestionIndex === questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
                <ChevronRight className="ml-2" size={18} />
              </button>
            </div>
          )}
        </>
      ) : (
        <QuizResults 
          score={state.score}
          totalQuestions={questions.length}
          onRestart={handleRestart}
          answers={state.answers}
          questions={questions}
        />
      )}
    </div>
  );
};

export default Quiz;