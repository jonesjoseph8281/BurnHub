import React from 'react';

function AdviceDisplay({ advice, isLoading }) {
  return (
    <div className="advice-display">
      {isLoading ? (
        <div className="spinner"></div> // Add CSS for the spinner below
      ) : (
        <p>{advice}</p>
      )}
    </div>
  );
}

export default AdviceDisplay;
