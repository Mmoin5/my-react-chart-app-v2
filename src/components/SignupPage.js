import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import './SignupPage.css';
import emailjs from 'emailjs-com';
import CryptoJS from 'crypto-js';
import Vault_Vista_logo from '../assets/Vault_Vista_logo.png';
import Google from '../assets/Google Logo.png';
import Apple from '../assets/Apple Logo.png';

const SignupPage = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [otpStatus, setOtpStatus] = useState('');

  const [emailError, setEmailError] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate(); 

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const users = JSON.parse(localStorage.getItem('users')) || [];

    if (users.find(user => user.email === email)) {
      setEmailError('Email id is already in use');
      setLoading(false);
      return;
    }
    if (users.find(user => user.username === username)) {
      setUsernameError('Username is already taken');
      setLoading(false);
      return;
    }
    if (users.find(user => user.phone === phone)) {
      setPhoneError('Phone number is already in use');
      setLoading(false);
      return;
    }

    if (!password.match(/[A-Z]/) || !password.match(/[0-9]/) || !password.match(/[^A-Za-z0-9]/) || password.length < 8) {
      setPasswordError('Password should contain at least one uppercase letter, one number, and one special character. Minimum length: 8');
      setLoading(false);
      return;
    }
    if (password !== confirmPassword) {
      setConfirmPasswordError('Password and Confirm Password do not match');
      setLoading(false);
      return;
    }

    setEmailError('');
    setUsernameError('');
    setPhoneError('');
    setPasswordError('');
    setConfirmPasswordError('');

    const newUser = { email, username, phone, password };
    localStorage.setItem('new_user', JSON.stringify(newUser));

    generateAndSendOtp();
  };

  const generateAndSendOtp = () => {
    const generatedOtp = Math.floor(100000 + Math.random() * 900000);
    const hashedOtp = CryptoJS.SHA256(String(generatedOtp)).toString();

    localStorage.setItem("otp_hash", hashedOtp);

    const emailData = {
      to_name: username,
      otp: generatedOtp,
      to_email: email,
    };

    emailjs.send('service_tggufiu', 'template_g3jgc3q', emailData, 'YwXyuYpveO_W6DwLd')
      .then(() => {
        setOtpStatus('OTP sent successfully! Check your email.');
        setLoading(false);
        navigate('/otp'); 
      })
      .catch((error) => {
        console.error('Error sending email:', error);
        setOtpStatus('Failed to send OTP. Please try again.');
        setLoading(false);
      });
  };

  const handleLoginRedirect = () => {
    navigate('/'); 
  };

  return (
    <div className="signup-container">
      <div className="left-container">
        <div className="logo-container">
          <img src={Vault_Vista_logo} alt="Vault Vista Logo" className="logo" />
        </div>
        <div className="sign-in-text">
          <div>Sign Up to</div>
          <div>
            <strong>Vault Vista</strong>
          </div>
        </div>
        <div className="register-info">
          <div>If you already have an account</div>
          <div>
            <span>You can </span>
            <span className="register-link" onClick={handleLoginRedirect}>Login here!</span>
          </div>
        </div>
      </div>

      <div className="right-container">
        <h2 className="sign-up-heading">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-container">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter Email"
              required
            />
            {emailError && <span className="error">{emailError}</span>}
          </div>

          <div className="input-container">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Create Username"
              required
            />
            {usernameError && <span className="error">{usernameError}</span>}
          </div>

          <div className="input-container">
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Contact Number"
              required
            />
            {phoneError && <span className="error">{phoneError}</span>}
          </div>

          <div className="input-container">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
            />
            {passwordError && <span className="error">{passwordError}</span>}
          </div>

          <div className="input-container">
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm Password"
              required
            />
            {confirmPasswordError && <span className="error">{confirmPasswordError}</span>}
          </div>

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>

        {otpStatus && <span>{otpStatus}</span>}

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

export default SignupPage;
