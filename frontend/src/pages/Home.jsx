import React, { useContext, useEffect, useState } from 'react';
import { userDataContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ai from "../assets/ai.gif";
import userimage from "../assets/user.gif";

function Home() {
  const { userData, setUserData, serverUrl, getGeminiResponse } = useContext(userDataContext);
  const navigate = useNavigate();

  const [recognition, setRecognition] = useState(null);
  const [isRecognizing, setIsRecognizing] = useState(false);
  const [assistantReady, setAssistantReady] = useState(false);
  const [userText, setUserText] = useState("");
  const [aiText, setAiText] = useState("");

  const handleLogout = async () => {
    try {
      await axios.get(`${serverUrl}/api/auth/logout`, { withCredentials: true });
      setUserData(null);
      navigate("/signin");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  const handleCustomize = () => {
    navigate("/costomize");
  };

  const speak = (text) => {
    if (!text) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);

    const voices = window.speechSynthesis.getVoices();
    const preferredFemaleVoice = voices.find(
      (v) =>
        v.lang.startsWith("en") &&
        /female|woman|zira|samantha|karen|google uk/i.test(v.name)
    );
    const fallbackVoice = voices.find((v) => v.lang.startsWith("en"));

    utterance.voice = preferredFemaleVoice || fallbackVoice || null;
    utterance.lang = 'en-US';
    utterance.rate = 1;

    utterance.onstart = () => {
      setAiText(text);
      setIsRecognizing(false);
    };

    utterance.onend = () => {
      setAiText("");
      setUserText("");
      setIsRecognizing(true);
    };

    window.speechSynthesis.speak(utterance);
  };

  const openAppWithFallback = (appLink, webLink) => {
  window.location.href = appLink;

  // fallback to web after 2s if the app isn't installed
  setTimeout(() => {
    window.location.href = webLink;
  }, 2000);
};

const handleCommand = (data) => {
  const { type, userInput = "", response } = data;
  speak(response || "Done!");
  const query = encodeURIComponent(userInput.trim());

  switch (type) {
    case "google_search":
      window.open(`https://www.google.com/search?q=${query}`, "_blank");
      break;
    case "youtube_search":
    case "youtube_play":
      openAppWithFallback("youtube://", `https://www.youtube.com/results?search_query=${query}`);
      break;
    case "youtube_open":
      openAppWithFallback("youtube://", "https://www.youtube.com");
      break;
    case "instagram_open":
      openAppWithFallback("instagram://", "https://www.instagram.com/");
      break;
    case "facebook_open":
      openAppWithFallback("fb://profile", "https://www.facebook.com/");
      break;
    case "linkedin_open":
      openAppWithFallback("linkedin://", "https://www.linkedin.com/");
      break;
    case "google_maps_open":
      openAppWithFallback(`geo:0,0?q=${query}`, `https://www.google.com/maps/search/?api=1&query=${query}`);
      break;
    case "weather_show":
      window.open(`https://www.google.com/search?q=weather+${query}`, "_blank");
      break;
    case "whatsapp_open":
    case "WAbusiness_open":
      openAppWithFallback("whatsapp://send?text=Hello", "https://web.whatsapp.com/");
      break;
    case "telegram_open":
      openAppWithFallback("tg://resolve?domain=YourBot", "https://web.telegram.org/");
      break;
    case "snapchat_open":
      openAppWithFallback("snapchat://", "https://www.snapchat.com/");
      break;
    case "spotify_open":
      openAppWithFallback("spotify://", "https://open.spotify.com/");
      break;
    case "spotify_play":
      openAppWithFallback(`spotify://search/${query}`, `https://open.spotify.com/search/${query}`);
      break;
    case "calculator_open":
      window.open("https://www.google.com/search?q=calculator", "_blank");
      break;
    default:
      console.warn("Unknown command type:", type);
  }
};


  const startRecognition = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recog = new SpeechRecognition();
    recog.continuous = true;
    recog.lang = "en-US";

    recog.onstart = () => {
      console.log("🎤 Listening started...");
      setIsRecognizing(true);
    };

    recog.onend = () => {
      console.log("🔁 Recognition ended, restarting...");
      if (assistantReady) {
        setIsRecognizing(false);
        setTimeout(() => recog.start(), 1000);
      }
    };

    recog.onerror = (e) => {
      console.error("Speech error:", e);
      recog.abort();
      setTimeout(() => recog.start(), 1000);
    };

    recog.onresult = async (e) => {
      const transcript = e.results[e.results.length - 1][0].transcript.trim();
      console.log("🎙 Transcript:", transcript);
      setUserText(transcript);
      setAiText("");

      if (transcript.toLowerCase().includes(userData.assistantName.toLowerCase())) {
        recog.abort();

        const cleanedText = transcript
          .toLowerCase()
          .replace("hello", "")
          .replace(userData.assistantName.toLowerCase(), "")
          .trim();

        try {
          const data = await getGeminiResponse(cleanedText);
          console.log("🧠 Gemini Response:", data);
          if (data?.response) speak(data.response);
          if (data?.type) handleCommand(data);
        } catch (err) {
          console.error("Gemini error:", err);
          speak("Sorry, something went wrong.");
        }

        setTimeout(() => recog.start(), 1000);
      }
    };

    recog.start();
    setRecognition(recog);
  };

  const handleActivateAssistant = () => {
    setAssistantReady(true);
    startRecognition();
  };

  useEffect(() => {
    window.speechSynthesis.onvoiceschanged = () => {
      window.speechSynthesis.getVoices();
    };

    return () => {
      if (recognition) recognition.stop();
      window.speechSynthesis.cancel();
    };
  }, [recognition]);

  return (
    <>
      <div className="min-h-screen w-full bg-gradient-to-t from-black to-[#02023d] px-4 py-6 flex flex-col items-center justify-center relative">
        {/* Top Right Buttons */}
        <div className="absolute top-4 right-4 flex gap-3 z-10">
          <button
            onClick={handleCustomize}
            className="bg-cyan-400 hover:bg-cyan-300 text-black font-bold py-1.5 px-4 rounded-full text-sm shadow-sm"
          >
            ✏️ Customize
          </button>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-400 text-white font-bold py-1.5 px-4 rounded-full text-sm shadow-sm"
          >
            🚪 Logout
          </button>
        </div>

        {/* Assistant Card */}
        <div className="bg-white/10 backdrop-blur-lg border border-cyan-400/30 rounded-2xl shadow-lg shadow-blue-950 p-6 max-w-sm w-full text-center flex flex-col items-center gap-4 relative">
          <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full overflow-hidden border-4 border-cyan-400 shadow-lg">
            <img
              src={userData?.assistantImage}
              alt="Assistant"
              className="w-full h-full object-cover"
            />
          </div>

          <h1 className="text-white text-xl sm:text-2xl font-bold drop-shadow-lg">
            Hello, I'm <span className="text-cyan-400">{userData?.assistantName}</span> 👋
          </h1>

          <div className="min-h-[60px] text-cyan-100 text-sm sm:text-base italic text-center px-2">
            {aiText || userText || `Say "${userData?.assistantName}" to talk to me.`}
          </div>

          {/* Transparent Mic Button */}
          <div className="mt-4 w-14 h-14 rounded-full overflow-hidden mic-button pulse-animation flex items-center justify-center">
            {aiText ? (
              <img src={ai} className="w-full h-full object-cover gif-filter" />
            ) : isRecognizing ? (
              <img src={userimage} className="w-full h-full object-cover gif-filter" />
            ) : (
              <button
                onClick={handleActivateAssistant}
                className="text-white text-2xl w-full h-full"
              >
                🎤
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Embedded CSS */}
      <style>{`
        .gif-filter {
          mix-blend-mode: screen;
        }

        .pulse-animation {
          animation: pulse 1.5s infinite;
        }

        @keyframes pulse {
          0% { box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.3); }
          70% { box-shadow: 0 0 0 12px rgba(255, 255, 255, 0); }
          100% { box-shadow: 0 0 0 0 rgba(255, 255, 255, 0); }
        }
      `}</style>
    </>
  );
}
export default Home;
