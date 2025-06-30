import React from 'react';
import Card from '../components/Card';
import { RiImageAddLine } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import { userDataContext } from '../context/UserContext';
import { IoArrowBack } from 'react-icons/io5';
import { Sparkles, ArrowRight, Image } from 'lucide-react';

import image1 from "../assets/image1.png";
import image2 from "../assets/image2.jpg";
import image3 from "../assets/authBg.png";
import image4 from "../assets/image4.png";
import image5 from "../assets/image5.png";
import image6 from "../assets/image6.jpeg";
import image7 from "../assets/image7.jpeg";

function Costomize() {
  const navigate = useNavigate();
const {
  serverUrl,
  userData,
  setUserData,
  frontendImage,
  setFrontendImage,
  backendImage,
  setBackendImage,
  selectedImage,
  setSelectedImage
} = React.useContext(userDataContext);

  const cards = [
    image1, image2, image3,
    image4, image5, image6, image7
  ];
    const inputImage = React.useRef(null);
  const handleImage = (e) => {
    const file = e.target.files[0];
    setBackendImage(file);
    setFrontendImage(URL.createObjectURL(file));
  }
  const handleNext = () => {
    navigate('/customize'); // 👈 Change to the next page route if different
  };

  const handleBack = () => {
    navigate('/');
  };

  return (
    <div className='min-h-screen animate-gradient-shift neural-bg relative overflow-hidden'>
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

      {/* Back Arrow */}
      <button
        onClick={handleBack}
        className="absolute top-6 left-6 text-cyan-400 hover:text-cyan-300 text-3xl z-50 hover-lift transition-all duration-300"
        title="Go back"
      >
        <IoArrowBack />
      </button>

      {/* Main Content */}
      <div className='flex flex-col items-center px-4 py-10 relative z-10'>
        {/* Header */}
        <div className="text-center mb-10 animate-slide-in-up">
          <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full flex items-center justify-center animate-float">
            <Sparkles size={32} className="text-white" />
          </div>
          <h1 className='text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 drop-shadow-lg'>
            Choose Your <span className="text-cyan-400">AI Assistant</span>
          </h1>
          <p className="text-cyan-200 text-lg max-w-2xl mx-auto">
            Select an avatar that represents your assistant's personality and style
          </p>
        </div>

        {/* Progress Indicator */}
        <div className="mb-10">
          <div className="flex items-center justify-center gap-2">
            <div className="w-3 h-3 rounded-full bg-cyan-400"></div>
            <div className="w-8 h-0.5 bg-cyan-400"></div>
            <div className="w-3 h-3 rounded-full bg-cyan-400"></div>
            <div className="w-8 h-0.5 bg-gray-600"></div>
            <div className="w-3 h-3 rounded-full bg-gray-600"></div>
          </div>
        </div>

        {/* Cards Container */}
        <div className='w-full max-w-6xl flex flex-wrap justify-center gap-6 mb-10'>
          {cards.map((img, i) => (
            <Card key={i} image={img} />
          ))}

          {/* Upload Icon Card */}
          <div
            className={`w-[40vw] sm:w-[30vw] md:w-[200px] lg:w-[180px] h-[60vw] sm:h-[45vw] md:h-[280px] lg:h-[260px] glass-dark border-2 border-cyan-400/50 rounded-2xl overflow-hidden hover-lift cursor-pointer transition-all duration-300 ${selectedImage=="input"?"border-cyan-400 shadow-cyan-400/25":""}`}
            onClick={() => {
              inputImage.current.click()
              setSelectedImage("input");
            }}
          >
            {!frontendImage ? (
              <div className="w-full h-full flex flex-col items-center justify-center text-cyan-400">
                <Image size={48} className="mb-2" />
                <p className="text-sm text-center px-2">Upload Custom Image</p>
              </div>
            ) : (
              <img src={frontendImage} alt="Uploaded" className='w-full h-full object-cover' />
            )}
            <input type='file' accept='image/*' ref={inputImage} hidden onChange={handleImage} />
          </div>
        </div>

        {/* Next Button */}
        {selectedImage && (
          <button
            onClick={handleNext}
            className="bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-500 hover:to-blue-600 text-white font-semibold py-4 px-8 rounded-full shadow-lg hover:shadow-cyan-400/25 transition-all duration-300 transform hover:scale-105 flex items-center gap-2 animate-slide-in-up"
          >
            <ArrowRight size={20} />
            Continue to Name
          </button>
        )}

        {/* Tips */}
        <div className="mt-8 p-4 bg-cyan-400/10 border border-cyan-400/30 rounded-xl max-w-2xl text-center">
          <p className="text-cyan-200 text-sm">
            💡 <strong>Tip:</strong> Choose an avatar that matches your assistant's intended personality. You can also upload your own custom image!
          </p>
        </div>
      </div>
    </div>
  );
}

export default Costomize;
