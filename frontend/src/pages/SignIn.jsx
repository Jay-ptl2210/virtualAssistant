import React, { useState, useContext } from 'react';
import { Eye, EyeOff, LogIn, User, Lock, Sparkles } from 'lucide-react';
import bg from '../assets/authBg.png';
import { userDataContext } from '../context/UserContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function SignIn() {
  const navigate = useNavigate();
  const { serverUrl, userData, setUserData } = useContext(userDataContext);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSignin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      setLoading(true);
      const res = await axios.post(`${serverUrl}/api/auth/signin`, {
        email,
        password,
      }, { withCredentials: true });

      console.log("✅ Login Success:", res.data);
      setUserData(res.data.user);
      // alert("Login successful!");
      setLoading(false);
      navigate('/');
    } catch (err) {
      console.error("❌ Login Error:", err.response?.data || err.message);
      setError(err.response?.data?.message || 'Login failed.');
      setUserData(null);
    }
  };
  const handleForgotPassword = async () => {
  if (!email) return alert("Please enter your email to reset password.");

  try {
    await axios.post(`${serverUrl}/api/auth/forgot-password`, { email });
    alert("OTP sent to your email.");
    navigate("/reset-password", { state: { email } });
  } catch (err) {
    alert(err.response?.data?.message || "Failed to send OTP.");
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
        className="glass-dark p-10 rounded-3xl shadow-2xl max-w-md w-full animate-fade-in-scale hover-lift relative z-10"
        onSubmit={handleSignin}
      >
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full flex items-center justify-center animate-float">
            <Sparkles size={32} className="text-white" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-2 animate-slide-in-up">
            Welcome Back
          </h2>
          <p className="text-cyan-200 text-sm">
            Sign in to your <span className="text-cyan-400 font-semibold">AI Assistant</span>
          </p>
        </div>

        {/* Email Input */}
        <div className="mb-6">
          <div className="relative">
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-cyan-400">
              <User size={20} />
            </div>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full bg-black/30 border border-cyan-400/50 rounded-full px-12 py-4 text-white placeholder-cyan-200 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-300"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
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
              placeholder="Enter your password"
              className="w-full bg-black/30 border border-cyan-400/50 rounded-full px-12 py-4 pr-12 text-white placeholder-cyan-200 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-300"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-cyan-400 hover:text-cyan-300 transition-colors"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          <p
  onClick={handleForgotPassword}
  className="text-sm text-cyan-300 mt-2 hover:underline cursor-pointer text-right"
>
  Forgot Password?
</p>

        </div>

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
          className="w-full bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-500 hover:to-blue-600 text-white font-semibold py-4 px-8 rounded-full shadow-lg hover:shadow-cyan-400/25 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
        >
          {loading ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Signing In...
            </>
          ) : (
            <>
              <LogIn size={20} />
              Sign In
            </>
          )}
        </button>

        {/* Register Link */}
        <div className="text-center mt-6">
          <p className="text-cyan-200 text-sm">
            Don't have an account?{' '}
            <a 
              href="/signup" 
              className="text-cyan-400 hover:text-cyan-300 font-semibold hover:underline transition-colors"
            >
              Create Account
            </a>
          </p>
        </div>
      </form>
    </div>
  );
}

export default SignIn;

