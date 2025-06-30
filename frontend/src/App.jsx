import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Signup from './pages/Signup.jsx';
import SignIn from './pages/SignIn.jsx';
import Costomize from './pages/Costomize.jsx';
import Customize from './pages/Customize.jsx';
import Home from './pages/Home.jsx';
import About from './pages/about.jsx';
import ResetPassword from './pages/ResetPassword.jsx';
import { userDataContext } from './context/UserContext.jsx';

// ⚡ Animated Loading Screen
const LoadingScreen = () => (
  <div className="min-h-screen ai-gradient-bg flex items-center justify-center relative overflow-hidden">
    {/* Particles */}
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

    {/* Spinner & Logo */}
    <div className="text-center z-10 animate-fade-in-scale">
      <div className="w-24 h-24 mx-auto mb-6 relative">
        <div className="w-full h-full border-4 border-cyan-400/30 rounded-full animate-pulse-glow"></div>
        <div className="absolute inset-2 border-4 border-cyan-400 rounded-full animate-spin" style={{ animationDuration: '3s' }}></div>
        <div className="absolute inset-4 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full animate-float"></div>
      </div>

      <h1 className="text-3xl font-bold text-white mb-2 animate-slide-in-up">
        <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
          AI Assistant
        </span>
      </h1>
      <p className="text-cyan-200 text-lg loading-dots">
        Initializing neural networks
      </p>
    </div>
  </div>
);

function App() {
  const { userData, isLoading } = React.useContext(userDataContext);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen ai-gradient-bg">
      <Routes>
        <Route
          path="/"
          element={
            userData?.assistantImage && userData?.assistantName
              ? <Home />
              : <Navigate to="/costomize" />
          }
        />
        <Route
          path="/signup"
          element={!userData ? <Signup /> : <Navigate to="/costomize" />}
        />
        <Route
          path="/signin"
          element={!userData ? <SignIn /> : <Navigate to="/" />}
        />
        <Route
          path="/costomize"
          element={userData ? <Costomize /> : <Navigate to="/signup" />}
        />
        <Route
          path="/customize"
          element={userData ? <Customize /> : <Navigate to="/signup" />}
        />
        <Route
          path="/about"
          element={userData ? <About /> : <Navigate to="/signup" />}
        />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>
    </div>
  );
}

export default App;
