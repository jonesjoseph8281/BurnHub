import React, { useState } from 'react';

function InputForm({ fetchAdvice }) {
  const [question, setQuestion] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (question) {
      fetchAdvice(question);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="input-form">
      <input
        type="text"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Ask for advice"
        className="input-field"
      />
      <button type="submit" className="submit-button">Get Advice</button>
    </form>
  );
}

export default InputForm;
