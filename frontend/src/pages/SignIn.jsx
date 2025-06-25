import React, { useState, useContext } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import bg from '../assets/authBg.png';
import { userDataContext } from '../context/UserContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function SignIn() {

  const navigate = useNavigate();
  const { serverUrl,userData, setUserData } = useContext(userDataContext);
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

      // Set user globally in context
      setUserData(res.data.user);

      alert("Login successful!");
      setLoading(false);
      navigate('/'); // Redirects to home after login // Optional: redirect to dashboard after login
    } catch (err) {
      console.error("❌ Login Error:", err.response?.data || err.message);
      setError(err.response?.data?.message || 'Login failed.');
      setUserData(null); // Clear global user on failure
    }
  };

  return (
    <div
      className="min-h-screen w-full bg-cover bg-center flex justify-center items-center px-4"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <form
        className="w-full max-w-lg bg-black/40 backdrop-blur-md p-10 rounded-2xl shadow-lg shadow-black flex flex-col gap-6 text-white"
        onSubmit={handleSignin}
      >
        <h2 className="text-3xl font-bold text-center text-white">
          Sign In to{' '}
          <span className="bg-gradient-to-r from-cyan-400 to-green-400 bg-clip-text text-transparent drop-shadow-[0_1px_4px_rgba(0,255,255,0.5)]">
            Virtual Assistant
          </span>
        </h2>

        <input
          type="email"
          placeholder="Email"
          className="bg-black/30 border border-cyan-400 rounded-full px-5 py-2 placeholder-cyan-200 focus:outline-none focus:ring-2 focus:ring-cyan-300"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            className="w-full bg-black/30 border border-cyan-400 rounded-full px-5 py-2 pr-10 placeholder-cyan-200 focus:outline-none focus:ring-2 focus:ring-cyan-300"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <div
            className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer text-cyan-300"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </div>
        </div>

        {error && (
          <div className="text-red-500 text-center font-semibold">{error}</div>
        )}

        <button
          type="submit"
          className="mx-auto mt-2 bg-white text-black hover:bg-gray-200 font-semibold py-2 px-10 rounded-full shadow-md shadow-cyan-400/40 transition-all"
        >
          Sign In
        </button>

        <p className="text-center text-sm">
          Don't have an account?{' '}
          <a href="/signup" className="text-cyan-400 hover:underline">
            Register
          </a>
        </p>
      </form>
    </div>
  );
}

export default SignIn;

