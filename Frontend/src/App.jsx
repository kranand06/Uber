import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from './context/userContext';
import Footer from './Components/Footer';
import { Routes, Route, Navigate } from 'react-router-dom';
import HeroPage from './Pages/HeroPage';
import SignupPage from './Pages/SignupPage';
import LoginPage from './Pages/LoginPage';
import HomePage from './Pages/HomePage';
import Error404 from './Pages/Error404';
import { Toaster } from "react-hot-toast";


const App = () => {

  const { user, checkAuth } = useContext(UserContext);

  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const verifyAuth = async () => {
      if (user.token) {
        setAuthenticated(true);
      } else {
        setAuthenticated(false);
      }
    };
    verifyAuth();
  }, [user]);

  return (
    <>
      <Routes>
        <Route path="/signup" element={!authenticated ? <SignupPage /> : <Navigate to="/main" />} />
        <Route path="/login" element={!authenticated ? <LoginPage /> : <Navigate to="/main" />} />
        <Route path="/" element={!authenticated ? <HeroPage /> : <Navigate to="/main" />} />


        <Route path="/main" element={authenticated ? <HomePage /> : <Navigate to="/login" />} />
        <Route path="*" element={<Error404 />} />
        {/* <Route path="/notes" element={authenticated ? <Notes /> : <Navigate to="/login" />} />
        <Route path="/chat" element={authenticated ? <Chat /> : <Navigate to="/login" />} />
        <Route path="/confession" element={authenticated ? <Confession /> : <Navigate to="/login" />} />
        <Route path="/poll" element={authenticated ? <Poll /> : <Navigate to="/login" />} />
        <Route path="/notification" element={authenticated ? <Notification /> : <Navigate to="/login" />} />
        <Route path="/assignment" element={authenticated ? <Assignment /> : <Navigate to="/login" />} />
        <Route path="/profile" element={authenticated ? <Profile /> : <Navigate to="/login" />} />
        <Route path="/setting" element={authenticated ? <Setting /> : <Navigate to="/login" />} /> */}

      </Routes>
      <Toaster position="top-right" />
      {/* <Toaster position="top-right" /> */}
      <div className="hidden lg:block">
        <Footer />
      </div>
      
    </>
  )
}

export default App;
