import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // Import BrowserRouter
import SignupPage from './components/SignupPage';
import OtpPage from './components/OtpPage';
import WelcomePage from './components/WelcomePage'; // Optional: A page to navigate after OTP is verified
import LoginPage from './components/LoginPage'; // Import LoginPage

function App() {
  return (
    <BrowserRouter> {/* Wrap your routes with BrowserRouter */}
      <div>
        <Routes>
          {/* Default route for LoginPage */}
          <Route path="/" element={<LoginPage />} /> 

          {/* Route for SignupPage */}
          <Route path="/signup" element={<SignupPage />} />
          
          {/* Route for OTP Page */}
          <Route path="/otp" element={<OtpPage />} />
          
          {/* Route for Welcome Page */}
          <Route path="/welcome" element={<WelcomePage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
