import React, { useState } from 'react';
import axios from 'axios';
import InputForm from './components/InputForm';
import AdviceDisplay from './components/AdviceDisplay';
import './index.css';

function App() {
  const [advice, setAdvice] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const fetchAdvice = async (question) => {
    setIsLoading(true); // Start loading animation
    try {
      const response = await axios.post("https://burnhub.onrender.com/get-bad-advice", { question });
      if (response.data && response.data.advice) {
        setAdvice(response.data.advice);
      } else {
        setAdvice("Sorry, we couldn't generate advice. Try again!");
      }
    } catch (error) {
      console.error("Error fetching advice:", error);
      setAdvice("An error occurred while fetching advice.");
    } finally {
      setIsLoading(false); // Stop loading animation
    }
  };

  return (
    <div className="App">
      <img src="logo.png" alt="Centered" className="logo" />
      <h2 className="caption">Because Good Advice is Overrated!</h2>
      <video className="video-background" autoPlay muted loop>
        <source src="background.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="content">
        <InputForm fetchAdvice={fetchAdvice} />
        <AdviceDisplay advice={advice} isLoading={isLoading} />
      </div>
    </div>
  );
}

export default App;
