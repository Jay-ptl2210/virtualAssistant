import React from 'react';
import { userDataContext } from '../context/UserContext';

function Card({ image }) {
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

  const isSelected = selectedImage === image;

  return (
    <div 
      className={`w-[40vw] sm:w-[30vw] md:w-[200px] lg:w-[180px] h-[60vw] sm:h-[45vw] md:h-[280px] lg:h-[260px] glass-dark border-2 rounded-2xl overflow-hidden hover-lift cursor-pointer transition-all duration-300 relative group ${
        isSelected 
          ? 'border-cyan-400 shadow-cyan-400/25 scale-105' 
          : 'border-cyan-400/50 hover:border-cyan-400/80'
      }`} 
      onClick={() => {
        setSelectedImage(image);
        setBackendImage(null);
        setFrontendImage(null);
      }}
    >
      {/* Selection Indicator */}
      {isSelected && (
        <div className="absolute top-2 right-2 w-6 h-6 bg-cyan-400 rounded-full flex items-center justify-center z-10 animate-pulse-glow">
          <div className="w-3 h-3 bg-white rounded-full"></div>
        </div>
      )}

      {/* Image */}
      <div className="w-full h-full relative overflow-hidden">
        <img 
          src={image} 
          alt="Assistant Avatar" 
          className='w-full h-full object-cover transition-transform duration-300 group-hover:scale-110'
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {/* Glow Effect */}
        {isSelected && (
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-blue-500/20 animate-pulse-glow"></div>
        )}
      </div>

      {/* Hover Info */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
        <p className="text-white text-xs text-center font-medium">
          {isSelected ? 'Selected' : 'Click to select'}
        </p>
      </div>
    </div>
  );
}

export default Card;
