### 🤖 Virtual AI Assistant – Voice-Powered Gemini Integration

---
### Live Demo:

https://virtualassistantbyjayptl.onrender.com

## 📸 Screenshots

### Registartion Page:

![Screenshot 2025-07-02 102750](https://github.com/user-attachments/assets/53e34d0c-ee20-434f-ae2a-69a0aa54c10b)

### Signin Page:

![Screenshot 2025-07-02 104819](https://github.com/user-attachments/assets/fd5df702-fbe8-46d5-9847-6cdcea004353)

### Customize page:

![Screenshot 2025-07-02 104949](https://github.com/user-attachments/assets/93a9a62b-1aca-452b-84dd-59dfb73e3120)

![Screenshot 2025-07-02 105002](https://github.com/user-attachments/assets/945f684a-c866-4ccc-bc34-719b0a5d5927)

### ### Voice Interaction::

![Screenshot 2025-07-02 104926](https://github.com/user-attachments/assets/07f888ac-027d-44c8-8174-b2159a8391dc)

---

## 🔍 **Overview**

The **Virtual AI Assistant** is a powerful voice-based assistant built using the MERN stack and powered by Google Gemini API. Designed for real-time user interaction, it features both **speech recognition** and **text-to-speech** for a truly conversational experience.

🧠 Gemini powers the assistant with intelligent, human-like responses  
🎤 Web Speech API captures voice input in real-time  
🧑‍🎨 Assistant is fully customizable — from name to avatar to branding  
📦 Built and deployed as part of my internship at **Webito Infotech**

---

## ✨ **Key Features**

✔️ Real-time **voice-based interaction**  
✔️ Gemini-powered response generation  
✔️ Text-to-speech output for lifelike feedback  
✔️ Fully **customizable assistant** name, avatar, and UI branding  
✔️ Smooth UI with React and dynamic state management  
✔️ File upload support with Multer + Cloudinary  
✔️ Live deployment for instant demos  

---

## 🛠️ **Technology Stack**

### Frontend:
- React.js  
- Web Speech API (SpeechRecognition, SpeechSynthesis)  
- Axios + Context API for state management  

### Backend:
- Node.js  
- Express.js  
- Google Gemini API  
- Multer (file handling)  
- Cloudinary (media storage)  

### Database:
- MongoDB + Mongoose  

### Deployment:
- Render

---

## 🚀 **Getting Started**

### Prerequisites

- Node.js (v14 or above)
- MongoDB (local or Atlas)
- Google Gemini API key
- Cloudinary credentials
- email and app password

### Installation backend

```bash
git clone https://github.com/Jay-ptl2210/virtual-ai-assistant.git
cd virtual-ai-assistant
cd backend
npm install
```

### Create /backend/.env file:
 ```

NODE_ENV=development
PORT=8000
MONGODB_URI=write your mongodb URL

JWT_SECRET= write your JWT secrate

EMAIL_USER=write your email id
EMAIL_PASS=write your app password which is provide by google

CLOUDINARY_CLOUD_NAME= write your cloudinary cloud name
CLOUDINARY_API_SECRET= write your cloudinnary api secret
CLOUDINARY_API_KEY= write your cloudinary api kkey

GEMINI_API_URL= write your gemini api url
```
### Start the server:
```
cd backend
npm run dev
```
Open http://localhost:8000 in your browser.

Your backeend is start sucessfully.

### For frontend

```
cd fronteend
npm install
nppm run dev
```
Your frontend start sucessfully


### 🤝 Contributing
Contributions are welcome!

- Fork the repo
- Create a branch (git checkout -b feature/your-feature)
- Commit your changes (git commit -m 'Add feature')
- Push (git push origin feature/your-feature)
- Open a pull request

### 📄 License

This project is licensed under the MIT License. See LICENSE for details.

✨ Thank you for checking out my project! 🙌
