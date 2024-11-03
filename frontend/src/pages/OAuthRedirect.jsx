import React, { useState } from 'react';
import './BadAdvise.css'; // Import the CSS

function BadAdvice() {
    const [prompt, setPrompt] = useState('');
    const [advice, setAdvice] = useState('Awaiting your question...');

    const getAdvice = async () => {
        setAdvice("ChadGPT is thinking...");

        try {
            const response = await fetch(process.env.BACKEND_URL + '/bad-advice', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ prompt }),
            });

            if (!response.ok) throw new Error("Network response was not ok");
            const data = await response.json();
            setAdvice(data.advice);
        } catch (error) {
            console.error("Error fetching advice:", error);
            setAdvice("Something went wrong! Try again.");
        }
    };

    return (
        <div className="container">
            <h1 className="glitch" data-text="ChadGPT">ChadGPT</h1>
            <p>Get ready for some hilariously bad advice. Ask away!</p>

            <div className="input-container">
                <input
                    type="text"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="What's your question?"
                />
                <button onClick={getAdvice}>Ask ChadGPT</button>
            </div>

            <div id="response" className="response-box">{advice}</div>

            <div className="footer">Powered by Useless Wisdom™</div>
        </div>
    );
}

export default BadAdvice;
