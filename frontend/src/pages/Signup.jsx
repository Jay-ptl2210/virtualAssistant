import React, { useState, useContext, useEffect } from 'react';
import { Eye, EyeOff, UserPlus, User, Lock, Mail, Shield, Sparkles, ArrowRight } from 'lucide-react';
import bg from '../assets/authBg.png';
import { userDataContext } from '../context/UserContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { serverUrl, setUserData } = useContext(userDataContext);
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [resendTimer, setResendTimer] = useState(0);

  // Countdown timer
  useEffect(() => {
    let timer;
    if (resendTimer > 0) {
      timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [resendTimer]);

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await axios.post(
        `${serverUrl}/api/auth/signup/send-otp`,
        { name, email, password },
        { withCredentials: true }
      );
      setStep(2);
      setResendTimer(60);
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to send OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const result = await axios.post(
        `${serverUrl}/api/auth/signup/verify-otp`,
        { email, otp },
        { withCredentials: true }
      );
      setUserData(result.data.user);
      navigate('/costomize');
    } catch (error) {
      setError(error.response?.data?.message || 'Invalid OTP');
      setUserData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setError('');
    setLoading(true);
    try {
      await axios.post(
        `${serverUrl}/api/auth/signup/send-otp`,
        { name, email, password },
        { withCredentials: true }
      );
      setResendTimer(60);
    } catch (error) {
      setError('Resend failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen animate-gradient-shift neural-bg relative overflow-hidden flex justify-center items-center px-4">
      {/* Animated particles */}
      <div className="particles">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 20}s`,
              animationDuration: `${15 + Math.random() * 10}s`
            }}
          />
        ))}
      </div>

      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${bg})` }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      <form
        className="glass-dark rounded-3xl p-10 max-w-md w-full shadow-2xl shadow-cyan-400/20 border border-cyan-400/40 relative z-10 animate-fade-in-scale"
        onSubmit={step === 1 ? handleSendOtp : handleVerifyOtp}
      >
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full flex items-center justify-center animate-float">
            <Sparkles size={32} className="text-white" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-2 animate-slide-in-up">
            {step === 1 ? 'Create Account' : 'Verify OTP'}
          </h2>
          <p className="text-cyan-200 text-sm">
            {step === 1 ? 'Join the future of AI assistance' : 'Enter the verification code sent to your email'}
          </p>
        </div>

        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-center gap-2">
            <div className={`w-3 h-3 rounded-full ${step >= 1 ? 'bg-cyan-400' : 'bg-gray-600'}`}></div>
            <div className={`w-8 h-0.5 ${step >= 2 ? 'bg-cyan-400' : 'bg-gray-600'}`}></div>
            <div className={`w-3 h-3 rounded-full ${step >= 2 ? 'bg-cyan-400' : 'bg-gray-600'}`}></div>
          </div>
        </div>

        {step === 1 && (
          <>
            {/* Name Input */}
            <div className="mb-6">
              <div className="relative">
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-cyan-400">
                  <User size={20} />
                </div>
                <input
                  type="text"
                  placeholder="Enter your full name"
                  className="w-full bg-black/30 border border-cyan-400/50 rounded-full px-12 py-4 text-white placeholder-cyan-200 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-300"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>

            {/* Email Input */}
            <div className="mb-6">
              <div className="relative">
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-cyan-400">
                  <Mail size={20} />
                </div>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full bg-black/30 border border-cyan-400/50 rounded-full px-12 py-4 text-white placeholder-cyan-200 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-300"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="mb-6">
              <div className="relative">
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-cyan-400">
                  <Lock size={20} />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Create a strong password"
                  className="w-full bg-black/30 border border-cyan-400/50 rounded-full px-12 py-4 pr-12 text-white placeholder-cyan-200 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-300"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-cyan-400 hover:text-cyan-300 transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>
          </>
        )}

        {step === 2 && (
          <>
            {/* OTP Input */}
            <div className="mb-6">
              <div className="relative">
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-cyan-400">
                  <Shield size={20} />
                </div>
                <input
                  type="text"
                  placeholder="Enter 6-digit OTP"
                  className="w-full bg-black/30 border border-cyan-400/50 rounded-full px-12 py-4 text-white placeholder-cyan-200 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-300 text-center text-lg tracking-widest"
                  required
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  maxLength={6}
                />
              </div>
            </div>

            {/* Resend OTP */}
            <div className="mb-6 text-center">
              <button
                type="button"
                className="text-cyan-400 hover:text-cyan-300 text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={handleResendOtp}
                disabled={resendTimer > 0}
              >
                {resendTimer > 0 ? `Resend in ${resendTimer}s` : 'Resend OTP'}
              </button>
            </div>
          </>
        )}

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-xl text-red-300 text-center animate-slide-in-up">
            {error}
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-500 hover:to-blue-600 text-white font-semibold py-4 px-8 rounded-full shadow-lg hover:shadow-cyan-400/25 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              {step === 1 ? 'Sending OTP...' : 'Verifying...'}
            </>
          ) : (
            <>
              {step === 1 ? <UserPlus size={20} /> : <ArrowRight size={20} />}
              {step === 1 ? 'Send OTP' : 'Verify & Create Account'}
            </>
          )}
        </button>

        {/* Sign In Link */}
        <div className="text-center mt-6">
          <p className="text-cyan-200 text-sm">
            Already have an account?{' '}
            <a 
              href="/signin" 
              className="text-cyan-400 hover:text-cyan-300 font-semibold hover:underline transition-colors"
            >
              Sign In
            </a>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Signup;
