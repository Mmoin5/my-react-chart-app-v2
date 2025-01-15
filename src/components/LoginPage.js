import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';
import Vault_Vista_logo from '../assets/Vault_Vista_logo.png';
import Google from '../assets/Google Logo.png';
import Apple from '../assets/Apple Logo.png';

const LoginPage = () => {
  const [emailOrUsername, setEmailOrUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    setShowForgotPassword(false);
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(
      (user) =>
        (user.email === emailOrUsername || user.username === emailOrUsername) &&
        user.password === password
    );
    if (user) {
      navigate('/welcome');
    } else {
      setLoginError('User Name or Password Is Not Correct');
      setShowForgotPassword(true);
    }
  };

  const handleRegister = () => {
    navigate('/signup');
  };

  return (
    <div className="login-page">
      <div className="left-container">
        <div className="logo-container">
          <img src={Vault_Vista_logo} alt="Vault Vista Logo" className="logo" />
        </div>
        <div className="sign-in-text">
          <div>Sign in to</div>
          <div>
            <strong>Vault Vista</strong>
          </div>
        </div>
        <div className="register-info">
          <div>If you don't have an account register</div>
          <div>
            <span>You can </span>
            <span className="register-link" onClick={handleRegister}>
              Register here!
            </span>
          </div>
        </div>
      </div>

      <div className="right-container">
        <h2 className="sign-in-heading">Sign in</h2>
        <form onSubmit={handleLogin}>
          <div className="input-container">
            <input
              type="text"
              value={emailOrUsername}
              onChange={(e) => setEmailOrUsername(e.target.value)}
              placeholder="Enter Email or Username"
              required
            />
          </div>

          <div className="input-container">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
            />
          </div>

          {loginError && <span className="error">{loginError}</span>}
          <button type="submit" className="submit-btn">
            Login
          </button>
        </form>

        {showForgotPassword && (
          <div className="forgot-password">
            <span>Forgot Password?</span>
            <button className="forgot-password-btn" onClick={() => navigate('/forgot-password')}>
              Reset
            </button>
          </div>
        )}

        <div className="continue-with">
          <p>or continue with</p>
          <div className="social-icons">
            <img src={Google} alt="Google" className="social-icon" />
            <img src={Apple} alt="Apple" className="social-icon1" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
