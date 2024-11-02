import React from 'react';
import axios from 'axios';

const GoogleAuthButton = () => {
    const handleSignIn = async () => {
        try {
            const response = await axios.post('http://localhost:3000/request');
            window.location.href = response.data.url; // Redirect to Google sign-in URL
        } catch (error) {
            console.error('Error during Google sign-in:', error);
        }
    };

    return (
        <button onClick={handleSignIn}>
            Sign in with Google
        </button>
    );
};

export default GoogleAuthButton;
