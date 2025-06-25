import React from 'react';
import Card from '../components/Card';
import { RiImageAddLine } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import { userDataContext } from '../context/UserContext';
import { IoArrowBack } from 'react-icons/io5';


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
    <div className='min-h-screen w-full bg-gradient-to-t from-black to-[#020236] flex flex-col items-center px-4 py-10'>


      <button
        onClick={handleBack}
        className="absolute top-4 left-4 text-cyan-400 hover:text-cyan-200 text-3xl"
        title="Go back"
      >
        <IoArrowBack />
      </button>
      {/* Title */}
      <h1 className='text-white text-2xl sm:text-3xl lg:text-4xl font-bold mb-10 text-center drop-shadow-lg'>
        Select your <span className="text-cyan-400">Assistant Image</span>
      </h1>

      {/* Cards Container */}
      <div className='w-full max-w-[1200px] flex flex-wrap justify-center gap-6 mb-10'>
        {cards.map((img, i) => (
          <Card key={i} image={img} />
        ))}

        {/* Upload Icon Card */}
        <div
  className={`w-[40vw] sm:w-[30vw] md:w-[200px] lg:w-[180px] h-[60vw] sm:h-[45vw] md:h-[280px] lg:h-[260px] bg-[#030326] border-2 border-[#0000ff66] rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-blue-950 cursor-pointer hover:border-4 hover:border-white flex items-center justify-center transition-all duration-300 ${selectedImage=="input"?"border-4 border-white shadow-2xl shadow-blue-950":null}`}
  onClick={() => {
    inputImage.current.click()
    setSelectedImage("input");
    }}
>
  {!frontendImage && <RiImageAddLine className="text-white opacity-60 w-16 h-16" />}
  {frontendImage && <img src={frontendImage} alt="Uploaded" className='w-full h-full object-cover' />}

  <input type='file' accept='image/*' ref={inputImage} hidden onChange={handleImage} />
</div>
      </div>
      {/* Next Button */}
      {selectedImage && <button
        onClick={handleNext}
        className="bg-cyan-400 hover:bg-cyan-300 text-black font-semibold py-2 px-10 rounded-full shadow-md transition-all duration-300 cursor-pointer"
      >
        Next →
      </button>}
    </div>
  );
}

export default Costomize;
