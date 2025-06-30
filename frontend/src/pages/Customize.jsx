import React, { useState, useContext } from 'react';
import { userDataContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { IoArrowBack } from 'react-icons/io5';
import { Sparkles, User, ArrowRight, Loader2 } from 'lucide-react';

function Customize() {
  const [name, setName] = useState('');
  const {
    userData,
    backendImage,
    selectedImage,
    serverUrl,
    setUserData
  } = useContext(userDataContext);

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleUpdateAssistant = async () => {
    try {
      const formData = new FormData();
      formData.append('assistantName', name);

      if (backendImage) {
        formData.append('assistantImage', backendImage);
        console.log("📤 Uploading backend image...");
      } else {
        formData.append('imageUrl', selectedImage);
        console.log("🖼️ Using selected image from preset...");
      }

      console.log("📝 Assistant Name:", name);

      const result = await axios.post(
        `${serverUrl}/api/user/update`,
        formData,
        { withCredentials: true }
      );

      console.log("✅ Server Response:", result.data);

      setUserData(result.data.user);
      return true;
    } catch (error) {
      console.error('❌ Error updating assistant:', error);
      alert("Something went wrong while updating your assistant.");
      return false;
    }
  };

  const handleNext = async () => {
    if (!name.trim()) {
      alert("Please enter a name");
      return;
    }

    setLoading(true);
    const success = await handleUpdateAssistant();
    setLoading(false);

    if (success) {
      console.log("🎉 Assistant successfully updated!");
      navigate('/');
    }
  };

  const handleBack = () => {
    navigate('/costomize');
  };

  return (
    <div className="min-h-screen animate-gradient-shift neural-bg relative overflow-hidden flex justify-center items-center px-4">
      {/* Animated particles */}
      <div className="particles">
        {[...Array(15)].map((_, i) => (
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

      {/* Back Arrow */}
      <button
        onClick={handleBack}
        className="absolute top-6 left-6 text-cyan-400 hover:text-cyan-300 text-3xl z-50 hover-lift transition-all duration-300"
        title="Go back"
      >
        <IoArrowBack />
      </button>

      {/* Main Content */}
      <div className="glass-dark rounded-3xl p-10 max-w-lg w-full animate-fade-in-scale hover-lift relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full flex items-center justify-center animate-float">
            <Sparkles size={32} className="text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2 animate-slide-in-up">
            Name Your <span className="text-cyan-400">AI Assistant</span>
          </h1>
          <p className="text-cyan-200 text-sm">
            Give your assistant a unique personality
          </p>
        </div>

        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-center gap-2">
            <div className="w-3 h-3 rounded-full bg-cyan-400"></div>
            <div className="w-8 h-0.5 bg-cyan-400"></div>
            <div className="w-3 h-3 rounded-full bg-cyan-400"></div>
            <div className="w-8 h-0.5 bg-cyan-400"></div>
            <div className="w-3 h-3 rounded-full bg-cyan-400"></div>
          </div>
        </div>

        {/* Name Input */}
        <div className="mb-8">
          <div className="relative">
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-cyan-400">
              <User size={20} />
            </div>
            <input
              type="text"
              placeholder="Enter your assistant's name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-black/30 border border-cyan-400/50 rounded-full px-12 py-4 text-white placeholder-cyan-200 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-300 text-center text-lg"
              maxLength={20}
            />
          </div>
          <p className="text-cyan-200 text-xs text-center mt-2">
            Choose a name that reflects your assistant's personality
          </p>
        </div>

        {/* Selected Image Preview */}
        {selectedImage && (
          <div className="mb-8 text-center">
            <div className="w-24 h-24 mx-auto rounded-full overflow-hidden border-4 border-cyan-400/50 shadow-xl">
              <img 
                src={selectedImage} 
                alt="Selected Assistant" 
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-cyan-200 text-sm mt-2">Your assistant's avatar</p>
          </div>
        )}

        {/* Create Button */}
        <button
          onClick={handleNext}
          disabled={loading || !name.trim()}
          className="w-full bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-500 hover:to-blue-600 text-white font-semibold py-4 px-8 rounded-full shadow-lg hover:shadow-cyan-400/25 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <Loader2 size={20} className="animate-spin" />
              Creating Assistant...
            </>
          ) : (
            <>
              <ArrowRight size={20} />
              Create My Assistant
            </>
          )}
        </button>

        {/* Tips */}
        <div className="mt-6 p-4 bg-cyan-400/10 border border-cyan-400/30 rounded-xl">
          <p className="text-cyan-200 text-sm text-center">
            💡 <strong>Tip:</strong> Choose a name that's easy to pronounce and remember
          </p>
        </div>
      </div>
    </div>
  );
}

export default Customize;
