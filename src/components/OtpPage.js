import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CryptoJS from "crypto-js";
import emailjs from "emailjs-com";
import "./OtpPage.css";

function OtpPage() {
  const [otpInput, setOtpInput] = useState(Array(6).fill("")); 
  const [timeLeft, setTimeLeft] = useState(60); 
  const [otpError, setOtpError] = useState(""); 
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    startCountdown();
  }, []);

  const startCountdown = () => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          localStorage.removeItem("otp_hash");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleInputChange = (value, index) => {
    const otpCopy = [...otpInput];
    otpCopy[index] = value.slice(-1);
    setOtpInput(otpCopy);

    if (value && index < otpInput.length - 1) {
      document.getElementById(`otp-input-${index + 1}`).focus();
    }

    if (value === "" && index > 0) {
      document.getElementById(`otp-input-${index - 1}`).focus();
    }
  };

  const validateOtp = () => {
    const enteredOtp = otpInput.join("");
    const storedHash = localStorage.getItem("otp_hash");

    if (storedHash && CryptoJS.SHA256(String(enteredOtp)).toString() === storedHash) {
      alert("OTP Verified Successfully!");

      // Retrieve the user data and store it
      const newUser = JSON.parse(localStorage.getItem('new_user'));
      const users = JSON.parse(localStorage.getItem('users')) || [];
      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));

      // Navigate to Welcome page
      navigate("/welcome"); 
    } else {
      setOtpError("Enter a valid OTP.");
    }
  };

  const handleResendOtp = () => {
    if (timeLeft === 0) {
      setLoading(true);
      const storedUser = JSON.parse(localStorage.getItem("new_user"));
      if (storedUser) {
        const generatedOtp = Math.floor(100000 + Math.random() * 900000);
        const hashedOtp = CryptoJS.SHA256(String(generatedOtp)).toString();
        localStorage.setItem("otp_hash", hashedOtp);

        const emailData = {
          to_name: storedUser.username,
          otp: generatedOtp,
          to_email: storedUser.email,
        };

        emailjs
          .send("service_tggufiu", "template_g3jgc3q", emailData, "YwXyuYpveO_W6DwLd")
          .then(
            () => {
              setLoading(false);
              setOtpError(""); 
              setOtpInput(Array(6).fill("")); 
              setTimeLeft(60);
              startCountdown();
              alert("OTP sent successfully!");
            },
            (error) => {
              console.error("Error sending OTP:", error);
              setLoading(false);
              setOtpError("Failed to resend OTP. Please try again.");
            }
          );
      }
    }
  };

  return (
    <div className="otp-container">
      <h2>Verify OTP</h2>
      <p style={{ color: timeLeft > 0 ? "green" : "red" }}>
        {timeLeft > 0 ? `Time left: ${timeLeft}s` : "OTP expired. Please resend."}
      </p>

      <div className="otp-inputs">
        {otpInput.map((value, index) => (
          <input
            key={index}
            id={`otp-input-${index}`}
            type="text"
            value={value}
            onChange={(e) => handleInputChange(e.target.value, index)}
            maxLength="1"
            className="otp-input"
          />
        ))}
      </div>

      <button onClick={validateOtp} className="submit-btn" disabled={loading}>
        {loading ? "Verifying..." : "Verify OTP"}
      </button>
      {otpError && <span>{otpError}</span>}

      {timeLeft === 0 && (
        <button onClick={handleResendOtp} className="resend-btn" disabled={loading}>
          {loading ? "Resending..." : "Resend OTP"}
        </button>
      )}
    </div>
  );
}

export default OtpPage;
