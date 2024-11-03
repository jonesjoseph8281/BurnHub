import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import GoogleAuthButton from './components/GoogleAuthButton';
import OAuthRedirect from './pages/OAuthRedirect';


const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<GoogleAuthButton />} />
                <Route path="/oauth" element={<OAuthRedirect />} />
            </Routes>
        </Router>
    );
};

export default App;
