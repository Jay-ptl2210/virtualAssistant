import { useContext } from 'react';
import { userDataContext } from '../context/UserContext';
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Sparkles } from 'lucide-react';
import bg from '../assets/authBg.png';

function ResetPassword() {
  const { serverUrl } = useContext(userDataContext);
  const { state } = useLocation();
  const navigate = useNavigate();
  const email = state?.email || '';

  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleReset = async (e) => {
    e.preventDefault();
    if (!otp || !newPassword) return alert("Please fill all fields");

    try {
      setLoading(true);
      await axios.post(`${serverUrl}/api/auth/reset-password`, {
        email,
        otp,
        newPassword,
      });

      alert("Password reset successful!");
      navigate("/signin");
    } catch (err) {
      setError(err.response?.data?.message || "Reset failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen animate-gradient-shift neural-bg relative overflow-hidden flex justify-center items-center px-4">
      {/* Particles */}
      <div className="particles">
        {[...Array(20)].map((_, i) => (
          <div key={i} className="particle" style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 20}s`,
            animationDuration: `${15 + Math.random() * 10}s`
          }} />
        ))}
      </div>

      {/* Background */}
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${bg})` }}>
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      {/* Form */}
      <form onSubmit={handleReset} className="glass-dark p-10 rounded-3xl shadow-2xl max-w-md w-full animate-fade-in-scale hover-lift relative z-10">
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full flex items-center justify-center animate-float">
            <Sparkles size={32} className="text-white" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">Reset Password</h2>
          <p className="text-cyan-200 text-sm">Enter the OTP and new password</p>
        </div>

        {/* OTP Input */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Enter OTP"
            className="w-full bg-black/30 border border-cyan-400/50 rounded-full px-6 py-4 text-white placeholder-cyan-200 focus:outline-none"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />
        </div>

        {/* New Password Input */}
        <div className="mb-6">
          <input
            type="password"
            placeholder="New Password"
            className="w-full bg-black/30 border border-cyan-400/50 rounded-full px-6 py-4 text-white placeholder-cyan-200 focus:outline-none"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>

        {/* Error */}
        {error && (
          <div className="mb-4 p-4 bg-red-500/20 text-red-300 rounded-lg text-center">
            {error}
          </div>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-500 hover:to-blue-600 text-white font-semibold py-4 px-8 rounded-full shadow-lg hover:shadow-cyan-400/25 transition-all duration-300 transform hover:scale-105 disabled:opacity-50"
        >
          {loading ? "Resetting..." : "Reset Password"}
        </button>

        {/* Back to Sign In */}
        <div className="text-center mt-6">
          <p className="text-cyan-200 text-sm">
            Want to go back?{' '}
            <button
              type="button"
              onClick={() => navigate('/signin')}
              className="text-cyan-400 hover:text-cyan-300 font-semibold hover:underline transition-colors"
            >
              Back to Sign In
            </button>
          </p>
        </div>
      </form>
    </div>
  );
}

export default ResetPassword;
