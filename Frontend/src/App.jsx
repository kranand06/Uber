import React, { useContext } from 'react'
import { UserContext } from './context/userContext';
import Footer from './Components/Footer';
import { Routes, Route, Navigate } from 'react-router-dom';
import HeroPage from './Pages/HeroPage';
import SignupPage from './Pages/SignupPage';
import LoginPage from './Pages/loginPage.jsx';
import HomePage from './Pages/HomePage';
import Error404 from './Pages/Error404';
import { Toaster } from "react-hot-toast";
import ProfilePage from './Pages/ProfilePage.jsx';
import LogoutPage from './Pages/LogoutPage.jsx';


const App = () => {

const { token } = useContext(UserContext);

const authenticated = !!token;

  return (
    <>
      <Routes>
        <Route path="/signup" element={!authenticated ? <SignupPage /> : <Navigate to="/main" />} />
        <Route path="/login" element={!authenticated ? <LoginPage /> : <Navigate to="/main" />} />
        <Route path="/" element={!authenticated ? <HeroPage /> : <Navigate to="/main" />} />


        <Route path="/main" element={authenticated ? <HomePage /> : <Navigate to="/login" />} />
        <Route path="/profile" element={authenticated ? <ProfilePage /> : <Navigate to="/login" />} />
        <Route path="/logout" element={authenticated ? <LogoutPage /> : <Navigate to="/login" />} />
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
