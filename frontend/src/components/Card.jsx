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
  return (
    <div className={`w-[40vw] sm:w-[30vw] md:w-[200px] lg:w-[180px] h-[60vw] sm:h-[45vw] md:h-[280px] lg:h-[260px] bg-[#030326] border-2 border-[#0000ff66] rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-blue-950 cursor-pointer hover:border-4 hover:border-white transition-all duration-300 ${selectedImage==image?"border-4 border-white shadow-2xl shadow-blue-950":null}`} onClick={()=> {
      setSelectedImage(image)
      setBackendImage(null);
      setFrontendImage(null);
      }}>
      <img src={image} alt="avatar" className='w-full h-full object-cover' />
    </div>
  );
}

export default Card;
