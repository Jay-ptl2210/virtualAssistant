import React, { useContext, useEffect, useRef, useState } from 'react';
import { userDataContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import aiImg from "../assets/ai.gif";
import userImg from "../assets/user.gif";
import { Settings, LogOut, Mic, MicOff, Volume2, VolumeX } from 'lucide-react';

function Home() {
  const { userData, serverUrl, setUserData, getGeminiResponse } = useContext(userDataContext);
  const navigate = useNavigate();

  const [listening, setListening] = useState(false);
  const [userText, setUserText] = useState("");
  const [aiText, setAiText] = useState("");
  const [isMuted, setIsMuted] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const isSpeakingRef = useRef(false);
  const recognitionRef = useRef(null);
  const isRecognizingRef = useRef(false);
  const greetingSpokenRef = useRef(false);

  const synth = window.speechSynthesis;

  const handleLogOut = async () => {
    try {
      await axios.get(`${serverUrl}/api/auth/logout`, { withCredentials: true });
      setUserData(null);
      navigate("/signin");
    } catch (error) {
      console.error(error);
      setUserData(null);
    }
  };

  const startRecognition = () => {
    if (!isSpeakingRef.current && !isRecognizingRef.current && !isMuted) {
      try {
        recognitionRef.current?.start();
      } catch (error) {
        if (error.name !== "InvalidStateError") console.error("Start error:", error);
      }
    }
  };

  const speak = (text) => {
    if (isMuted) return;

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';

    const voices = synth.getVoices();
    const alexaLikeVoice = voices.find(v =>
      v.name.toLowerCase().includes('alexa') ||
      v.name === 'Google US English Female' ||
      v.name === 'Samantha' ||
      (v.name.toLowerCase().includes('english') && v.lang === 'en-US')
    ) || voices.find(v => v.lang === 'en-US');

    if (alexaLikeVoice) utterance.voice = alexaLikeVoice;

    utterance.pitch = 1.1;
    utterance.rate = 1.0;
    utterance.volume = 1.0;

    isSpeakingRef.current = true;
    setIsProcessing(true);

    utterance.onend = () => {
      setAiText("");
      isSpeakingRef.current = false;
      setIsProcessing(false);
      setTimeout(() => startRecognition(), 800);
    };

    synth.cancel();
    synth.speak(utterance);
  };

  const handleCommand = (data) => {
    const { type, userInput, response } = data;
    speak(response);
    const query = encodeURIComponent(userInput);

    switch (type) {
      case 'google_search':
        window.open(`https://www.google.com/search?q=${query}`, '_blank');
        break;
      case 'calculator_open':
        window.open(`https://www.google.com/search?q=calculator`, '_blank');
        break;
      case 'instagram_open':
        window.open(`https://www.instagram.com/`, '_blank');
        break;
      case 'facebook_open':
        window.open(`https://www.facebook.com/`, '_blank');
        break;
      case 'weather_show':
        window.open(`https://www.google.com/search?q=weather`, '_blank');
        break;
      case 'youtube_search':
      case 'youtube_play':
        window.open(`https://www.youtube.com/results?search_query=${query}`, '_blank');
        break;
      case 'google_map_open':
        window.open(`https://www.google.com/maps/search/${query}`, '_blank');
        break;
      case 'whatsapp_open':
        window.open(`https://web.whatsapp.com/`, '_blank');
        break;
      case 'telegram_open':
        window.open(`https://web.telegram.org/`, '_blank');
        break;
      case 'twitter_open':
        window.open(`https://x.com/`, '_blank');
        break;
    }
  };

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognitionRef.current = recognition;

    let isMounted = true;
    const startTimeout = setTimeout(() => {
      if (isMounted && !isSpeakingRef.current && !isRecognizingRef.current && !isMuted) {
        try {
          recognition.start();
        } catch (e) {
          if (e.name !== "InvalidStateError") console.error(e);
        }
      }
    }, 1000);

    recognition.onstart = () => {
      isRecognizingRef.current = true;
      setListening(true);
    };

    recognition.onend = () => {
      isRecognizingRef.current = false;
      setListening(false);
      if (isMounted && !isSpeakingRef.current && !isMuted) {
        setTimeout(() => {
          try {
            recognition.start();
          } catch (e) {
            if (e.name !== "InvalidStateError") console.error(e);
          }
        }, 1000);
      }
    };

    recognition.onerror = (event) => {
      isRecognizingRef.current = false;
      setListening(false);
      if (event.error !== "aborted" && isMounted && !isSpeakingRef.current && !isMuted) {
        setTimeout(() => {
          try {
            recognition.start();
          } catch (e) {
            if (e.name !== "InvalidStateError") console.error(e);
          }
        }, 1000);
      }
    };

    recognition.onresult = async (e) => {
      const transcript = e.results[e.results.length - 1][0].transcript.trim();
      if (transcript.toLowerCase().includes(userData.assistantName.toLowerCase())) {
        setAiText("");
        setUserText(transcript);
        recognition.stop();
        isRecognizingRef.current = false;
        setListening(false);
        setIsProcessing(true);
        const data = await getGeminiResponse(transcript);
        handleCommand(data);
        setAiText(data.response);
        setUserText("");
        setIsProcessing(false);
      }
    };

    const greetUser = () => {
      if (greetingSpokenRef.current || isMuted) return;

      const greeting = new SpeechSynthesisUtterance(`Hello ${userData.name}, what can I help you with?`);
      greeting.lang = 'en-US';
      const voices = synth.getVoices();
      const voice = voices.find(v =>
        v.name.toLowerCase().includes('alexa') ||
        v.name === 'Google US English Female' ||
        v.name === 'Samantha' ||
        (v.name.toLowerCase().includes('english') && v.lang === 'en-US')
      ) || voices.find(v => v.lang === 'en-US');

      if (voice) greeting.voice = voice;
      synth.cancel();
      synth.speak(greeting);
      greetingSpokenRef.current = true;
    };

    if (synth.getVoices().length === 0) {
      synth.onvoiceschanged = greetUser;
    } else {
      greetUser();
    }

    // Optional: log available voices
    const logVoices = () => {
      const allVoices = synth.getVoices();
      console.log("Available voices:", allVoices.map(v => `${v.name} (${v.lang})`));
    };
    if (synth.onvoiceschanged !== undefined) {
      synth.onvoiceschanged = logVoices;
    } else {
      logVoices();
    }

    return () => {
      isMounted = false;
      clearTimeout(startTimeout);
      recognition.stop();
      setListening(false);
      isRecognizingRef.current = false;
    };
  }, [isMuted]);

  return (
    <div className='min-h-screen animate-gradient-shift neural-bg relative overflow-hidden'>
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

      <div className='absolute top-6 right-6 flex gap-4 z-50 animate-slide-in-up'>
        <button onClick={() => setIsMuted(!isMuted)} className='glass-dark hover-lift p-3 rounded-full text-white' title={isMuted ? "Unmute" : "Mute"}>
          {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
        </button>
        <button onClick={() => navigate("/costomize")} className='glass-dark hover-lift p-3 rounded-full text-white' title="Settings">
          <Settings size={20} />
        </button>
        <button onClick={handleLogOut} className='glass-dark hover-lift p-3 rounded-full text-red-400 hover:text-red-300' title="Logout">
          <LogOut size={20} />
        </button>
        <button onClick={() => navigate("/about")} className='glass-dark hover-lift px-4 py-2 rounded-xl text-cyan-300 font-semibold border border-cyan-400 transition hover:bg-cyan-600/10' title="About">
          About
        </button>
      </div>

      <div className='flex flex-col justify-center items-center min-h-screen px-4 relative z-10'>
        <div className='relative rounded-[2rem] p-10 max-w-2xl w-full backdrop-blur-md border border-cyan-400/20 bg-gradient-to-br from-white/5 to-cyan-400/5 shadow-[0_0_50px_rgba(0,255,255,0.1)] transition-all hover:shadow-[0_0_80px_rgba(0,255,255,0.2)]'>
          <div className='absolute top-4 right-4 flex gap-1'>
            <span className={`w-2 h-2 rounded-full bg-cyan-400 animate-pulse ${listening ? 'opacity-100' : 'opacity-20'}`} />
            <span className={`w-2 h-2 rounded-full bg-cyan-400 animate-pulse delay-100 ${listening ? 'opacity-100' : 'opacity-20'}`} />
            <span className={`w-2 h-2 rounded-full bg-cyan-400 animate-pulse delay-200 ${listening ? 'opacity-100' : 'opacity-20'}`} />
          </div>

          <div className='flex justify-center mb-6'>
            <div className='relative'>
              <div className='w-36 h-36 rounded-full overflow-hidden border-4 border-cyan-400/50 shadow-xl animate-float relative'>
                <img src={userData?.assistantImage || aiImg} alt='Assistant' className='w-full h-full object-cover' />
                <div className='absolute inset-0 bg-gradient-to-t from-cyan-400/20 to-transparent'></div>
              </div>
              <div className='absolute -bottom-2 -right-2 w-8 h-8 bg-cyan-400 rounded-full flex items-center justify-center animate-pulse-glow'>
                {listening ? <Mic size={16} className="text-black" /> : <MicOff size={16} className="text-black" />}
              </div>
            </div>
          </div>

          <div className='text-center mb-6'>
            <h1 className='text-white text-2xl font-bold mb-2 animate-slide-in-up'>
              I am <span className='text-cyan-300 typing-animation'>{userData?.assistantName}</span>
            </h1>
            <p className='text-cyan-200 text-sm italic'>
              Say "<span className='text-cyan-400 font-semibold'>{userData?.assistantName}</span>" to activate
            </p>
            <p className='text-cyan-300 text-sm mt-4'>
              Don’t know how to use?{' '}
              <span onClick={() => navigate('/about')} className='underline text-cyan-400 hover:text-white cursor-pointer font-medium'>
                Go to About
              </span>
            </p>
          </div>

          <div className='flex justify-center mb-6'>
            <div className='w-24 h-24 rounded-full overflow-hidden relative'>
              {isProcessing ? (
                <div className='w-full h-full bg-gradient-to-r from-cyan-400 to-blue-500 animate-pulse-glow flex items-center justify-center'>
                  <div className='w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin'></div>
                </div>
              ) : aiText ? (
                <img src={aiImg} alt="AI Speaking" className='w-full h-full object-cover mix-blend-screen animate-pulse-glow' />
              ) : (
                <img src={userImg} alt="User Speaking" className='w-full h-full object-cover mix-blend-screen' />
              )}
            </div>
          </div>

          {(userText || aiText) && (
            <div className='glass rounded-xl p-4 mb-4 animate-slide-in-up'>
              {userText && <div className='text-cyan-300 text-sm mb-2'><span className='font-semibold'>You:</span> {userText}</div>}
              {aiText && <div className='text-white text-sm'><span className='font-semibold text-cyan-400'>{userData?.assistantName}:</span> {aiText}</div>}
            </div>
          )}

          <div className='text-center'>
            <p className='text-cyan-200 text-xs'>
              {isMuted ? '🔇 Muted' : listening ? '🎤 Listening...' : '⏸️ Waiting for activation'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
