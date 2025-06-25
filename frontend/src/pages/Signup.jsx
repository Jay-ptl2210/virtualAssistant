import React, { useState, useContext, useEffect } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import bg from '../assets/authBg.png';
import { userDataContext } from '../context/UserContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function Signup() {
  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const { serverUrl, setUserData } = useContext(userDataContext);
  const navigate = useNavigate();

  const [step, setStep] = useState(1); // Step 1 = Info, Step 2 = OTP
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [resendTimer, setResendTimer] = useState(0);

  // Countdown for resend OTP button
  useEffect(() => {
    let timer;
    if (resendTimer > 0) {
      timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [resendTimer]);

  // Step 1: Send OTP to email
  const handleSendOtp = async (e) => {
    e.preventDefault();
    setError('');
    try {
      setLoading(true);
      await axios.post(`${serverUrl}/api/auth/signup/send-otp`, {
        name,
        email,
        password
      }, { withCredentials: true });
      setLoading(false);

      setStep(2);
      setResendTimer(60);
    } catch (error) {
      setError(error.response?.data?.message || "Failed to send OTP");
    }
  };

  // Step 2: Verify OTP and complete signup
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setError('');
    try {
      setLoading(true);
      const result = await axios.post(`${serverUrl}/api/auth/signup/verify-otp`, {
        email,
        otp
      }, { withCredentials: true });
      setLoading(false);

      setUserData(result.data.user); // ✅ Save user globally
      navigate('/costomize');

      // Optional redirect: window.location.href = "/dashboard";
    } catch (error) {
      setError(error.response?.data?.message || "Invalid OTP");
      setUserData(null);
    }
  };

  // Resend OTP logic
  const handleResendOtp = async () => {
    setError('');
    try {
      setLoading(true);
      await axios.post(`${serverUrl}/api/auth/signup/send-otp`, {
        name,
        email,
        password
      }, { withCredentials: true });
      setResendTimer(60);
      setLoading(false);
    } catch (error) {
      setError("Resend failed");
    }
  };

  return (
    <div
      className="min-h-screen w-full bg-cover bg-center flex justify-center items-center px-4"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <form
        className="w-full max-w-lg min-h-[600px] bg-black/40 backdrop-blur-md p-10 rounded-2xl shadow-lg shadow-black flex flex-col justify-between gap-6 text-white"
        onSubmit={step === 1 ? handleSendOtp : handleVerifyOtp}
      >
        <h2 className="text-3xl font-bold text-white text-center">
          Register to{' '}
          <span className="bg-gradient-to-r from-cyan-400 to-green-400 bg-clip-text text-transparent">
            Virtual Assistant
          </span>
        </h2>

        {step === 1 && (
          <>
            <input
              type="text"
              placeholder="Enter your name"
              className="input-style"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="email"
              placeholder="Email"
              className="input-style"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                className="input-style pr-10"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div
                className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer text-cyan-300"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </div>
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <input
              type="text"
              placeholder="Enter OTP"
              className="input-style"
              required
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            <button
              type="button"
              className="text-cyan-400 hover:underline text-sm"
              onClick={handleResendOtp}
              disabled={resendTimer > 0}
            >
              Resend OTP {resendTimer > 0 ? `in ${resendTimer}s` : ''}
            </button>
          </>
        )}

        {error && (
          <div className="text-red-500 text-center font-semibold">{error}</div>
        )}

        <button
          type="submit"
          className="mx-auto bg-white text-black hover:bg-gray-200 font-semibold py-2 px-10 rounded-full shadow-md shadow-cyan-400/40 transition-all"
        >
          {step === 1 ? 'Send OTP' : 'Verify OTP'}
        </button>

        <p className="text-center text-sm">
          Already have an account?{' '}
          <a href="/signin" className="text-cyan-400 hover:underline">
            Sign in
          </a>
        </p>
      </form>

      {/* Input styling */}
      <style jsx>{`
        .input-style {
          background: rgba(0, 0, 0, 0.3);
          border: 1px solid #22d3ee;
          border-radius: 9999px;
          padding: 0.5rem 1.25rem;
          color: white;
          width: 100%;
          transition: all 0.3s ease;
          outline: none;
        }
        .input-style:focus {
          border-color: #67e8f9;
          box-shadow: 0 0 0 2px #67e8f9;
        }
      `}</style>
    </div>
  );
}

export default Signup;
