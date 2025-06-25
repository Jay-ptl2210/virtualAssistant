import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Signup from './pages/Signup.jsx';
import SignIn from './pages/SignIn.jsx';
import Costomize from './pages/Costomize.jsx';
import Customize from './pages/Customize.jsx';
import Home from './pages/Home.jsx';
import { userDataContext } from './context/UserContext.jsx';

function App() {
  const { userData, isLoading } = React.useContext(userDataContext);

  // ⏳ Show loading screen while checking auth
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white text-xl">
        Loading...
      </div>
    );
  }

  return (
    <Routes>
      <Route
        path="/"
        element={
          userData?.assistantImage && userData?.assistantName
            ? <Home />
            : <Navigate to="/costomize" />
        }
      />
      <Route
        path="/signup"
        element={!userData ? <Signup /> : <Navigate to="/costomize" />}
      />
      <Route
        path="/signin"
        element={!userData ? <SignIn /> : <Navigate to="/" />}
      />
      <Route
        path="/costomize"
        element={userData ? <Costomize /> : <Navigate to="/signup" />}
      />
      <Route
        path="/customize"
        element={userData ? <Customize /> : <Navigate to="/signup" />}
      />
    </Routes>
  );
}

export default App;
