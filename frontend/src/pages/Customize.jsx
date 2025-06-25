import React, { useState, useContext } from 'react';
import { userDataContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { IoArrowBack } from 'react-icons/io5';

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

      setUserData(result.data.user); // set updated user data
      return true; // success
    } catch (error) {
      console.error('❌ Error updating assistant:', error);
      alert("Something went wrong while updating your assistant.");
      return false; // failure
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
    navigate('/costomize'); // Go back to the photo selection page
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-t from-black to-[#020236] flex justify-center items-center px-4 relative">
      
      {/* Back Arrow */}
      <button
        onClick={handleBack}
        className="absolute top-4 left-4 text-cyan-400 hover:text-cyan-200 text-3xl"
        title="Go back"
      >
        <IoArrowBack />
      </button>

      <div className="flex flex-col items-center w-full max-w-[500px] gap-6">
        <h1 className="text-white text-2xl sm:text-3xl lg:text-4xl font-bold text-center drop-shadow-lg">
          Enter your <span className="text-cyan-400">Assistant Name</span>
        </h1>

        <input
          type="text"
          placeholder="Your assistant's name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full text-white text-center bg-black/30 border border-cyan-400 rounded-full px-6 py-3 placeholder-cyan-200 focus:outline-none focus:ring-2 focus:ring-cyan-300 text-lg"
        />

        <button
          onClick={handleNext}
          className="bg-cyan-400 hover:bg-cyan-300 text-black font-semibold py-2 px-10 rounded-full shadow-md transition-all duration-300 cursor-pointer"
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Finally Create Your Assistant'}
        </button>
      </div>
    </div>
  );
}

export default Customize;
