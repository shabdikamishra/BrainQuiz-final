import React from 'react';

interface ProgressBarProps {
  current: number;
  total: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ current, total }) => {
  const percentage = (current / total) * 100;
  
  return (
    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden mb-6">
      <div 
        className="h-full bg-indigo-600 transition-all duration-500 ease-out"
        style={{ width: `${percentage}%` }}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={percentage}
        role="progressbar"
      />
    </div>
  );
};

export default ProgressBar;