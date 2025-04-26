import React from 'react';
import Quiz from './components/Quiz';
import { quizQuestions } from './data/quizData';
import { Brain } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white flex flex-col">
      <header className="bg-white shadow-sm px-4 py-6 mb-8">
        <div className="max-w-6xl mx-auto flex items-center">
          <Brain size={28} className="text-indigo-600 mr-3" />
          <h1 className="text-2xl font-bold text-gray-800">BrainQuiz</h1>
        </div>
      </header>
      
      <main className="flex-1 container mx-auto px-4">
        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md overflow-hidden mb-10">
          <div className="p-6 sm:p-10">
            <h1 className="text-3xl font-bold text-center mb-2 text-gray-800">Knowledge Challenge</h1>
            <p className="text-gray-600 text-center mb-8">Test your knowledge with these multiple-choice questions!</p>
            
            <Quiz questions={quizQuestions} />
          </div>
        </div>
      </main>
      
      <footer className="bg-gray-50 border-t border-gray-200 py-6 mt-auto">
        <div className="container mx-auto px-4 text-center text-gray-500">
          <p>© 2025 BrainQuiz. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;