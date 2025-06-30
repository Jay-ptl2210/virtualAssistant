import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ExternalLink, ArrowLeft } from 'lucide-react';
import jay from '../assets/Jay_Patel.jpg'

function About() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] to-[#0e7490] text-white px-6 py-10 relative">

      {/* Back Button */}
      <button
        onClick={() => navigate('/')}
        className="absolute top-6 left-6 bg-white/10 text-white hover:bg-white/20 px-4 py-2 rounded-xl flex items-center gap-2 border border-white/20 transition-all"
      >
        <ArrowLeft size={18} />
        <span>Back to Home</span>
      </button>

      {/* Hero Section */}
      <motion.div
        className="text-center max-w-3xl mx-auto mt-12"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4">About Virtual AI Assistant</h1>
        <p className="text-lg text-cyan-100 font-light">
          A powerful AI-based virtual assistant crafted by Jay Patel using the MERN stack & Gemini AI.
        </p>
      </motion.div>

      {/* Developer Profile */}
      <motion.div
        className="mt-16 max-w-4xl mx-auto bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-lg"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        <div className="flex flex-col md:flex-row items-center gap-8">
          <img
              src={jay}
            alt="Jay Patel"
            className="w-[200px] h-[200px] rounded-full object-cover border-4 border-cyan-400 shadow-md"

          />
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-semibold">Jay D. Patel</h2>
            <p className="text-cyan-200 mb-3">Node.js Intern • AI/ML Enthusiast • Full Stack Developer</p>
            <p className="text-sm text-cyan-100 leading-relaxed">
              A B.Tech IT student from UTU, passionate about merging AI with modern web applications.
              Skilled in building real-world projects using MERN stack and beginner-level machine learning integration.
            </p>
            <div className="mt-4 flex gap-3 justify-center md:justify-start flex-wrap">
              <a href="https://jayptlportfolio.netlify.app/" target="_blank" rel="noopener noreferrer"
                 className="hover:underline text-cyan-300 flex items-center gap-1">
                <ExternalLink size={16} /> Portfolio
              </a>
              <a href="https://github.com/Jay-ptl2210" target="_blank" rel="noopener noreferrer"
                 className="hover:underline text-cyan-300 flex items-center gap-1">
                <ExternalLink size={16} /> GitHub
              </a>
              <a href="https://www.linkedin.com/in/jay-patel-it-221004-" target="_blank" rel="noopener noreferrer"
                 className="hover:underline text-cyan-300 flex items-center gap-1">
                <ExternalLink size={16} /> LinkedIn
              </a>
              <a href="mailto:jaydptl.22@gmail.com" className="hover:underline text-cyan-300 flex items-center gap-1">
                <ExternalLink size={16} /> Email
              </a>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Features */}
      <motion.div
        className="mt-20 max-w-5xl mx-auto"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
      >
        <h3 className="text-3xl font-semibold text-center mb-12">AI Assistant Capabilities</h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white/10 rounded-xl p-6 text-center shadow-md hover:scale-105 transition">
            <h4 className="text-xl font-bold mb-2">Voice Recognition</h4>
            <p className="text-sm text-cyan-100">Understands your voice using Web Speech API for natural interaction.</p>
          </div>
          <div className="bg-white/10 rounded-xl p-6 text-center shadow-md hover:scale-105 transition">
            <h4 className="text-xl font-bold mb-2">AI-Powered Responses</h4>
            <p className="text-sm text-cyan-100">Uses Gemini AI to generate human-like intelligent answers.</p>
          </div>
          <div className="bg-white/10 rounded-xl p-6 text-center shadow-md hover:scale-105 transition">
            <h4 className="text-xl font-bold mb-2">Smart Command Execution</h4>
            <p className="text-sm text-cyan-100">Performs commands like Google search, opening apps, and weather info.</p>
          </div>
        </div>
      </motion.div>

      
      {/* How to Use Section */}
      <motion.div
        className="mt-20 max-w-4xl mx-auto text-center"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.55, duration: 0.6 }}
      >
        <h3 className="text-3xl font-semibold mb-6">How to Use the Assistant</h3>
        <div className="bg-white/10 rounded-xl p-6 shadow-lg text-left text-cyan-100 space-y-4">
          <div>
            <h4 className="text-xl font-bold text-white mb-1">1. Create an Assistant</h4>
            <p>Start by creating your AI assistant. Provide a name (e.g., <strong>Nova</strong>) and upload an image or avatar.</p>
          </div>
          <div>
            <h4 className="text-xl font-bold text-white mb-1">2. Interact via Voice</h4>
            <p>Once created, talk to your assistant using voice commands. Just say your assistant’s name followed by your request.</p>
          </div>
          <div>
            <h4 className="text-xl font-bold text-white mb-1">Example:</h4>
            <p className="italic text-cyan-200">“<strong>Nova, open Google</strong>”</p>
            <p>Your assistant will respond and execute the task accordingly.</p>
          </div>
        </div>
      </motion.div>

      {/* Tech Stack */}
      <motion.div
        className="mt-20 max-w-4xl mx-auto text-center"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
      >
        <h3 className="text-3xl font-semibold mb-6">Tech Stack</h3>
        <div className="flex flex-wrap justify-center gap-3 text-sm text-cyan-100">
          <span className="bg-cyan-700 px-3 py-1 rounded-full">React.js</span>
          <span className="bg-cyan-700 px-3 py-1 rounded-full">Node.js</span>
          <span className="bg-cyan-700 px-3 py-1 rounded-full">Express.js</span>
          <span className="bg-cyan-700 px-3 py-1 rounded-full">MongoDB</span>
          <span className="bg-cyan-700 px-3 py-1 rounded-full">Web Speech API</span>
          <span className="bg-cyan-700 px-3 py-1 rounded-full">Gemini AI</span>
          <span className="bg-cyan-700 px-3 py-1 rounded-full">Tailwind CSS</span>
          <span className="bg-cyan-700 px-3 py-1 rounded-full">Framer Motion</span>
        </div>
      </motion.div>
    </div>
  );
}



export default About;
