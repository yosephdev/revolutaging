import React from 'react';

const TypingIndicator = () => {
  return (
    <div className="flex items-center space-x-2">
      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150"></div>
      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-300"></div>
    </div>
  );
};

export default TypingIndicator;